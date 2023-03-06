const cors = require('cors')
const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const Person = require('./models/personBackend')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  return response.status(500).json({ error: 'server error' })
}

const info = () => {
  return (
    `<h1>phone length info ${persons.length}</h1>
     <p>first people name is ${persons[0].name}</p>
     <p>${new Date().toString()}</p>`
  )
}

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  response.send(info())
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id).then(result => {
    response.status(204).end()
    console.log(result)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  const id = request.params.id
  const newPerson = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, newPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const checkBody = Person.find({ name: body.name })

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: !body.name ? 'name missing' : 'number missing'
    })
  } else if (checkBody) {
    if (checkBody.number === body.number) {
      return response.status(400).json({
        error: `${body.name} name must be unique`
      })
    } else { console.log('happy new years') }
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
