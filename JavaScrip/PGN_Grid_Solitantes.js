if (window.location.href.includes("appViewId=7b8300e1-64dd-4b42-a70b-c6e1330f0cae")) {
           setTimeout(function () {        
            debugger;            
                var query =`select CONCAT(PrimerNombre,' ',PrimerApellido,' ',SegundoApellido) [Nombre] , 
                NumeroIdentificacion [Identficacion],
                format (Edited_date,'dd-MM-yyyy') [Actualizacion],
                Estado [Estado]
                from PGN_Lappiz_Personas`
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
                                        Nombre:{ type: "string", editable: false },
                                        Identficacion: { type: "string", editable: false },
                                        Actualizacion: { type: "string", editable: false },
                                        Estado: { type: "string", editable: false },  
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
                            { selectable: true, width: "50px" },
                            { field: "Nombre", title: "Nombre" },
                            { field: "Identficacion", title: "identficación" },
                            { field: "Actualizacion", title: "Actualizacion" },
                            { field: "Estado", title: "Estado" },                         
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
    }, 850);
}

$('#Buscar').click(function () {}

$('#Nuevogrupo').click(function () {}