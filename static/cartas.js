var event = new Event("look", {"cancelable":true})

$(document).ready(function(){
  $(".titulo-carta").click(function() {
    let texts = $(this).parent().children(".texto-carta");
    if (texts.is(":hidden") ) {
      texts.slideDown("slow");
    } else {
      texts.slideUp("slow");
    }
  })

  lookat = getCookie("lookat")

  if (lookat !== "") {
    document.getElementById(lookat).scrollIntoView({ behavior: "smooth" });
    $('#'+lookat).click()
    setCookie("lookat", "", 1)
  }

  $("#cambio-carta-sing").click(function() {glutenButton();} )
  $("#boton-volver-inicio").click(function() {window.location.href = "../templates/home.html";} )

})

let glutens = document.getElementsByClassName('gluten')
let sings = document.getElementsByClassName('sing')
function changeGluten() {
  var gluten = getCookie("gluten")
  if (gluten == 0) {
    for(var i=0; i<glutens.length; i++){
      glutens[i].style.display = "none";
    }
    for(var i=0; i<sings.length; i++){
      sings[i].style.display = "block";
    }
  }
  else if (gluten == 1) {
    for(var i=0; i<glutens.length; i++){
      glutens[i].style.display = "block";
    }
    for(var i=0; i<sings.length; i++){
      sings[i].style.display = "none";
    }
  }
}

changeGluten();

function glutenButton() {
  let gluten = getCookie("gluten")
  if (gluten == 0) {
    setCookie("gluten", "1", 10);
  }
  else if (gluten == 1) {
    setCookie("gluten", "0", 10);
  }
  changeGluten();
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


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";SameSite=Lax" + ";path=/";
}
