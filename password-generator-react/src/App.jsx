import { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [longitud, setLongitud] = useState(10);
  const [error, setError] = useState('');
  const [fortaleza, setFortaleza] = useState('');
  const [copiado, setCopiado] = useState(false); // Estado para feedback de copiado

  const [conMayusculas, setConMayusculas] = useState(true);
  const [conMinusculas, setConMinusculas] = useState(true);
  const [conNumeros, setConNumeros] = useState(true);
  const [conSimbolos, setConSimbolos] = useState(false);

  const calcularFortaleza = () => {
    let puntos = 0;

    if (conMayusculas) puntos += 1;
    if (conMinusculas) puntos += 1;
    if (conNumeros) puntos += 1;
    if (conSimbolos) puntos += 1;

    if (longitud >= 12) puntos += 1;

    if (puntos <= 1) return 'Muy débil';
    if (puntos === 2) return 'Débil';
    if (puntos === 3) return 'Media';
    return 'Fuerte';
  };

  const generarPassword = () => {
    if (longitud === 0) {
      setError('La longitud debe ser mayor a 0');
      setPassword('');
      setFortaleza('');
      return;
    }

    if (!conMayusculas && !conMinusculas && !conNumeros && !conSimbolos) {
      setError('Marcá al menos una opción');
      setPassword('');
      setFortaleza('');
      return;
    }

    setError('');

    let permitidos = '';
    if (conMayusculas) permitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (conMinusculas) permitidos += 'abcdefghijklmnopqrstuvwxyz';
    if (conNumeros) permitidos += '0123456789';
    if (conSimbolos) permitidos += '!@#$%^&*';

    let resultado = '';
    for (let i = 0; i < longitud; i++) {
      const indiceAzar = Math.floor(Math.random() * permitidos.length);
      resultado += permitidos[indiceAzar];
    }

    setPassword(resultado);
    setFortaleza(calcularFortaleza());
  };

  // Función para copiar con feedback temporal
  const copiarAlPortapapeles = () => {
    if (!password) return; // Si no hay contraseña generada, no hace nada

    navigator.clipboard.writeText(password);
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  };

  return (
    <main>
      <h1>Generador de contraseñas</h1>

      <section className="tarjeta">
        {/* Visor con botón interactivo */}
        <div className="visor">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="P4$5W0rD!"
            className="campo-password"
          />
          <button 
            className={`btn-copiar ${copiado ? 'copiado' : ''}`} 
            onClick={copiarAlPortapapeles}
          >
            {copiado ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        {/* Formulario */}
        <div className="formulario">
          <div className="fila-slider">
            <span className="slider-label">Longitud</span>
            <span className="slider-numero">{longitud}</span>
          </div>

          <input
            type="range"
            min="0"
            max="20"
            value={longitud}
            onChange={(e) => setLongitud(Number(e.target.value))}
            className="slider"
          />

          <div className="contenedor-opciones">
            <label className="opcion">
              <input
                type="checkbox"
                checked={conMayusculas}
                onChange={(e) => setConMayusculas(e.target.checked)}
              />
              Incluir mayúsculas
            </label>

            <label className="opcion">
              <input
                type="checkbox"
                checked={conMinusculas}
                onChange={(e) => setConMinusculas(e.target.checked)}
              />
              Incluir minúsculas
            </label>

            <label className="opcion">
              <input
                type="checkbox"
                checked={conNumeros}
                onChange={(e) => setConNumeros(e.target.checked)}
              />
              Incluir números
            </label>

            <label className="opcion">
              <input
                type="checkbox"
                checked={conSimbolos}
                onChange={(e) => setConSimbolos(e.target.checked)}
              />
              Incluir símbolos
            </label>
          </div>

          <div className="fila-fortaleza">
            <span className="fortaleza-label">FORTALEZA</span>
            <span className="fortaleza-valor">{fortaleza || '-'}</span>
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button className="btn-generar" onClick={generarPassword}>
            GENERAR →
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;