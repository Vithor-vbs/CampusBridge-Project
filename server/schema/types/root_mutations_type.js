const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const UserMutations = require("../mutations/userMutations");
const OpportunityMutations = require("../mutations/opportunityMutations");

const RootMutationType = new GraphQLObjectType({
  name: "RootMutationType",
  fields: () => ({
    ...UserMutations,
    ...OpportunityMutations,
  }),
});

module.exports = RootMutationType;
