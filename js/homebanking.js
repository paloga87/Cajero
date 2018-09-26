//Declaración de variables
var nombreUsuario;
var saldoCuenta;
var limiteExtraccion = 400;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
	iniciarSesion();
	cargarNombreEnPantalla();
	actualizarSaldoEnPantalla();
	actualizarLimiteEnPantalla();
}


//ALERTAS
function saldoDeCuenta(){
	if (saldoCuenta > 0){
		return true;
	}else{
		alert('No tienes saldo suficiente para hacer esta transacción');
	}
}

function valorNulo(valor){
	if( isNaN(valor)) {
		alert('Operacion Cancelada');
	}else{
		return true;	
	}
}

function numeroNegativo(valor){
	if(valor > 0){
		return true;		
	}else{
		alert('El valor ingresado no es valido, verifica tu monto!');
	}
}

function billetesDeCien(valor){
 	if  (valor % 100 === 0){
 		return true;
 	}else{	
		alert('Solo puedes retirar billetes de 100, verifica tu monto!');
	}
}

function saldoVsValor(valor){
	if (valor < saldoCuenta){
		return true;
	}else{
		alert('No tienes saldo suficiente para hacer esta transacción');
	}
}

function limiteDeExtraccion(valor){
	if (valor <= limiteExtraccion ){
		return true;
	}else{
		alert('No puedes realizar el retiro por que excede el limite de extraccion, intenta de nuevo');
	}
}

//FUNCIONES PRINCIPALES
function cambiarLimiteDeExtraccion() {
	var nuevoLimite = parseInt(prompt("Ingresa el valor limite que quieres para retiros"));
	if(valorNulo(nuevoLimite)) {		
		if (numeroNegativo(nuevoLimite)) {
			limiteExtraccion = nuevoLimite;
			actualizarLimiteEnPantalla();
			alert('Tu nuevo limite para retiros es: ' +  nuevoLimite);
		}
	}
}

function extraerDinero() {
	if (saldoDeCuenta()){
		var retiro = parseInt(prompt("Cuanto dinero vas a retirar?"));
		if (valorNulo(retiro)){
			if (numeroNegativo(retiro)) {
				if (limiteDeExtraccion(retiro)) {
					if (saldoVsValor(retiro)) {
						if (billetesDeCien(retiro)) {
							var saldoAnterior = saldoCuenta;
							saldoCuenta = saldoAnterior - retiro;
							actualizarSaldoEnPantalla();
							alert('Has retirado: $' + retiro + '\nTu saldo anterior: $' +  saldoAnterior + '\nTu nuevo saldo: $' + saldoCuenta);
						}
					}
				}
			}
		}
	}
}	

function depositarDinero() {
	var deposito = parseInt(prompt("Cuanto dinero vas a depocitar?"));
	if (valorNulo(deposito)){
		if (numeroNegativo(deposito)){
			var saldoAnterior = saldoCuenta;
			saldoCuenta = saldoAnterior + deposito;
			actualizarSaldoEnPantalla();
			alert('Has depositado: $' + deposito + '\nTu saldo anterior: $' +  saldoAnterior + '\nTu nuevo saldo: $' + saldoCuenta);
		}
	}
}

function pagarServicio() {
	var agua = 350;
	var telefono = 425;
	var luz = 210;
	var internet = 570;
	var nombre;
	var servicio = parseInt(prompt("Ingresa el codigo del servicio que deseas pagar: \n 1. Agua \n 2. Teléfono \n 3. Luz \n 4. Internet "));
	
	if (valorNulo(servicio)){
		switch(servicio){
			case 1:
			servicio = agua;
			nombre = 'Agua';
			break;
			case 2:
			servicio = telefono;
			nombre = 'Teléfono';
			break;
			case 3:
			servicio = luz;
			nombre = 'Luz';
			break;
			case 4:
			servicio = internet;
			nombre = 'Internet';
			break;
			default:
			alert('El codigo del servicio esta errado, vuelve a intentar!');
			servicio = 0;
		}
		if (servicio !== 0) {
			if (saldoVsValor(servicio)){
				var saldoAnterior = saldoCuenta;
				saldoCuenta = saldoAnterior - servicio;
				actualizarSaldoEnPantalla();
				alert('Has realizado el pago de tu recibo de: ' + nombre  +'\nTu saldo anterior: $' + saldoAnterior  +  '\nValor recibo: $' + servicio + '\nTu nuevo saldo: $' + saldoCuenta);
			}
		}
	}
}


function transferirDinero() {
	var titularCuenta;
	var numeroCuenta;

	if (saldoDeCuenta()) {
		var valorTransferencia = parseInt(prompt("Digita el valor a transferir"));
		if(valorNulo(valorTransferencia)){
			if (numeroNegativo(valorTransferencia)) {
				if (saldoVsValor(valorTransferencia)) {
					
					var numeroCuenta = prompt("Digita el numero de cuenta al que deseas transferir \n 0987 Amor \n 9876 Hija \n 3452 Padres \n 0192 Hermana ");

					if(valorNulo(numeroCuenta)){
						switch(numeroCuenta){
							case '0987':
							titularCuenta = 'Esposo';
							break;
							case '9876':
							titularCuenta = 'Mamá';
							break;
							case '3452':
							titularCuenta = 'Papá';
							break;
							case '0192':
							titularCuenta = 'Hermano';
							break;
							default:
							alert('El numero de cuenta esta errado, vuelve a intentar!');
							numeroCuenta = 0;
						}
						
						if (numeroCuenta !== 0) {
							var saldoAnterior = saldoCuenta;
							saldoCuenta = saldoAnterior - valorTransferencia;
							actualizarSaldoEnPantalla();
							alert('transferencia aprobada a ' + titularCuenta + ', con numero de cuenta ' + numeroCuenta + ' por un valor de $' + valorTransferencia + '\nTu saldo anterior: $' + saldoAnterior  +  '\nValor transferido: $' + valorTransferencia + '\nTu nuevo saldo: $' + saldoCuenta);
						}
					}
				}
			}
		}
	}
}	


function iniciarSesion() {
	nombreUsuario = prompt("Ingresa tu Nombre de Usuario");
	
	switch(nombreUsuario){
		case 'Pepa':
			claveUsuario();
			if (claveUsuario === 1011){
				nombreUsuario = ' Pepita Perez';
				saldoCuenta = 600000;
			}else{
				errorLogin();
			}
		break;
		case 'Pepe':
			claveUsuario();
			if (claveUsuario === 3009){
				nombreUsuario = ' Pepito Mendieta';
				saldoCuenta = 550000;
			}else {
				errorLogin();
			}
		break;
		case 'Juan':
			claveUsuario();
			if (claveUsuario === 1606){
				nombreUsuario = ' Juanito Perez';
				saldoCuenta = 500000;
			} else {
				errorLogin();
			}
		break;
		default:
			alert('El usuario no existe, verifica la informacion y vuleve a intentarlo');
			saldoCuenta = 0;
			window.location.href = "index.html";
	}
	cargarNombreEnPantalla();

	function errorLogin(){
		alert('La clave esta errada, verifica la informacion y vuleve a intentarlo');
		window.location.href = "index.html";
	}
	function claveUsuario(){
		claveUsuario = parseInt(prompt("Ingresa tu Clave"));
	}
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
	document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
	document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
	document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}