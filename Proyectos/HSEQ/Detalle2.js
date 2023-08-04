/* Destalle */

// FormLoaded Padre

var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == '497517a2-d20f-47a3-a3a2-9705d7d9c2bf') {
       setTimeout(function() {
        debugger;
        if (!e.isNew) {
            sessionStorage.CurrentFicha = e.dataItem.Id;
            sessionStorage.switch = true;
        } else {
            delete sessionStorage.CurrentFicha;
            delete sessionStorage.switch;
        }
    }, 1500);
};  

//ItemSaving Padre
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == '497517a2-d20f-47a3-a3a2-9705d7d9c2bf') {

    if (sessionStorage.sw && sessionStorage.switch) {
        delete e.dataItem.SafeWork_Lappiz_ReporteIncidente //es el detalle principal
    }
}
// formLoaded detalle  del primer detalle
if (e.isNew) {
    sessionStorage.sw = true;
} else {
    delete sessionStorage.sw;
}

//Item Saving detalle del nieto (Estudio Incidente)
if (sessionStorage.switch && sessionStorage.sw) {
    debugger;
   /*  var PermisoFk = e.dataItem.PermisoFk != undefined && e.dataItem.PermisoFk != null && e.dataItem.PermisoFk != '' ? `'${e.dataItem.PermisoFk}'` : null */
    var CausaTrabajoSuspendido =  e.dataItem.CausaTrabajoSuspendido != undefined && e.dataItem.CausaTrabajoSuspendido != null && e.dataItem.CausaTrabajoSuspendido != '' ? `'$
    {e.dataItem.CausaTrabajoSuspendido}'` : null

    var CEDescripcion = e.dataItem.CEDescripcion != undefined && e.dataItem.CEDescripcion != null && e.dataItem.CEDescripcion != '' ? `'$
    {e.dataItem.CEDescripcion}'` : null

    var  FechaYHoraIncidente = e.dataItem.FechaYHoraIncidente != undefined && e.dataItem.FechaYHoraIncidente != null && e.dataItem.FechaYHoraIncidente != '' ? `'$
    {e.dataItem.FechaYHoraIncidente}'` : null

    var ConsecutivoInternoIncidente = e.dataItem.ConsecutivoInternoIncidente != undefined && e.dataItem.ConsecutivoInternoIncidente != null && e.dataItem.ConsecutivoInternoIncidente != '' ? `'${e.dataItem.ConsecutivoInternoIncidente}'` : null

    var StringQuery = `declare @id uniqueidentifier = newId() 
    insert into SafeWork_Lappiz_ReporteIncidente(Id,PermisoFk,CausaTrabajoSuspendido,CEDescripcion,FechaYHoraIncidente,
    ConsecutivoInternoIncidente) 

    values 

    (@id,'${window.location.href.split('rowId=')[1].split('&')[0]}',${CausaTrabajoSuspendido},${CEDescripcion},${FechaYHoraIncidente},${ConsecutivoInternoIncidente})`;

    

    if (e.dataItem.SafeWork_Lappiz_Estudioincidente != undefined) {
        
        for (var i = 0; i < e.dataItem.SafeWork_Lappiz_Estudioincidente.length; i++) {
            
            var Fechadeenviodeinvestigacion = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeenviodeinvestigacion != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeenviodeinvestigacion != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeenviodeinvestigacion != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeenviodeinvestigacion.replace("Z",'')}'` : null

            var Fechadeenviderecomendacin = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeenviderecomendacin != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeenviderecomendacin != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeenviderecomendacin != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeenviderecomendacin.replace("Z",'')}'` : null

            var Tipos = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipos != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipos != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipos != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipos}'` : null

            var CausaTrabajoSuspendido = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].CausaTrabajoSuspendido != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].CausaTrabajoSuspendido != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].CausaTrabajoSuspendido != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].CausaTrabajoSuspendido}'` : null

            var Coordinadordelegado = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Coordinadordelegado != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Coordinadordelegado != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Coordinadordelegado != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Coordinadordelegado}'` : null

            var Cargo = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cargo != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cargo != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cargo != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cargo}'` : null

            var Segurosocial = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Segurosocial != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Segurosocial != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Segurosocial != '' ? `${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Segurosocial}` : null

            var Tipodevinculacionlaboral = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodevinculacionlaboral != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodevinculacionlaboral != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodevinculacionlaboral != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodevinculacionlaboral}'` : null

            var Codigo = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Codigo != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Codigo != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Codigo != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Codigo}'` : null

            var Empresacontratista = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Empresacontratista != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Empresacontratista != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Empresacontratista != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Empresacontratista}'` : null

            var Selaboraenlasedeprincipal = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Selaboraenlasedeprincipal != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Selaboraenlasedeprincipal != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Selaboraenlasedeprincipal != '' ? `${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Selaboraenlasedeprincipal}` : null

            var Dias = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Dias != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Dias != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Dias != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Dias}'` : null

            var Jornada = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Jornada != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Jornada != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Jornada != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Jornada}'` : null

            var Laborhabitual = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Laborhabitual != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Laborhabitual != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Laborhabitual != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Laborhabitual}'` : null

            var Tiempolaboradoprevioalaccidente = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tiempolaboradoprevioalaccidente != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tiempolaboradoprevioalaccidente != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tiempolaboradoprevioalaccidente != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tiempolaboradoprevioalaccidente}'` : null

            var Tipodeaccidente = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodeaccidente != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodeaccidente != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodeaccidente != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodeaccidente}'` : null

            var Causomuerte = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Causomuerte != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Causomuerte != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Causomuerte != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Causomuerte}'` : null

            var Fechadelamuerte = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadelamuerte != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadelamuerte != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadelamuerte != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadelamuerte.replace("Z",'')}'` : null

            var Lugardondeocurrielaccidente = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Lugardondeocurrielaccidente != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Lugardondeocurrielaccidente != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Lugardondeocurrielaccidente != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Lugardondeocurrielaccidente}'` : null

            var Indiquecualsitio = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Indiquecualsitio != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Indiquecualsitio != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Indiquecualsitio != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Indiquecualsitio}'` : null

            var Tipodelesion = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodelesion != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodelesion != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodelesion != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodelesion}'` : null

            var Partedelcuerpoaparentemente = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Partedelcuerpoaparentemente != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Partedelcuerpoaparentemente != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Partedelcuerpoaparentemente != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Partedelcuerpoaparentemente}'` : null

            var Agentedelaccidente = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Agentedelaccidente != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Agentedelaccidente != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Agentedelaccidente != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Agentedelaccidente}'` : null

            var Mecanismooformadeamenaza = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Mecanismooformadeamenaza != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Mecanismooformadeamenaza != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Mecanismooformadeamenaza != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Mecanismooformadeamenaza}'` : null

            var Fechayhora = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechayhora != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechayhora != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechayhora != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechayhora.replace("Z",'')}'` : null

            var Accidentes = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Accidentes != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Accidentes != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Accidentes != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Accidentes}'` : null

            var Cual = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cual != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cual != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cual != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cual}'` : null

            var Hubopersonasquepresenciaronelincidente = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Hubopersonasquepresenciaronelincidente != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Hubopersonasquepresenciaronelincidente != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Hubopersonasquepresenciaronelincidente != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Hubopersonasquepresenciaronelincidente}'` : null

            var Dibujoofoto = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Dibujoofoto != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Dibujoofoto != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Dibujoofoto != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Dibujoofoto}'` : null

            var Arboldecausasa = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Arboldecausasa != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Arboldecausasa != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Arboldecausasa != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Arboldecausasa}'` : null

            var SedeFK = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].SedeFK != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].SedeFK != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].SedeFK != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].SedeFK}'` : null

            var Cuallabor = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cuallabor != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cuallabor != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cuallabor != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cuallabor}'` : null           

            var IncidenteFK = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].IncidenteFK != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].IncidenteFK != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].IncidenteFK != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].IncidenteFK}'` : null         


            var ObservacionEmpresa = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].ObservacionEmpresa != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].ObservacionEmpresa != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].ObservacionEmpresa != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].ObservacionEmpresa}'` : null         

            var Nombre = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Nombre != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Nombre != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Nombre != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Nombre}'` : null         

            var Cargoresponsable = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cargoresponsable != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cargoresponsable != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cargoresponsable != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Cargoresponsable}'` : null         

            var Tipodeidentificacion = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodeidentificacion != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodeidentificacion != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodeidentificacion != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Tipodeidentificacion}'` : null         

            var Fechadeldiligenciamiento = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeldiligenciamiento != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeldiligenciamiento != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeldiligenciamiento != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Fechadeldiligenciamiento.replace("Z",'')}'` : null         

            var Descripciondelcliente = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Descripciondelcliente != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Descripciondelcliente != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Descripciondelcliente != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Descripciondelcliente}'` : null         

            var Numerodedocumento = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Numerodedocumento != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Numerodedocumento != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Numerodedocumento != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Numerodedocumento}'` : null         

            var Firmaresponsable = e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Firmaresponsable != undefined && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Firmaresponsable != null && e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Firmaresponsable != '' ? `'${e.dataItem.SafeWork_Lappiz_Estudioincidente[i].Firmaresponsable}'` : null         

                    

            StringQuery += `insert into SafeWork_Lappiz_Estudioincidente(Id,Created_date,Fechadeenviodeinvestigacion,Fechadeenviderecomendacin,Tipos,Coordinadordelegado,Cargo,Segurosocial,Tipodevinculacionlaboral,Codigo,Empresacontratista,Selaboraenlasedeprincipal,Dias,Jornada,Laborhabitual,Tiempolaboradoprevioalaccidente,Tipodeaccidente,Causomuerte,Fechadelamuerte,Lugardondeocurrielaccidente,Indiquecualsitio,Tipodelesion,Partedelcuerpoaparentemente,Agentedelaccidente,Mecanismooformadeamenaza,Fechayhora,Accidentes,Cual,Hubopersonasquepresenciaronelincidente,Dibujoofoto,Arboldecausasa,SedeFK,Cuallabor,IncidenteFK,ObservacionEmpresa,Nombre,Cargoresponsable,Tipodeidentificacion,Fechadeldiligenciamiento,Descripciondelcliente,Numerodedocumento,Firmaresponsable) 
            
            values 

            (newId(),GETDATE(),${Fechadeenviodeinvestigacion},${Fechadeenviderecomendacin},${Tipos},${Coordinadordelegado},${Cargo},${Segurosocial},${Tipodevinculacionlaboral},${Codigo},${Empresacontratista},${Selaboraenlasedeprincipal},${Dias},${Jornada},${Laborhabitual},${Tiempolaboradoprevioalaccidente},${Tipodeaccidente},${Causomuerte},${Fechadelamuerte},${Lugardondeocurrielaccidente},${Indiquecualsitio},${Tipodelesion},${Partedelcuerpoaparentemente},${Agentedelaccidente},${Mecanismooformadeamenaza},${Fechayhora},${Accidentes},${Cual},${Hubopersonasquepresenciaronelincidente},${Dibujoofoto},${Arboldecausasa},${SedeFK},${Cuallabor},@id,${ObservacionEmpresa},${Nombre},${Cargoresponsable},${Tipodeidentificacion},${Fechadeldiligenciamiento},${Descripciondelcliente},${Numerodedocumento},${Firmaresponsable})`;

        }
    }
    execQuery(StringQuery).then(function(response) {
        toastr.success('Se guardo exitosamente')
    });
}

/* 
// Ejemplo  del de arriba
setTimeout(function() {
    debugger;
    var url = location.href;
    var urlSplit = url.split('appViewId=')
    var idVista = urlSplit[1]

    if (idVista == '4d193110-a532-4d53-9ae6-223f478a023d') {
        var data = JSON.parse(sessionStorage.dataDetalle)
        for (var i = 0; i < data.length; i++) {
            if (data[i].Id == sessionStorage.IdDetallePlan) {
                data[i].Auditados = e.dataItem.Auditados;
                data[i].Hora = e.dataItem.Hora;
                data[i].EquipoAuditor = e.dataItem.EquipoAuditor;
                data[i].Lugar = e.dataItem.Lugar;
            }
        }
        sessionStorage.dataDetalle = JSON.stringify(data);
    } else {}

}, 800);


debugger;
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == '4d193110-a532-4d53-9ae6-223f478a023d') {
    var data = JSON.parse(sessionStorage.dataDetalle)
    for (var i = 0; i < data.length; i++) {
        if (data[i].Id == sessionStorage.IdDetallePlan) {
            data[i].Auditados = e.dataItem.Auditados;
            data[i].Hora = e.dataItem.Hora;
            data[i].EquipoAuditor = e.dataItem.EquipoAuditor;
            data[i].Lugar = e.dataItem.Lugar;
        }
    }
    sessionStorage.dataDetalle = JSON.stringify(data);
} else {
    if (sessionStorage.switch && sessionStorage.sw) {
        'Andrei'

        var TituloAuditora = e.dataItem.TituloAuditora != undefined ? `'${e.dataItem.TituloAuditora}'` : null

        var StringQuery = ` declare @id uniqueidentifier = newId() 
    insert into PortalProcesos_Lappiz_DetalleProgramaAnual 
    (Id,TituloAuditora,NombreProceso,ResponsableAuditora,LiderProyecto,TipoAuditoria,FechaProgramacion,
    FechaReal,Reportados,Corregidos,FechaInicio,FechaFin,Estado,FechaCierre,ObservacionesComentarios,
    ProgramaAnualFK,CodigoG)
    values(@id,${TituloAuditora},'${e.dataItem.NombreProceso}',
    '${e.dataItem.ResponsableAuditora}',
    '${e.dataItem.LiderProyecto}',
    '${e.dataItem.TipoAuditoria}','${e.dataItem.FechaProgramacion}','${e.dataItem.FechaReal}'
    ,${e.dataItem.Reportados},${e.dataItem.Corregidos},'${e.dataItem.FechaInicio}'
    ,'${e.dataItem.FechaFin}','${e.dataItem.Estado}','${e.dataItem.FechaCierre}'
    ,'${e.dataItem.ObservacionesComentarios}','${sessionStorage.CurrentFicha}','${e.dataItem.CodigoG}') `;
        if (e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos != undefined) {
            for (var i = 0; i < e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos.length; i++) {
                if (e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].PreguntaFK == undefined) {
                    var PreguntaFK = null
                } else {
                    var PreguntaFK = "'" + e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].PreguntaFK + "'"
                }
                StringQuery += ` insert into PortalProcesos_Lappiz_ListaChequeoProcesos 
            (Id,Proceso,Subproceso,Cumple,DescripcionHallazgo,EstadoHallazgo,
                ResponsableHallazgo,FechaProgramada,FechaCierre,Observaciones,DetalleProgramaFK,PreguntaFK)
                values (newid(),'${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].Proceso}',
                '${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].Subproceso}',
                '${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].Cumple}',
                '${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].DescripcionHallazgo}',
                '${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].EstadoHallazgo}'
                ,'${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].ResponsableHallazgo}',
                '${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].FechaProgramada}',
                '${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].FechaCierre}',
                '${e.dataItem.PortalProcesos_Lappiz_ListaChequeoProcesos[i].Observaciones}',
                @id,
                ${PreguntaFK}) `;
            }
        }
        if (e.dataItem.PortalProcesos_Lappiz_ChequeoProductos != undefined) {
            for (var i = 0; i < e.dataItem.PortalProcesos_Lappiz_ChequeoProductos.length; i++) {
                if (e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].PreguntaFK == undefined) {
                    var PreguntaFK = null
                } else {
                    var PreguntaFK = "'" + e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].PreguntaFK + "'"
                }
                StringQuery += ` insert into PortalProcesos_Lappiz_ChequeoProductos 
            (Id,Proceso,Subproceso,Cumple,DescripcionHallazgo,EstadoHallazgo,
                ResponsableHallazgo,FechaProgramada,FechaCierre,Observaciones,DetalleProgramaFK,PreguntaFK)
                values (newid(),'${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].Proceso}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].Subproceso}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].Cumple}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].DescripcionHallazgo}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].EstadoHallazgo}'
                ,'${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].ResponsableHallazgo}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].FechaProgramada}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].FechaCierre}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoProductos[i].Observaciones}',
                @id,
                ${PreguntaFK}) `;
            }
        }
        if (e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion != undefined) {
            for (var i = 0; i < e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion.length; i++) {
                if (e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].PreguntaFK == undefined) {
                    var PreguntaFK = null
                } else {
                    var PreguntaFK = "'" + e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].PreguntaFK + "'"
                }
                StringQuery += ` insert into PortalProcesos_Lappiz_ChequeoConfiguracion 
            (Id,Proceso,Subproceso,Cumple,DescripcionHallazgo,EstadoHallazgo,
                ResponsableHallazgo,FechaProgramada,FechaCierre,Observaciones,DetalleProgramaFK,PreguntaFK)
                values (newid(),'${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].Proceso}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].Subproceso}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].Cumple}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].DescripcionHallazgo}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].EstadoHallazgo}'
                ,'${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].ResponsableHallazgo}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].FechaProgramada}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].FechaCierre}',
                '${e.dataItem.PortalProcesos_Lappiz_ChequeoConfiguracion[i].Observaciones}',
                @id,
                ${PreguntaFK}) `;
            }
        }
        execQuery(StringQuery).then(function(response) {
            toastr.success('Se guardo exitosamente')
        });
    } */
/* } */