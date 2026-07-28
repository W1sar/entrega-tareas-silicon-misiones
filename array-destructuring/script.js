// ++++++++ PARTE A: array de valores simples +++++++++

console.log("-- PARTE A --");

let categorias = ["mmo", "soulslike", "metroidvania", "supervivencia"];

console.log(`Cantidad de categorias: ${categorias.length}`);
    console.log(categorias);
    
// Primer elemento - acceso directo por indice 0
console.log(`Primer Categoria: ${categorias[0]}`);

// Ultimo elemento - utilizando .length -1
console.log(`Ultima categoría: ${categorias[categorias.length - 1]}`);

// Agregamos una nueva cantigoria con push
categorias.push("sandbox");

// Listamos la nueva categoria agregada
console.log(`Nueva cantidad de categorias: ${categorias.length}`);

// Eliminamos la ultima categoria agregada 
let eliminada = categorias.pop();

// Mostramos la categoria eliminada
console.log(`Categoría eliminada: ${eliminada}`);

// ++++++++ PARTE B: el objeto +++++++++

console.log("--- PARTE B ---");

let usuario = {
  nombre: "W1sar",
  edad: 24,
  ciudad: "Wanda",
  temaFavorito: "MMORPG"
};

// Accedemos a cada informacion utilizando a cada notacion individual
console.log(`El usuario: ${usuario.nombre} tiene ${usuario.edad} años, es de ${usuario.ciudad} y su genero de videojuegos favorito es ${usuario.temaFavorito}.`);

// Cambiamos la edad asigando un nuevo valor
usuario.edad = 25;

// Mostramos la nueva edad actualizada
console.log(`Edad actualizada: ${usuario.edad}`);

// incorporamos una nueva propiedad al usuario
usuario.profesion = "estudiante";

// Mostramos el objeto completo
console.log(usuario);

// ++++++++ Parte C: array de objetos +++++++++

console.log("--- PARTE C ---");


let catalogo = [
  { titulo: "Elden Ring", categoria: "soulslike", puntaje: 10, jugado: true },
  { titulo: "World of Warcraft", categoria: "mmo", puntaje: 5, jugado: false },
  { titulo: "Hollow Knight", categoria: "metroidvania", puntaje: 8, jugado: true },
  { titulo: "Rust", categoria: "supervivencia", puntaje: 9, jugado: false }
];

// Mostramos el titulo del primer elemento 
console.log(`Titulo del primer elemento: ${catalogo[0].titulo}`);

// Mostramos el puntaje del 3er elemento
console.log(`Puntaje del tercer elemento: ${catalogo[2].puntaje}`);

// Determinamos si el segundo elemento fue jugado o esta pendiente
let estado = catalogo[1].jugado ? "jugado" : "pendiente";

// Mostramos la linea descriptiva del segundo elemento
console.log(`${catalogo[1].titulo} — ${catalogo[1].categoria} — ${catalogo[1].puntaje}/10 — ${estado}`);

// Actualizamos el puntaje del tercer elemento del catalogo
catalogo[2].puntaje = 4;

// Mostramos el puntaje actualizado
console.log(`Puntaje actualizado: ${catalogo[2].puntaje}`);

// Agregamos un quinto elemento al catalogo con push
catalogo.push({ titulo: "Minecraft", categoria: "sandbox", puntaje: 7, jugado: true });

// Mostramos la cantidad total de elementos
console.log(`Cantidad total de elementos: ${catalogo.length}`);

// ++++++++ Parte D: Destructuring +++++++++

console.log("--- PARTE D ---");

let { titulo, categoria, puntaje, jugado } = catalogo[0];

// Convertimos jugado en texto (jugado / pendiente)
let estadoUno = jugado ? "jugado" : "pendiente";

// Mostramos la linea descriptiva usando las variables extraidas
console.log(`${titulo} — ${categoria} — ${puntaje}/10 — ${estadoUno}`);

// Destructuring de objeto sobre usuario para extraer nombre y ciudad
let { nombre, ciudad } = usuario;

// Mostramos nombre y ciudad
console.log(`Nombre: ${nombre} — Ciudad: ${ciudad}`);

// Destructuring de array sobre catalogo: primero y segundo por posicion
let [primero, segundo] = catalogo;

// Mostramos los titulos de ambos
console.log(`Primero: ${primero.titulo}`);
console.log(`Segundo: ${segundo.titulo}`);

// ++++++++ Parte E: Complementaria +++++++++

console.log("--- PARTE E ---");

// Destructuring con renombrado: extraemos titulo con otro nombre de variable
let { titulo: juegoDestacado } = catalogo[3];

// Mostramos la variable renombrada
console.log(`Juego destacado: ${juegoDestacado}`);

// Destructuring con valor por defecto: plataformaFavorita no existe en usuario
let { plataformaFavorita = "sin datos" } = usuario;

// Mostramos el valor por defecto en lugar de undefined
console.log(`Plataforma favorita: ${plataformaFavorita}`);

// Declaramos dos variables con valores iniciales
let puntajeA = 9;
let puntajeB = 6;

// Intercambiamos sus valores con destructuring de array, sin variable auxiliar
[puntajeA, puntajeB] = [puntajeB, puntajeA];

// Mostramos el resultado del intercambio
console.log(`Puntajes intercambiados: puntajeA = ${puntajeA}, puntajeB = ${puntajeB}`);