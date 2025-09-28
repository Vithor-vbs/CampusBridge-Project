import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      email
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      email
    }
  }
`;

export const ADD_FEEDBACK = gql`
  mutation CreateContact(
    $name: String!
    $email: String!
    $title: String!
    $message: String!
  ) {
    createContact(
      name: $name
      email: $email
      title: $title
      message: $message
    ) {
      name
      title
      message
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $name: String
    $profileImage: String
    $bio: String
    $university: String
    $course: String
    $competences: [String]
  ) {
    updateProfile(
      name: $name
      profileImage: $profileImage
      bio: $bio
      university: $university
      course: $course
      competences: $competences
    ) {
      _id
      name
      email
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
      }
      completedOpportunities {
        id
        company
        jobTitle
        duration
        area
        tags
      }
      volunteerHours
      projectsCompleted
      donationsMade
    }
  }
`;

export const ENROLL_IN_OPPORTUNITY = gql`
  mutation EnrollInOpportunity($opportunityId: String!) {
    enrollInOpportunity(opportunityId: $opportunityId) {
      _id
      enrolledOpportunities {
        id
        company
        jobTitle
        duration
        area
        tags
      }
    }
  }
`;

export const COMPLETE_OPPORTUNITY = gql`
  mutation CompleteOpportunity($opportunityId: String!, $hoursWorked: Int) {
    completeOpportunity(
      opportunityId: $opportunityId
      hoursWorked: $hoursWorked
    ) {
      _id
      completedOpportunities {
        id
        company
        jobTitle
        duration
        area
        tags
      }
      volunteerHours
      projectsCompleted
    }
  }
`;
