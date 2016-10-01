//importar modulos
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
//llmar instancia de express
//permite ahorrarnos la parte de configuración del servidor
var app = express();
//asiganar puerto
app.listen(4242,function(){
	console.log("Puerto 4242 escuchando");
});

//express que use el bodyparser
//asignar la ruta donde debe estar el bodyparser
app.use(bodyParser.urlencoded({estend: true}));
//en todas las direcciones invoque el metodo rut
app.use('/',routes);
