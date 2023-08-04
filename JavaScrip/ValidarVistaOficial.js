var idVista = getAppViewId();
const APPVIEWSIDS = { 
    PERSONAJURIDICA: "2b11d437-94e7-451e-90a7-4d1a0d789b95",
    // agregar todos los ids de los formularios
    NOMBREFORM: "",
}
if (idVista == APPVIEWSIDS.PERSONAJURIDICA) {
   CargarLogicaPersonasJuridicas()
}
// Creear en evento General
function CargarLogicaPersonasJuridicas(){
    try {
        // Obtener referencia al elemento sobre el cual queremos mostrar el mensaje
        const miElemento = document.getElementById('1da753eb-9200-4b46-9dbb-e0ce2fccc4af');

        miElemento.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('label').title='En cumplimiento de la Ley 2195 de 2022, parágrafos 4 y 5 del Artículo 12 Principio de Debida Diligencia, EL CLIENTE entiende que tiene la obligación de suministrar la información que le sea requerida, con el fin de llevar a cabo medidas de debida diligencia que permitan, entre otras finalidades, identificar el/os beneficiario(s) final(es). El incumplimiento de esta disposición podrá acarrear las sanciones previstas por las autoridades que ejerzan funciones de inspección, vigilancia y control.'
    }catch(e){
        console.error(e)
        setTimeout(() => {
            CargarLogicaPersonasJuridicas()
        }, 500);
    }
} 