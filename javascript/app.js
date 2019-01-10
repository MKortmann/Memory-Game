"use strict";

/*Board Construction Initialization*/
var arrayIcons = ["3d_rotation","fingerprint","delete","delete","bug_report","extension","extension","android",
                    "card_giftcard","fingerprint","face","face","card_giftcard","3d_rotation","android","bug_report"];
var arraySpan = ["#span-9","#span-10","#span-11","#span-4","#span-5", "#span-13","#span-7","#span-14",
                   "#span-1","#span-2","#span-3","#span-12","#span-6", "#span-8","#span-15","#span-16"];

var randomNumber = 0;
var arrayIconsRandom = new Array(16);
/*Creating random numbers using this forLoop and Math function*/
for (let iLoop=arrayIcons.length-1; iLoop>= 0; iLoop--) {
  randomNumber = Math.floor(Math.random()*iLoop);
  arrayIconsRandom[iLoop] = arrayIcons[randomNumber];
  arrayIcons.splice(randomNumber,1); /*to make sure it will keep the same elemtens*/
}
/*Game Grid Initialization*/
for (let iLoop = 15; iLoop >= 0; iLoop--) {
  document.querySelector(arraySpan[iLoop]).textContent = arrayIconsRandom[iLoop];
  arrayIcons.splice(iLoop,1);
  arraySpan.splice(iLoop,1);
}

document.querySelector("#grid-container").addEventListener("click", function(evt){
/*if(evt.target.nodeName === "SPAN") {*/
  console.log(evt.target.textContent); /*show the symbol name*/
  console.log(evt.currentTarget.nodeName.toLowerCase()); /*div*/
  console.log(evt.target.children); /*get the hole element*/
  console.log(evt.target.children[0]); /*the the span with id and class*/
  console.log(evt.target.children[0].id); /*get the id*/
console.log(evt);
  console.log(evt.path[0].id); /*get the div*/
});
/*
document.querySelector("#div-1").addEventListener("click", function(){
  document.querySelector("#span-1").classList.toggle("material-icons");
  document.querySelector("#span-1").classList.toggle("hide");
});
document.querySelector("#div-2").addEventListener("click", function(){
  document.querySelector("#span-2").classList.toggle("material-icons");
  document.querySelector("#span-2").classList.toggle("hide");
});
document.querySelector("#div-3").addEventListener("click", function(){
  document.querySelector("#span-3").classList.toggle("material-icons");
  document.querySelector("#span-3").classList.toggle("hide");
});
document.querySelector("#div-4").addEventListener("click", function(){
  document.querySelector("#span-4").classList.toggle("material-icons");
  document.querySelector("#span-4").classList.toggle("hide");
});
document.querySelector("#div-5").addEventListener("click", function(){
  document.querySelector("#span-5").classList.toggle("material-icons");
  document.querySelector("#span-5").classList.toggle("hide");
});
document.querySelector("#div-6").addEventListener("click", function(){
  document.querySelector("#span-6").classList.toggle("material-icons");
  document.querySelector("#span-6").classList.toggle("hide");
});
document.querySelector("#div-7").addEventListener("click", function(){
  document.querySelector("#span-7").classList.toggle("material-icons");
  document.querySelector("#span-7").classList.toggle("hide");
});
document.querySelector("#div-8").addEventListener("click", function(){
  document.querySelector("#span-8").classList.toggle("material-icons");
  document.querySelector("#span-8").classList.toggle("hide");
});
document.querySelector("#div-9").addEventListener("click", function(){
  document.querySelector("#span-9").classList.toggle("material-icons");
  document.querySelector("#span-9").classList.toggle("hide");
});
document.querySelector("#div-10").addEventListener("click", function(){
  document.querySelector("#span-10").classList.toggle("material-icons");
  document.querySelector("#span-10").classList.toggle("hide");
});
document.querySelector("#div-11").addEventListener("click", function(){
  document.querySelector("#span-11").classList.toggle("material-icons");
  document.querySelector("#span-11").classList.toggle("hide");
});
document.querySelector("#div-12").addEventListener("click", function(){
  document.querySelector("#span-12").classList.toggle("material-icons");
  document.querySelector("#span-12").classList.toggle("hide");
});
document.querySelector("#div-13").addEventListener("click", function(){
  document.querySelector("#span-13").classList.toggle("material-icons");
  document.querySelector("#span-13").classList.toggle("hide");
});
document.querySelector("#div-14").addEventListener("click", function(){
  document.querySelector("#span-14").classList.toggle("material-icons");
  document.querySelector("#span-14").classList.toggle("hide");
});
document.querySelector("#div-15").addEventListener("click", function(){
  document.querySelector("#span-15").classList.toggle("material-icons");
  document.querySelector("#span-15").classList.toggle("hide");
});
document.querySelector("#div-16").addEventListener("click", function(){
  document.querySelector("#span-16").classList.toggle("material-icons");
  document.querySelector("#span-16").classList.toggle("hide");
});*/
