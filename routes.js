var express = require('express');
var router = express.Router();
var db= require('./queries');

//asignar a cada ruta los metodos de la bd
router.get('/api/restaurants',db.getAllRestaurants);
router.get('/api/restaurants/:name',db.getRestaurantByName);
router.post('/api/restaurants', db.createRestaurant);
router.delete('/api/restaurants/:id',db.removeRestaurant);
router.put('/api/restaurants/:id', db.updateRestaurant);
//exportar modulo par aqu elo pueda leer
module.exports=router;

	