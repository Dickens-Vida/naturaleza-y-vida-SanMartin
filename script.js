/* ==========================================================
   PRÁCTICAS LUDOMOTRICES EN EL ÁMBITO NATURAL
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. OCULTAR LOADER
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // 2. NAVBAR SCROLL
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. CONTADOR REGRESIVO
    const contador = document.getElementById('contador');
    const fechaSalida = new Date('September 29, 2026 10:00:00').getTime();

    function actualizarContador() {
        if (!contador) return;
        const ahora = new Date().getTime();
        const diferencia = fechaSalida - ahora;

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            contador.innerText = `Faltan ${dias}d ${horas}h para la expedición 🌲`;
        } else {
            contador.innerText = "¡Expedición en curso! 🏔️";
        }
    }
    setInterval(actualizarContador, 1000);
    actualizarContador();

    // 4. TRANSICIÓN MISIÓN + POP-IT
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

    // 5. JUEGO DE LA MOCHILA
    const objetos = document.querySelectorAll('.objeto');
    const statusMochila = document.getElementById('mochila-status');
    const zonaMochila = document.querySelector('.mochila');
    let cargados = 0;
    const totalCorrectos = document.querySelectorAll('.objeto.correcto').length;

    function agregarElementoAMochila(elemento) {
        if (elemento.classList.contains('correcto')) {
            elemento.style.display = 'none';
            cargados++;
            statusMochila.innerText = `¡Bien! Guardaste ${cargados} de ${totalCorrectos} elementos indispensables.`;
            
            if (cargados === totalCorrectos) {
                statusMochila.innerText = '🎉 ¡Mochila completa! Tenés todo listo para Hua Hum.';
            }
        } else {
            alert('⚠️ Este objeto no es indispensable o adecuado para una expedición agreste.');
        }
    }

    objetos.forEach(obj => {
        obj.addEventListener('click', () => agregarElementoAMochila(obj));

        obj.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.innerText);
            e.target.classList.add('dragging');
        });

        obj.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });

    if (zonaMochila) {
        zonaMochila.addEventListener('dragover', (e) => e.preventDefault());
        zonaMochila.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggingObj = document.querySelector('.objeto.dragging');
            if (draggingObj) agregarElementoAMochila(draggingObj);
        });
    }

    // 6. EXAMEN DE SUPERVIVENCIA INTERACTIVO
    const preguntasQuiz = [
        {
            pregunta: "¿Cuál es el sistema primario de comunicación en Hua Hum ante la falta de señal celular?",
            opciones: [
                "Red de datos satelital comercial",
                "Radios VHF enlazadas con Guardaparques y hosterías",
                "Mensajería por redes sociales",
                "Señales de luz nocturnas"
            ],
            correcta: 1
        },
        {
            pregunta: "¿Qué vestimenta es técnica e indispensable para el ascenso al Cerro Mallo?",
            opciones: [
                "Ropa de algodón ligera",
                "Campera impermeable, abrigo polar y remera térmica",
                "Muda de ropa urbana común",
                "Únicamente cortavientos sin abrigo"
            ],
            correcta: 1
        },
        {
            pregunta: "Ante una alerta meteorológica en la montaña, ¿cuál es el procedimiento oficial?",
            opciones: [
                "Acelerar el paso para completar el recorrido",
                "Reorganizar actividades según disposiciones de Parques Nacionales",
                "Regresar de forma individual",
                "Suspender definitivamente el viaje completo"
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
                alert("❌ Respuesta incorrecta. En la montaña la prevención es fundamental. Se reinicia el examen de acreditación.");
                indicePregunta = 0;
                renderizarPregunta();
            }, 500);
        }
    }

    function renderizarPasaporte() {
        quizContenedor.innerHTML = `
            <div class="pasaporte-card">
                <div class="pasaporte-header">
                    <h3>ISEF Nº2 FEDERICO DICKENS</h3>
                    <p style="font-size: 0.85rem; font-weight: 700; color: #556b60;">EXPEDICIÓN SAN MARTÍN DE LOS ANDES</p>
                </div>
                <div class="pasaporte-badge">🌲🎫🏔️</div>
                <h2 style="color: #1b4332; margin-bottom: 5px;">PASAPORTE AL BOSQUE</h2>
                <div class="pasaporte-status">ACREDITADO / APTO SUPERVIVENCIA</div>
                <p style="font-size: 0.95rem; line-height: 1.5; color: #2f3b37; margin: 15px 0;">
                    Has demostrado los conocimientos de seguridad, logística y protocolos necesarios para realizar la travesía de forma segura.
                </p>
                <button class="btn-reiniciar" id="btn-reset-quiz">Realizar nuevamente el test</button>
            </div>
        `;

        document.getElementById('btn-reset-quiz').addEventListener('click', () => {
            indicePregunta = 0;
            renderizarPregunta();
        });
    }

    renderizarPregunta();

    // 7. SECCIÓN FAQ
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
