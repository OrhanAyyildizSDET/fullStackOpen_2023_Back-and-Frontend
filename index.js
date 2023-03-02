const cors = require('cors')
const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const Person = require('./models/PersonBackend')
app.use(cors())
app.use(express.json())
app.use(express.static("dist"))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// if (process.argv.length<4) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const phone_number = process.argv[4]

const info = () =>{
  return (
    `<h1>phone length info ${persons.length}</h1>
     <p>first people name is ${persons[0].name}</p>
     <p>${new Date().toString()}</p>`
    )
}

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   console.log(id)
//   const person = persons.find(note => {
//     console.log(note.id, typeof note.id, id, typeof id, note.id === id)
//     return note.id === id
//   })
//   if (person) {
//     response.json(person)
//   } else {
//     response.statusMessage = "Current id of notes does not exist";
//     response.status(404).end()
//   }
// })

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/api/persons', (request, response) => { 
  Person.find({}).then(persons=>{
    response.json(persons)
  })
})

app.get('/info', (request, response) => { 
  response.send(info())
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)
  response.status(204).end()
})

// const generateId = () => {
//   const id = parseInt(Math.random()*1000000)
//   const personId = persons.find(x=>x.id===id)
//   if(personId){
//     return generateId()
//   }
//    return id  
// }

app.post('/api/persons', (request, response) => {
  const body = request.body
  const checkBody=Person.find({name:body.name})

  if (!body.name||!body.number) {
    return response.status(400).json({ 
      error: !body.name?'name missing':`number missing` 
    })
  }
  else if(checkBody)
    if(checkBody.number===body.number)
      return response.status(400).json({ 
        error: `${body.name} name must be unique`
      })
    else
        console.log("happy new years")
  const person = new Person({
    name: body.name,
    number: body.number,   
  })

  // persons = persons.concat(person)
  person.save().then(savedPerson=>{
    response.json(savedPerson)
    mongoose.connection.close()
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})