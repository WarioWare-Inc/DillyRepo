require("dotenv").config();
const mongoose = require("mongoose");

// It's not a good idea to hardcode connection credentials here.
// Configure process.env variables in ../.env and use them
// in your connection code: e.g. process.env.DB_NAME

// TODO: Set up a connection to the "thischord" MongoDB database
mongoose.connect(`mongodb://127.0.0.1:27017/${
  DB_HOST="localhost",
  DB_NAME="reviews"
}`);

const tableSchema = new mongoose.Schema(
  {
    rating: String,
    date: String,
    summary: Array,
    body: Boolean,
    recommend: Number,
    reported: String,
    reviewer_Name: String,
    reviewer_Email: String,
    response: String,
    helpfullness: Number,
  },
);

const Table = new mongoose.model('Table', tableSchema);

module.exports = Table;