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
})


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
