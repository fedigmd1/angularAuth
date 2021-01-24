const express = require('express')
const jwt = require('jsonwebtoken')
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
    console.log('Connected to database from auth ')
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

  User.findOne({ email: userData.email }, (error, userTest) => {
    if (error) {
      console.log('error', error);
    } else {
      if (!userTest) {
        user.save((error, registeredUser) => {
          if (error) {
            console.log(error);
          } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).send({ token })
            console.log('user added with success');
          }
        })
      } else {
        res.status(401).send('Mail already exist!')
        console.log('mail already exist!');
      }
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  console.log('userData', userData);

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log('error', error);
    } else {
      if (!user) {
        res.status(401).send('Invalid email')
        console.log('Invalid email');
      } else {
        if (user.password !== userData.password) {
          res.status(401).send('Invalid password')
          console.log('Invalid password');
        } else {
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretkey')
          res.status(200).send({ token })
          console.log('Login with Success!');
        }
      }
    }
  })
})

module.exports = router