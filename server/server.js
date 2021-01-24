const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const PORT = 3000
const app = express()
const authApi = require('./routes/authApi')
const movieApi = require('./routes/moviesApi')

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', authApi)
app.use('/movie', movieApi)
app.get('/', function (req, res) {
  res.send('Hello from server')
})
app.listen(PORT, function () {
  console.log('Server running on localhost:' + PORT);
})
