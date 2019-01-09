"use strict";

/*Board Construction Initialization*/

const arrayIcons = ["cloud","home","delete","search","refresh","person","close","arrow_back"];

var arraySpan = ["#span-1","#span-2","#span-3","#span-4","#span-5", "#span-6","#span-7","#span-8",
                   "#span-9","#span-10","#span-11","#span-12","#span-13", "#span-14","#span-15","#span-16"];

var arrayNumbers = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var removeNumber = 0;

for (let i = 15; i >= 0; i--) {
   console.log("Printing out i = " + i);

  removeNumber = Math.floor(Math.random() * i);
  console.log(removeNumber);
  document.querySelector(arraySpan[removeNumber]).textContent = arrayIcons[arrayNumbers[removeNumber]];

  console.log(arraySpan[removeNumber]);
  console.log(arrayIcons[arrayNumbers[removeNumber]]);
  arrayNumbers.splice(removeNumber,1);
  arraySpan.splice(removeNumber,1);
  /*console.log(arrayNumbers);
  console.log(arraySpan);*/

}



  /*removeNumber = Math.floor(Math.random() * index);
  console.log(removeNumber);
  document.querySelector(arraySpan[removeNumber]).textContent = arrayIcons[arrayNumbers[removeNumber]];

  console.log(arraySpan[removeNumber]);
  console.log(arrayIcons[arrayNumbers[removeNumber]]);
  arrayNumbers.pop(removeNumber);
  arraySpan.pop(removeNumber); */






document.querySelector("#div-1").addEventListener("click", function(){
  const removeNumber = Math.floor(Math.random() * 16);
  arrayNumbers.pop(removeNumber);
  document.querySelector("#span-1").textContent = arrayIcons[arrayNumbers[removeNumber]];
  console.log(removeNumber);
  console.log(arrayNumbers);
});

document.querySelector("#div-2").addEventListener("click", function(){
  document.querySelector("#span-2").textContent = arrayIcons[1];
});

document.querySelector("#div-3").addEventListener("click", function(){
  document.querySelector("#span-3").textContent = arrayIcons[2];
});

document.querySelector("#div-4").addEventListener("click", function(){
  document.querySelector("#span-4").textContent = arrayIcons[3];
});
