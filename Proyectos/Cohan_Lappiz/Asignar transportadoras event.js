
   
    var url = location.href;
    var urlSplit = url.split("appViewId=");
    var idVista = urlSplit[1];

    if (idVista == "0e9d6e3d-d1f2-4689-8627-51a9880ee3e9") {
        debugger;
setTimeout(function () {
    $("#configurator").kendoTabStrip();
    // grid transportadoras

    gridTransportadoras(ajaxSP('Cohan_Lappiz_ListaDespachoT'))

    function gridTransportadoras(dataGrid) {
        $("#transportadoras").kendoGrid({
            columns: [
                // { template: "<input type='checkbox' class='checkbox' />" },
                {
                    field: "NombreTransportadora",
                    title: "Nombre transportadora"
                },
                {
                    field: "NumeroIdentificacion",
                    title: " Número identificacion"
                },
                {
                    field: "NumeroDespacho",
                    title: "Numero despacho"
                },
                {
                    field: "TotalDespacho",
                    title: "Valor total"
                },
                {
                    command: {
                        text: "informacion",
                        click: informacion,
                        template: "<a class='k-grid-informacion btn'><i class='fa fa-info-circle'><span>Información</span></i></a>"
                    }
                }
            ],
            batch: true,
            editable: false,
            persistSelection: true,
            scrollable: true,
            sortable: true,
            filterable: true,
            resizable: true,
            selectable: "multiple, row",
            pageable: {
                input: true,
                numeric: true,
                refresh: false
            },
            dataBound: function (e) {
                debugger
                var transportadoras = $("#transportadoras").data("kendoGrid");
                for (var i = 0; i < transportadoras.columns.length; i++) {
                    transportadoras.autoFitColumn(i);
                }
            },
            dataSource: {
                data: dataGrid,
                pageSize: 15,
                autoSync: true,
                schema: {
                    model: {
                        fields: {
                            Id: {
                                type: 'string'
                            },
                            NombreTransportadora: {
                                type: 'string'
                            },
                            NumeroIdentificacion: {
                                type: 'string'
                            },
                            NumeroDespacho: {
                                type: 'string'
                            },
                            TotalDespacho: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
        })

        function imprimir(e) {
            debugger
            // var transRow = this.dataItem($(e.currentTarget).closest("tr"));
            e.preventDefault()
            var pedido = this.dataItem($(e.currentTarget).closest("tr"));
            var url = `https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fCohan_Lappiz_ReporteRemesaTransportadora&rs:Command=Render&IdPedido=${pedido.Id}`
            window.open(url, '_blank');
            getOutHere
        }

        function imprimirRD(e) {
            e.preventDefault()
            var pedido = this.dataItem($(e.currentTarget).closest("tr"));
            let url = `https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fCohan_Lappiz_ReporteDespachos&rs:Command=Render&IdPedido=${pedido.Id}`
            window.open(url, '_blank');
            getOutHere
        }

        function confirmar(e) {

            if (Confirm('¿Desea confirmar la entrega?')) {
                debugger;
                var DataGrid = $("#gridInfoDespacho").data("kendoGrid").dataSource;
                var NombreCliente = DataGrid.options.data[0].Nombre;
                var CodigoCliente = DataGrid.options.data[0].Codigo;
                var NumeroPedido = DataGrid.options.data[0].NumeroPedido;
                var Transportadora = DataGrid.options.data[0].NombreTransportadora;
                var Query = {
        
                    query: `select EmailPersonaResponsable from Cohan_Lappiz_DetalleCliente
                where Codigo = ${CodigoCliente} and Nombre = '${NombreCliente}'`,
                    tenantId: "null",
                    parameters: {
                        aType: "execTx",
                        environment: `${backandGlobal.environment}`,
                    },
                }
        
                $.ajax({
                    async: false,
                    url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                    type: "POST",
                    data: JSON.stringify(Query),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Authorization", localStorage.Authorization);
                    },
                    success: function (Success) {
                        debugger;
        
                        var correo = Success[0];
        
                        var to = correo;
                        var Asunto = `Pedido despachado No. ${NumeroPedido}`;
                        var Texto = `Nro. De pedido (${NumeroPedido}) ha sido despachado con la remesa Nro. () Y  por  la transportadora (${Transportadora})`;
                        var Html = `<h2>Envio de despacho </h2> <br>
                
                   `;
        
                        toastr.success("se ha enviado correo al responsable");
        
                        sendEmail(to, Asunto, Texto, Html);
        
        
                    },
                    error: function (error) {
                        console.log(`Error-->${error}`);
                    },
                });
        
            } else {
                console.log('ok')
            }
        
        }


        // grid info transportadora
        function informacion(e) {
            debugger
            // var orderRow = this.dataItem($(e.currentTarget).closest("tr"));
            var grid = $("#transportadoras").data("kendoGrid")
            var orderRow = grid.dataItem(grid.select());

            $("#modalInformacion").modal('show');
            // $("#imprimirLE").attr('href', `https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fCohan_Lappiz_ReportListaEmpaque&rs:Command=Render&pedidoCliente=${orderRow.IdPedidoCliente}`)
            // return infoPedidoDespacho
            $("#gridInfoDespacho").kendoGrid({
                columns: [{
                    field: "NumeroIdentificacion",
                    title: "Nit"
                },
                {
                    field: "NombreCompleto",
                    title: "Cliente"
                },
                {
                    field: "Codigo",
                    title: "Código detalle cliente"
                },
                {
                    field: "Nombre",
                    title: "Nombre detalle cliente"
                },
                {
                    field: "DireccionCliente",
                    title: "Dirección"
                },
                {
                    field: "NombreDepartamento",
                    title: "Departamento"
                },
                {
                    field: "NombreDeLaCiudad",
                    title: "Ciudad"
                },
                {
                    field: "NombreRegional",
                    title: "Regional"
                },
                {
                    field: "NumeroPedido",
                    title: "Numero pedido"
                },
                {
                    field: "FechaPedido",
                    title: "Fecha pedido",
                    template: "#= kendo.toString(kendo.parseDate(FechaPedido, 'yyyy-MM-dd'), 'yyyy/MM/dd') #"
                },
                {
                    field: "TotalCajas",
                    title: "Total cajas",
                },
                {
                    field: "ResponsableEmpaque",
                    title: "Responsable empaque",
                },
                {
                    field: "FechaDespacho",
                    title: "Fecha despacho",
                    template: "#= kendo.toString(kendo.parseDate(FechaDespacho, 'yyyy-MM-dd'), 'yyyy/MM/dd') #"
                },
                {
                    field: "PorcentajeManejo",
                    title: "Porcentaje de manejo",
                },
                {
                    field: "NombreTransportadora",
                    title: "Transportadora",
                },
                {
                    field: "TipoEmpaque",
                    title: "Tipo de empaque",
                },
                {
                    field: "TipoTransporte",
                    title: "Tipo de transporte",
                },
                {
                    field: "CostoEnvio",
                    title: "Costo envío",
                },
                {
                    field: "ValorFlete",
                    title: "Valor flete",
                },
                {
                    field: "TotalDespacho",
                    title: "Valor total",
                },
                {
                    command: {
                        text: "imprimir",
                        click: imprimir,
                        template: "<a class='k-grid-imprimir btn'><i class='fa fa-print'><span> Imprimir remesa</span></i></a>"
                    }
                },
                {
                    command: {
                        text: "imprimirRD",
                        click: imprimirRD,
                        template: "<a class='k-grid-imprimirRD btn'><i class='fa fa-print'><span> Imprimir despacho</span></i></a>"
                    }
                },
                {
                    command: {
                        text: "confirmar",
                        click: confirmar,
                        template: "<a class='k-grid-confirmar btn'><i class='fa fa-print'><span>Confirmar</span></i></a>"
                    }
                }
                ],
                batch: true,
                persistSelection: true,
                scrollable: true,
                sortable: true,
                filterable: true,
                resizable: true,
                pageable: {
                    input: true,
                    numeric: true,
                    refresh: false
                },
                selectable: "multiple, row",
                dataSource: {
                    data: ajaxSPT('Cohan_Lappiz_InfoDispatch', [orderRow.Id]),
                    pageSize: 15,
                    autoSync: true,
                    schema: {
                        model: {
                            fields: {
                                IdDCliente: {
                                    type: 'string'
                                },
                                Id: {
                                    type: 'string'
                                },
                                IdRegional: {
                                    type: 'string'
                                },
                                IdCiudad: {
                                    type: 'string'
                                },
                                NumeroIdentificacion: {
                                    type: 'number'
                                },
                                NombreCompleto: {
                                    type: 'string'
                                },
                                Codigo: {
                                    type: 'number'
                                },
                                Nombre: {
                                    type: 'string'
                                },
                                DireccionCliente: {
                                    type: 'string'
                                },
                                NombreDepartamento: {
                                    type: 'string'
                                },
                                NombreDeLaCiudad: {
                                    type: 'string'
                                },
                                NombreRegional: {
                                    type: 'string'
                                },
                                NumeroPedido: {
                                    type: 'number'
                                },
                                FechaPedido: {
                                    type: 'date'
                                },
                                TotalCajas: {
                                    type: 'number'
                                },
                                ResponsableEmpaque: {
                                    type: 'string'
                                },
                                FechaDespacho: {
                                    type: 'date'
                                },
                                PorcentajeManejo: {
                                    type: 'string'
                                },
                                NombreTransportadora: {
                                    type: 'string'
                                },
                                TotalDespacho: {
                                    type: 'number'
                                },
                                Estado: {
                                    type: 'string'
                                },
                                TipoEmpaque: {
                                    type: 'string'
                                },
                                TipoTransporte: {
                                    type: 'string'
                                },
                                ValorFlete: {
                                    type: 'number'
                                },
                                CostoEnvio: {
                                    type: 'number'
                                },
                                EmailPersonaResponsable: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                },
                change: function (e) { },
                dataBound: function (e) {
                    debugger
                    var gridInfoDespacho = $("#gridInfoDespacho").data("kendoGrid");
                    for (var i = 0; i < gridInfoDespacho.columns.length; i++) {
                        gridInfoDespacho.autoFitColumn(i);
                    }
                }
            })

            setTimeout(function () {
                $('#gridInfoDespacho').data('kendoGrid').dataSource.read()
            }, 100)
            getOutHere
        }
        $('#transportadoras').data('kendoGrid').refresh()
    }



    // 
    $('#eliminarTabT').click(() => {
        let orderRow = $("#gridInfoDespacho").data("kendoGrid").dataSource.options.data[0]
        debugger
        var Query = `update Cohan_Lappiz_PedidosClientes 
									set Estado = 'Despacho', TipoEmpaque = null, TipoTransporte = null
                                    where Id = '${orderRow.Id}'
                                    
                                    delete Cohan_Lappiz_DetalleDespachos where PedidoClienteFK = '${orderRow.Id}'
                                    select * from Cohan_Lappiz_DetalleDespachos where DespachosFK = '${orderRow.idDespacho}'
                                    `
        execQuery(Query).then(function (response) {
            if (response.data[0].length == 0) {
                let Q = ` delete Cohan_Lappiz_Despachos where Id = '${orderRow.idDespacho}'`
                execQuery(Q).then(function (response) {
                    debugger
                })
            }

            toastr.success('Se ha eliminado la transportadora')
            gridPedidos(ajaxSP('Cohan_Lappiz_ListaDespacho'))
            gridTransportadoras(ajaxSP('Cohan_Lappiz_ListaDespachoT'))
            $("#modalInformacion").modal('hide')
        })
    })





    // end grid transportadoras 

    // grid pedidos tab
    gridPedidos(ajaxSP('Cohan_Lappiz_ListaDespacho'))

    function gridPedidos(dataGrid) {
        $("#gridPedidos").empty();
        $("#gridPedidos").kendoGrid({
            columns: [{
                template: "<input type='checkbox' class='checkbox' />"
            },
            {
                field: "NumeroIdentificacion",
                title: "Nit"
            },
            {
                field: "NombreCompleto",
                title: "Cliente"
            },
            {
                field: "Codigo",
                title: "Código detalle cliente"
            },
            {
                field: "Nombre",
                title: "Nombre detalle cliente"
            },
            {
                field: "DireccionCliente",
                title: "Dirección"
            },
            {
                field: "NombreDepartamento",
                title: "Departamento"
            },
            {
                field: "NombreDeLaCiudad",
                title: "Ciudad"
            },
            {
                field: "NombreRegional",
                title: "Regional"
            },
            {
                field: "NumeroPedido",
                title: "Numero pedido"
            },
            {
                field: "TotalCajas",
                title: "Total cajas",
            },
            {
                field: "ResponsableEmpaque",
                title: "Responsable empaque",
            },
            {
                field: "FechaPedido",
                title: "Fecha pedido",
                template: "#= kendo.toString(kendo.parseDate(FechaPedido, 'yyyy-MM-dd'), 'yyyy/MM/dd') #"
            },
            {
                field: "TipoEmpaque",
                title: "Tipo de empaque",
            },
            {
                field: "TipoTransporte",
                title: "Tipo de transporte",
            }
            ],

            batch: true,
            persistSelection: true,
            scrollable: true,
            groupable: true,
            sortable: true,
            filterable: true,
            resizable: true,
            pageable: {
                input: true,
                numeric: true,
                refresh: false
            },
            selectable: "multiple, row",
            dataSource: {
                data: dataGrid,
                pageSize: 15,
                group: {
                    field: "NombreRegional"
                },
                autoSync: true,
                schema: {
                    model: {
                        fields: {
                            IdDCliente: {
                                type: 'string'
                            },
                            Id: {
                                type: 'string'
                            },
                            IdRegional: {
                                type: 'string'
                            },
                            IdCiudad: {
                                type: 'string'
                            },
                            NumeroIdentificacion: {
                                type: 'number'
                            },
                            NombreCompleto: {
                                type: 'string'
                            },
                            Codigo: {
                                type: 'number'
                            },
                            Nombre: {
                                type: 'string'
                            },
                            DireccionCliente: {
                                type: 'string'
                            },
                            NombreDepartamento: {
                                type: 'string'
                            },
                            NombreDeLaCiudad: {
                                type: 'string'
                            },
                            NombreRegional: {
                                type: 'string'
                            },
                            NumeroPedido: {
                                type: 'number'
                            },
                            TotalCajas: {
                                type: 'number'
                            },
                            ResponsableEmpaque: {
                                type: 'string'
                            },
                            FechaDespacho: {
                                type: 'date'
                            },
                            FechaPedido: {
                                type: 'date'
                            },
                            PorcentajeManejo: {
                                type: 'string'
                            },
                            NombreTransportadora: {
                                type: 'string'
                            },
                            TipoEmpaque: {
                                type: 'string'
                            },
                            TipoTransporte: {
                                type: 'string'
                            },
                            ValorFlete: {
                                type: 'number'
                            },
                            CostoEnvio: {
                                type: 'number'
                            },
                            ValorTotal: {
                                type: 'number'
                            },
                            EmailPersonaResponsable: {
                                type: 'string'
                            }
                        }
                    }
                }
            },

            change: function (e) {
                debugger
                $('tr').find('[type=checkbox]').prop('checked', false);
                $('tr.k-state-selected').find('[type=checkbox]').prop('checked', true);
            },
            dataBound: function (e) {
                debugger
                var gridPedidos = $("#gridPedidos").data("kendoGrid");
                for (var i = 0; i < gridPedidos.columns.length; i++) {
                    gridPedidos.autoFitColumn(i);
                }
                $(".checkbox").bind("click", function (e) {
                    e.stopPropagation();
                    $(e.target).closest("tr").toggleClass("k-state-selected");
                });

                var rows = e.sender.element.find("tr");
                rows.each(function (e) {
                    $(this).children().first().on("click" /*, onFirstTDClick*/);
                })

            }
        });
        $('#gridPedidos').data('kendoGrid').refresh()
    }

    var ordersToAssign

    function getSelectedItems2() {
        debugger
        var selectOrders = []
        var same = true
        var allSelected = $("#gridPedidos tr.k-state-selected");
        var allSelectedItems = [];
        $.each(allSelected, function (index, e) {
            var row = $(this);
            var grid = row.closest(".k-grid").data("kendoGrid");
            var dataItem = grid.dataItem(row);
            allSelectedItems.push(dataItem);
            selectOrders.push({
                'Id': allSelectedItems[index].Id,
                'IdDCliente': allSelectedItems[index].IdDCliente,
                'IdRegional': allSelectedItems[index].IdRegional,
                'IdCiudad': allSelectedItems[index].IdCiudad,
                'NumeroPedido': allSelectedItems[index].NumeroPedido,
                'Nombre': allSelectedItems[index].Nombre,
                'FechaPedido': allSelectedItems[index].FechaPedido,
                'NombreRegional': allSelectedItems[index].NombreRegional,
                'NombreDeLaCiudad': allSelectedItems[index].NombreDeLaCiudad,
                'CostoEnvio': allSelectedItems[index].CostoEnvio,
                'ValorFlete': allSelectedItems[index].ValorFlete,
                'PorcentajeManejo': allSelectedItems[index].PorcentajeManejo,
                'ValorTotal': allSelectedItems[index].ValorTotal,
                'TipoEmpaque': allSelectedItems[index].TipoEmpaque,
                'TipoTransporte': allSelectedItems[index].TipoTransporte,
                'EmailPersonaResponsable': allSelectedItems[index].EmailPersonaResponsable,
                'TipoDePedido': allSelectedItems[index].TipoDePedido
            })
            if (allSelectedItems[0].NombreRegional != allSelectedItems[index].NombreRegional) {
                same = false
            } else {
                same = true
            }
        });
        if (same) {
            return selectOrders
        } else {
            toastr.error('Los pedidos no son compatibles para enviar por la misma transportadora')
        }
    }

    // grid acá
    var IdTransportadora
    $('#asignarT').click(function () {
        $('#asignar').hide()
        var dataItem = getSelectedItems2()
        if (dataItem.length == 0) {
            toastr.error('No se ha seleccionado ningún pedido')
        } else {
            var success
            var Query = {
                "query": `select t.Id,NombreTransportadora,PorcentajeManejo from Cohan_Lappiz_Transportadoras t
					join Cohan_Lappiz_DetalleTransportadoras dt on dt.TransportadorasFk = t.Id
					join Cohan_Lappiz_Ciudad c on c.Id = dt.CiudadFk
					join Cohan_Lappiz_DetallesCiudadesRegionales dcr on dcr.CiudadesFk = c.Id
					join Cohan_Lappiz_Regional r on r.Id = dcr.RegionalesFk
					where r.Id = '${dataItem[0].IdRegional}'
                    group by t.Id,t.NombreTransportadora,PorcentajeManejo`,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }
            for (let i = 0; i < dataItem.length; i++) {
                dataItem[i].TipoEmpaque = {
                    "Tipo": dataItem[i].TipoEmpaque
                }
                dataItem[i].TipoTransporte = {
                    "Tipo": dataItem[i].TipoTransporte
                }
            }
            var tipoEmpaque = [{
                "Tipo": "Caja"
            }, {
                "Tipo": "Nevera"
            }]
            var tipoTransporte = [{
                "Tipo": "Masivo"
            }, {
                "Tipo": "Expreso"
            }, {
                "Tipo": "Paqueteo"
            }, {
                "Tipo": "Cliente recoje"
            }]

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
                    debugger
                    $('#modalTrans').modal('show')
                    success = Success[0]

                    $("#transport").kendoDropDownList({
                        filter: "startswith",
                        dataTextField: "NombreTransportadora",
                        dataValueField: "Id",
                        optionLabel: "Seleccione una transportadora",
                        change: onChange,
                        // select: onSelect,
                        dataSource: success
                    });

                    function onChange() {
                        debugger
                        IdTransportadora = $('#transport').data('kendoDropDownList').dataItem().Id
                        consultarInfoTrans(dataItem, IdTransportadora, $('#transport').data('kendoDropDownList').dataItem().PorcentajeManejo)
                        $('#asignar').show()
                    };

                    $("#pedidosSeleccionados").kendoGrid({
                        columns: [{
                            field: "NumeroPedido",
                            title: "Numero pedido"
                        },
                        {
                            field: "Nombre",
                            title: "Nombre detalle cliente"
                        },
                        {
                            field: "FechaPedido",
                            title: "Fecha pedido",
                            template: "#= kendo.toString(kendo.parseDate(FechaPedido, 'yyyy-MM-dd'), 'yyyy/MM/dd') #"
                        },
                        {
                            field: "NombreRegional",
                            title: "Regional"
                        },
                        {
                            field: "NombreDeLaCiudad",
                            title: "Ciudad envío"
                        },
                        {
                            field: "CostoEnvio",
                            title: "Costo envío",
                        },
                        {
                            field: "ValorFlete",
                            title: "Valor flete",
                        },
                        {
                            field: "PorcentajeManejo",
                            title: "Porcentaje de manejo",
                        },
                        {
                            field: "ValorTotal",
                            title: "Valor total",
                        },
                        {
                            field: "TipoEmpaque",
                            title: "Tipo de empaque",
                            editor: categoryDropDownEditor,
                            template: "#=TipoEmpaque.Tipo#"
                        },
                        {
                            field: "TipoTransporte",
                            title: "Tipo de transporte",
                            editor: DropDownList,
                            template: "#=TipoTransporte.Tipo#"
                        },
                        {
                            command: {
                                text: "Eliminar",
                                click: Eliminar,
                                template: "<a class='k-grid-Eliminar btn'><i class='fa fa-times-circle'></i>Eliminar</a>"
                            }
                        }
                        ],
                        batch: true,
                        editable: true,
                        persistSelection: true,
                        scrollable: true,
                        sortable: true,
                        filterable: true,
                        resizable: true,
                        selectable: "multiple, row",
                        pageable: {
                            input: false,
                            numeric: false,
                            refresh: false
                        },
                        dataSource: {
                            data: dataItem,
                            pageSize: 15,
                            autoSync: true,
                            schema: {
                                model: {
                                    fields: {
                                        Id: {
                                            type: 'string',
                                            editable: false
                                        },
                                        NumeroPedido: {
                                            type: 'string',
                                            editable: false
                                        },
                                        Nombre: {
                                            type: 'string',
                                            editable: false
                                        },
                                        FechaPedido: {
                                            type: 'date',
                                            editable: false
                                        },
                                        NombreRegional: {
                                            type: 'string',
                                            editable: false
                                        },
                                        NombreDeLaCiudad: {
                                            type: 'string',
                                            editable: false
                                        },
                                        CostoEnvio: {
                                            type: 'number',
                                            editable: false
                                        },
                                        ValorFlete: {
                                            type: 'number',
                                            editable: false
                                        },
                                        PorcentajeManejo: {
                                            type: 'string',
                                            editable: false
                                        },
                                        ValorTotal: {
                                            type: 'number',
                                            editable: false
                                        },
                                        TipoEmpaque: {
                                            defaultValue: {
                                                Tipo: "Caja"
                                            }
                                        },
                                        TipoTransporte: {
                                            defaultValue: {
                                                Tipo: "Masivo"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        dataBound: function (e) {
                            debugger
                            var pedidosSeleccionados = $("#pedidosSeleccionados").data("kendoGrid");
                            for (var i = 0; i < pedidosSeleccionados.columns.length; i++) {
                                pedidosSeleccionados.autoFitColumn(i);
                            }
                        }

                    })

                    function getSeledtedItem() {
                        var grid = $('#pedidosSeleccionados').data('kendoGrid')
                        grid.dataItem(grid.select())
                        let selectedItem = grid.select().index()
                        return selectedItem
                    }

                    function Eliminar(e) {
                        if (confirm("¿Desea eliminar el pedido?")) {
                            debugger
                            var productRow = this.dataItem($(e.currentTarget).closest("tr"));
                            var datosProductos = $('#pedidosSeleccionados').data('kendoGrid').dataSource.options.data
                            var select = getSeledtedItem()
                            datosProductos.splice(select, 1);
                            $('#pedidosSeleccionados').data('kendoGrid').dataSource.read()
                        }
                        getOutHere

                    }
                    // setTimeout(function () { $('#pedidosSeleccionados').data('kendoGrid').dataSource.read() }, 100);
                    function categoryDropDownEditor(container, options) {
                        $('<input required name="' + options.field + ' "/>').appendTo(container).kendoDropDownList({
                            autoBind: false,
                            dataTextField: "Tipo",
                            dataValueField: "Tipo",
                            optionLabel: "Seleccione un tipo",
                            dataSource: {
                                data: tipoEmpaque
                            }
                        });
                    }

                    function DropDownList(container, options) {
                        $('<input required name="' + options.field + ' "/>').appendTo(container).kendoDropDownList({
                            autoBind: false,
                            dataTextField: "Tipo",
                            dataValueField: "Tipo",
                            optionLabel: "Seleccione un tipo",
                            dataSource: {
                                data: tipoTransporte
                            }
                        });
                    }
                },
                error: function (error) {
                    console.log(`Error-->${error}`);
                }
            });
        }

    })

    function consultarInfoTrans(dataItem, id, porcentajeManejo) {
        for (let i = 0; i < dataItem.length; i++) {
            debugger
            var Query = {
                "query": `select ValorFlete from Cohan_Lappiz_DetalleTransportadoras where CiudadFk = '${dataItem[i].IdCiudad}' and TransportadorasFk = '${id}'`,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }
            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: 'POST',
                data: JSON.stringify(
                    Query
                ),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (Success) {
                    debugger
                    var response = Success[0][0]
                    dataItem[i].ValorTotal = dataItem[i].ValorTotal
                    dataItem[i].PorcentajeManejo = porcentajeManejo
                    dataItem[i].ValorFlete = response.ValorFlete
                    var porcentaje = Math.floor(dataItem[i].ValorTotal * porcentajeManejo) / 100;
                    dataItem[i].CostoEnvio = porcentaje + dataItem[i].CostoEnvio
                    dataItem[i].ValorTotal = dataItem[i].CostoEnvio + dataItem[i].ValorFlete
                },
                error: function (error) {
                    console.log(`Error-->${error}`);
                }
            });
        }
        ordersToAssign = dataItem
        $('#pedidosSeleccionados').data('kendoGrid').dataSource.read(dataItem)
    }

    $('#asignar').click(function () {
        debugger;

        var mensaje = "";
        if (confirm('¿Está seguro de asignar esta transportadora?')) {
            var numeroDespacho
            var fechaDespacho = new Date().format('Y-m-d H:i:s')
            var fechaEntrega = new Date().addDays(3).format('Y-m-d H:i:s')
            var Query1 = `SELECT  Max(NumeroDespacho) as [NumeroDespacho] FROM Cohan_Lappiz_Despachos`
            var responseNumDespacho = executeAjax(Query1)
            numeroDespacho = responseNumDespacho[0].NumeroDespacho
            if (numeroDespacho == null || numeroDespacho == 0) {
                numeroDespacho = 1
            } else {
                numeroDespacho += 1
            }
            var dropObj = $('#pedidosSeleccionados').data('kendoGrid')._data

            function uuid() {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
            }
            let despachoId = uuid();
            let valorTotal = 0
            let Query2 = `INSERT INTO Cohan_Lappiz_Despachos (Id, CENull, UsuarioCreacion, FechaCreacion, 
                        TransportadoraFk, NumeroDespacho, TotalDespacho, FechaDespacho)
                        VALUES
                        ('${despachoId}', null, '${JSON.parse(sessionStorage.LappizUser).FullName}', '${fechaDespacho}', '${IdTransportadora}', 
                        ${numeroDespacho}, ${valorTotal}, '${fechaDespacho}') \n`

            for (let i = 0; i < dropObj.length; i++) {

                dropObj[i].valorTotal = dropObj[i].valorTotal + valorTotal
                Query2 += `update Cohan_Lappiz_PedidosClientes set Estado = 'Despachado' , TipoEmpaque = '${dropObj[i].TipoEmpaque.Tipo}', TipoTransporte = '${dropObj[i].TipoTransporte.Tipo}' where Id = '${dropObj[i].Id}'
                    
                        INSERT INTO Cohan_Lappiz_DetalleDespachos (Id, CENull, DespachosFK, PedidoClienteFK, CostoEnvio, ValorFlete,TranscripcionFormulasFK,FechaEntrega,Estado,CargaAnexos)
                        VALUES
                        (NEWID(), null, '${despachoId}', '${dropObj[i].Id}', ${dropObj[i].CostoEnvio}, ${dropObj[i].ValorFlete}, null,'${fechaEntrega}','Pendiente',null) ` + ' \n '
                valorTotal = parseInt(dropObj[i].ValorFlete) + parseInt(dropObj[i].ValorFlete)

                if (dropObj[i].TipoDePedido === 'Interno') {

                    Query2 += `
                                            
                        declare @contador${i} int 

                        select @contador= COUNT(Id) from Cohan_Lappiz_Recepciones where PedidoFK = '${dropObj[i].Id}'
                            IF @contador = 0
                                BEGIN
                                    Declare @IdRecepcion${i} uniqueidentifier
                                            
                                            set @IdRecepcion${i} = newId()
                                            INSERT INTO Cohan_Lappiz_Recepciones (Id, PedidoFK,BodegaFK,FechaCreacion,UsuarioCreacion, Estado)
                                            select distinct @IdRecepcion${i} [IdRecepcion], PC.Id, PC.BodegaDestinoFk [Bodega]  , GETDATE() [FechaCreacion], '${JSON.parse(sessionStorage.LappizUser).Id}' [UsuarioCreacion], 'Administrativa' [Estado]
                                            from  Cohan_Lappiz_PedidosClientes PC
                                            join Cohan_Lappiz_PuntoVenta PV on PC.PuntosVentasFk = PV.Id
                                            join Cohan_Lappiz_Bodega B on PV.Id = B.PuntoVentaFK 
                                            where PC.TipoDePedido = 'Interno' and PC.Estado = 'Despachado' and PC.Id = '${dropObj[i].Id}'
                                            
                                            INSERT INTO Cohan_Lappiz_DetalleRecepcion (FechaVencimientoLote, Lote, ProductoFK, Cantidad, TripleAFK, RecepcionFk,FechaCreacion,UsuarioCreacion, Estado)
                                            select distinct TA.FechaVencimientoLote,TA.NumeroLote,  DPC.ProductoFk, PU.Cantidad, TA.Id, @IdRecepcion${i} [IdRecepcion] , GETDATE() [FechaCreacion], '${JSON.parse(sessionStorage.LappizUser).Id}' [Usuariocreacion], 'Administrativa' [Estado]
                                            from Cohan_Lappiz_DetallePedidosClientes DPC
                                            join Cohan_Lappiz_ProductosUbicacion PU ON DPC.Id = PU.DetallePedidosClientesFk
                                            join Cohan_Lappiz_ProductosPorUbicacion PPU ON PU.ProductosPorUbicacionFK = PPU.Id
                                            join Cohan_Lappiz_TripleA TA On PPU.TripleA = TA.Id 
                                            where DPC.PedidosClientesFk = '${dropObj[i].Id}'
                                END`

                }
            }

            // ordersToAssign.forEach(function (order, index) {
            //     order.valorTotal = order.valorTotal + valorTotal
            //     Query2.query += `update Cohan_Lappiz_PedidosClientes set Estado = 'Despachado' , TipoEmpaque = '${dropObj[index].TipoEmpaque.Tipo}', TipoTransporte = '${dropObj[index].TipoTransporte.Tipo}' where Id = '${order.Id}'

            //             INSERT INTO Cohan_Lappiz_DetalleDespachos (Id, CENull, DespachosFK, PedidoClienteFK, CostoEnvio, ValorFlete,TranscripcionFormulasFK,FechaEntrega,Estado,CargaAnexos)
            //             VALUES
            //             (NEWID(), null, '${despachoId}', '${order.Id}', ${order.CostoEnvio}, ${order.ValorFlete}, null,'${fechaEntrega}','Pendiente',null) ` + ' \n '
            //     valorTotal = parseInt(order.ValorFlete) + parseInt(order.ValorFlete)
            // });
            Query2 += `UPDATE Cohan_Lappiz_Despachos set [TotalDespacho] = ${valorTotal} where Id = '${despachoId}'`;

            var update = executeAjax(Query2)
            gridPedidos(ajaxSP('Cohan_Lappiz_ListaDespacho'))
            $('#gridPedidos').data('kendoGrid').refresh()
            $('#transportadoras').empty()

            gridTransportadoras(ajaxSP('Cohan_Lappiz_ListaDespachoT'))
            // $('#transportadoras').data('kendoGrid').refresh()
            toastr.success('Se ha asignado la transportadora')
            toastr.success(`Número de despacho asignado ${numeroDespacho}`)
            $("#modalTrans").modal('hide')
            debugger;

            if ($("#gridPedidos").data("kendoGrid").dataSource.options.data.length > 0) {

                mensaje = $("#gridPedidos").data("kendoGrid").dataSource.options.data[0].EmailPersonaResponsable

                var to = mensaje
                var subject = 'Notificación envio de pedido';
                var Text = 'Pedido despachado';
                //cuerpo de correo electronico enviado
                var Html = `
						<div class="container">
						<div class="card">
						<div>
						<img src="https://lh3.googleusercontent.com/Bkmmn4Gsv4J1IKtTDgFzIX3XNd9QDC8l7BwTr7kSOke3H58oubU7BuQLncQ7EJdCcyhu=s85">
						<p>Buen día señor(a): ${$("#gridPedidos").data("kendoGrid").dataSource.options.data[0].Nombre}</p>
						<p>El presente comunicado tiene como fin infórmale que:
						Se ha enviado el pedido ${$("#gridPedidos").data("kendoGrid").dataSource.options.data[0].NumeroPedido} por la transportadora: ${$('#transport').data('kendoDropDownList').text()} </p>
						<p>ha sido despachado con la remesa número: ${$("#gridPedidos").data("kendoGrid").dataSource.options.data[0].Codigo}</p>
						</div>
		
						</div>
						</div>
					<style>
				img {
					position: relative;
					width: 30%;
					left: 30%;
		
				}
		
				h4,
				p {
					text-align: center;
					width: 90%
				}
		
				.card {
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
					transition: 0.3s;
					width: 40%;
					border: 1px solid rgb(13, 14, 13);
				}
		
				.card:hover {
					box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
				}
		
				.container {
					padding: 2px 16px;
				}
		
				#customers {
					font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
					border-collapse: collapse;
					width: 100%;
				}
		
				#customers td,
				#customers th {
					border: 1px solid #ddd;
					padding: 8px;
				}
		
				#customers tr:nth-child(even) {
					background-color: #f2f2f2;
				}
		
				#customers tr:hover {
					background-color: #ddd;
				}
		
				#customers th {
					padding-top: 12px;
					padding-bottom: 12px;
					text-align: left;
					background-color: #355380;
					color: white;
				}
				</style>
				`
                //enviar el correo de envio de pedido
                sendEmail(to, subject, Text, Html);
            }

        }
    });

    function executeAjax(Query) {
        debugger
        var response
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
                debugger
                response = Success[0]
            },
            error: function (error) {
                console.log(`Error-->${error}`);
            }
        });
        return response
    }

    function ajaxSP(nombreSp, parametros) {
        var response
        var Query = `exec ${nombreSp}`
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
                debugger
                response = Success[0]
            },
            error: function (error) {
                console.log(`Error-->${error}`);
            }
        });
        return response
    }

    function ajaxSPT(nombreSp, parametros) {
        var response
        var Query = `exec ${nombreSp}`
        if (parametros != null) {
            for (let i = 0; i < parametros.length; i++) {
                if (i < 1) {
                    if (typeof (parametros[i]) == 'string') {
                        Query = `${Query} '${parametros[i]}'`;
                    } else {
                        Query = `${Query} ${parametros[i]}`;
                    }

                } else {
                    if (typeof (parametros[i]) == 'string') {
                        Query = `${Query},'${parametros[i]}'`;
                    } else {
                        Query = `${Query},${parametros[i]}`;
                    }
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
                debugger
                response = Success[0]
            },
            error: function (error) {
                console.log(`Error-->${error}`);
            }
        });
        return response
    }

}, 800)
}
