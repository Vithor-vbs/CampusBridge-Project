const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;
const ContactType = require("../types/contact_type");
const ContactService = require("../../services/contactService");

const ContactMutations = {
  createContact: {
    type: ContactType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      message: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { name, email, title, message }) {
      return ContactService.createContact({
        name,
        email,
        title,
        message,
      });
    },
  },
};

module.exports = ContactMutations;
