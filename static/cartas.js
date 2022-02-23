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
})
