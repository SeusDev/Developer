if (window.location.href.includes("appViewId=bad50f89-9d20-4fd2-ad7f-158ad68fe888")) {

    setTimeout(function () {
        $('#cargar').click(function () {
            debugger;
            
                debugger
                /* var Ci =  $(`#data`).data("kendoMultiSelect").value() */
                var producto = $(`#data`).data("kendoMultiSelect").value()
                producto= JSON.stringify(producto)
                producto= producto.replace('[', '');
                producto = producto.replace(']', '');
                producto= producto.replaceAll('"', "'");
            
                var query =`select 
                Ci [Ci], 
                Ntecnico [NombreTecnicoycomercial],
                Span[Subpartidaaranselaria], 
                Unidad [Unidad]
                from Logius_Lappiz_CI
                where Id in (${producto})`
                
               var data = ajaxQuery(query)
               debugger;
                    
                    if (data.length >0) {
                    $('#GridCi').kendoGrid({
                        dataSource: {
                            data: data,
                            autoSync: true,
                            schema: {
                                model: {
                                    fields: {
                                        Ci:{ type: "string", editable: false },
                                        NombreTecnicoycomercial: { type: "string", editable: false },
                                        Subpartidaaranselaria: { type: "string", editable: false },
                                        Unidad: { type: "string", editable: false },
                                        
                                        Consuxuniddesper: { type: "string", editable: function (dataItem) {
                                            return dataItem.Consuxuniddespe === "0";
                                        }},
            
                                        Porcedesper: { type: "string", editable: function (dataItem) {
                                            return dataItem.Porcedesper === "Kg";
                                        }},
            
                                        Destino: { type: "string", editable: function (dataItem) {
                                            return dataItem.Destino === "Kg";
                                        }},
            
                                        Subproducto: { type: "string", editable: function (dataItem) {
                                            return dataItem.Subproducto === "Kg";
                                        }},
                                        
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
                            { field: "Ci", title: "Ci" },
                            { field: "NombreTecnicoycomercial", title: "Nombre tecnico y comercial" },
                            { field: "Subpartidaaranselaria", title: "Subpartida aranselaria" },
                            { field: "Unidad", title: "Unidad" },
                            { field: "Consuxuniddesper", title: "Consumo x unidad desperdicio" },
                            { field: "Porcedesper", title: "Porcentaje de desperdicio" },
                            { field: "Destino", title: "Destino de desperdicio" },
                            { field: "Subproducto", title: "Subproducto" },
                           
                        ],
                        editable:true,
                    });
            
              }
            
            
            function ajaxQuery(query) {
                let data
                let newquery = {
                    "query": query,
                    "parameters": {
                        "aType": "execTx",
                        "environment": `${backandGlobal.environment}`
                    }
                }
            
                $.ajax({
                    async: false,
                    url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                    type: 'POST',
                    data: JSON.stringify(newquery),
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                    },
                    success: function(result) {
                        data = result[0]
                    },
                    error: function(error) {
                        console.log(error)
                    }
                })
                return data
            }
        });
        

    }, 850);

}