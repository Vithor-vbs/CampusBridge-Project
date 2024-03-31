const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const OpportunityType = new GraphQLObjectType({
  name: "OpportunityType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    company: { type: new GraphQLNonNull(GraphQLString) },
    duration: { type: new GraphQLNonNull(GraphQLString) },
    jobTitle: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    Image: { type: GraphQLString },
  },
});

module.exports = OpportunityType;
