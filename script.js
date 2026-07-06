
// =======================
// 1. REVEAL AL SCROLL
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

sections.forEach(section => {
  observer.observe(section);
});


// =======================
// 2. SMOOTH SCROLL (refuerzo)
// =======================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// =======================
// 3. NAVBAR ACTIVA (highlight)
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
// 4. PARTÍCULAS DINÁMICAS
// =======================

const particlesContainer = document.querySelector(".particles");

function createParticle() {
  const particle = document.createElement("span");

  particle.style.position = "absolute";
  particle.style.width = "6px";
  particle.style.height = "6px";
  particle.style.background = "rgba(255,255,255,0.4)";
  particle.style.borderRadius = "50%";

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = "100vh";

  particle.style.animation = `rise ${5 + Math.random() * 10}s linear`;

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 12000);
}

setInterval(createParticle, 300);


// =======================
// 5. ANIMACIÓN DE PARTÍCULAS (CSS INJECT)
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
  font-weight: bold;
}
`;

document.head.appendChild(style);
