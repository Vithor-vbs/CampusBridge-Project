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
  query getOpportunities($limit: Int!, $offset: Int!) {
    getOpportunities(limit: $limit, offset: $offset) {
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
