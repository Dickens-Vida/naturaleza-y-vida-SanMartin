/* ==========================================================
   LÓGICA JAVASCRIPT - EXPEDICIÓN Y PRÁCTICAS LUDOMOTRICES
   ========================================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }
});

// NAVBAR SCROLL
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    }
});

// TRANSICIÓN DE SCROLL Y REVELACIÓN DE CARTAS POP-IT
window.addEventListener("scroll", () => {
    const seccion = document.getElementById("experiencia-scrolling");
    if (!seccion) return;

    const rect = seccion.getBoundingClientRect();
    const totalHeight = seccion.clientHeight - window.innerHeight;
    
    if (totalHeight <= 0) return;

    let progress = -rect.top / totalHeight;
    progress = Math.max(0, Math.min(1, progress));

    const colorOscuro = [12, 24, 19];
    const colorClaro = [241, 239, 231];
    
    const r = Math.round(colorOscuro[0] + (colorClaro[0] - colorOscuro[0]) * progress);
    const g = Math.round(colorOscuro[1] + (colorClaro[1] - colorOscuro[1]) * progress);
    const b = Math.round(colorOscuro[2] + (colorClaro[2] - colorOscuro[2]) * progress);

    seccion.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    const textoCentral = document.querySelector(".mision-texto-centrado");
    if (textoCentral) {
        textoCentral.style.color = progress > 0.6 ? "#1b4332" : "#ffffff";
    }

    const cartas = document.querySelectorAll(".carta-pop");
    cartas.forEach((carta, index) => {
        const threshold = (index + 1) * 0.2;
        if (progress >= threshold) {
            carta.classList.add("visible");
        } else {
            carta.classList.remove("visible");
        }
    });
});

// INTERACCIÓN POP-IT DE LAS CARTAS
document.querySelectorAll(".carta-pop").forEach(carta => {
    carta.addEventListener("click", (e) => {
        if (e.target.closest('.carta-contenido')) return;
        carta.classList.toggle("open");
    });
});

// CONTADOR REGRESIVO
const fechaDestino = new Date("September 29, 2026 10:00:00").getTime();
const contadorElemento = document.getElementById("contador");

if (contadorElemento) {
    const timer = setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = fechaDestino - ahora;

        if (diferencia <= 0) {
            contadorElemento.innerHTML = "Yendo no, llegando.";
            clearInterval(timer);
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        contadorElemento.innerHTML = `${dias} días para la salida`;
    }, 1000);
}

// JUEGO DE LA MOCHILA
const elementosValidos = ["Bolsa de dormir", "Linterna frontal", "Botas de trekking", "Protector solar", "Cantimplora"];
const contenedorMochila = document.querySelector(".mochila");

document.querySelectorAll(".objeto").forEach(btn => {
    btn.addEventListener("click", () => {
        const texto = btn.innerText.replace(/^[^\s]+\s/, '').trim();
        procesarObjeto(texto, btn);
    });
});

function procesarObjeto(nombre, boton) {
    if (!contenedorMochila) return;

    if (elementosValidos.includes(nombre)) {
        contenedorMochila.innerHTML = `
            <div class="mochila-icono">🎒</div>
            <h3 style="color:#74c69d">¡${nombre} guardado!</h3>
            <p>Elemento indispensable cargado.</p>
        `;
        boton.style.opacity = "0.3";
        boton.style.pointerEvents = "none";
    } else {
        contenedorMochila.innerHTML = `
            <div class="mochila-icono">⚠️</div>
            <h3 style="color:#ff6b6b">¡${nombre} no va!</h3>
            <p>Este objeto no sirve para Hua Hum.</p>
        `;
        setTimeout(() => {
            contenedorMochila.innerHTML = `
                <div class="mochila-icono">🎒</div>
                <h3>Tu Mochila</h3>
                <p>Arrastrá tu equipo acá (o hacé clic)</p>
            `;
        }, 1800);
    }
}

// ==========================================================
// EXAMEN DE SUPERVIVENCIA - SISTEMA DE TARJETAS Y PASAPORTE
// ==========================================================

const preguntasQuiz = [
    {
        pregunta: "¿Cuál es la regla principal ante un pernocte agreste en Lago Queñi?",
        opciones: [
            "Dejar los residuos en bolsas atadas a árboles",
            "Principio de Mínimo Impacto: Volver con el 100% de los residuos",
            "Enterrar plásticos y latas"
        ],
        correcta: 1
    },
    {
        pregunta: "¿Qué sistema de comunicación seguro se utiliza en zonas sin señal de Hua Hum?",
        opciones: [
            "Redes VHF de enlace con Guardaparques",
            "Puntos Wi-Fi satelitales comunitarios",
            "Llamadas por cobro revertido"
        ],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es el equipo de calzado imprescindible para el ascenso al Cerro Mallo?",
        opciones: [
            "Zapatillas de running con suela lisa",
            "Sandalias de agua",
            "Botas de trekking ablandadas con buen agarre"
        ],
        correcta: 2
    },
    {
        pregunta: "¿Cómo se gestiona el agua de consumo durante las caminatas de montaña?",
        opciones: [
            "Tomar directamente de cualquier arroyo",
            "Utilizar cantimplora con potabilización/filtrado adecuado",
            "Llevar solo bebidas azucaradas"
        ],
        correcta: 1
    }
];

let preguntaActual = 0;
const quizContenedor = document.getElementById("quiz-contenedor");

function renderizarPregunta(indice, animacionIn = false) {
    if (!quizContenedor) return;

    if (indice >= preguntasQuiz.length) {
        mostrarPasaporte();
        return;
    }

    const q = preguntasQuiz[indice];
    const animClase = animacionIn ? "slide-in-right" : "";

    quizContenedor.innerHTML = `
        <div class="card-quiz ${animClase}" id="tarjeta-pregunta">
            <div class="quiz-header-step">Pregunta ${indice + 1} de ${preguntasQuiz.length}</div>
            <h3 class="quiz-pregunta">${q.pregunta}</h3>
            <div class="quiz-opciones">
                ${q.opciones.map((opcion, i) => `
                    <button class="btn-opcion" onclick="responderQuiz(${i})">${opcion}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function responderQuiz(opcionSeleccionada) {
    const q = preguntasQuiz[preguntaActual];
    const tarjeta = document.getElementById("tarjeta-pregunta");

    if (opcionSeleccionada === q.correcta) {
        // Respuesta Correcta: Animación hacia la izquierda
        tarjeta.classList.add("slide-out-left");
        setTimeout(() => {
            preguntaActual++;
            renderizarPregunta(preguntaActual, true);
        }, 350);
    } else {
        // Respuesta Incorrecta: Vibración, rojo y vuelta al inicio
        tarjeta.classList.add("error-shake");
        setTimeout(() => {
            preguntaActual = 0;
            renderizarPregunta(preguntaActual, false);
        }, 600);
    }
}

function mostrarPasaporte() {
    quizContenedor.innerHTML = `
        <div class="pasaporte-card">
            <div class="pasaporte-header">
                <h3>PARQUE NACIONAL LANÍN</h3>
                <p>Acreditación de Ingreso a la Reserva Natural</p>
            </div>
            <div class="pasaporte-badge">🌲🎫🌲</div>
            <h2>PASAPORTE AL BOSQUE</h2>
            <div class="pasaporte-status">ESTADO: APTO PARA EXPEDICIÓN</div>
            <p>Has demostrado conocimientos técnicos en conservación, seguridad e impacto ambiental en el terreno de San Martín de los Andes.</p>
            <button class="btn-reiniciar" onclick="reiniciarQuiz()">Volver a realizar examen</button>
        </div>
    `;
}

function reiniciarQuiz() {
    preguntaActual = 0;
    renderizarPregunta(0, true);
}

// Inicializar Quiz
if (quizContenedor) {
    renderizarPregunta(0);
}

// INTERACCIÓN FAQ
const nodosFaq = document.querySelectorAll(".punto-nodo");
const panelesFaq = document.querySelectorAll(".cuadro-panel");

nodosFaq.forEach(nodo => {
    const activar = () => {
        const targetId = nodo.getAttribute("data-target");

        nodosFaq.forEach(n => n.classList.remove("active"));
        panelesFaq.forEach(p => p.classList.remove("active"));

        nodo.classList.add("active");
        const panelActivo = document.getElementById(targetId);
        if (panelActivo) panelActivo.classList.add("active");
    };

    nodo.addEventListener("mouseenter", activar);
    nodo.addEventListener("click", activar);
});

// DETECTOR Y CARGADOR AUTOMÁTICO DE IMÁGENES
document.addEventListener("DOMContentLoaded", () => {
    const imagenes = document.querySelectorAll("img");

    imagenes.forEach((img) => {
        const rutaOriginal = img.getAttribute("src");
        if (!rutaOriginal) return;

        const puntoPos = rutaOriginal.lastIndexOf(".");
        if (puntoPos === -1) return;

        const baseRuta = rutaOriginal.substring(0, puntoPos);
        const extensionOriginal = rutaOriginal.substring(puntoPos);

        const variantes = [
            baseRuta + extensionOriginal,
            baseRuta + ".jpg",
            baseRuta + ".JPG",
            baseRuta + ".jpeg",
            baseRuta + ".png",
            baseRuta + ".PNG",
            baseRuta + ".webp",
            baseRuta.replace("rapel", "rappel") + ".jpg",
            baseRuta.replace("rapel", "rappel") + ".JPG",
            baseRuta.replace("rapel", "rappel") + ".png",
            baseRuta.replace("rappel", "rapel") + ".jpg",
            baseRuta.replace("rappel", "rapel") + ".png"
        ];

        let intentoActual = 0;

        img.onerror = function () {
            intentoActual++;
            if (intentoActual < variantes.length) {
                img.src = variantes[intentoActual];
            } else {
                console.warn(`No se pudo encontrar la imagen para: ${rutaOriginal}`);
                img.alt = "Imagen no encontrada (" + rutaOriginal + ")";
            }
        };
    });
});
