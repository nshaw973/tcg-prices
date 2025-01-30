require('dotenv').config();
const routes = require('./routes');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const { authMiddleware } = require('./utils/auth.js');
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: allowedOrigin,  // Allow frontend to make requests
  credentials: true, // Allow cookies if needed (adjust if using cookies in requests)
}));
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  db.once('open', () => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();