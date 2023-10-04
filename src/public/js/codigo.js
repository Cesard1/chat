$(function(){

	const socket = io();

	//obteniendo los elementos del dom

	const formulario = $('#formulario-mensajes');
	const mensaje = $('#mensaje');
	const cuerpoChat = $('#cuerpoChat');

	//obteniendo elementos del dom login

	const loginform = $('#loginform');
	const usuario = $('#usuario');
	const loginError = $('#loginError');
	const usuarios = $('#usuarios');

	//Eventos del login
	loginform.submit(e =>{
		e.preventDefault();
		socket.emit('new user', usuario.val(), data=>{
			if(data){
				$('#contentlogin').hide();
				$('#contenedor').show();
				usuario.append(usuario);
			}else{
				loginError.html('<div class="alert-danger">este usuario ya existe</div>');
			}
		})
		usuario.val('');
	});



//Eventos

formulario.submit(e =>{
	e.preventDefault();
	socket.emit('send message', mensaje.val(), data =>{
		cuerpoChat.append('<p class="error">'+ data+'</p>');
	});
	mensaje.val('');
});

socket.on('new message', function(data) {
	cuerpoChat.append('<b>'+data.us+'</b>'+': '+data.msg+'<br>');
});


socket.on('userss', data => {
	let html ='';
	for (let i = 0; i < data.length; i++) {
		html += '<i class="fas fa-user"></i>'+ data[i]+'<br>';
	}
	usuarios.html(html);
});

socket.on('whisper', data =>{
	cuerpoChat.append('<b>'+data.nick+'</b>'+': '+'<p class="whisper">'+ data.mesage + '</p><br></br>')
});

socket.on('mandaoldmsg', data =>{
	for (var i = 0; i < data.length; i++) {
		//cuerpoChat.append('<b>'+data.usuario+'</b>'+': '+'<p class="whisper">'+ data.msg +'</p><br>')

		muestraMsg(data[i]);
	}
});

function muestraMsg(data){
	cuerpoChat.append('<b>'+data.usuario+'</b>'+': '+'<p class="whisper">'+ data.msg +'</p><br>');
}

})

//juancjidk@gmail.com 5571983411// 5528936809e@gmail.com  5524221381 
