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

    // Calcular progreso de 0 a 1
    let progress = -rect.top / totalHeight;
    progress = Math.max(0, Math.min(1, progress));

    // Transición de fondo (Oscuro -> Claro)
    const colorOscuro = [12, 24, 19];
    const colorClaro = [241, 239, 231];
    
    const r = Math.round(colorOscuro[0] + (colorClaro[0] - colorOscuro[0]) * progress);
    const g = Math.round(colorOscuro[1] + (colorClaro[1] - colorOscuro[1]) * progress);
    const b = Math.round(colorOscuro[2] + (colorClaro[2] - colorOscuro[2]) * progress);

    seccion.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Cambiar color del texto central según fondo
    const textoCentral = document.querySelector(".mision-texto-centrado");
    if (textoCentral) {
        textoCentral.style.color = progress > 0.6 ? "#1b4332" : "#ffffff";
    }

    // Revelar cartas según progreso
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

// INTERACCIÓN POP-IT DE LAS CARTAS (SOPORTE PARA SCROLL INTERNO)
document.querySelectorAll(".carta-pop").forEach(carta => {
    carta.addEventListener("click", (e) => {
        // Evita cerrar la carta si se hace scroll o click dentro del cuadro de texto interno
        if (e.target.closest('.carta-contenido')) return;
        carta.classList.toggle("open");
    });
});

// CONTADOR REGRESIVO CORREGIDO
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

// INTERACCIÓN FAQ (BARRA LATERAL Y PANTALLA)
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
// ==========================================================
// DETECTOR Y CARGADOR AUTOMÁTICO DE IMÁGENES
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    const imagenes = document.querySelectorAll("img");

    imagenes.forEach((img) => {
        const rutaOriginal = img.getAttribute("src");
        if (!rutaOriginal) return;

        // Extraer la ruta base sin extensión y la extensión actual
        const puntoPos = rutaOriginal.lastIndexOf(".");
        if (puntoPos === -1) return;

        const baseRuta = rutaOriginal.substring(0, puntoPos); // Ej: IMAGENES/actividades/rapel
        const extensionOriginal = rutaOriginal.substring(puntoPos); // Ej: .jpg

        // Lista de posibles nombres y extensiones a probar si la original falla
        const variantes = [
            baseRuta + extensionOriginal,
            baseRuta + ".jpg",
            baseRuta + ".JPG",
            baseRuta + ".jpeg",
            baseRuta + ".png",
            baseRuta + ".PNG",
            baseRuta + ".webp",
            // Probamos agregando/quitando doble 'p' para rapel/rappel
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
                // Intenta con la siguiente variante de nombre/extensión
                img.src = variantes[intentoActual];
            } else {
                // Si ninguna funciona, muestra una imagen o color de respaldo
                console.warn(`No se pudo encontrar la imagen para: ${rutaOriginal}`);
                img.alt = "Imagen no encontrada (" + rutaOriginal + ")";
            }
        };
    });
});
