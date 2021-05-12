const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  Cars.getById(id)
    .then(carId=>{
      if(!carId){
        res.status(400).json({message: `car with id ${id} is not found`})
      } else {
        req.carId = carId
        next()
      }
    })
    .catch(err=>{
      next(err)
    })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.vin){
    res.status(400).json({message: `vin is missing`})
  } else if (!req.body.make){
    res.status(400).json({message: `make is missing`})
  } else if(!req.body.model){
    res.status(400).json({message: `model is missing`})
  } else if(!req.body.mileage){
    res.status(400).json({message: `mileage is missing`})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin
  if(!vinValidator.validate(vin)){
    res.status(400).json({message: `vin ${vin} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin
  const cars = await Cars.getAll()
  const checkVin = cars.filter(car=> car.vin === req.body.vin);
  if(checkVin.length !== 0){
    res.status(400).json({message: `vin ${vin} already exists`})
  } else {
    next()
  }



}

module.exports={
  checkCarId,
  checkCarPayload, 
  checkVinNumberUnique,
  checkVinNumberValid
}
