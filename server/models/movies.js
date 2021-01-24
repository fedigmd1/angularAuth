const mongoose = require('mongoose')

const Schema = mongoose.Schema
const MovieSchema = new Schema({
  type: String,
  backdrop_path: String,
  genre: String,
  overview: String,
  poster_path: String,
  release_date: String,
  title: String,
  vote_average: Number,
  running_time: String,
  country: String,
  favourite: Boolean,
})

module.exports = mongoose.model('movie', MovieSchema, 'movies')