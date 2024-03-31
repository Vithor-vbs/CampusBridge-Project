import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    getUser {
      id
      email
      firstName
      lastName
    }
  }
`;

export const GET_OPORTUNITIES = gql`
  query {
    getOpportunities {
      id
      company
      duration
      jobTitle
      description
      area
      tags
    }
  }
`;
