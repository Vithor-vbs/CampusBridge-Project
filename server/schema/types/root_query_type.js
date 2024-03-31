const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } =
  graphql;
const UserType = require("./user_type");
const OpportunityType = require("./opportunity_type");
const OpportunityService = require("../../services/volunteerProjects");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
    getOpportunities: {
      type: new GraphQLList(OpportunityType),
      resolve() {
        return OpportunityService.getOpportunities();
      },
    },

    getOpportunity: {
      type: OpportunityType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { id }) {
        return OpportunityService.getOpportunity(id);
      },
    },
  },
});

module.exports = RootQueryType;
