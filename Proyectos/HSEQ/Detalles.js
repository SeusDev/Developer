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
        delete e.dataItem.SafeWork_Lappiz_Medicion //es el detalle principal
    }
}

// formLoaded detalle  del primer detalle
if (e.isNew) {
    sessionStorage.sw = true;
} else {
    delete sessionStorage.sw;
}

//Item Saving detalle del primer detelle
if (sessionStorage.switch && sessionStorage.sw) {
    debugger;
    var EquiposMedicionFK = e.dataItem.EquiposMedicionFK != undefined && e.dataItem.EquiposMedicionFK != null && e.dataItem.EquiposMedicionFK != '' ? `'${e.dataItem.EquiposMedicionFK}'` : null

    var StringQuery = `declare @id uniqueidentifier = newId() 
    insert into SafeWork_Lappiz_Medicion(Id,Created_date,PermisoTrabajoFK,EquiposMedicionFK) values (@id,GETDATE(),'${window.location.href.split('rowId=')[1].split('&')[0]}',${EquiposMedicionFK})`;

    if (e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas != undefined) {
        for (var i = 0; i < e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas.length; i++) {

            var CENombre = e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].CENombre != undefined && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].CENombre != null && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].CENombre != '' ? `'${e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].CENombre}'` : null

            var FechaYHoraMedicion = e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].FechaYHoraMedicion != undefined && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].FechaYHoraMedicion != null && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].FechaYHoraMedicion != '' ? `'${e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].FechaYHoraMedicion.replace("Z",'')}'` : null

            var Oxigeno = e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].Oxigeno != undefined && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].Oxigeno != null && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].Oxigeno != '' ? `${e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].Oxigeno}` : null

            var LEL = e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].LEL != undefined && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].LEL != null && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].LEL != '' ? `${e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].LEL}` : null

            var CO = e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].CO != undefined && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].CO != null && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].CO != '' ? `${e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].CO}` : null

            var H2S = e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].H2S != undefined && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].H2S != null && e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].H2S != '' ? `${e.dataItem.SafeWork_Lappiz_EquiposMedicionAtmosferas[i].H2S}` : null

            StringQuery += ` insert into SafeWork_Lappiz_EquiposMedicionAtmosferas (Id,CENombre,FechaYHoraMedicion,Oxigeno,LEL,CO,H2S,EquiposMedicion) values 
        (newId(),${CENombre},${FechaYHoraMedicion},${Oxigeno},${LEL},${CO},${H2S},@id) select @id [Id]`;

        }
    }
    execQuery(StringQuery).then(function(response) {
        toastr.success('Se guardo exitosamente')
    });
}


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
    }
}