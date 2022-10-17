//declaracion de variables

let palabras = ["hola", "ahorcado", "probando"];
const lista = document.getElementById("lista");
const captador = document.getElementById("captador");
const idBoton = document.getElementById("id-boton");
let palabraGuardada = "";
let caracteresPalabra = [];
let caracteresIngresados = [];
const vidas = document.getElementById("vidas");
let contadorVidas = 5;
let idImagen = document.getElementById("id-imagen");
let anchoimagen = 200;
//let refrescar= document.getElementById('refrescar');
let modalEmergente = document.getElementById("modal-emergente");
let backdrop = document.getElementById("backdrop");

//FUNCIONES
idBoton.addEventListener("click", () => {
  //captador.value = "";
  if (palabraGuardada.includes(captador.value)) {
    caracteresIngresados.push(captador.value);
    seEncontro();
    captador.value = "";

    //location.reload()
  } else {
    contadorVidas--;
    idImagen.style.marginLeft = `-${anchoimagen}px`;
    vidas.innerText = contadorVidas;
    console.log("no se encontro ");
    captador.value = "";
    anchoimagen += 200;
    if (contadorVidas === 0) {
      modalEmergente.innerHTML = `PERDISTE!<p> LA PALABRA ERA: <center><strong>${palabraGuardada}</strong></center><br> <button onclick='location.reload()'> COMENZAR DE VUELTA</button>`;
      backdrop.classList.replace("modal-oculta", "modal-activo");
      //recarga la pagina cada vez que pierde
    }
    //location.reload();
  }
});
//location.reload();// recarga la pagina

function seEncontro() {
  const letraEncontrada = document.querySelectorAll("#" + captador.value);
  letraEncontrada.forEach((element) => {
    element.innerText = captador.value;
  });
  verificarPalabraCompleta();
}

function verificarPalabraCompleta() {
  caracteresPalabra = caracteresPalabra.sort();
  caracteresIngresados = caracteresIngresados.sort();
  //if (caracteresPalabra.join)
  if (caracteresPalabra.join("") === caracteresIngresados.join("")) {
    setTimeout(() => {
      modalEmergente.innerHTML = `<center>GANASTE! FELICIDADES!</center><br><button onclick='location.reload()' > COMENZAR DE VUELTA</button>`;
      backdrop.classList.replace("modal-oculta", "modal-activo");
    }, 1000);
  }
}

function renderizarLetras(palabra) {
  let resultado = "";
  let palArray = palabra.split("");

  palArray.forEach((element) => {
    resultado += `
            <li id=${element}><br>__</li>
    
        `;
  });
  lista.innerHTML = resultado;
}

window.addEventListener("DOMContentLoaded", () => {
  const index = Math.floor(Math.random() * palabras.length);
  palabraGuardada = palabras[index];
  renderizarLetras(palabraGuardada);
  caracteresPalabra = palabraGuardada.split("").filter((item, index) => {
    return palabraGuardada.split("").indexOf(item) === index;
  });
  vidas.innerText = contadorVidas;
});
