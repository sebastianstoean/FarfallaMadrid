console.log(screen.height, screen.width);
let language = "es";
var e = new Event("look", {"cancelable":true})
let idiomas_on = 0

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){
        /* Do nothing */
    }
}

function languageChange(lang1, lang2) {
	var elements = document.getElementsByClassName(lang2);
	for(var i=0; i<elements.length; i++){
		elements[i].style.display = "block";
	}

  elements = document.getElementsByClassName(lang1);
	for(var i=0; i<elements.length; i++){
		elements[i].style.display = "none";
	}

  return lang2;
}

function hide_unhide_dropdown(){
  var idiomas = $("#lista-idiomas")
  if (idiomas.is(":hidden") ) {
    idiomas.slideDown("slow");
    $("#foto-idioma").attr("src", "/static/images/world-map.png");
    idiomas_on = 1
  } else {
    idiomas.slideUp("slow");
    $("#foto-idioma").attr("src", "/static/images/world-map-2.png");
    idiomas_on = 0
  }
}

$(document).ready(function() {


  $("#espanol-boton").click(function(){
    if(language !== "es") {
      language = languageChange(language, "es");
      hide_unhide_dropdown()
      $("#reservar-boton").removeClass("boton-nav-grande")
    }
  })

  $("#ingles-boton").click(function(){
    if(language !== "en") {
      language = languageChange(language, "en");
      hide_unhide_dropdown()
      $("#reservar-boton").addClass("boton-nav-grande")
    }
  })

  $("#rumano-boton").click(function(){
    if(language !== "ro") {
      language = languageChange(language, "ro");
      hide_unhide_dropdown()
      $("#reservar-boton").removeClass("boton-nav-grande")
    }
  })

  $("#boton-cambio-idioma").click(function(){
    hide_unhide_dropdown()
  })

  $("#carta-sin-boton").click(function() {
    goToSinGluten()
  });
  $("#carta-boton").click(function() {
    goToCarta()
  });
})

function goToReservar(){
	var reservas = document.getElementById("reserva-sect");
	reservas.scrollIntoView({behavior: 'smooth' });
}

function goToCarta(){
	window.location.href = "../templates/cartas.html";
}

function goToSinGluten() {
	window.location.href = "../templates/cartasing.html";
}

function goToEntrantes() {
  window.location.href = "../templates/cartas.html";
  window.addEventListener("load", function(){
    console.log("a")
    $("#boton-entrantes").click()
  })
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

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function doAjax() {
// 	var jqxhr = $.ajax({
// 		url: "../static/mail_handler.php",
// 		type: "POST",
// 		mode: "no-cors",
// 		data: {nombre: nombreForm.value,
// 					tel: telForm.value,
// 					fecha: fechaForm.value,
// 					hora: horaForm.value,
// 					personas: personasForm.value,
// 		},
// 		success: function(){
// 			alert("successs");
// 		}
// 	})
// }
function sendMessage(message) {
	$.ajax({
    url:'https://api.telegram.org/bot1832303215:AAFnpjGuRR6mBscYV539yka1LIN8xCjJ25s/sendMessage',
    method:'POST',
    data:{chat_id:'985188643',text:message},
    success:function(){
  	   alert('your message has been sent!');
     }
  });
}

function noneFlex(a, b) {
	document.getElementById(a+"-"+language).style.display = "flex";
	document.getElementById(b+"-"+language).style.display = "none";
}

function noneNone(a, b){
  document.getElementById(a+"-"+language).style.display = "none";
  document.getElementById(b+"-"+language).style.display = "none";
	return 1;
}

var today = new Date().toISOString().split('T')[0];

$("#submit1").click(function(e) {
	e.preventDefault();
  var nombreForm = document.getElementById("nombre1");
  var telForm = document.getElementById("tel1");
  var fechaForm = document.getElementById("fecha1");
  var horaForm = document.getElementById("hora1");
  var personasForm = document.getElementById("persona1");
  var politicaForm = document.getElementById("checkbox");

  var $form = $('#formreservar');

  let reName = new RegExp("^[a-zA-Z ]{2,30}$");
  let reTel = new RegExp("^[0-9]{0,18}$");
  var arrayMatches = nombreForm.value.match(reName);

  var nombre = 0;
  var tel = 0;
  var fecha = 0;
  var hora = 0;
  var check = 0;

  if (nombreForm.value == "") {
		noneFlex("no-nombre", "mal-nombre");
  }
  else if (arrayMatches == null) {
		noneFlex("mal-nombre", "no-nombre");
  }
  else {
		nombre = noneNone("no-nombre", "mal-nombre");
  }

  if (telForm.value == "") {
		noneFlex("no-tel", "mal-tel");
  }
  else if (!telForm.value.match(reTel)) {
		noneFlex("mal-tel", "no-tel");
  }
  else {
		tel = noneNone("no-tel", "mal-tel");
  }

  if (fechaForm.value == ""){
    $("#no-fecha-"+language).attr("display", "flex");
  }
  else {
    $("#no-fecha-"+language).attr("display", "none");
    fecha = 1;

    if (horaForm.value == ""){
			noneFlex("no-hora", "mal-hora");
    }
    else {
      var horaComprobar = horaForm.value[0];
      horaComprobar += horaForm.value[1];
      var min = horaForm.value[3];
      min += horaForm.value[4];
      var dia = fechaForm.valueAsDate.toString()[0];
      dia += fechaForm.valueAsDate.toString()[1];
      dia += fechaForm.valueAsDate.toString()[2];
      var horaNum = Number(horaComprobar);
      var minNum = Number(min);
      if (dia == "Fri" || dia == "Sat" || dia == "Sun") {
        if ((horaComprobar > 1 && horaComprobar < 13 || horaComprobar == 1 && min > 45)) {
				 	noneFlex("mal-hora", "no-hora");
        }
        else {
					hora = noneNone("no-hora", "mal-hora");
        }
      }
      else {
        if ((horaNum > 1 && horaNum < 13) || (horaNum == 1 && minNum > 45) ||
        (horaNum > 15 && horaNum < 19) || (horaNum == 15 && minNum > 45) ||
        (horaNum == 19 && minNum < 30) ) {
					noneFlex("mal-hora", "no-hora");
        }
        else {
          hora = noneNone("no-hora", "mal-hora");
        }
      }
    }
  }

  if (!politicaForm.checked) {
    $("#no-politica-"+language).attr("display", "flex");
  }
  else {
    $("#no-politica-"+language).attr("display","none");
    check = 1;
  }

  if (nombre == 1 && tel == 1 && fecha == 1 && hora == 1 && check == 1) {
    var message = 'Hay una reserva para '+personasForm.value+' personas el día '
    +fechaForm.value+' a las '+horaForm.value+' \nA nombre de '+nombreForm.value+' con teléfono '+telForm.value;
    sendMessage(message);
  }
})
