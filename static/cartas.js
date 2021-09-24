$("#sin-gluten-boton").click(function(event) {
  event.preventDefault();
  var gluten = document.getElementsByClassName("gluten");
  var sin_gluten = document.getElementsByClassName("sin-gluten");

  for (var i=0; i < (gluten.length - 1); i++){
    gluten[i].style.display = "none";
  }

  for (var i=0; i < (sin_gluten.length - 1); i++){
    sin_gluten[i].style.display = "block";
  }

  document.getElementById("sin-gluten-boton").style.display = "none";
  document.getElementById("gluten-boton").style.display = "block";
})

$("#gluten-boton").click(function(event) {
  event.preventDefault();
  var gluten = document.getElementsByClassName("gluten");
  var sin_gluten = document.getElementsByClassName("sin-gluten");

  for (var i=0; i < (gluten.length - 1); i++){
    gluten[i].style.display = "block";
  }

  for (var i=0; i < (sin_gluten.length - 1); i++){
    sin_gluten[i].style.display = "none";
  }

  document.getElementById("sin-gluten-boton").style.display = "block";
  document.getElementById("gluten-boton").style.display = "none";
})
