import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    getUser {
      _id
      email
      name
      profileImage
      bio
      university
      course
      competences
      enrolledOpportunities {
        id
        company
        jobTitle
        duration
        area
        tags
        description
        image
      }
      completedOpportunities {
        id
        company
        jobTitle
        duration
        area
        tags
        description
        image
      }
      volunteerHours
      projectsCompleted
      donationsMade
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
  query getAllOpportunities {
    getAllOpportunities {
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

export const GET_OPPORTUNITY = gql`
  query getOpportunity($id: String!) {
    getOpportunity(id: $id) {
      id
      company
      duration
      jobTitle
      description
      area
      tags
      image
    }
  }
`;
