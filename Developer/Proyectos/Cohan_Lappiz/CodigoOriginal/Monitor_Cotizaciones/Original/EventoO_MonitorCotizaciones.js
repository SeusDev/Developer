/*Monitor de cotizacioines bionexo*/
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == '5ca202b6-3426-46bc-b240-15fe650c01db') {

    setTimeout(function () {
        debugger
        var stringQuery = `select Id,NombreCliente,CodigoCliente from Cohan_Lappiz_Bionexo `;
        execQuery(stringQuery).then(success => {
            debugger;
            var dataclient = success.data[0];



            $(`#cliente`).kendoDropDownList({
                autoBind: false,
                dataTextField: "NombreCliente",
                dataValueField: "Id",
                template: `<span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: NombreCliente #</p></span><span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: CodigoCliente #</p></span>`,
                headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px "><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Nombre cliente</span><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Código cliente</span>`,
                valueTemplate: `<span><p style="margin-top:8px">#: NombreCliente #</p></span>`,
                dataSource: {
                    data: dataclient
                },
                optionLabel: {
                    NombreCliente: "Seleccione un registro...",
                    Id: "",
                    Sugerida: ""
                },
                filter: "startswith",
                filtering: function (ev) {
                    delete sessionStorage.dataGrid
                    var filterValue = ev.filter != undefined ? ev.filter.value : "";
                    ev.preventDefault();

                    this.dataSource.filter({
                        logic: "or",
                        filters: [{
                            field: "NombreCliente",
                            operator: "startswith",
                            value: filterValue
                        },
                        {
                            field: "CodigoCliente",
                            operator: "startswith",
                            value: filterValue
                        }
                        ]
                    });
                },
                change: function () {
                    Monicoti()
                },
            });
        });


        function Monicoti() {


            var stringQuery = ` select distinct bi.Id,bi.NumeroCotizacion,bi.CodigoCliente,bi.NombreCliente,bi.Origen,bi.NumeroItems,u.Usuarios'UsuarioAsignado',bi.FechaVencimiento
                            from Cohan_Lappiz_DetalleBionexo dbi
                            join Cohan_Lappiz_Bionexo bi on dbi.BionexoFK=bi.Id and bi.FechaVencimiento > GETDATE()
                            join Lappiz_Users u on bi.UsuarioAsignadoFK=u.Id
                            where bi.Id ='${$('#cliente').val()}'  `
            execQuery(stringQuery).then(success => {
                debugger
                var data = success.data[0]

                if (data.length == 0) {
                    toastr.error('La fecha de vencimiento de la cotización esta vencida')

                } else {


                    $("#gridMonitorCotizacion").kendoGrid({

                        dataSource: {
                            data: data,
                            schema: {
                                model: {
                                    fields: {
                                        Id: { type: "string", editable: false },
                                        NumeroCotizacion: { type: "number", editable: false },
                                        CodigoCliente: { type: "number", editable: false },
                                        NombreCliente: { type: "string", editable: false },
                                        Origen: { type: "string", editable: false },
                                        NumeroItems: { type: "number", editable: false },
                                        UsuarioAsignado: { type: "string", editable: false },
                                        FechaVencimiento: { type: "date", editable: false }
                                    },
                                },
                            },
                            selectable: "multiple, row",
                            pageSize: 10

                        },
                        batch: true,
                        editable: false,
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

                        dataBound: function (e) {
                            debugger;
                            var gridMonitor = $("#gridMonitorCotizacion").data("kendoGrid");
                            for (var i = 0; i < gridMonitor.columns.length; i++) {
                                gridMonitor.autoFitColumn(i);
                            }
                            var gridMonitor = this;
                            var rows = gridMonitor.items();

                            $(rows).each(function (e) {
                                var row = this;
                                var dataItem = gridMonitor.dataItem(row);
                                gridMonitor.select(row);


                            });

                        },
                        columns: [
                            { selectable: true, width: "50px" },
                            { field: "NumeroCotizacion", title: "Número de cotización" },
                            { field: "CodigoCliente", title: "Código de cliente" },
                            { field: "NombreCliente", title: "Nombre de cliente" },
                            { field: "Origen", title: "Origen" },
                            { field: "NumeroItems", title: "Número de items" },
                            { field: "UsuarioAsignado", title: " Usuario asignado" },
                            {
                                field: "FechaVencimiento", title: 'F/Vencimineto cotización', format: "{0:dd-MMM-yyyy hh:mm:ss tt}",
                                parseFormats: ["MM/dd/yyyy h:mm:ss"]
                            },
                            { command: [{ text: "informacion", click: informacion, template: "<a class='k-grid-informacion btn'><i class='fa fa-info'></i> Información</a>" }] },
                            { command: [{ text: "reasignar", click: reasignar, template: "<a class='k-grid-reasignar btn'><i class='fa fa-refresh'></i> Reasignar</a>" }] }
                        ],
                    });
                }
            });

        }
        function cotizamonito() {
            var selectMonitor = []
            var allSelected = $("#gridMonitorCotizacion tr.k-state-selected");
            var allSelectedItems = [];
            $.each(allSelected, function (index, e) {
                var row = $(this);
                var grid = row.closest(".k-grid").data("kendoGrid");
                var dataItem = grid.dataItem(row);
                allSelectedItems.push(dataItem);
                selectMonitor.push({
                    'Id': allSelectedItems[index].Id,
                    'NumeroCotizacion': allSelectedItems[index].NumeroCotizacion,
                    'CodigoCliente': allSelectedItems[index].CodigoCliente,
                    'NombreCliente': allSelectedItems[index].NombreCliente,
                    'Origen': allSelectedItems[index].Origen,
                    'NumeroItems': allSelectedItems[index].NumeroItems,
                    'UsuarioAsignado': allSelectedItems[index].UsuarioAsignado,
                    'FechaVencimiento': allSelectedItems[index].FechaVencimiento
                })
            });
            return selectMonitor
        }

        function informacion(e) {
            debugger;

            var dataItem = cotizamonito()
            if (dataItem.length == 0) {
                toastr.error('No se ha seleccionado ningúna cotización')
            } else {

                $("#modalInfo").modal('show');

                var grid = $("#gridMonitorCotizacion").data("kendoGrid");
                var procoti = grid.dataItem($(e.target).closest("tr"));

                var stringQuery = `select bi.Id,bi.NumeroCotizacion,p.CodigoProducto,p.NombreProducto
                                from Cohan_Lappiz_DetalleBionexo dbi
                                join Cohan_Lappiz_Producto p on dbi.ProductoFK=p.Id
                                join Cohan_Lappiz_Bionexo bi on dbi.BionexoFK=bi.Id
                                where bi.Id='${procoti.Id}' `;

                //realizo la peticion al servidor             
                execQuery(stringQuery).then(success => {
                    var Infomonitor = success.data[0]

                    $("#informacion").kendoGrid({
                        dataSource: {
                            data: Infomonitor,
                            schema: {
                                model: {

                                    fields: {
                                        Id: { type: "string", editable: false },
                                        NumeroCotizacion: { type: "number", editable: false },
                                        CodigoProducto: { type: "number", editable: false },
                                        NombreProducto: { type: "string", editable: false }
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
                            { field: "NumeroCotizacion", title: "Número cotización" },
                            { field: "CodigoProducto", title: "Cód/Producto" },
                            { field: "NombreProducto", title: "Nombre producto" }
                        ]
                    });
                });
            }
        }
        function reasignar(e) {
            debugger;

            var dataItem = cotizamonito()
            if (dataItem.length == 0) {
                toastr.error('No se ha seleccionado ningúna cotización')
            } else {
                $("#modalReasignar").modal('show');
                var grid = $("#gridMonitorCotizacion").data("kendoGrid");
                var usucoti = grid.dataItem($(e.target).closest("tr"));
                var stringQuery = `select bi.Id,u.Usuarios
                                from Cohan_Lappiz_DetalleBionexo dbi
                                join Cohan_Lappiz_Bionexo bi on dbi.BionexoFK=bi.Id
                                join Lappiz_Users u on bi.UsuarioAsignadoFK=u.Id
                                where bi.Id='${usucoti.Id}' `;

                execQuery(stringQuery).then(success => {
                    var usuarioA = success.data[0]
                    $("#assigned-user").kendoDropDownList({
                        filter: "startswith",
                        dataTextField: "Usuarios",
                        dataValueField: "Id",
                        dataSource: usuarioA
                    });
                })
                var stringQuery1 = `select Id,FullName
                                from  Lappiz_Users 
                                where FullName is not null 
                                order by FullName `

                execQuery(stringQuery1).then(success => {
                    var usuario = success.data[0]
                    $("#change-user").kendoDropDownList({
                        filter: "startswith",
                        dataTextField: "FullName",
                        dataValueField: "Id",
                        dataSource: usuario
                    });
                })

            }

        }

        $('#volverReasignar').click(function () {
            debugger
            $("#modalReasignar").modal('hide');
        });

        $('#guardarAsing').click(function () {
            debugger
            if (confirm('¿Desea guardar el usuario reasignado?')) {
                var getAssignedUser = $("#change-user").val();
                var IdBi = $("#assigned-user").val();
                var stringQuery = `update Cohan_Lappiz_Bionexo
                            set UsuarioAsignadoFK='${getAssignedUser}'
                            where Id='${IdBi}' `

                execQuery(stringQuery).then(success => {
                    debugger

                    $("#modalReasignar").modal('hide');
                    Monicoti()
                    toastr.success('Usuario reasignado con éxito')

                })
            }
        });

    }, 1500);
}