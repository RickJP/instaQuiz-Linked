const mongoose = require('mongoose');
// require('dotenv').config();

// const user=process.env.ATLAS_USER;
// const pw=process.env.ATLAS_PW;
// const cluster=process.env.ATLAS_CLUSTER;
// const options=process.env.ATLAS_OPTIONS;
// const db=process.env.ATLAS_DB;

// const dbUri = `mongodb+srv://${user}:${pw}@${cluster}${db}${options}`;
const dbOptions= { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
const config = require("../config/key");

mongoose.connect(config.mongoURI, dbOptions);
const dbConnection = mongoose.connection;
dbConnection.once('open', () => {
  console.log('Connected to MongoDb Successfully');
})
