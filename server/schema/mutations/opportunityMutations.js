const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } =
  graphql;
const OpportunityType = require("../types/opportunity_type");
const OpportunityService = require("../../services/volunteerProjects");

const OpportunityMutations = {
  createOpportunity: {
    type: OpportunityType,
    args: {
      company: { type: new GraphQLNonNull(GraphQLString) },
      duration: { type: new GraphQLNonNull(GraphQLString) },
      jobTitle: { type: new GraphQLNonNull(GraphQLString) },
      area: { type: new GraphQLNonNull(GraphQLString) },
      tags: { type: new graphql.GraphQLList(GraphQLString) },
      description: { type: GraphQLString },
      image: { type: GraphQLString },
    },
    resolve(parentValue, { company, duration, jobTitle, description, Image }) {
      return OpportunityService.createOpportunity({
        company,
        duration,
        jobTitle,
        description,
        image,
      });
    },
  },

  deleteOpportunity: {
    type: OpportunityType,
    args: { id: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(parentValue, { id }) {
      return OpportunityService.deleteOpportunity(id);
    },
  },

  updateOpportunity: {
    type: OpportunityType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      company: { type: GraphQLString },
      duration: { type: GraphQLString },
      jobTitle: { type: GraphQLString },
      description: { type: GraphQLString },
      area: { type: GraphQLString },
      tags: { type: new graphql.GraphQLList(GraphQLString) },
      image: { type: GraphQLString },
    },
    resolve(parentValue, args) {
      return OpportunityService.updateOpportunity(args);
    },
  },
};

module.exports = OpportunityMutations;
