const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const UserMutations = require("../mutations/userMutations");
const OpportunityMutations = require("../mutations/opportunityMutations");
const ContactMutation = require("../mutations/contactMutation");

const RootMutationType = new GraphQLObjectType({
  name: "RootMutationType",
  fields: () => ({
    ...UserMutations,
    ...OpportunityMutations,
    ...ContactMutation,
  }),
});

module.exports = RootMutationType;
