/*==================================================
NATURALEZA Y VIDA
Expedición San Martín de los Andes
==================================================*/


/*==========================================
LOADER
==========================================*/

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},800);

}

});


/*==========================================
NAVBAR
==========================================*/

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});
/*==========================================
SCROLL REVEAL
==========================================*/

const reveals=document.querySelectorAll(

".reveal,.reveal-left,.reveal-right,.reveal-zoom"

);

function mostrar(){

reveals.forEach(item=>{

const top=item.getBoundingClientRect().top;

const visible=window.innerHeight-120;

if(top<visible){

item.classList.add("active");

}

});

}

window.addEventListener("scroll",mostrar);

mostrar();
/*==========================================
CUENTA REGRESIVA
==========================================*/

const destino=new Date("September 29, 2026 10:00:00").getTime();

const contador=document.getElementById("contador");

if(contador){

setInterval(()=>{

const ahora=new Date().getTime();

const diferencia=destino-ahora;

const dias=Math.floor(

diferencia/(1000*60*60*24)

);

contador.innerHTML=

dias+" días";

},1000);

}
/*==========================================
HOJAS
==========================================*/

const hojas=18;

for(let i=0;i<hojas;i++){

const hoja=document.createElement("div");

hoja.className="hoja";

hoja.innerHTML="🍃";

hoja.style.left=Math.random()*100+"vw";

hoja.style.animationDuration=

12+Math.random()*10+"s";

hoja.style.animationDelay=

Math.random()*10+"s";

document.body.appendChild(hoja);

}
/*==========================================
PARALLAX
==========================================*/

window.addEventListener("mousemove",(e)=>{

const hero=document.querySelector(".hero");

if(!hero) return;

const x=e.clientX/window.innerWidth;

const y=e.clientY/window.innerHeight;

hero.style.backgroundPosition=

`${50+x*3}% ${50+y*3}%`;

});
/*==========================================
 * JUEGO DE LA MOCHILA (DRAG & DROP)
 *==========================================*/
const objetosPermitidos = ["🔦", "🥾", "💧", "🧴", "⛺", "🩹"]; // Elementos de expedición
const mochila = document.querySelector(".mochila");
const contenedorObjetos = document.querySelector(".objetos");

// Configurar los elementos arrastrables
document.querySelectorAll(".objeto").forEach(objeto => {
    objeto.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.innerText);
        objeto.style.opacity = "0.5";
    });

    objeto.addEventListener("dragend", () => {
        objeto.style.opacity = "1";
    });
});

// Configurar la zona de la mochila
if (mochila) {
    mochila.addEventListener("dragover", (e) => {
        e.preventDefault(); // Permitir soltar
        mochila.style.borderColor = "var(--verde-claro, #4caf50)";
    });

    mochila.addEventListener("dragleave", () => {
        mochila.style.borderColor = "var(--verde)";
    });

    mochila.addEventListener("drop", (e) => {
        e.preventDefault();
        mochila.style.borderColor = "var(--verde)";
        
        const item = e.dataTransfer.getData("text/plain");
        
        // Verificar si el objeto es apto para la expedición
        if (objetosPermitidos.some(el => item.includes(el))) {
            mochila.innerHTML = `🎒 <div style="font-size: 20px; color: green; font-weight: bold;">¡${item} guardado con éxito!</div>`;
            // Aquí puedes sumar puntos o lanzar un sonido de éxito ✅
        } else {
            mochila.innerHTML = `🎒 <div style="font-size: 20px; color: red; font-weight: bold;">¡${item} no sirve para Hua Hum!</div>`;
            // Efecto de rebote o error ❌
            setTimeout(() => {
                mochila.innerHTML = "🎒 <p>Arrastrá tu equipo acá</p>";
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
            <div class="quiz-box animate__animated animate__fadeIn">
                <h3>Pregunta ${preguntaActual + 1} de ${preguntasQuiz.length}</h3>
                <p class="pregunta-texto">${p.pregunta}</p>
                <div class="opciones-container">
                    ${p.opciones.map((opcion, index) => `
                        <button class="btn-opcion" onclick="verificarRespuesta(${index})">${opcion}</button>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        generarPasaporte();
    }
}

window.verificarRespuesta = function(indiceSeleccionado) {
    if (indiceSeleccionado === preguntasQuiz[preguntaActual].correcta) {
        puntaje++;
        // Aquí podrías agregar un efecto visual de acierto (verde)
    }
    preguntaActual++;
    mostrarPregunta();
};

function generarPasaporte() {
    const contenedorQuiz = document.getElementById("quiz-contenedor");
    if (!contenedorQuiz) return;

    const aprobado = puntaje >= 2; // Aprueba con 2 o más correctas
    
    if (aprobado) {
        contenedorQuiz.innerHTML = `
            <div class="pasaporte animate__animated animate__flipInY">
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
                <button class="btn-reiniciar" onclick="reiniciarQuiz()">Intentar de nuevo 🔄</button>
            </div>
        `;
    }
}

window.reiniciarQuiz = function() {
    preguntaActual = 0;
    puntaje = 0;
    mostrarPregunta();
};

// Iniciar el quiz cuando cargue el documento
document.addEventListener("DOMContentLoaded", () => {
    mostrarPregunta();
});
