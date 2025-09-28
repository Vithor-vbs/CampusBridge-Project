const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => {
    const OpportunityType = require("./opportunity_type");
    return {
      _id: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      name: {
        type: GraphQLString,
        resolve(parentValue) {
          const firstName = parentValue.firstName || "";
          const lastName = parentValue.lastName || "";
          return (
            `${firstName} ${lastName}`.trim() ||
            parentValue.email?.split("@")[0] ||
            ""
          );
        },
      },
      profileImage: { type: GraphQLString },
      bio: { type: GraphQLString },
      university: { type: GraphQLString },
      course: { type: GraphQLString },
      competences: { type: new GraphQLList(GraphQLString) },
      enrolledOpportunities: { type: new GraphQLList(OpportunityType) },
      completedOpportunities: { type: new GraphQLList(OpportunityType) },
      volunteerHours: { type: GraphQLInt },
      projectsCompleted: { type: GraphQLInt },
      donationsMade: { type: GraphQLInt },
    };
  },
});

module.exports = UserType;
