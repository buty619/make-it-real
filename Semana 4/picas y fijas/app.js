function gRandom() {
  let nRandom1 = Math.floor(Math.random() * 10);
  let nRandom2 = Math.floor(Math.random() * 10);
  let nRandom3 = Math.floor(Math.random() * 10);
  let nRandom4 = Math.floor(Math.random() * 10);
  let nRandom = '' + nRandom1 + nRandom2 + nRandom3 + nRandom4;
  if (nRandom.match(/.*(.).*\1+.*/)) {
    return gRandom();
  }
  return nRandom
}

let nRandom = gRandom()
console.log(nRandom);

function picasFijas(input, random) {
  //se tiene un input de 4 numeros "xxxx"
  // la salida seran dos numeros la cantidad de concidencias
  //  y si se tienen coincidencias en posicion
  // function picas y fijas (input)
  //    for cada input se compara con numero random
  //       si se tiene coincidencia primer salida +1
  let fijas = 0;
  let picas = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] == random[i]) {
      fijas++;
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[i] == random[j]) {
        picas++;
      }
    }
  }
  picas = picas-fijas;
  return [picas, fijas];
}

$("#input").keypress(function (e) {
  var key = e.which;
  if (key == 13) {
    if (!$("#input").val().match(/^[0-9]{4}$/)) {
      $("#input").addClass("border border-danger text-danger");
      $("#help-block").text("favor ingresa un numero valido de 4 digitos");
    }
    else if ($("#input").val().match(/.*(.).*\1+.*/)) {
      $("#input").addClass("border border-danger text-danger");
      $("#help-block").text("favor ingresa un numero valido sin numeros repetidos");
    }
    else {
      let input = $("#input").val();
      $("#input").removeClass("border border-danger text-danger");
      $("#help-block").text("");
      resultado = picasFijas(input, nRandom);
      $("tbody").append("<tr> <td>" + input + "</td> <td>" + resultado[0] + "</td> <td>" + resultado[1] + "</td>");
      $("#input").val("");
      if (resultado[1] == 4) {
        $('#myModal').removeClass('hide')
        $('body').addClass('back')
      }
    }
  }
})

$("#start").on("click", function () {
  $('#myModal').addClass('hide')
  $('body').removeClass('back')
  $("tbody tr").remove();
  NRandom = gRandom();
  console.log(NRandom);
})