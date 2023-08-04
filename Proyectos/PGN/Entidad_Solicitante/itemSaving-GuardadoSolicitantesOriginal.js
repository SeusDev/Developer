/* ItemSaving */
/*
    Nombre del evento: ItemSaving solicitantes
    Autor: Sebastian Henao Estrada
    Creado: 17/08/2022
    Editado X Ultima vez: 29/08/2022 
    Editado X: Sebastian Henao Estrada
*/

if (window.location.href.includes('7d32941b-c3dc-4f90-80d3-0c1176322edf')) {

    debugger;

    e.cancel = false;
    var data = [];
   
    if (sessionStorage.switchPersona) {
        data = JSON.parse(sessionStorage.dataSelected);
        //grupo
        var query = `insert into PGN_Lappiz_Personas(Id,TipoIdentificacionFK,TipoPersonaFK,Alias,Nombre,NumeroIdentificacion,CorreoElectronico,Estado,TiposolicitanteFK,Edited_date,Created_date,EventType,RowStatus) VALUES `
     
        var queryDireccones = 'insert into PGN_Lappiz_Ubicacion (Id,IdPaisFK,IdDepartamentoFK,IdMunicipioFK,IdTipoUbicacion,CEDireccion,EstadoUbicacion,EstructuraUbicacion,TipoVia,NumeroONombreVia,PrefijoOCuadranteVia,PrefijoOCuadranteUbicacion,NumeroViaUbicacion,NumeroPlaca, Created_date,Edited_date,RowStatus,EventType,PersonasFK)   VALUES '

        data.forEach(element => {
            debugger;
            element.Id = createUUID();
            element.Alias = null;
            element.Direcciones = JSON.parse(element.Direcciones);
            element.NumeroIdentificacion = createUUID(); 
            element.TipoPersonaFK = e.dataItem.TipoPersonaFK
            element.PGN_Lappiz_MaestroTipoPersona = e.dataItem.PGN_Lappiz_MaestroTipoPersona
            element.TiposolicitanteFK = JSON.parse(element.TipoInterviniente).MaestroTipoIntervinienteFK
            element.PGN_Lappiz_MaestroTipoInterviniente = e.dataItem.PGN_Lappiz_MaestroTipoInterviniente
            element.PGN_Lappiz_MaestroTipoIdentificacion = 'B093BEEE-CC21-499D-BCF4-FECBD1C359B0'
            element.Nombregrupo = element.Nombre;
            element.CorreoElectronico = element.Correo;
            element.Estado = 'Activo';
            element.Created_by = e.dataItem.Created_by;
            element.Created_date = e.dataItem.Created_date;
            element.Edited_date = e.dataItem.Edited_date;
            element.Edited_by = e.dataItem.Edited_by;
            element.EventType = e.dataItem.EventType;
            element.IpAddress = e.dataItem.IpAddress;
            element.RowStatus = e.dataItem.RowStatus;
           

            var Alias = element.alias != undefined && element.alias != null && element.alias != '' ? `'${element.alias}'` : null
            var NumeroIdentificacion = element.NumeroIdentificacion != undefined && element.NumeroIdentificacion != null && element.NumeroIdentificacion != '' ? `'${element.NumeroIdentificacion}'` : null
            var TipoPersonaFK = element.TipoPersonaFK != undefined && element.TipoPersonaFK != null && element.TipoPersonaFK != '' ? `'${element.TipoPersonaFK}'` : null
            var MaestroTipoInterviniente = element.TiposolicitanteFK != undefined && element.TiposolicitanteFK != null && element.TiposolicitanteFK != '' ? `'${element.TiposolicitanteFK}'` : null
            var MaestroTipoIdentificacion = element.PGN_Lappiz_MaestroTipoIdentificacion != undefined && element.PGN_Lappiz_MaestroTipoIdentificacion != null && element.PGN_Lappiz_MaestroTipoIdentificacion != '' ? `'${element.PGN_Lappiz_MaestroTipoIdentificacion}'` : null
            var Nombregrupo = element.Nombregrupo != undefined && element.Nombregrupo != null && element.Nombregrupo != '' ? `'${element.Nombregrupo}'` : null
            var CorreoElectronico = element.CorreoElectronico != undefined && element.CorreoElectronico != null && element.CorreoElectronico != '' ? `'${element.CorreoElectronico}'` : null
            var Estado = element.Estado != undefined && element.Estado != null && element.Estado != '' ? `'${element.Estado}'` : null
            var EventType = element.EventType != undefined && element.EventType != null && element.EventType != '' ? `'${element.EventType}'` : null
            var RowStatus = element.RowStatus != undefined && element.RowStatus != null && element.RowStatus != '' ? `'${element.RowStatus}'` : null
                       

            query += `('${element.Id}',${MaestroTipoIdentificacion},${TipoPersonaFK},${Alias},${Nombregrupo},${NumeroIdentificacion},${CorreoElectronico},${Estado},${MaestroTipoInterviniente},GETDATE(),GETDATE(),${EventType},${RowStatus}),`;
           
            element.Direcciones.forEach(direccion => {
                debugger;
             
                //Direcciones

            var IdPaisFK = direccion.IdPaisFK != undefined && direccion.IdPaisFK != null && direccion.IdPaisFK != '' ? `'${direccion.IdPaisFK}'` : null
            var IdDepartamentoFK = direccion.IdDepartamentoFK != undefined && direccion.IdDepartamentoFK != null && direccion.IdDepartamentoFK != '' ? `'${direccion.IdDepartamentoFK}'` : null
            var IdMunicipioFK = direccion.IdMunicipioFK != undefined && direccion.IdMunicipioFK != null && direccion.IdMunicipioFK != '' ? `'${direccion.IdMunicipioFK}'` : null
            var IdTipoUbicacion = direccion.IdTipoUbicacion != undefined && direccion.IdTipoUbicacion != null && direccion.IdTipoUbicacion != '' ? `'${direccion.IdTipoUbicacion}'` : null
            var CEDireccion = direccion.CEDireccion != undefined && direccion.CEDireccion != null && direccion.CEDireccion != '' ? `'${direccion.CEDireccion}'` : null
            var EstadoUbicacion = direccion.EstadoUbicacion != undefined && direccion.EstadoUbicacion != null && direccion.EstadoUbicacion != '' ? `'${direccion.EstadoUbicacion}'` : null
            var EstructuraUbicacion = direccion.EstructuraUbicacion != undefined && direccion.EstructuraUbicacion != null && direccion.EstructuraUbicacion != '' ? `'${direccion.EstructuraUbicacion}'` : null
            var TipoVia = direccion.TipoVia != undefined && direccion.TipoVia != null && direccion.TipoVia != '' ? `'${direccion.TipoVia}'` : null
            var NumeroONombreVia = direccion.NumeroONombreVia != undefined && direccion.NumeroONombreVia != null && direccion.NumeroONombreVia != '' ? `'${direccion.NumeroONombreVia}'` : null                
            var PrefijoOCuadranteVia = direccion.PrefijoOCuadranteVia != undefined && direccion.PrefijoOCuadranteVia != null && direccion.PrefijoOCuadranteVia != '' ? `'${direccion.PrefijoOCuadranteVia}'` : null
            var PrefijoOCuadranteUbicacion = direccion.PrefijoOCuadranteUbicacion != undefined && direccion.PrefijoOCuadranteUbicacion != null && direccion.PrefijoOCuadranteUbicacion != '' ? `'${direccion.PrefijoOCuadranteUbicacion}'` : null
            var NumeroViaUbicacion = direccion.NumeroViaUbicacion != undefined && direccion.NumeroViaUbicacion != null && direccion.NumeroViaUbicacion != '' ? `'${direccion.NumeroViaUbicacion}'` : null
            var NumeroPlaca = direccion.NumeroPlaca != undefined && direccion.NumeroPlaca != null && direccion.NumeroPlaca != '' ? `'${direccion.NumeroPlaca}'` : null              

                queryDireccones += `(NEWID(),${IdPaisFK},${IdDepartamentoFK},${IdMunicipioFK},${IdTipoUbicacion},${CEDireccion},${EstadoUbicacion},${EstructuraUbicacion},${TipoVia},${NumeroONombreVia},${PrefijoOCuadranteVia},${PrefijoOCuadranteUbicacion},${NumeroViaUbicacion},${NumeroPlaca},GETDATE(),GETDATE(),${RowStatus},${EventType},'${element.Id}'),`;
            })
        });
        
        query = query.substring(0, query.length - 1) + queryDireccones.substring(0, queryDireccones.length - 1);
       
        execQuery(query);

    } else if ($('#9036bc3c-d2ee-4196-8abc-3593999409aa').data('kendoDropDownList').value() == '079747EC-BCBB-4DF0-9D4F-73DDC3ACDC91') {
       //Natural
        data = JSON.parse(sessionStorage.dataSelected);
        var resutl = data.filter(x => x.Origen != 'new' && x.Id);
        data = data.filter(x => x.Origen == 'new');

        var query = `insert into PGN_Lappiz_Personas(Id,TipoIdentificacionFK,TipoPersonaFK,NumeroIdentificacion,Nombre,PrimerNombre,SegundoNombre,PrimerApellido,SegundoApellido,Alias,CorreoElectronico,CorreoElectronico1,CorreoElectronico2,Estado,TiposolicitanteFK,Created_date,Edited_date,EventType,RowStatus) VALUES `

        var queryDireccones = 'insert into PGN_Lappiz_Ubicacion (Id,IdPaisFK,IdDepartamentoFK,IdMunicipioFK,IdTipoUbicacion,CEDireccion,EstadoUbicacion,EstructuraUbicacion,TipoVia,NumeroONombreVia,PrefijoOCuadranteVia,PrefijoOCuadranteUbicacion,NumeroViaUbicacion,NumeroPlaca, Created_date,Edited_date,RowStatus,EventType,PersonasFK)   VALUES '

        data.forEach(element => {
           debugger;
            element.Id = createUUID();
            element.TipoPersonaFK = e.dataItem.TipoPersonaFK
            element.NumeroIdentificacion = element.Identficacion
            element.PGN_Lappiz_MaestroTipoPersona = e.dataItem.PGN_Lappiz_MaestroTipoPersona
            element.TiposolicitanteFK = JSON.parse(element.TipoInterviniente).MaestroTipoIntervinienteFK
            element.PGN_Lappiz_MaestroTipoInterviniente = element.TipoInterviniente
            element.PGN_Lappiz_MaestroTipoIdentificacion = e.dataItem.PGN_Lappiz_MaestroTipoIdentificacion.Id
            element.Nombregrupo = element.Nombre;
            element.CorreoElectronico = element.Correo;
            element.CorreoElectronico1 = element.Correo1;
            element.CorreoElectronico2 = element.Correo2;
            element.Estado = 'Activo';
            element.Created_by = e.dataItem.Created_by;
            element.Created_date = e.dataItem.Created_date;
            element.Edited_date = e.dataItem.Edited_date;
            element.Edited_by = e.dataItem.Edited_by;
            element.EventType = e.dataItem.EventType;
            element.IpAddress = e.dataItem.IpAddress;
            element.RowStatus = e.dataItem.RowStatus;
         
            var NumeroIdentificacion = element.NumeroIdentificacion != undefined && element.NumeroIdentificacion != null && element.NumeroIdentificacion != '' ? `'${element.NumeroIdentificacion}'` : null
            var PrimerNombre = element.PrimerNombre != undefined && element.PrimerNombre != null && element.PrimerNombre != '' ? `'${element.PrimerNombre}'` : null
            var SegundoNombre = element.SegundoNombre != undefined && element.SegundoNombre != null && element.SegundoNombre != '' ? `'${element.SegundoNombre}'` : null
            var PrimerApellido = element.PrimerApellido != undefined && element.PrimerApellido != null && element.PrimerApellido != '' ? `'${element.PrimerApellido}'` : null
            var SegundoApellido = element.SegundoApellido != undefined && element.SegundoApellido != null && element.SegundoApellido != '' ? `'${element.SegundoApellido}'` : null
            var Alias = element.Alias != undefined && element.Alias != null && element.Alias != '' ? `'${element.Alias}'` : null
            var CorreoElectronico = element.CorreoElectronico != undefined && element.CorreoElectronico != null && element.CorreoElectronico != '' ? `'${element.CorreoElectronico}'` : null
            var CorreoElectronico1 = element.CorreoElectronico1 != undefined && element.CorreoElectronico1 != null && element.CorreoElectronico1 != '' ? `'${element.CorreoElectronico1}'` : null
            var CorreoElectronico2 = element.CorreoElectronico2 != undefined && element.CorreoElectronico2 != null && element.CorreoElectronico2 != '' ? `'${element.CorreoElectronico2}'` : null
            var TipoPersonaFK = element.TipoPersonaFK != undefined && element.TipoPersonaFK != null && element.TipoPersonaFK != '' ? `'${element.TipoPersonaFK}'` : null
            var TiposolicitanteFK = element.TiposolicitanteFK != undefined && element.TiposolicitanteFK != null && element.TiposolicitanteFK != '' ? `'${element.TiposolicitanteFK}'` : null
            var MaestroTipoIdentificacion = element.PGN_Lappiz_MaestroTipoIdentificacion != undefined && element.PGN_Lappiz_MaestroTipoIdentificacion != null && element.PGN_Lappiz_MaestroTipoIdentificacion != '' ? `'${element.PGN_Lappiz_MaestroTipoIdentificacion}'` : null
            var Nombregrupo = element.Nombregrupo != undefined && element.Nombregrupo != null && element.Nombregrupo != '' ? `'${element.Nombregrupo}'` : null
            var Estado = element.Estado != undefined && element.Estado != null && element.Estado != '' ? `'${element.Estado}'` : null
            var EventType = element.EventType != undefined && element.EventType != null && element.EventType != '' ? `'${element.EventType}'` : null
            var RowStatus = element.RowStatus != undefined && element.RowStatus != null && element.RowStatus != '' ? `'${element.RowStatus}'` : null
                       
            query += `('${element.Id}',${MaestroTipoIdentificacion},${TipoPersonaFK},${NumeroIdentificacion},${Nombregrupo},${PrimerNombre},${SegundoNombre},${PrimerApellido},${SegundoApellido},${Alias},${CorreoElectronico},${CorreoElectronico1},${CorreoElectronico2},${Estado},${TiposolicitanteFK},GETDATE(),GETDATE(),${EventType},${RowStatus}),`;
           
        });

        execQuery(query.substring(0, query.length - 1));
        
    } 

    else if ($('#9036bc3c-d2ee-4196-8abc-3593999409aa').data('kendoDropDownList').value() == '7828A878-F20A-4A86-8B2D-0147D196B8B5') {
       
        //Juridico
         
        data = JSON.parse(sessionStorage.dataSelected);
                           
        } 
        // Agregar Informacion a la Grid

        var dataGrid = kendo.jQuery('#0a824f20-5c53-4969-bf27-3168a8f22617').data('kendoGrid').dataSource 

        
        for (var i = 0; i < data.length; i++) {
            debugger; 
            var obj =  {PGN_Lappiz_Personas : {Nombre: data[i].Nombre, NumeroIdentificacion: data[i].NumeroIdentificacion}, PGN_Lappiz_DetalleTipoIntervinientePorProceso:  JSON.parse(data[i].TipoInterviniente), 
            PGN_Lappiz_MaestroTipoIdentificacion: {CEDescripcin: data[i].Tipodocumento}}

            dataGrid.add(obj)
        }        
        
        /* sessionStorage.dataSolicitantes = JSON.stringify(dataGrid)
        $('#0a824f20-5c53-4969-bf27-3168a8f22617').data('kendoGrid').dataSource.data(dataGrid) */

        function createUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
}