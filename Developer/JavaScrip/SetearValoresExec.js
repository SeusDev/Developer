debugger;

let proyectofk = e.dataItem.ProyectosClientesFK;

let query = `select 
pc.Nombreproyecto [Nombreproyecto],
pc.Codigo [Codigo],
pc.Fecha [Fecha]
from Eje360_Lappiz_Proyecto p 
right join Eje360_Lappiz_Proyectosclientes pc on p.ProyectosClientesFK = p.Id
where pc.Id ='${proyectofk}'`

execQuery(query).then((response)=>{
let codigo = response[0][0].Codigo;
let Nombreproyecto = response[0][0].Nombreproyecto;
let Fecha=  response[0][0].Fecha
    
e.dataItem.Codigo = codigo
e.dataItem.Nombreproyecto = Nombreproyecto
e.dataItem.Fecha = Fecha
})