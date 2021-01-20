const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const db = 'mongodb+srv://fedigmd:Az11610141@cluster0.gisjg.mongodb.net/Netflix_app?retryWrites=true&w=majority'

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(db, connectionParams)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })


router.get('/', (req, res) => {
  res.send('From Api route')
})

module.exports = router