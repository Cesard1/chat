const Chat = require('./models/Chat')
module.exports = function(io){
	let users ={}
	//let users=[];
	io.on('connection', async socket=>{
		console.log('Nuevo usuario conectado');
		let mensajes = await Chat.find({});
		socket.emit('mandaoldmsg', mensajes);

		socket.on('new user',(data,cb)=>{
			console.log(data);
			//if(users.indexOf(data) != -1){}
			if(data in users){
				cb(false);
			}else{cb(true);
				socket.usnam = data;
				users[socket.usnam] = socket;
				//users.push(socket.usnam);
				actualizaUsuarios();
			}
		});

		socket.on('send message', async (data, cb) => {
			var msg = data.trim();
			if (msg.substr(0,3) ==='/w ') {
				msg = msg.substr(3);
				const index = msg.indexOf(' ');
				if(index !== -1){
					var name = msg.substring(0, index);
					var mesage = msg.substring(index + 1);
					if(name in users){
						users[name].emit('whisper',{
							mesage,
							nick: socket.usnam
						});
					}else{
						cb('Error, por favor ingresa tu nombre de usuario');
					}
				}else{
					cb('Por favor ingresa tu mensaje');
				}
			}else{
				var nuevoMsg = new Chat({
					usuario : socket.usnam,
					msg: msg
				})
				await nuevoMsg.save();

			io.sockets.emit('new message',{
				us: socket.usnam,
				msg 
			});
	}	
	});

		socket.on('disconnect', data=>{
			if(!socket.usnam) return;
			delete users[socket.usnam];
			//users.splice(users.indexOf(socket.usnam), 1);
			actualizaUsuarios();
		});

		function actualizaUsuarios(){
			io.sockets.emit('userss', Object.keys(users));
		}

	});
}

//primer cambio debemos hacer que se guarden los mensajes privados
//seleccionar un usuario para mandar un mensaje
//en un cmd nuevo mongo
//en otro mongod