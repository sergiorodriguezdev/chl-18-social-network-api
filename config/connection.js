const { connect, connection } = require('mongoose');

// Once deployed to Heroku, use MONGODB_URI environment variable to connect to hosted MongoDB Atlas instance
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectionString);

module.exports = connection;
