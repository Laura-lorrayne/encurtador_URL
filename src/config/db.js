const mongoose = require("mongoose")

const db = process.env.DB_URL

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    })
  } catch (err) {
    console.error(err.message)
    process.exit(-1)
  }
}

module.exports = connectDb
