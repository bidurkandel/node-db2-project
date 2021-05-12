// DO YOUR MAGIC
const express = require('express');
const Cars = require('./cars-model');
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require('./cars-middleware.js');
const { json } = require('express');

const router = express.Router()

router.get('/', (req,res, next)=>{
    Cars.getAll()
        .then(cars=>{   
            res.status(200).json(cars)
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) =>{
    console.log(req.carId)
    res.status(200).json(req.carId)
      
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next)=>{
    Cars.create(req.body)
        .then(car=>{
            res.status(201).json(car)
        })
        .catch(next)
})

router.put('/:id', checkCarId, checkCarPayload, (req, res, next)=>{
    const {id} =req.params
    const updatedCar = req.body
    Cars.update(id, updatedCar)
     .then(car=>{
         res.status(200).json(car)
     })
     .catch(next)
})

router.delete('/:id', checkCarId, (req, res, next)=>{
    const {id} = req.params
    Cars.remove(id)
     .then(()=>{
         res.status(200).json({message: 'This car is removed'})
     })
     .catch(next)
})




module.exports = router