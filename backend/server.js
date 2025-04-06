const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const typeDefs = require('./schema');
const resolvers = require('./resolver');

const { ApolloServer } = require('apollo-server-express');

const app = express();
app.use(cors());

const DB_USER = 'tenzint'; 
const DB_USER_PASSWORD = 'pass'; 
const DB_CLUSTER = 'comp3133.kztiu.mongodb.net';
const DB_NAME = 'w2024_comp3133s';

const mongodb_atlas_url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongodb_atlas_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

async function startServer() {
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers: [resolvers] 
  });
  
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
