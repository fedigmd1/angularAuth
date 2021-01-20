const express = require('express')
const router = express.Router()
const User = require('../models/user')
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

router.post('/register', (req, res) => {
  let userData = req.body
  console.log('userData', userData);
  let user = new User(userData)
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(registeredUser)
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  console.log('userData', userData);

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log('errorerrorerrorerrorerrorerrorerror',error);
    } else {
      if (!user) {
        res.status(401).send('Invalid email')
      } else {
        if (user.password !== userData.password) {
          res.status(401).send('Invalid password')
        } else {
          res.status(200).send(user)
        }
      }
    }
  })
})

module.exports = router