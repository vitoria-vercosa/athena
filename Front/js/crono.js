var intervalo;

function tempo(op) {
	if (op == 1) {
		document.getElementById('comeca').innerHTML = "<button class='contact100-form-btn' onclick='parar()'> PARAR </button>";
	}
	var s = 1;
	var m = 0;
	var h = 0;
	intervalo = window.setInterval(function() {
		if (s == 60) { m++; s = 0; }
		if (m == 60) { h++; s = 0; m = 0; }
		if (h < 10) document.getElementById("hora").value = "0" + h + "h"; else document.getElementById("hora").value = h + "h";
		if (s < 10) document.getElementById("segundo").value = "0" + s + "s"; else document.getElementById("segundo").value = s + "s";
		if (m < 10) document.getElementById("minuto").value = "0" + m + "m"; else document.getElementById("minuto").value = m + "m";		
		s++;
	},1000);
}

function parar() {
	window.clearInterval(intervalo);
	//document.getElementById('parar').style.display = "none";
	//document.getElementById('comeca').style.display = "block";
}

//window.onload=tempo;
