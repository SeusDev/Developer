debugger;

let lr = document.getElementById('f12d53f0-67a9-4ce2-b96f-546ca585bcb7').value;
let mr = document.getElementById('df9ef096-9940-466f-bb15-35ed915f627e').value;
let mir = document.getElementById('56d4b7b5-45e5-46ff-89d6-040554097bd4').value;
let jr = document.getElementById('27fb60e4-857d-4f6b-83dc-c36c6d213b05').value;
let vr = document.getElementById('6cb89b26-7f3f-40b7-8f5a-fb42f00918fe').value;
let sr= document.getElementById('40d50386-68fd-48a1-8144-064033d17b47').value;
let dr = document.getElementById('93c78338-5b0d-4a13-9446-598f1b1c77ce').value;

let lunes = JSON.parse(lr);
let martes = JSON.parse(mr);
let miercoles = JSON.parse(mir);
let jueves = JSON.parse(jr);
let viernes = JSON.parse(vr);
let sabado= JSON.parse(sr);
let domingo = JSON.parse(dr);

let numeros = [lunes, martes, miercoles, jueves, viernes,sabado,domingo];
let suma = numeros.reduce((a, b) => a + b, 0);
console.log(suma); 
let fieldId = '794f6f2e-f342-4c85-bba4-f1ffb9b3e709';
setFieldValue(fieldId, suma);


let cantidad = document.getElementById('794f6f2e-f342-4c85-bba4-f1ffb9b3e709').value;
let valor = document.getElementById('772be22e-d4b7-4e0f-af8c-3ffa16d0154d').value;
let cantidadr = JSON.parse(cantidad);
let recoleccion = JSON.parse(valor);

let total = cantidadr * recoleccion;
let fieldId1 = '5bbac65a-246a-4265-95fd-a5b0678954d6';
setFieldValue(fieldId1, total);


debugger;
let cantidad = document.getElementById('23f7592c-c036-43e3-8b66-c027969fca28').value;
let valorInsumo= document.getElementById('d63dd5be-6bbb-4d7d-9cbd-b2c2a9d2c5fb').value;
let cantidadi = JSON.parse(cantidad);
let totalInsumo = JSON.parse(valorInsumo);

let suma = cantidadi * totalInsumo 
let fieldId = 'f1a94046-0056-429c-8865-c2bd12e098d3';
setFieldValue(fieldId, suma)

