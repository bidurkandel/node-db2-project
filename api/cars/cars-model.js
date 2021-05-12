const { where } = require('./../../data/db-config.js')
const db = require('./../../data/db-config.js')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where('id', id).first()
}

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db('cars').insert(car, ['id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission'])
  return getById(id)
} 

const update = async (id, car) =>{
  await db('cars').where({id}).update(car)
  return getById(id)
}

const remove = async (id)=>{
  const toBeRemoved = getById(id)
  await db('cars').where({id}).del()
  return toBeRemoved
}

module.exports={
  getAll,
  getById, 
  create,
  update,
  remove
}