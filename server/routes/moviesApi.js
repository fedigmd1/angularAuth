const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const db = 'mongodb+srv://fedigmd:Az11610141@cluster0.gisjg.mongodb.net/Netflix_app?retryWrites=true&w=majority'

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(db, connectionParams)
  .then(() => {
    console.log('Connected to database from movies')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })

router.get('/', (req, res) => {
  res.send('From Movie Api route')
})

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(400).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretkey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

router.delete('/delete', verifyToken, (req, res) => {
  let movie_id = req.query.id
  Movie.deleteOne({ _id: movie_id })
    .then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      })
})

router.put('/edit', verifyToken, (req, res) => {
  let movieToUpdate = new Movie(req.body)
  Movie.updateOne({ _id: movieToUpdate._id }, movieToUpdate)
    .then(
      () => {
        res.status(200).json({
          message: 'movie updated successfully!'
        });
      })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      });
});

router.post('/add', verifyToken, (req, res) => {
  let movieToRegister = new Movie(req.body)
  movieToRegister.save((error, registeredMovie) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: "ok" })
    }
  })
})

router.get('/popular', verifyToken, (req, res) => {
  Movie.find({ type: "popular" }, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(movies);
    }
  });
})

router.get('/playnow', verifyToken, (req, res) => {
  Movie.find({ type: "playNow" }, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(movies);
    }
  });
})

router.get('/toprated', verifyToken, (req, res) => {
  Movie.find({ type: "topRated" }, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(movies);
    }
  });
})

router.get('/upcoming', verifyToken, (req, res) => {
  Movie.find({ type: "upComing" }, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(movies);
    }
  });
})

router.get('/details', verifyToken, (req, res) => {
  let movie_id = req.query.id
  Movie.findOne({ _id: movie_id }, (err, movie) => {
    if (err) {
      console.log(err);
    } else {
      if (!movie) {
        res.status(401).send('movie not found')
      } else {
        res.status(200).send(movie)
      }
    }
  });
})

module.exports = router
