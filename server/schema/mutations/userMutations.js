const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const UserType = require("../types/user_type");

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
      req.logout();
      return user;
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
};

module.exports = UserMutations;
