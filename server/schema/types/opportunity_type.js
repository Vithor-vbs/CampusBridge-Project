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
    area: { type: GraphQLString },
    tags: { type: new graphql.GraphQLList(GraphQLString) },
    image: { type: GraphQLString },
    type: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLString },
  },
});

module.exports = OpportunityType;
