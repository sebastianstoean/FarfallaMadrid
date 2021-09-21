console.log(screen.height, screen.width);

function goToReservar(){
	var reservas = document.getElementById("reserva-tit");
	reservas.scrollIntoView({behavior: 'smooth' });
}

function goToCarta(){
	window.location.href = "../templates/carta.html";
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

var today = new Date().toISOString().split('T')[0];
document.getElementsByName("fecha")[0].setAttribute('min', today);

var e = new Event("look", {"cancelable":true})
function sendSpread(e) {
	e.preventDefault();
  var nombreForm = (document.getElementById("nombre1"));
  var telForm = (document.getElementById("tel1"));
  var fechaForm = (document.getElementById("fecha1"));
  var horaForm = (document.getElementById("hora1"));
  var personasForm = (document.getElementById("persona1"));
  var politicaForm = (document.getElementById("checkbox"));

  var $form = document.getElementById('formreservar');

  let reName = new RegExp("^[a-zA-Z ]{2,30}$");
  let reTel = new RegExp("^[6-7][0-9]{8}$");
  var nombre = 0;
  var tel = 0;
  var fecha = 0;
  var hora = 0;
  var check = 0;

	var arrayMatches = nombreForm.value.match(reName);
  if (nombreForm.value == "") {
    document.getElementById("no-nombre").style.display = "flex";
    document.getElementById("mal-nombre").style.display = "none";
  }
  else if (arrayMatches == null) {
    document.getElementById("mal-nombre").style.display = "flex";
    document.getElementById("no-nombre").style.display = "none";
  }
  else {
    document.getElementById("no-nombre").style.display = "none";
    document.getElementById("mal-nombre").style.display = "none";
    nombre = 1;
  }

  if (telForm.value == "") {
    document.getElementById("no-tel").style.display = "flex";
    document.getElementById("mal-tel").style.display = "none";
  }
  else if (!telForm.value.match(reTel)) {
    document.getElementById("no-tel").style.display = "none";
    document.getElementById("mal-tel").style.display = "flex";
  }
  else {
    document.getElementById("no-tel").style.display = "none";
    document.getElementById("mal-tel").style.display = "none";
    tel = 1;
  }

  if (fechaForm.value == ""){
    document.getElementById("no-fecha").style.display = "flex";
  }
  else {
    document.getElementById("no-fecha").style.display = "none";
    fecha = 1;

    if (horaForm.value == ""){
      document.getElementById("no-hora").style.display = "flex";
      document.getElementById("mal-hora").style.display = "none";
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
          document.getElementById("no-hora").style.display = "none";
          document.getElementById("mal-hora").style.display = "flex";
        }
        else {
          document.getElementById("no-hora").style.display = "none";
          document.getElementById("mal-hora").style.display = "none";
          hora = 1;
        }
      }
      else {
        if ((horaNum > 1 && horaNum < 13) || (horaNum == 1 && minNum > 45) ||
        (horaNum > 15 && horaNum < 19) || (horaNum == 15 && minNum > 45) ||
        (horaNum == 19 && minNum < 30) ) {
          document.getElementById("no-hora").style.display = "none";
          document.getElementById("mal-hora").style.display = "flex";
        }
        else {
          document.getElementById("no-hora").style.display = "none";
          document.getElementById("mal-hora").style.display = "none";
          hora = 1;
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
    var jqxhr = $.ajax({
      url: "email.php",
      type: "POST",
      mode: "no-cors",
      dataType: "json",
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
}
