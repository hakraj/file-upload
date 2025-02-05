const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('connected to db'))
      .catch((err) => console.log('Mongoose connection failed', err))

  } catch (error) {
    console.error('MongoDB connection failed', error)
    process.exitCode = 1
  }
}

module.exports = connectToDB;