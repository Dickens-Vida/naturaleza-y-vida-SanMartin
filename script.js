const sections=document.querySelectorAll(".section");

const obs=new IntersectionObserver(e=>{
e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("show")})
});

sections.forEach(s=>obs.observe(s));

document.querySelectorAll("a[href^='#']").forEach(a=>{
a.onclick=e=>{
e.preventDefault();
document.querySelector(a.getAttribute("href")).scrollIntoView({behavior:"smooth"})
}
});

// contador
const fecha=new Date("2026-10-01");
const c=document.getElementById("countdown");

setInterval(()=>{
let d=Math.ceil((fecha-new Date())/86400000);
c.textContent=d>0?d+" días":"ya comenzó"
},1000);

// partículas
setInterval(()=>{
let p=document.createElement("div");
p.style.position="fixed";
p.style.left=Math.random()*100+"vw";
p.style.top="100vh";
p.style.width="4px";
p.style.height="4px";
p.style.background="white";
document.body.appendChild(p);
setTimeout(()=>p.remove(),8000);
},200);

// MODO PRESENTACIÓN AUTOMÁTICO (PRO)
let autoScroll=false;
let i=0;

setInterval(()=>{
if(autoScroll){
window.scrollTo(0,i);
i+=2;
}
},50);

// activar con tecla P
document.addEventListener("keydown",e=>{
if(e.key==="p") autoScroll=!autoScroll;
});
