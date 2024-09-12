function Imprimir() {
    debugger;

    var Id = e.dataItem.Id;
   
   if (e.dataItem.Actividad == "COB Estudio preliminar") {
    debugger;   
    window.open(`https://bi.lappiz.io/reports/report/Report%20Parts/PGN/EstudioPreliminar?rs:Command=Render&Id=${Id}&rs:embed=true`);
   }    
   else{
    toastr.info("El formato de impresion no corresponde a la actividad seleccionada");
   }

   if (e.dataItem.Actividad == "EOP Asunto abreviado") {
    debugger;   
    window.open(`https://bi.lappiz.io/reports/report/Report%20Parts/PGN/Formato_Asunto_Abreviado?rs:Command=Render&Id=${Id}&rs:embed=true`);
   }    
   else{
    toastr.info("El formato de impresion no corresponde a la actividad seleccionada");
   } 

   if (e.dataItem.Actividad == "EOP Asunto ordinario") {
    debugger;   
    window.open(`https://bi.lappiz.io/reports/report/Report%20Parts/PGN/Formato_Asunto_Ordinario?rs:Command=Render&Id=${Id}&rs:embed=true`);
   }    
   else{
    toastr.info("El formato de impresion no corresponde a la actividad seleccionada");
   } 

   if (e.dataItem.Actividad == "EOP Caso preventivo") {
    debugger;   
    window.open(`https://bi.lappiz.io/reports/report/Report%20Parts/PGN/Fromato_Caso_Preventivo?rs:Command=Render&Id=${Id}&rs:embed=true`);
   }    
   else{
    toastr.info("El formato de impresion no corresponde a la actividad seleccionada");
   } 


   if (e.dataItem.Actividad == "EOP Proyecto preventivo") {
    debugger;   
    window.open(`https://bi.lappiz.io/reports/report/Report%20Parts/PGN/Formato_Proyecto_Preventivo?rs:Command=Render&Id=${Id}&rs:embed=true`);
   }    
   else{
    toastr.info("El formato de impresion no corresponde a la actividad seleccionada");
   }

   if (e.dataItem.Actividad == "Intervencion") {
    debugger;   
    window.open(`https://bi.lappiz.io/reports/report/Report%20Parts/PGN/Formato_intervencion?rs:Command=Render&Id=${Id}&rs:embed=true`);
   }    
   else{
    toastr.info("El formato de impresion no corresponde a la actividad seleccionada");
   }

}



_________________________________________________________

sessionStorage.idSolicitud

e.dataItem.Actividad

if (e.dataItem.Actividad == "Estudio Preliminar") {
 debugger;   
 window.open("https://bi.lappiz.io/reports/report/Report%20Parts/PGN/EstudioPreliminar&rs:embed=true");
}


window.open(`https://bi.lappiz.io/reports/report/Report%20Parts/PGN/Formato_Asunto_Ordinario?rs:Command=Render&Id=${Id}&rs:embed=true`);

https://bi.lappiz.io/reports/report/Report%20Parts/PGN/Formato_Proyecto_Preventivo?rs:Command=Render&Id=${Id}&rs:embed=true

https://bi.lappiz.io/reports/report/Report%20Parts/PGN/Formato_intervencion?rs:Command=Render&Id=${Id}&rs:embed=true