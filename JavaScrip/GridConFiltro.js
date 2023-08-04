var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == 'e3effbb4-cf58-40d1-b5b5-933b23fc2c43') {

setTimeout(() => {
    
    debugger;
    // ocultar lineas del tab
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > hr").style.display='none';
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul").style.display='none'
    kendo.jQuery('#ngb-nav-2').hide()

    kendo.jQuery('#GenerarReporte').click(function () {
        debugger;
        toolbar_click();
    });

    function toolbar_click() {
        debugger;  
    
    let modulo= $('#f7cccc70-1aed-458d-8484-16f1f5c53637').val();
    let submodulo= $('#63525ad7-35d1-487a-8227-0fb44675a010').val();
    let fechainicio = getFieldValue('b6d0e269-6b4c-415d-b34d-e667e3e8d14d').toISOString();
    let fechafin = getFieldValue('fefe56c6-d4cd-415d-b592-05f915c0af09').toISOString();

    var StringQuery = `SELECT AVG(IndicadorCum) AS Cumplimiento , AVG (IndicadorCorr) AS Correción
    FROM PactiaTest_Lappiz_Inspeccion_Pactia
    WHERE SubmoduloFk = '${submodulo}' AND ModuloFk  = '${modulo}' and FechaFinalizacion BETWEEN '${fechainicio}' and '${fechafin}'`;

    execQuery(StringQuery).then(function(response){
        var dataResult = response[0];
        //imprimir resultado de la consulta
        console.log(dataResult);

        var data = dataResult
        if (data.length >0) {
            kendo.jQuery('#Grid').kendoGrid({
                dataSource: {
                    data: data,
                    autoSync: true,
                    schema: {
                        model: {
                            fields: {
                                Cumplimiento:{ type: "string", editable: false },
                                Correción: { type: "string", editable: false },
                            },
                        },
                    },
                    sort: [{ field: "Reserva", dir: "asc" }],
                },
                height: 450,
                scrollable: true,
                sortable: true,
                filterable: true,
                resizable: true,
                pageable: {
                    pageable: true,
                    previousNext: false,
                    pageSize: 10,
                    alwaysVisible: true,
                    numeric: true,
                    buttonCount: 5
                },
                dataBound: function () {
                    for (var i = 0; i < this.columns.length; i++) {
                        this.autoFitColumn(i);
                    }
                },
                columns: [
                    { field: "Cumplimiento", title: "Cumplimiento" },
                    { field: "Correción", title: "Correción" },
                    
                ],
                editable:true,
        });
       }
    },function(error){
        console.log(error);
    });
    
    }
  }, 1000);
}