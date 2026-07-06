/* ==========================================================
   NATURALEZA Y VIDA
   Expedición San Martín de los Andes
   ========================================================== */

/*==========================================
LOADER
==========================================*/
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }
});

/*==========================================
NAVBAR / HEADER (CORREGIDO PARA .navbar)
==========================================*/
const navbar = document.querySelector(".navbar");
if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

/*==========================================
SCROLL REVEAL
==========================================*/
const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");

function mostrar() {
    reveals.forEach(item => {
        const top = item.getBoundingClientRect().top;
        const visible = window.innerHeight - 120;
        if (top < visible) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", mostrar);
mostrar(); // Ejecución inicial por si hay elementos ya visibles

/*==========================================
CUENTA REGRESIVA (PREVENCIÓN DE NEGATIVOS)
==========================================*/
const destino = new Date("September 29, 2026 10:00:00").getTime();
const contador = document.getElementById("contador");

if (contador) {
    const intervaloContador = setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = destino - ahora;

        if (diferencia <= 0) {
            contador.innerHTML = "¡Expedición en curso! 🥾";
            clearInterval(intervaloContador);
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        contador.innerHTML = dias + " días para salir";
    }, 1000);
}

/*==========================================
HOJAS FLOTANTES
==========================================*/
const totalHojas = 18;
for (let i = 0; i < totalHojas; i++) {
    const hoja = document.createElement("div");
    hoja.className = "hoja";
    hoja.innerHTML = "🍃";
    hoja.style.left = Math.random() * 100 + "vw";
    hoja.style.animationDuration = (12 + Math.random() * 10) + "s";
    hoja.style.animationDelay = Math.random() * 10 + "s";
    document.body.appendChild(hoja);
}

/*==========================================
PARALLAX EN HERO EFFECT
==========================================*/
window.addEventListener("mousemove", (e) => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    hero.style.backgroundPosition = `${50 + x * 3}% ${50 + y * 3}%`;
});

/*==========================================
 * JUEGO DE LA MOCHILA (DRAG & DROP)
 *==========================================*/
const objetosPermitidos = ["🔦", "🥾", "💧", "🧴", "⛺", "🩹"];
const mochila = document.querySelector(".mochila");

document.querySelectorAll(".objeto").forEach(objeto => {
    objeto.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.innerText);
        objeto.style.opacity = "0.5";
    });

    objeto.addEventListener("dragend", () => {
        objeto.style.opacity = "1";
    });
});

if (mochila) {
    mochila.addEventListener("dragover", (e) => {
        e.preventDefault();
        mochila.style.borderColor = "#74c69d";
    });

    mochila.addEventListener("dragleave", () => {
        mochila.style.borderColor = "#a3c9a8";
    });

    mochila.addEventListener("drop", (e) => {
        e.preventDefault();
        mochila.style.borderColor = "#a3c9a8";
        
        const item = e.dataTransfer.getData("text/plain");
        
        // Encontrar el elemento botón original para darle feedback visual también
        const botonOriginal = Array.from(document.querySelectorAll(".objeto")).find(btn => btn.innerText === item);
        
        if (objetosPermitidos.some(el => item.includes(el))) {
            mochila.innerHTML = `<span class="mochila-icono">🎒</span><div style="font-size: 18px; color: #74c69d; font-weight: bold;">¡${item} guardado con éxito!</div>`;
            if (botonOriginal) botonOriginal.classList.add("correcto-activo");
        } else {
            mochila.innerHTML = `<span class="mochila-icono">🎒</span><div style="font-size: 18px; color: #ff6b6b; font-weight: bold;">¡${item} no sirve para Hua Hum!</div>`;
            if (botonOriginal) {
                botonOriginal.classList.add("incorrecto-activo");
                setTimeout(() => botonOriginal.classList.remove("incorrecto-activo"), 1500);
            }
            setTimeout(() => {
                mochila.innerHTML = `<span class="mochila-icono">🎒</span><p>Arrastrá tu equipo acá</p>`;
            }, 2000);
        }
    });
}

/*==========================================
 * QUIZ DEL EXPEDICIONARIO Y PASAPORTE
 *==========================================*/
const preguntasQuiz = [
    {
        pregunta: "¿Dónde se encuentra el paso fronterizo Hua Hum?",
        opciones: ["Entre Argentina y Chile", "Entre Argentina y Bolivia", "Entre Argentina y Brasil"],
        correcta: 0
    },
    {
        pregunta: "¿Qué tipo de vegetación es característica de esta zona?",
        opciones: ["Selva Misionera", "Selva Valdiviana", "Estepa Patagónica"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es el lago que se navega para llegar a Hua Hum desde San Martín?",
        opciones: ["Lago Nahuel Huapi", "Lago Lácar", "Lago Correntoso"],
        correcta: 1
    }
];

let preguntaActual = 0;
let puntaje = 0;

function mostrarPregunta() {
    const contenedorQuiz = document.getElementById("quiz-contenedor");
    if (!contenedorQuiz) return;

    if (preguntaActual < preguntasQuiz.length) {
        const p = preguntasQuiz[preguntaActual];
        contenedorQuiz.innerHTML = `
            <div class="quiz-box">
                <h3>Pregunta ${preguntaActual + 1} de ${preguntasQuiz.length}</h3>
                <p class="pregunta-texto">${p.pregunta}</p>
                <div class="opciones-container">
                    ${p.opciones.map((opcion, index) => `
                        <button class="btn-opcion" data-index="${index}">${opcion}</button>
                    `).join('')}
                </div>
            </div>
        `;

        // Añadir manejadores de eventos dinámicos a los botones creados
        document.querySelectorAll(".btn-opcion").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const indiceSeleccionado = parseInt(e.target.getAttribute("data-index"));
                verificarRespuesta(indiceSeleccionado, e.target);
            });
        });
    } else {
        generarPasaporte();
    }
}

function verificarRespuesta(indiceSeleccionado, botonPresionado) {
    const correcta = preguntasQuiz[preguntaActual].correcta;
    
    // Deshabilitar todos los botones temporalmente para evitar doble click
    document.querySelectorAll(".btn-opcion").forEach(btn => btn.style.pointerEvents = "none");

    if (indiceSeleccionado === correcta) {
        puntaje++;
        botonPresionado.style.background = "#4caf50";
        botonPresionado.style.borderColor = "#4caf50";
    } else {
        botonPresionado.style.background = "#f44336";
        botonPresionado.style.borderColor = "#f44336";
        // Destacar también la correcta para que aprenda
        const botones = document.querySelectorAll(".btn-opcion");
        if(botones[correcta]) {
            botones[correcta].style.background = "#4caf50";
            botones[correcta].style.borderColor = "#4caf50";
        }
    }

    // Pequeño delay de 1.2 segundos para que se asimile la respuesta antes de avanzar
    setTimeout(() => {
        preguntaActual++;
        mostrarPregunta();
    }, 1200);
}

function generarPasaporte() {
    const contenedorQuiz = document.getElementById("quiz-contenedor");
    if (!contenedorQuiz) return;

    const aprobado = puntaje >= 2; 
    
    if (aprobado) {
        contenedorQuiz.innerHTML = `
            <div class="pasaporte">
                <div class="pasaporte-header">
                    <h2>REPÚBLICA EXPEDICIONARIA</h2>
                    <p>PASAPORTE OFICIAL DE AVENTURA</p>
                </div>
                <div class="pasaporte-body">
                    <div class="pasaporte-foto">👤</div>
                    <div class="pasaporte-datos">
                        <p><strong>ESTADO:</strong> EXPEDICIONARIO ACTIVO</p>
                        <p><strong>DESTINO:</strong> HUA HUM / SAN MARTÍN DE LOS ANDES</p>
                        <p><strong>RANGO:</strong> ${puntaje === 3 ? "Guía de Montaña ⭐⭐⭐" : "Explorador Autorizado ⭐⭐"}</p>
                        <p><strong>PUNTAJE:</strong> ${puntaje}/${preguntasQuiz.length} Aciertos</p>
                    </div>
                </div>
                <div class="pasaporte-sello">
                    <span>APROBADO</span>
                </div>
            </div>
        `;
    } else {
        contenedorQuiz.innerHTML = `
            <div class="quiz-fallido">
                <h3>¡Casi lo lográs!</h3>
                <p>Obtuviste ${puntaje}/${preguntasQuiz.length} puntos. Necesitás repasar la bitácora para estar listo para la expedición.</p>
                <button class="btn-reiniciar" id="btn-reiniciar-quiz">Intentar de nuevo 🔄</button>
            </div>
        `;
        document.getElementById("btn-reiniciar-quiz").addEventListener("click", reiniciarQuiz);
    }
}

function reiniciarQuiz() {
    preguntaActual = 0;
    puntaje = 0;
    // Limpiar clases de la mochila por si quiere repetir toda la experiencia limpia
    document.querySelectorAll(".objeto").forEach(btn => {
        btn.classList.remove("correcto-activo", "incorrecto-activo");
    });
    mostrarPregunta();
}

// Iniciar el quiz al cargar el DOM de forma segura
document.addEventListener("DOMContentLoaded", () => {
    mostrarPregunta();
});
