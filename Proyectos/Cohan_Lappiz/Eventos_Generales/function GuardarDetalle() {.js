function GuardarDetalle() {
    debugger;
  
    var arrDefectos = $('#28feeb93-643e-4699-9a34-27f66dd109bf').data('kendoMultiSelect').dataItems();
    arrDefectos.forEach(defecto => {
        var items = defecto.Resultado.split('--');
        var Id = defecto.id

        
        let Query = {
            query: `insert into Cohan_Lappiz_DetalleFormaFarmaceutica (Id,DefectosTecnicoFK,NombreDefecto,Criticidad)
            values (NEWID(),'${Id}','${items[0]}','${items[1]}')`,
            tenantId: "null",
            parameters: {
                aType: "execTx",
                environment: `${backandGlobal.environment}`,
            },
        };
        // items.forEach(item => {
        //     console.log(item);
        // });
        $.ajax({
            async: false,
            url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
            type: 'POST',
            data: JSON.stringify(Query),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', localStorage.Authorization);
            },
            success: function (Success) {
                debugger;
                console.log('ok')
            },
            error: function (error) { console.log(`Error-->${error}`); }
        })      
                  
    });
      
}

e.dataItem.id

let Query = {
    query: `insert into Cohan_Lappiz_DetalleFormaFarmaceutica (Id,DefectosTecnicoFK,NombreDefecto,Criticidad)
    values (NEWID(),'${Id}','${items[0]}','${items[1]}')`,
    tenantId: "null",
    parameters: {
        aType: "execTx",
        environment: `${backandGlobal.environment}`,
    },
};
// items.forEach(item => {
//     console.log(item);
// });
$.ajax({
    async: false,
    url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
    type: 'POST',
    data: JSON.stringify(Query),
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', localStorage.Authorization);
    },
    success: function (Success) {
        debugger;
        console.log('ok')
    },
    error: function (error) { console.log(`Error-->${error}`); }
})      
          
