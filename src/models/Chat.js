const mongoose = require('mongoose');
const {Schema} = mongoose;

const tablaChat = new Schema({
	usuario: String,
	msg: String,
	creacion: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Chat', tablaChat);

//cmd poner mongod
//en otro escribir mongo
//show dbs