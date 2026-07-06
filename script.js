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
