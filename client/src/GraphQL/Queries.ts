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

export const GET_FILTERED_OPORTUNITIES = gql`
  query getFilteredOpportunities($limit: Int!, $offset: Int!) {
    getFilteredOpportunities(limit: $limit, offset: $offset) {
      opportunities {
        id
        company
        duration
        jobTitle
        description
        area
        tags
      }
      totalCount
    }
  }
`;

export const GET_OPORTUNITIES = gql`
  query getOpportunities {
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
