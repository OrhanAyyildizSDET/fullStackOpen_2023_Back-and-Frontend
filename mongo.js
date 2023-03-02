const mongoose = require('mongoose')

if (process.argv.length<4) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone_number = process.argv[4]

const id = Math.random()*100000000

const url =
`${process.env.DB_Url1}${process.env.DB_Pass_PhoneBook}${process.env.DB_Url2}`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number:String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  id: id,
  name: name,
  number:phone_number,
})

person.save().then(result => {
  console.log(`added ${name} number ${phone_number} to phonebook`)
  mongoose.connection.close()
}) 

// process.argv.forEach((val, index) => {
//     if(index === 3 || index === 4)
//     console.log(`${index}: ${val}`);
//   });
console.log("phonebook:")
Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person.name," ",person.number)
  })
  mongoose.connection.close()
})