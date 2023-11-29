import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $firstname: String, $lastname: String) {
    signup(email: $email, password: $password, firstname: $firstname: , lastName: $lastname: ) {
      id
      email
      firstname
      lastname
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;
