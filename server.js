require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectToDB = require('./db/db')
const auth = require('./routes/auth-route')
const home = require('./routes/home-route')
const admin = require('./routes/admin-route')
const media = require('./routes/media-route')



const app = express();
connectToDB();

//define CORS options
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:5173']
}

//middlewares
app.use(cors(corsOptions))
app.use(express.json())

//routes
app.use('/auth', auth)
app.use('/home', home)
app.use('/admin', admin)
app.use('/media', media)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})