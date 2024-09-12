var idVista = getAppViewId();
const APPVIEWSIDS = { 
    permisosalida: "cdda4749-6245-4c53-82a7-991a96faab4d",
    // agregar todos los ids de los formularios
    NOMBREFORM: "",
}
if (idVista == APPVIEWSIDS.permisosalida) {
   ocultarcampo()
}
// Creear en evento General
function ocultarcampo(){
    debugger;

    let value = '';
    let campoId = '4ef7faa2-9e6f-43cb-8005-773189244935';

    if(value == ''){
        visibilityField(campoId, false)
    }else{
        visibilityField(campoId, true)
    }
} 
