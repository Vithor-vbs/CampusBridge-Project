const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
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
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return OpportunityService.getOpportunities(args.limit, args.offset);
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
