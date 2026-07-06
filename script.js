
// REVEAL
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
});

sections.forEach(s => observer.observe(s));

// SMOOTH
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(a.getAttribute("href"))
      .scrollIntoView({behavior:"smooth"});
  });
});

// CONTADOR
const fecha = new Date("2026-10-01");
const c = document.getElementById("countdown");

function update(){
  const d = Math.ceil((fecha - new Date()) / 86400000);
  c.textContent = d > 0 ? d + " días" : "Ya comenzó";
}
update();

// PARTÍCULAS
setInterval(() => {
  const p = document.createElement("div");
  p.style.position="fixed";
  p.style.left=Math.random()*100+"vw";
  p.style.top="100vh";
  p.style.width="4px";
  p.style.height="4px";
  p.style.background="white";
  p.style.opacity="0.5";
  document.body.appendChild(p);

  setTimeout(()=>p.remove(),8000);
},200);
