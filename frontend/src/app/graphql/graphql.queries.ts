import { gql } from 'apollo-angular';

export const GET_EMPLOYEES = gql`
  query {
    employees {
      _id
      firstname
      lastname
      email
      department
      position
      salary
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      _id
      firstname
      lastname
      email
      department
      position
      salary
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $firstname: String!
    $lastname: String!
    $email: String!
    $department: String!
    $position: String!
    $salary: Float!
  ) {
    createEmployee(
      firstname: $firstname
      lastname: $lastname
      email: $email
      department: $department
      position: $position
      salary: $salary
    ) {
      _id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $firstname: String!
    $lastname: String!
    $email: String!
    $department: String!
    $position: String!
    $salary: Float!
  ) {
    updateEmployee(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
      department: $department
      position: $position
      salary: $salary
    ) {
      _id
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      _id
    }
  }
`;
