// STRETCH
exports.seed = function(knex){
    return knex('cars').truncate()
     .then(function (){
         return knex('cars').insert([
            {vin: '1GNSKCKC2FR105789', make:'Acura', model: 'tsx', mileage: 100101, title: 'clean', transmission: 'auto'},
            {vin: '1J4FY19P4SP214406', make:'Acura', model: 'rdx', mileage: 100443, title: 'clean', transmission: 'auto'} 
         ])
     })
}