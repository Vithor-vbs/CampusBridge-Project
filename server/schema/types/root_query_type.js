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
const ContactService = require("../../services/contactService");
const ContactType = require("./contact_type");

const OpportunitiesResultType = new GraphQLObjectType({
  name: "OpportunitiesResult",
  fields: {
    opportunities: { type: new GraphQLList(OpportunityType) },
    totalCount: { type: GraphQLInt },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
    getFilteredOpportunities: {
      type: OpportunitiesResultType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return OpportunityService.getFilteredOpportunities(
          args.limit,
          args.offset
        );
      },
    },

    getAllOpportunities: {
      type: OpportunitiesResultType,
      resolve(parentValue) {
        return OpportunityService.getAllOpportunities();
      },
    },

    getOpportunity: {
      type: OpportunityType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { id }) {
        return OpportunityService.getOpportunity(id);
      },
    },

    getAllFeedbacks: {
      type: new GraphQLList(ContactType),
      resolve(parentValue) {
        return ContactService.getAllFeedbacks();
      },
    },
  },
});

module.exports = RootQueryType;
