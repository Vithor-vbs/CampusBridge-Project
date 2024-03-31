const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQueryType = require("./types/root_query_type");
const RootMutationType = require("./types/root_mutations_type");

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
