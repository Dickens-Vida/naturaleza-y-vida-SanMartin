/* ==========================================================
   PRÁCTICAS LUDOMOTRICES EN EL ÁMBITO NATURAL
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. LOADER
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 1200);

    // 2. NAVBAR SCROLL
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // 3. CONTADOR REGRESIVO
    const fechaSalida = new Date('September 29, 2026 10:00:00').getTime();
    const contador = document.getElementById('contador');

    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = fechaSalida - ahora;

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            contador.innerText = `Faltan ${dias}d ${horas}h para Hua Hum 🌲`;
        } else {
            contador.innerText = "¡En expedición! 🏔️";
        }
    }
    setInterval(actualizarContador, 1000);
    actualizarContador();

    // 4. TRANSICIÓN DE SCROLL Y CARTAS POP-IT
    const seccionScroll = document.querySelector('.seccion-mision-scroll');
    const cartas = document.querySelectorAll('.carta-pop');
    const textoMision = document.querySelector('.mision-texto-centrado');

    window.addEventListener('scroll', () => {
        if (!seccionScroll) return;

        const rect = seccionScroll.getBoundingClientRect();
        const altoSeccion = seccionScroll.offsetHeight - window.innerHeight;
        const progreso = Math.min(Math.max(-rect.top / altoSeccion, 0), 1);

        const r = Math.round(12 + (241 - 12) * progreso);
        const g = Math.round(24 + (239 - 24) * progreso);
        const b = Math.round(19 + (231 - 19) * progreso);

        seccionScroll.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        if (progreso > 0.6) {
            textoMision.style.color = '#1b4332';
        } else {
            textoMision.style.color = '#ffffff';
        }

        cartas.forEach((carta, idx) => {
            const umbral = (idx + 1) * 0.2;
            if (progreso >= umbral) {
                carta.classList.add('visible');
            } else {
                carta.classList.remove('visible');
            }
        });
    });

    cartas.forEach(carta => {
        carta.addEventListener('click', () => {
            carta.classList.toggle('open');
        });
    });

    // 5. MINIJUEGO DE LA MOCHILA
    const objetos = document.querySelectorAll('.objeto');
    const statusMochila = document.getElementById('mochila-status');
    let cargados = 0;

    objetos.forEach(obj => {
        obj.addEventListener('click', () => {
            if (obj.classList.contains('correcto')) {
                obj.style.display = 'none';
                cargados++;
                statusMochila.innerText = `¡Bien hecho! Guardaste ${cargados} de 5 elementos indispensables.`;
                if (cargados === 5) {
                    statusMochila.innerText = '🎉 ¡Excelente! Tu mochila está lista para la expedición a Hua Hum.';
                }
            } else {
                alert('⚠️ Ese elemento no es apto o indispensable para la mochila de trekking en la Patagonia.');
            }
        });
    });

    // 6. EXAMEN DE SUPERVIVENCIA - PASAPORTE AL BOSQUE
    const preguntasQuiz = [
        {
            pregunta: "¿Cuál es el sistema primario de comunicación del equipo docente durante las actividades agrestes en Hua Hum y Lago Queñi?",
            opciones: [
                "Red de telefonía celular 4G / 5G",
                "Radios VHF enlazadas con Guardaparques y hosterías",
                "Mensajería por redes sociales institucionales",
                "Señales de humo y silbatos de emergencia"
            ],
            correcta: 1
        },
        {
            pregunta: "¿Qué vestimenta técnica es fundamental llevar en la mochila de ataque para el ascenso al Cerro Mallo?",
            opciones: [
                "Ropa de algodón liviana e impermeable de repuesto",
                "Campera impermeable, abrigo polar y remera térmica",
                "Muda de ropa urbana y calzado ligero de lona",
                "Únicamente cortaviento sin abrigo interno"
            ],
            correcta: 1
        },
        {
            pregunta: "En caso de alerta meteorológica o tormenta repentina en la zona de campamento, ¿cuál es el protocolo?",
            opciones: [
                "Continuar la travesía prevista a ritmo acelerado",
                "Reorganizar las actividades en zonas protegidas según indicaciones de Parques Nacionales",
                "Regresar individualmente al micro de traslado",
                "Suspender permanentemente la expedición y volver a Buenos Aires"
            ],
            correcta: 1
        }
    ];

    let indicePregunta = 0;
    const quizContenedor = document.getElementById('quiz-contenedor');

    function renderizarPregunta() {
        if (!quizContenedor) return;

        if (indicePregunta >= preguntasQuiz.length) {
            renderizarPasaporte();
            return;
        }

        const q = preguntasQuiz[indicePregunta];

        quizContenedor.innerHTML = `
            <div class="card-quiz slide-in-right" id="current-quiz-card">
                <div class="quiz-header-step">Pregunta ${indicePregunta + 1} de ${preguntasQuiz.length}</div>
                <h3 class="quiz-pregunta">${q.pregunta}</h3>
                <div class="quiz-opciones">
                    ${q.opciones.map((op, i) => `
                        <button class="btn-opcion" data-index="${i}">${op}</button>
                    `).join('')}
                </div>
            </div>
        `;

        document.querySelectorAll('.btn-opcion').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seleccion = parseInt(e.target.getAttribute('data-index'));
                validarRespuesta(seleccion);
            });
        });
    }

    function validarRespuesta(seleccion) {
        const card = document.getElementById('current-quiz-card');
        const q = preguntasQuiz[indicePregunta];

        if (seleccion === q.correcta) {
            card.classList.add('slide-out-left');
            setTimeout(() => {
                indicePregunta++;
                renderizarPregunta();
            }, 400);
        } else {
            card.classList.add('error-shake');
            setTimeout(() => {
                alert("❌ Respuesta incorrecta. Un error en la montaña pone en riesgo a la patrulla. Volvés a iniciar la acreditación.");
                indicePregunta = 0;
                renderizarPregunta();
            }, 500);
        }
    }

    function renderizarPasaporte() {
        quizContenedor.innerHTML = `
            <div class="pasaporte-card">
                <div class="pasaporte-header">
                    <h3>INSTITUTO SUPERIOR DE EDUCACIÓN FÍSICA Nº2 FEDERICO DICKENS</h3>
                    <p style="font-size: 0.85rem; font-weight: 700; color: #556b60;">PRÁCTICAS LUDOMOTRICES Y CONDUCCIÓN EN EL ÁMBITO NATURAL</p>
                </div>
                <div class="pasaporte-badge">🌲🎫🏔️</div>
                <h2 style="color: #1b4332; margin-bottom: 5px;">PASAPORTE AL BOSQUE</h2>
                <div class="pasaporte-status">ACREDITADO / APTO SUPERVIVENCIA</div>
                <p style="font-size: 0.95rem; line-height: 1.5; color: #2f3b37; margin: 15px 0;">
                    Has demostrado los conocimientos técnicos, de seguridad y protocolos exigidos para la expedición educativa en San Martín de los Andes y Hua Hum.
                </p>
                <button class="btn-reiniciar" id="btn-reset-quiz">Realizar nuevamente el examen</button>
            </div>
        `;

        document.getElementById('btn-reset-quiz').addEventListener('click', () => {
            indicePregunta = 0;
            renderizarPregunta();
        });
    }

    renderizarPregunta();

    // 7. FAQ INTERACTIVO
    const puntosNodo = document.querySelectorAll('.punto-nodo');
    const cuadrosPanel = document.querySelectorAll('.cuadro-panel');

    function activarNodo(targetId) {
        puntosNodo.forEach(p => {
            if (p.getAttribute('data-target') === targetId) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });

        cuadrosPanel.forEach(panel => {
            if (panel.id === targetId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    puntosNodo.forEach(nodo => {
        const target = nodo.getAttribute('data-target');
        nodo.addEventListener('click', () => activarNodo(target));
        nodo.addEventListener('mouseenter', () => activarNodo(target));
    });

});
