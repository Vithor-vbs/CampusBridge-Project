const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const ContactType = new GraphQLObjectType({
  name: "ContactType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = ContactType;
