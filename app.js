const express = require("express");
require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    user: User
  }

  type User {
    id: ID!
    username: String!
    password: String!
    age: Int!
  }

  type Error {
    field: String!
    message: String!
  }

  type RegisterResponse {
    errors: [Error]!
    user: User
  }

  input UserInfo {
    username: String!
    password: String!
    age: Int!
  }

  type Mutation {
    register(userInfo: UserInfo!): RegisterResponse!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    user: () => ({
      id: 1,
      username: "tom",
      password: "dgfdlgu",
      age: 23
    }),
  },
  Mutation: {
    register: (_, { userInfo: {username, password, age } }, context) => {
      const user = {
        id: 1,
        username,
        password,
        age
      };
      return {
        errors: [null],
        user,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Now browse to http://localhost:${port}` + server.graphqlPath)
);
