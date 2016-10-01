var express = require('express');
var router = express.Router();
var db= require('./queries');

//asignar a cada ruta los metodos de la bd
router.get('/api/menus',db.getAllMenu);
router.post('/api/menus', db.createMenu);
router.delete('/api/menus/:id',db.removeMenu);
router.put('/api/menus/:id', db.updateMenu);
router.get('/api/menuPorRestaurante',db.findMenuByRestaurant)
//exportar modulo par aqu elo pueda leer
module.exports=router;

