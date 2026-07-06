// ==========================
// NATURALEZA Y VIDA
// Expedición San Martín
// ==========================

// Mensaje de bienvenida
console.log("🌲 Bienvenido a Naturaleza y Vida");

// Animación suave al cargar la página
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Scroll suave para el botón "Comenzar la Expedición"
const boton = document.querySelector(".boton");

if (boton) {
    boton.addEventListener("click", function (e) {
        e.preventDefault();

        const destino = document.querySelector("#bienvenida");

        destino.scrollIntoView({
            behavior: "smooth"
        });
    });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".section").forEach((el) => observer.observe(el));
