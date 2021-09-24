console.log(screen.height, screen.width);
var lang;

function hideLanguage() {
	document.getElementById("idiomas").style.display = "none";
	var elements = document.getElementsByClassName("heidi");

	while (elements.length > 0) {
		elements[0].classList.remove("heidi");
	}
}

function languageChange(lang) {
	var elements = document.getElementsByClassName(lang);
	for(var i=0; i<elements.length; i++){
		elements[i].style.display = "block";
	}

	hideLanguage();

}

function goToReservar(){
	var reservas = document.getElementById("reserva-tit");
	reservas.scrollIntoView({behavior: 'smooth' });
}

function goToCarta(){
	window.location.href = "../templates/cartas.html";
}

function goToSinGluten() {
	window.location.href = "singluten.html";
}

function goToEntrantes() {
	window.location.href = "carta.html";
	var entrantes = document.getElementById("Entrantes");
	entrantes.scrollIntoView({behavior: 'smooth' });
}

function goToPastas() {
	window.location.href = "carta.html";
}

function goToPizzas() {
	window.location.href = "carta.html";
}

function goToCarnes() {
	window.location.href = "carta.html";
}

function goToPostres() {
	window.location.href = "carta.html";
}

function doAjax() {
	var jqxhr = $.ajax({
		url: "../static/mail_handler.php",
		type: "POST",
		mode: "no-cors",
		data: {nombre: nombreForm.value,
					tel: telForm.value,
					fecha: fechaForm.value,
					hora: horaForm.value,
					personas: personasForm.value,
		},
		success: function(){
			alert("successs");
		}
	})
}

function noneFlex(a, b) {
	document.getElementById(a).style.display = "flex";
	document.getElementById(b).style.display = "none";
}

function noneNone(a, b, c){
  document.getElementById(a).style.display = "none";
  document.getElementById(b).style.display = "none";
	c = 1;
}

var today = new Date().toISOString().split('T')[0];
document.getElementsByName("fecha")[0].setAttribute('min', today);

var e = new Event("look", {"cancelable":true})
$("#submit1").click(function(e) {
	e.preventDefault();
  var nombreForm = (document.getElementById("nombre1"));
  var telForm = (document.getElementById("tel1"));
  var fechaForm = (document.getElementById("fecha1"));
  var horaForm = (document.getElementById("hora1"));
  var personasForm = (document.getElementById("persona1"));
  var politicaForm = (document.getElementById("checkbox"));

  var $form = document.getElementById('formreservar');

  let reName = new RegExp("^[a-zA-Z ]{2,30}$");
  let reTel = new RegExp("^[0-9]{0,18}$");
  var nombre = 0;
  var tel = 0;
  var fecha = 0;
  var hora = 0;
  var check = 0;

	var arrayMatches = nombreForm.value.match(reName);
  if (nombreForm.value == "") {
		noneFlex("no-nombre", "mal-nombre");
  }
  else if (arrayMatches == null) {
		noneFlex("mal-nombre", "no-nombre");
  }
  else {
		noneNone("no-nombre", "mal-nombre", nombre);
  }

  if (telForm.value == "") {
		noneFlex("no-tel", "mal-tel");
  }
  else if (!telForm.value.match(reTel)) {
		noneFlex("mal-tel", "no-tel");
  }
  else {
		noneNone("no-tel", "mal-tel", tel);
  }

  if (fechaForm.value == ""){
    document.getElementById("no-fecha").style.display = "flex";
  }
  else {
    document.getElementById("no-fecha").style.display = "none";
    fecha = 1;

    if (horaForm.value == ""){
			noneFlex("no-hora", "mal-hora");
    }
    else {
      var hora = horaForm.value[0];
      hora += horaForm.value[1];
      var min = horaForm.value[3];
      min += horaForm.value[4];
      var dia = fechaForm.valueAsDate.toString()[0];
      dia += fechaForm.valueAsDate.toString()[1];
      dia += fechaForm.valueAsDate.toString()[2];
      var horaNum = Number(hora);
      var minNum = Number(min);
      if (dia == "Fri" || dia == "Sat" || dia == "Sun") {
        if ((hora > 1 && hora < 13 || hora == 1 && min > 45)) {
				 	noneFlex("mal-hora", "no-hora");
        }
        else {
					noneNone("no-hora", "mal-hora", hora);
        }
      }
      else {
        if ((horaNum > 1 && horaNum < 13) || (horaNum == 1 && minNum > 45) ||
        (horaNum > 15 && horaNum < 19) || (horaNum == 15 && minNum > 45) ||
        (horaNum == 19 && minNum < 30) ) {
					noneFlex("mal-hora", "no-hora");
        }
        else {
          noneNone("no-hora", "mal-hora", hora);
        }
      }
    }
  }

  if (!politicaForm.checked) {
    document.getElementById("no-politica").style.display = "flex";
  }
  else {
    document.getElementById("no-politica").style.display = "none";
    check = 1;
  }

  if (nombre == 1 && tel == 1 && fecha == 1 && hora == 1 && check == 1) {
    doAjax();
  }
})
