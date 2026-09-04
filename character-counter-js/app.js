const LIMITE = 280;
const area = document.querySelector("#texto");
const caracteres = document.querySelector("#caracteres");
const palabras = document.querySelector("#palabras");
const sinEspacios = document.querySelector("#sinEspacios");
const restantes = document.querySelector("#restantes");

area.addEventListener("input", actualizar);

function actualizar() {
  caracteres.textContent = area.value.length;

  const t = area.value.trim();
  if (t === "") {
    palabras.textContent = 0;
  } else {
    palabras.textContent = t.split(/\s+/).length;
  }

  sinEspacios.textContent = area.value.replaceAll(" ", "").length;
  restantes.textContent = LIMITE - area.value.length;

  if (area.value.length > LIMITE) {
    area.classList.add("excedido");
    restantes.classList.add("excedido");
  } else {
    area.classList.remove("excedido");
    restantes.classList.remove("excedido");
  }
}

const boton = document.querySelector("#limpiar");

boton.addEventListener("click", () => {
  area.value = "";
  actualizar();
});