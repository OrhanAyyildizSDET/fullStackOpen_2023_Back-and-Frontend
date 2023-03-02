const mongoose = require('mongoose')
require("dotenv").config()
mongoose.set('strictQuery', false)

// if (process.argv.length<4) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const phone_number = process.argv[4]

const url =
    `${process.env.DB_Url1}${process.env.DB_Pass_PhoneBook}${process.env.DB_Url2}`

mongoose.connect(url)
    .then(result => {
    console.log('connected to MongoDB')
    })
    .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
     })

const personSchema = new mongoose.Schema({
  name: String,
  number:String,
})

// process.argv.forEach((val, index) => {
//     if(index === 3 || index === 4)
//     console.log(`${index}: ${val}`);
//   });

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)