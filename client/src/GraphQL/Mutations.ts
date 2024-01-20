import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $firstname: String
    $lastname: String
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstname
      lastName: $lastname
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
