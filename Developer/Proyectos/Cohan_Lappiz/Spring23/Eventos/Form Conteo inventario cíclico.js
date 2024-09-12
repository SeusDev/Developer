var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == '8282da4b-4842-436c-af8d-224874fe3e21') {
    setTimeout(() => {

        let userId = sessionStorage.userId;

        let urlRequest = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`;

        disableField('5db39133-379c-4fe7-a95e-ae13b5863b86', true);

        disableField('9111ff62-254f-4030-9bd8-d6adccb2226e', true);

        disableField('2c961e83-ef07-427f-9153-ab568524b081', true);


        $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(2)').hide()

        $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(3)').hide()

        conteoProductos();
        function conteoProductos() {
            debugger;

            var Query = {
                "query": `select DIC.InventarioCiclicoFk from Lappiz_Users U
                inner join Cohan_Lappiz_DetalleInventarioCiclico DIC on U.Id = DIC.UsuarioAsignadoFk
                where U.Id = '${userId}'`,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`

                }

            };

            $.ajax({
                async: false,
                url: urlRequest,
                type: "POST",
                data: JSON.stringify(Query),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", localStorage.Authorization);
                },
                success: function (result) {
                    var invetarioCiclicoFk = result[0][0].InventarioCiclicoFk
                    var Query = {
                        "query": `Select P.Id ,P.CodigoProducto,P.NombreProducto,DIC.Id,U.Descripcion, TA.NumeroLote, FechaVencimientoLote 
                        from Cohan_Lappiz_DetalleInventarioCiclico DIC
                        inner join Cohan_Lappiz_ProductosPorUbicacion PPU on DIC.ProductoUbicacionFK = PPU.Id
                        inner join Cohan_Lappiz_TripleA TA on PPU.TripleA = TA.Id
                        inner join Cohan_Lappiz_Producto P on TA.ProductoFk = P.Id
                        inner join Cohan_Lappiz_Ubicacion U on PPU.UbicacionesFK = U.Id
                        where DIC.InventarioCiclicoFk = '${invetarioCiclicoFk}'`,
                        "tenantId": "null",
                        "parameters": {
                            "aType": "execTx",
                            "environment": `${backandGlobal.environment}`
        
                        }
        
                    };
        
        
                    $.ajax({
                        async: false,
                        url: urlRequest,
                        type: "POST",
                        data: JSON.stringify(Query),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.setRequestHeader("Authorization", localStorage.Authorization);
                        },
                        success: function (result) {
                            $("#GridConteoCiclico").kendoGrid({
                                dataSource: {
                                    data: result[0][0],
                                    schema: {
                
                                        model: {
                                            fields: {
                                                Id: { type: "string" },
                                                CodigoProducto: { type: "number" },
                                                NombreProducto: { type: "string" },
                                                Descripcion: { type: "string" },
                                                Lote: { type: "string" },
                                                FechaVencimiento: { type: "date" }
                                            }
                                        }
                                    },
                                    pageSize: 10
                                },
                                batch: true,
                                editable: true,
                                persistSelection: true,
                                scrollable: true,
                                sortable: true,
                                filterable: true,
                                resizable: true,
                                pageable: {
                                    input: true,
                                    numeric: true,
                                    refresh: true
                                },
                                dataBound: function () {
                                    for (var i = 0; i < this.columns.length; i++) {
                                        this.autoFitColumn(i);
                                    }
                                },
                                columns: [
                                    //{ command: [{ text: "EditarConteoP", click: EditarConteoP, template: "<a class='k-grid-EditarConteoP btn'><i class='fa fa-tasks'></i> Editar </a>" }] },
                                    //{ command: [{ text: "UsuariosAsignados", click: UsuariosAsignados, template: "<a class='k-grid-UsuariosAsignados btn'><i class='fa fa-users'></i> Usuarios asignados</a>" }] },
                                    { field: "CodigoProducto", title: "Codigo Producto" },
                                    { field: "NombreProducto", title: "Nombre Producto" },
                                    { field: "Descripcion", title: "Descripcion" },
                                    { field: "NumeroLote", title: "Lote" },
                                    { field: "FechaVencimientoLote", title: "F/vencimiento pedido", format: "{0:dd-MM-yyyy}" },
                                    { command: [{ text: "Guardar", click: Guardar, template: "<a class='k-grid-Guardar btn'><i class='fa fa-tasks'></i> Guardar </a>" }] }
                                ]
                            });
                        },
                        error: function (error) {
                            console.log("Hubo un problema al traer la información", error)
                        },
                    });
                },
                error: function (error) {
                    console.log("Hubo un problema al traer la información", error)
                },
            });
            //var objeto = ajaxSP('Cohan_Lappiz_ConteoProductos', null);
            //objeto = JSON.stringify(objeto);
            //objeto = JSON.parse(objeto);

        }

        function Guardar(e) {
            debugger;

            var productoId = this.dataItem($(e.currentTarget).closest("tr"));

            var Query = {
                "query": `update DIC SET Marcado = 'OK'
                from Cohan_Lappiz_DetalleInventarioCiclico DIC
                inner join Cohan_Lappiz_ProductosUbicacion PU on DIC.ProductoUbicacionFK = PU.Id
                inner join Cohan_Lappiz_ProductosPorUbicacion PPU on PU.ProductosPorUbicacionFK = PPU.Id 
                inner join Cohan_Lappiz_TripleA TA on PPU.TripleA = TA.Id
                inner join [Cohan_Lappiz_Producto] P on TA.ProductoFk = P.Id  
                where InventarioCiclicoFk = '${invetarioCiclicoFk}' 
                and P.Id = '${productoId}'`,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`

                }
            };

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
                    toastr.Success("Se ha actualizado el registro");
                },
                error: function (error) { console.log(`Error-->${error}`); }
            });

            toastr.info("Estamos trabajando en mejoras");

        }

        function EditarConteoP(e) {
            debugger
            var row = this.dataItem($(e.currentTarget).closest("tr"));

            location.href = `https://runtimetest.lappiz.io/#/forms?rowId=${row.Id}&viewName=Cohan_Lappiz_DetalleInventarioCiclico&entityId=246fac58-97a8-4eed-ab14-204de9279fe9&appViewId=c3ced407-2838-4679-9136-c20dca486b61`
        }
        function ajaxSP(nombreSp, parametros) {
            var respuesta;

            var Query = `exec ${nombreSp}`
            if (parametros !== null) {
                for (let i = 0; i < parametros.length; i++) {
                    if (i < 1) {
                        Query = `${Query} '${parametros[i]}'`;
                    } else {
                        Query = `${Query},'${parametros[i]}'`;
                    }
                }
            }
            let newquery = {
                "query": Query,
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
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (Success) {
                    debugger;
                    respuesta = Success[0];
                },
                error: function (error) { console.log(`Error-->${error}`); }
            });

            return respuesta;
        }
    }, 1000);

}