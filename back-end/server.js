const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const knex = require('knex')(require('./knexfile').development);

// Definindo o esquema GraphQL
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

// Definindo os resolvers
const root = {
  users: async () => {
    return await knex('users').select('*');
  },
  addUser: async ({ name, email, phone }) => {
    const [id] = await knex('users').insert({ name, email, phone }).returning('id');
    return { id, name, email, phone };
  }
};

// Criando o app Express
const app = express();

// Habilitando CORS antes das rotas
app.use(cors());

// Configurando a rota GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Iniciando o servidor
app.listen(4000, () => console.log('Servidor GraphQL rodando em http://localhost:4000/graphql'));
