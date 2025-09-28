const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } =
  graphql;
const UserType = require("../types/user_type");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const AuthService = require("../../services/auth");

const UserMutations = {
  signup: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
    },
    resolve(parentValue, { email, password, firstName, lastName }, req) {
      return AuthService.signup({
        email,
        password,
        firstName,
        lastName,
        req,
      });
    },
  },

  logout: {
    type: UserType,
    resolve(parentValue, args, req) {
      const { user } = req;
      return new Promise((resolve, reject) => {
        req.logout((err) => {
          if (err) {
            reject(new Error("Logout failed"));
          } else {
            resolve(user);
          }
        });
      });
    },
  },

  login: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { email, password }, req) {
      return AuthService.login({ email, password, req });
    },
  },

  updateProfile: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      profileImage: { type: GraphQLString },
      bio: { type: GraphQLString },
      university: { type: GraphQLString },
      course: { type: GraphQLString },
      competences: { type: new GraphQLList(GraphQLString) },
    },
    resolve(parentValue, args, req) {
      console.log("updateProfile mutation called with args:", args);

      if (!req.user) {
        console.log("User not authenticated");
        throw new Error("User not authenticated");
      }

      console.log("Current user ID:", req.user.id);

      // Filter out null/undefined values and handle name field
      const updateData = {};
      Object.keys(args).forEach((key) => {
        if (args[key] !== null && args[key] !== undefined) {
          if (key === "name") {
            // Split name into firstName and lastName
            const nameParts = args[key].trim().split(" ");
            updateData.firstName = nameParts[0] || "";
            updateData.lastName = nameParts.slice(1).join(" ") || "";
          } else {
            updateData[key] = args[key];
          }
        }
      });

      console.log("Update data after filtering:", updateData);

      return User.findByIdAndUpdate(req.user.id, updateData, { new: true })
        .populate("enrolledOpportunities completedOpportunities")
        .then((result) => {
          console.log("Update successful, result:", result);
          return result;
        })
        .catch((error) => {
          console.error("Update error:", error);
          throw error;
        });
    },
  },

  enrollInOpportunity: {
    type: UserType,
    args: {
      opportunityId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { opportunityId }, req) {
      if (!req.user) {
        throw new Error("User not authenticated");
      }

      return User.findByIdAndUpdate(
        req.user.id,
        { $addToSet: { enrolledOpportunities: opportunityId } },
        { new: true }
      ).populate("enrolledOpportunities completedOpportunities");
    },
  },

  completeOpportunity: {
    type: UserType,
    args: {
      opportunityId: { type: new GraphQLNonNull(GraphQLString) },
      hoursWorked: { type: graphql.GraphQLInt },
    },
    resolve(parentValue, { opportunityId, hoursWorked = 0 }, req) {
      if (!req.user) {
        throw new Error("User not authenticated");
      }

      return User.findByIdAndUpdate(
        req.user.id,
        {
          $pull: { enrolledOpportunities: opportunityId },
          $addToSet: { completedOpportunities: opportunityId },
          $inc: {
            volunteerHours: hoursWorked,
            projectsCompleted: 1,
          },
        },
        { new: true }
      ).populate("enrolledOpportunities completedOpportunities");
    },
  },
};

module.exports = UserMutations;
