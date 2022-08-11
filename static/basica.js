console.log(screen.height, screen.width);
let language = "es";
var e = new Event("look", {"cancelable":true})
let idiomas_on = 0
let lookat = ""
let cookie = "0"
let publicKey = "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHVeaoWG8j2U2sp3azfqtLQ54P6R+w2dBZ/3RIll8srgOhPMwqSkTVIKzaM79hrtzZEybLshiIyN37rlae0lSoWaLlsZWCq6wQwiBARJabLHLwh0hIt2q1ku5+WmvicwzSVA3pDagwFq4JewyqqbZJ+ksmD1mH7LUGwV6tbmyaKPAgMBAAE="

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

  if (lang2 === "es") {
    $("#boton-cambio-idioma").html("English")
  }
  else if (lang2 === "en") {
    $("#boton-cambio-idioma").html("Español")
  }

  return lang2;
}

// function hide_unhide_dropdown(){
//   var idiomas = $("#lista-idiomas")
//   if (idiomas.is(":hidden") ) {
//     idiomas.slideDown("slow");
//     $("#foto-idioma").attr("src", "/static/images/world-map.png");
//     idiomas_on = 1
//   } else {
//     idiomas.slideUp("slow");
//     $("#foto-idioma").attr("src", "/static/images/world-map-2.png");
//     idiomas_on = 0
//   }
// }

$(document).ready(function() {
  $("#accept-cookie").click(function(){
    $(this).parent().attr("display", "none")
  })

  $("#boton-cambio-idioma").click(function(){
    if (language === "es") {
      new_language = "en"
    }
    else if (language === "en") {
      new_language = "es"
    }

    language = languageChange(language, new_language);
    // hide_unhide_dropdown()
  })

  $("#boton-nav-sing").click(function() {
    setCookie("gluten", "1", 10)
    goToCarta()
  });
  $("#boton-nav-carta").click(function() {
    setCookie("gluten", "0", 10)
    goToCarta()
  });

  $("#boton-nav-sing2").click(function() {
    setCookie("gluten", "1", 10)
    goToCarta()
  });
  $("#boton-nav-carta2").click(function() {
    setCookie("gluten", "0", 10)
    goToCarta()
  });

  $("#reservar-boton").click(function() {
    	var reservas = document.getElementById("reserva-sect");
    	reservas.scrollIntoView({behavior: 'smooth' });
  })

  $(".popup-x").click(function(){
    $(this).closest(".popup").hide()
  })

  $(".cookie-accept").click(function(){
    $(this).closest(".cookie").hide()
    setCookie("accepted", "1", 730)
  })

  cookie = getCookie("accepted")
  if (cookie === "1") {
    $(".cookie").hide()
  } else {
    $(".cookie").css("display", "flex")
  }
})
function goToCarta(){
	window.location.href = "../templates/cartas.html";
}

function goToEntrantes() {
  window.location.href = "../templates/cartas.html";
  lookat = "boton-entrantes"
  setCookie("lookat", lookat, 1)
}

function goToPastas() {
	window.location.href = "../templates/cartas.html";
  lookat = "boton-veg"
  setCookie("lookat", lookat, 1)
}

function goToPizzas() {
	window.location.href = "../templates/cartas.html";
  lookat = "boton-pizz"
  setCookie("lookat", lookat, 1)
}

function goToCarnes() {
	window.location.href = "../templates/cartas.html";
  lookat = "boton-carnes"
  setCookie("lookat", lookat, 1)
}

function goToPostres() {
	window.location.href = "../templates/cartas.html";
  lookat = "boton-postres"
  setCookie("lookat", lookat, 1)
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";SameSite=Lax" + ";path=/";
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
function sendMessage(personas, fecha, hora, nombre, tel) {
  try  {
    let RSAEncrypt = new JSEncrypt();
    RSAEncrypt.setPublicKey(publicKey);
    var message = 'Hay una reserva para '+personas+' personas el día '+fecha+' a las '+hora+' \nA nombre de '+nombre+' con teléfono: '+tel;
    message = RSAEncrypt.encrypt(message);

    $.ajax({
      url:'https://api.telegram.org/bot1832303215:AAFnpjGuRR6mBscYV539yka1LIN8xCjJ25s/sendMessage',
      method:'POST',
      data:{chat_id:'985188643',text:message},
      success:function(){
        $("#reserva-texto-popup").html("Reserva realizada correctamente para el "+fecha+" a las "+hora+" teléfono: "+tel+"<br><br>Si esta información no es correcta llámenos al 913 69 43 91.")
      },
      fail:function(){
        $("#reserva-texto-popup").html("No se ha podido realizar la reserva, si esto sigue ocurriendo puede llamarnos al 913 69 43 91")
      }
    });
  } catch(error) {
    $("#reserva-texto-popup").html("No se ha podido realizar la reserva, si esto sigue ocurriendo puede llamarnos al 913 69 43 91")
  }

  sleepFor(1)
  $("#reservaHecha").css("display", "flex")
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
    nombre = 1
  }

  if (telForm.value == "") {
		noneFlex("no-tel", "mal-tel");
  }
  else if (!telForm.value.match(reTel)) {
		noneFlex("mal-tel", "no-tel");
  }
  else {
		tel = noneNone("no-tel", "mal-tel");
    tel = 1
  }

  if (fechaForm.value == ""){
    $("#no-fecha-"+language).css("display", "flex");
  }
  else {
    $("#no-fecha-"+language).css("display", "none");
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
      if (dia == "Fri" || dia == "Sat") {
        if ((horaNum >= 1 && horaNum < 13) || (horaNum == 0 && minNum > 30)) {
				 	noneFlex("mal-hora", "no-hora");
        }
        else {
					hora = noneNone("no-hora", "mal-hora");
          hora = 1
        }
      }
      else if (dia == "Sun") {
        if ((horaNum > 15 || horaNum < 13) || (horaNum == 15 && minNum > 30)) {
          noneFlex("mal-hora", "no-hora");
        }
        else {
          hora = noneNone("no-hora", "mal-hora");
          hora = 1
        }
      }
      else {
        if ((horaNum > 1 && horaNum < 13) || (horaNum == 23) || (horaNum == 22 && minNum > 01) ||
        (horaNum > 15 && horaNum < 19) || (horaNum == 15 && minNum > 30) ||
        (horaNum == 19 && minNum < 30) ) {
					noneFlex("mal-hora", "no-hora");
        }
        else {
          hora = noneNone("no-hora", "mal-hora");
          hora = 1
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

  if (nombre === 1 && tel === 1 && fecha === 1 && hora === 1 && check === 1) {
    sendMessage(personasForm.value, fechaForm.value, horaForm.value, nombreForm.value, telForm.value);
  }
})
