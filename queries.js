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
function getAllMenu(req, res, next){
	db.any('select *from menu')
	.then(function(data){
		res.status(200)//mandar esa informacion en archivo json
		.json({
			status: 'Exitoso',
			data: data,
			message: 'Recuperados todos los menus'
		});

	})
	.catch(function(err){
		return next(err);
	});

};


function createMenu(req, res, next){
	
	db.any('insert into menu(id,name,description,price,restaurant)' + ' values($1,$2,$3,$4,$5)',
		[parseInt(req.body.id), req.body.name, req.body.description, parseInt(req.body.price),parseInt(req.body.restaurant)])
	.then(function(data){
	res.status(200)
	.json({
		status: 'Exitoso',
		data: data,
		message: 'Insertado un menu'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function removeMenu(req, res, next){

	var menuId = parseInt(req.params.id);//ubicacion del paratmetro
	db.result('delete  from menu where id = $1', menuId)
	.then(function(){
	res.status(200)
	.json({
		status: 'Exitoso',
		data: data,
		message: 'Removido un menu'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function updateMenu(req, res, next){
	db.none('update menu set id=$1, name=$2, description=$3,price=$4,restaurant=$5 where id=$5'),
	[parseInt(req.body.id), req.body.name, req.body.description, parseInt(req.body.price),parseInt(req.body.restaurant)]
	.then(function(){
	res.status(200)
	.json({
		status: 'Exitoso',
		message: 'Menu actualizado'
	});
	})
	.catch(function(err){
		return next(err);
		});

};


function findMenuByRestaurant(req, res, next){
	//nombre del restaurante
	var name = req.params.name;//ubicacion del paratmetro
	db.any('select * menu  where restaurant=$1',parseInt(req.params.id))
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
module.exports = {
	getAllMenu : getAllMenu,
	createMenu : createMenu,
	removeMenu : removeMenu,
	updateMenu : updateMenu,
	findMenuByRestaurant : findMenuByRestaurant
}