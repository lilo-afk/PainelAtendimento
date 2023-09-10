$(document).ready(function () {
  function zeroAEsquerda(valor) {
    return valor.toString().padStart(2, "0");
  }

// Data e Horário

  var dataEspecifica = new Date();

  var dia = zeroAEsquerda(dataEspecifica.getDate());
  var mes = zeroAEsquerda(dataEspecifica.getMonth() + 1);
  var ano = dataEspecifica.getFullYear();

  var dataFormatada = dia + "/" + mes + "/" + ano;
  $("#data").text(dataFormatada);

  function atualizarHorario() {
    var agora = new Date();
    var horas = zeroAEsquerda(agora.getHours());
    var minutos = zeroAEsquerda(agora.getMinutes());

    var horarioAtual = horas + ":" + minutos;
    document.getElementById("horario").innerText = horarioAtual;
  }

  setInterval(atualizarHorario, 1000);

  window.addEventListener("message", function (event) {
    if (event.data.action === "atualizarSenhas") {
      atualizarSenhas();
    }
  });


// Carrossel


  $("#videoCarousel").on("slide.bs.carousel", function () {
    var currentSlide = $(this).find(".carousel-item.active video")[0];
    currentSlide.pause();
    currentSlide.currentTime = 0;
  });

  $("#videoCarousel").on("slid.bs.carousel", function () {
    var currentSlide = $(this).find(".carousel-item.active video")[0];
    currentSlide.play();
  });

  $("#videoCarousel").carousel({
    interval: false,
  });

  var videos = $("#videoCarousel .carousel-inner video");
  videos.on("ended", function () {
    $("#videoCarousel").carousel("next");
  });
});


// Senhas


function atualizarSenhas() {
  if (localStorage.getItem("senhasEspera")) {
    $("#senhasEspera").html(localStorage.getItem("senhasEspera"));
  }
  if (localStorage.getItem("senhasChamadas")) {
    $("#senhasChamadas").html(localStorage.getItem("senhasChamadas"));
  }
}

setInterval(atualizarSenhas, 1000);

if (localStorage.getItem("senhasEspera")) {
  $("#senhasEspera").html(localStorage.getItem("senhasEspera"));
}
if (localStorage.getItem("senhasChamadas")) {
  $("#senhasChamadas").html(localStorage.getItem("senhasChamadas"));
}

$("#chamarProximo").click(function () {
  var senhasEspera = localStorage.getItem("senhasEspera") || "";
  var senhasChamadas = localStorage.getItem("senhasChamadas") || "";

  var proximaSenha = senhasEspera.match(/\d+/);

  if (proximaSenha) {
    $("#senhaAtual").html("Senha atual: " + proximaSenha[0]);
    senhasChamadas += '<div class="senha">' + proximaSenha[0] + "</div>";
    localStorage.setItem("senhasChamadas", senhasChamadas);
    senhasEspera = senhasEspera.replaceFirst(
      '<div class="senha">' + proximaSenha[0] + "</div>",
      ""
    );
    localStorage.setItem("senhasEspera", senhasEspera);
    $("#senhasEspera").html(senhasEspera);
    $("#senhasChamadas").html(senhasChamadas);
  } else {
    $("#senhaAtual").html("Não há senhas para atender.");
  }
});

String.prototype.replaceFirst = function (search, replacement) {
  var target = this;
  return target.replace(search, replacement);
};

$(document).on("dblclick", "#senhasChamadas .senha", function () {
  var senha = $(this).text().trim();
  var senhasChamadas = localStorage.getItem("senhasChamadas") || "";

  senhasChamadas = senhasChamadas.replace(
    '<div class="senha">' + senha + "</div>",
    ""
  );
  localStorage.setItem("senhasChamadas", senhasChamadas);

  $("#senhasChamadas").html(senhasChamadas);
});

