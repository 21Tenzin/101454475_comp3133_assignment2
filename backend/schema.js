const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID!
    email: String!
    password: String!
  }
  type Employee {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    department: String!
    position: String!
    salary: Float!
  }
  
  type AuthPayload {
    message: String!
    user: User
  }

  type Query {
    hello: String
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createEmployee(firstname: String!, lastname: String!, email: String!, department: String!, position: String!, salary: Float!): Employee
    updateEmployee(id: ID!, firstname: String!, lastname: String!, email: String!, department: String!, position: String!, salary: Float!): Employee
    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs;
