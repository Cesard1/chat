//importacion de librerias
const http = require('http');
const path = require('path');
const express = require('express');

//creacion de variables
const app = express();
const server = http.createServer(app);


const socketio = require('socket.io')(server);

//llamar a mongoose

const mongoose = require('mongoose');

//configuraciones de la variable app

app.set('port', process.env.PORT || 5000);

const io = socketio.listen(server);

//aqui se hace la conexion a base de datos mongodb

/*mongoose.connect('mongodb://127.0.0.1/chat-database')
	.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));*/
	mongoose.connect('mongodb+srv://cesar:cesar@cluster0.h6fvy.mongodb.net/chat-database?retryWrites=true&w=majority', {
		useNewUrlParse: true,
		useUnifiedTopology: true	
	})
.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));

//llamada a sockets, tambien se puede usar el export
require('./sockets')(io);

//entregando archivos estadisticos
app.use(express.static(path.join(__dirname,'public')));

//iniciando el servidor
server.listen(app.get('port'),()=> {
console.log("escuchando en el puerto", app.get('port'))
});

/*
io.on('connection', socket => {
	console.log('nuevo usuario conectado')
}); */
