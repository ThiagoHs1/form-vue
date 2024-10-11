const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const knex = require('knex')(require('./knexfile').development);

const schema = buildSchema(`
  type Query {
    users: [User]
  }
  type Mutation {
    addUser(name: String!, email: String!, phone: String!): User
  }
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }
`);

const root = {
  users: async () => {
    return await knex('users').select('*');
  },
  addUser: async ({ name, email, phone  }) => {
    const [id] = await knex('users').insert({ name, email, phone  }).returning('id');
    return { id, name, email, phone  };
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Servidor GraphQL rodando em http://localhost:4000/graphql'));
