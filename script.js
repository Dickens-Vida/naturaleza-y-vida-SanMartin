
// =======================
// 1. ANIMACIÓN AL SCROLL (REVEAL)
// =======================

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

sections.forEach(section => observer.observe(section));


// =======================
// 2. SMOOTH SCROLL
// =======================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// =======================
// 3. NAVBAR ACTIVA (SECCIÓN ACTUAL)
// =======================

const navLinks = document.querySelectorAll(".navbar .links a");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 150;

  document.querySelectorAll("section").forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + section.id) {
          link.classList.add("active");
        }
      });
    }
  });
});


// =======================
// 4. CONTADOR DE DÍAS
// =======================

// 👉 CAMBIÁ ESTA FECHA POR LA REAL DEL VIAJE
const fechaViaje = new Date("2026-10-01");

const countdown = document.getElementById("countdown");

function actualizarContador() {
  const ahora = new Date();
  const diferencia = fechaViaje - ahora;

  const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

  if (dias > 0) {
    countdown.textContent = `${dias} días restantes para la expedición`;
  } else {
    countdown.textContent = "¡La expedición ya comenzó!";
  }
}

actualizarContador();


// =======================
// 5. PARTÍCULAS DINÁMICAS
// =======================

const particlesContainer = document.querySelector(".particles");

function createParticle() {
  const particle = document.createElement("span");

  particle.style.position = "absolute";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "rgba(255,255,255,0.5)";
  particle.style.borderRadius = "50%";

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = "100vh";

  particle.style.animation = `rise ${5 + Math.random() * 10}s linear`;

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 12000);
}

setInterval(createParticle, 250);


// =======================
// 6. KEYFRAMES INJECTADOS
// =======================

const style = document.createElement("style");

style.innerHTML = `
@keyframes rise {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-120vh);
    opacity: 0;
  }
}

.navbar .links a.active {
  color: #2ecc71;
  font-weight: 700;
}
`;

document.head.appendChild(style);
