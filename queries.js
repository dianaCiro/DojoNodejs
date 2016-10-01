//archivo donde se almacenarán todos los métodos para la base de datos

//importar modulo promise
var promise=require('bluebird');//controlar promesas
//variable de opcioens que servirá para la base de datos
var options={
	promiseLib: promise
};
//cargar modelo pg promise
var pgp = require('pg-promise')(options);
//string de conexion
var connectionString='postgres://zufrouyq:JHYx6oieNjuQ6d0OQswrBLr6yofs9EXA@elmer.db.elephantsql.com:5432/zufrouyq';
//cargar bd 
var db = pgp(connectionString);

//metodos 
//obtener todos lso restauratnes
function getAllRestaurants(req, res, next){
	db.any('select *from restaurant')
	.then(function(data){
		res.status(200)//mandar esa informacion en archivo json
		.json({
			status: 'Exitoso',
			data: data,
			message: 'Recuperados todos los restaurantes'
		});

	})
	.catch(function(err){
		return next(err);
	});

};
//tener llos restarutanes por nombre
function getRestaurantByName(req, res, next){
	//nombre del restaurante
	var name = req.params.name;//ubicacion del paratmetro
	db.any('select * from restaurant where name = $1', name)
	.then(function(data){
	res.status(200)
	.json({
		status: 'Exitoso',
		data: data,
		message: 'Recuperado restaurante por nombre'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function createRestaurant(req, res, next){
	
	db.any('insert into restaurant(name,city,address,phone)' + ' values($1,$2,$3,$4)',
		[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone)])
	.then(function(data){
	res.status(200)
	.json({
		status: 'Exitoso',
		data: data,
		message: 'Insertadao un restaurante'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function removeRestaurant(req, res, next){

	var restaurantId = parseInt(req.params.id);//ubicacion del paratmetro
	db.result('delete  from restaurant where id = $1', restaurantId)
	.then(function(){
	res.status(200)
	.json({
		status: 'Exitoso',
		data: data,
		message: 'Removido un restaurante'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function updateRestaurant(req, res, next){
	db.none('update resaturant set name=$1, city=$2, address=$3,phone=$4 where id=$5'),
	[req.body.name, req.body.city, req.body.address, parseInt(req.params.id)]
	.then(function(){
	res.status(200)
	.json({
		status: 'Exitoso',
		message: 'restaurante actualizado'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

module.exports = {
	getAllRestaurants : getAllRestaurants,
	getRestaurantByName : getRestaurantByName,
	createRestaurant : createRestaurant,
	removeRestaurant : removeRestaurant,
	updateRestaurant : updateRestaurant
}