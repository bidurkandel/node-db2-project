const express = require('express')

const CarsRouter = require('./cars/cars-router')

const server = express()

server.use(express.json())
// DO YOUR MAGIC
server.use("/api/cars", CarsRouter)


server.use((err, req, res, next) => { // eslint-disable-line
    // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
    res.status(500).json({
      message: 'something went wrong inside the accounts router',
      errMessage: err.message,
    })
  })

module.exports = server
