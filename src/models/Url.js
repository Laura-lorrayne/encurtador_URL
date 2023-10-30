const mongoose = require("mongoose");
mongoose.set('strictQuery', true)

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: String
});

module.exports = mongoose.model("Url", urlSchema);