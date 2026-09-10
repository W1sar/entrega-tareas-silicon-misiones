"use client";

import { useState, useEffect } from 'react';
import './globals.css';

function crearTablero() {
  const valores = [1, 2, 3, 4, 5, 6, 7, 8];
  const pares = [...valores, ...valores];
  const mezclados = [...pares].sort(() => Math.random() - 0.5);

  return mezclados.map((valor, indice) => ({
    id: indice,
    valor: valor,
    dadaVuelta: false,
    encontrada: false,
  }));
}

export default function MemoryGame() {
  const [tablero, setTablero] = useState(crearTablero);
  const [movimientos, setMovimientos] = useState(0);
  const [evaluando, setEvaluando] = useState(false);
  
  // Paso 7: Estados para el Timer
  const [segundos, setSegundos] = useState(0);
  const [jugando, setJugando] = useState(false);

  // Paso 8: Detectar si todas las fichas fueron encontradas
  const victoria = tablero.length > 0 && tablero.every((f) => f.encontrada);

  // Paso 7: Efecto del cronómetro (setInterval + clearInterval)
  useEffect(() => {
    let intervalo = null;
    if (jugando && !victoria) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [jugando, victoria]);

  // Formato m:ss para el tiempo
  const formatearTiempo = (totalSegundos) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segsRestantes = totalSegundos % 60;
    return `${minutos}:${segsRestantes.toString().padStart(2, '0')}`;
  };

  // Reiniciar partida (Header o Modal)
  const reiniciarPartida = () => {
    setTablero(crearTablero());
    setMovimientos(0);
    setSegundos(0);
    setJugando(false);
    setEvaluando(false);
  };

  // Paso 4: Clic en ficha
  const manejarClickFicha = (id) => {
    if (evaluando) return; // Bloqueo anti-trampa

    const fichaClickeada = tablero.find((f) => f.id === id);
    if (!fichaClickeada || fichaClickeada.dadaVuelta || fichaClickeada.encontrada) {
      return;
    }

    // El primer clic arranca el timer
    if (!jugando) {
      setJugando(true);
    }

    setTablero((prevTablero) =>
      prevTablero.map((ficha) =>
        ficha.id === id ? { ...ficha, dadaVuelta: true } : ficha
      )
    );
  };

  // Paso 5 y 6: Evaluar el par
  useEffect(() => {
    const dadasVuelta = tablero.filter((f) => f.dadaVuelta && !f.encontrada);

    if (dadasVuelta.length === 2) {
      setEvaluando(true);
      setMovimientos((prev) => prev + 1);

      const [primera, segunda] = dadasVuelta;

      if (primera.valor === segunda.valor) {
        setTablero((prevTablero) =>
          prevTablero.map((ficha) =>
            ficha.valor === primera.valor
              ? { ...ficha, encontrada: true, dadaVuelta: false }
              : ficha
          )
        );
        setEvaluando(false);
      } else {
        const temporizador = setTimeout(() => {
          setTablero((prevTablero) =>
            prevTablero.map((ficha) =>
              ficha.id === primera.id || ficha.id === segunda.id
                ? { ...ficha, dadaVuelta: false }
                : ficha
            )
          );
          setEvaluando(false);
        }, 1000);

        return () => clearTimeout(temporizador);
      }
    }
  }, [tablero]);

  return (
    <main className="contenedor-juego">
      {/* Encabezado */}
      <header className="header-juego">
        <h1 className="titulo">memory</h1>
        <button className="btn-reiniciar" onClick={reiniciarPartida}>
          Nueva partida
        </button>
      </header>

      {/* Grilla 4x4 */}
      <section className="grilla-tablero">
        {tablero.map((ficha) => {
          const visible = ficha.dadaVuelta || ficha.encontrada;
          return (
            <button
              key={ficha.id}
              onClick={() => manejarClickFicha(ficha.id)}
              className={`ficha ${visible ? 'visible' : ''} ${ficha.encontrada ? 'encontrada' : ''}`}
            >
              {visible ? ficha.valor : ''}
            </button>
          );
        })}
      </section>

      {/* Marcador inferior */}
      <footer className="footer-juego">
        <div className="tarjeta-marcador">
          <span className="marcador-label">Tiempo</span>
          <span className="marcador-valor">{formatearTiempo(segundos)}</span>
        </div>

        <div className="tarjeta-marcador">
          <span className="marcador-label">Movimientos</span>
          <span className="marcador-valor">{movimientos}</span>
        </div>
      </footer>

      {/* Paso 8: Modal de Victoria */}
      {victoria && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h2 className="modal-titulo">¡Lo lograste!</h2>
            <p className="modal-subtitulo">Completaste el sistema con éxito.</p>
            
            <div className="modal-estadisticas">
              <div className="stat-fila">
                <span>Tiempo total:</span>
                <span className="stat-dato">{formatearTiempo(segundos)}</span>
              </div>
              <div className="stat-fila">
                <span>Movimientos:</span>
                <span className="stat-dato">{movimientos}</span>
              </div>
            </div>

            <button className="btn-modal-reiniciar" onClick={reiniciarPartida}>
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
    </main>
  );
}