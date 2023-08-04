// reporte pedidos internos


var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == 'de16afb4-d619-45b0-893b-babef07700b7') {
    setTimeout(() => {
        debugger;
    
        let estadoquery = `select distinct Estado from Cohan_Lappiz_PedidosClientes`

        execQuery(estadoquery).then(success => {
            var dataEstado = success.data[0]

            $("#ddlEstado").kendoMultiSelect({
                dataTextField: "Estado",
                dataValueField: "Estado",
                dataSource: dataEstado
            });
        });

        let newquery = {
            query: `select distinct pv.Id,CodPuntoVenta from cohan_lappiz_puntoventa pv
            inner join Cohan_Lappiz_Bodega b on b.PuntoVentaFK = pv.Id
            inner join Cohan_Lappiz_TipoBodegas tb on b.TipoBodegasFK = tb.Id
            where tb.NombreTipoBodega = 'Bodega tránsito'`,
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
            data: JSON.stringify(newquery),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", localStorage.Authorization);
            },
            success: function (Success) {
                debugger;
                var respuesta = Success[0];
                $("#ddlPuntoVenta").kendoMultiSelect({
                    dataTextField: "CodPuntoVenta",
                    dataValueField: "Id",
                    dataSource: respuesta,
                    change: function () {
                        let puntoventa = $('#ddlPuntoVenta').data("kendoMultiSelect").value();

                        puntoventa = JSON.stringify(puntoventa);
                        puntoventa = puntoventa.replace('[', '');
                        puntoventa = puntoventa.replace(']', '');
                        puntoventa = puntoventa.replaceAll('"', "'");

                        let query = `select b.Id, b.CodigoBodega from Cohan_Lappiz_Bodega b
                        inner join Cohan_Lappiz_TipoBodegas tb on b.TipoBodegasFK = tb.Id
                        where b.Estado = 'Activo' and tb.NombreTipoBodega = 'Bodega tránsito' and b.PuntoVentaFK in (${puntoventa})`
                        execQuery(query).then(success => {
                            let dataSource = new kendo.data.DataSource({
                                data: success.data[0]
                            });
                            $('#ddlBodega').data('kendoMultiSelect').setDataSource(dataSource);
                            $('#ddlBodega').data('kendoMultiSelect').enable(true);
                        });
                    }    
                });
            },
            error: function (error) {
                console.log(`Error-->${error}`);
            },
        });

        $("#ddlBodega").kendoMultiSelect({
            dataTextField: "CodigoBodega",
            dataValueField: "Id",
            dataSource: []
        });

        /*let puntoVentaquery = `select distinct pv.Id,CodPuntoVenta from cohan_lappiz_puntoventa pv
        inner join Cohan_Lappiz_Bodega b on b.PuntoVentaFK = pv.Id
        inner join Cohan_Lappiz_TipoBodegas tb on b.TipoBodegasFK = tb.Id
        where tb.NombreTipoBodega = 'Bodega tránsito'`;
        
        execQuery(puntoVentaquery).then(success => {
            var dataPuntoVenta = success.data[0]

            $("#ddlPuntoVenta").kendoMultiSelect({
                dataTextField: "CodPuntoVenta",
                dataValueField: "Id",
                dataSource: dataPuntoVenta,
                change: function () {

                    let puntoventa = $('#ddlPuntoVenta').data("kendoMultiSelect").value()

                    puntoventa = JSON.stringify(puntoventa)
                    puntoventa = puntoventa.replace('[', '');
                    puntoventa = puntoventa.replace(']', '');
                    puntoventa = puntoventa.replaceAll('"', "'");

                    let bodegaquery = `select b.Id, b.CodigoBodega from Cohan_Lappiz_Bodega b
                inner join Cohan_Lappiz_TipoBodegas tb on b.TipoBodegasFK = tb.Id
                where b.Estado = 'Activo' and tb.NombreTipoBodega = 'Bodega tránsito' and b.PuntoVentaFK = ${puntoventa}`

                    execQuery(bodegaquery).then(success => {
                        var dataBodega = success.data[0]

                        $("#ddlBodega").kendoMultiSelect({
                            dataTextField: "CodigoBodega",
                            dataValueField: "Id",
                            dataSource: dataBodega
                        });
                    });

                }
            });
        });*/

        $('#btnGenerarReporte').click(function () {
            debugger;
            let fechaInicial = $('#dateFechaInicial').val()
            let fechaFinal = $('#dateFechaFinal').val()
            let puntoventa = $('#ddlPuntoVenta').data("kendoMultiSelect").value()
            let bodegas = $(`#ddlBodega`).data("kendoMultiSelect").value()
            let estado = $(`#ddlEstado`).data("kendoMultiSelect").value()

            if (fechaInicial && fechaFinal && bodegas && estado && puntoventa) {
                //fechaInicial += ' 00:00:01.000'
                //fechaFinal += ' 00:00:01.000'

                bodegas = JSON.stringify(bodegas)
                bodegas = bodegas.replace('[', '');
                bodegas = bodegas.replace(']', '');
                bodegas = bodegas.replaceAll('"', "'");

                estado = JSON.stringify(estado)
                estado = estado.replace('[', '');
                estado = estado.replace(']', '');
                estado = estado.replaceAll('"', "'");

                let query = `select null as 'codigo_documento', pc.NumeroPedido as 'numero_documento',pv.CodPuntoVenta, pv.NombrePuntoVenta, b.CodigoBodega, b.NombreBodega, lu.FullName,cast(pc.FechaAprobacionPedido as time) as 'FechaAprobacionPedido'
            ,pc.Estado, p.CodigoProducto, p.NombreProducto
            ,dpc.Cantidad, dpc.CantidadPendiente, um.CodUnidadMedida, um.NombreUnidadMedida
            from Cohan_Lappiz_PedidosClientes PC
            inner join Cohan_Lappiz_PuntoVenta pv on pv.Id = PC.PuntosVentasFk
            inner join Cohan_Lappiz_Bodega b on b.Id = pc.BodegaDestinoFk
            inner join Cohan_Lappiz_DetallePedidosClientes dpc on dpc.PedidosClientesFk = pc.Id
            inner join Cohan_Lappiz_Producto p on p.id = dpc.ProductoFk
            inner join Cohan_Lappiz_UnidadMedidaProducto ump on ump.ProductoFk = p.Id
            inner join Cohan_Lappiz_UnidadMedida um on um.id = ump.UnidadMedidaFk
            inner join Lappiz_Users lu on pc.UsuarioCreacion = lu.Usuarios
            where CONVERT(varchar,pc.FechaAprobacionPedido, 23) between '${fechaInicial}' and '${fechaFinal}' and pv.Id = '${puntoventa}'
            and b.Id in (${bodegas}) and pc.Estado in (${estado})`


                /* `select td.NombreDocumento,a.NumeroIdentificacion,a.NombreAfiliado,a.Direccion,a.Telefono,c.NombreDeLaCiudad,
                tf.NumeroFormula,tf.ConsecutivoFormula,dtf.Cantidad,dtf.CantidadEntregada,dtf.Pendientes, tf.DateFechaFormula,
                dtf.FechaCreacion as FechaFaltante, p.CodigoProducto, p.NombreProducto, dtf.Faltantes,b.CodigoBodega,b.NombreBodega,p.PBS,cie.CodigoCie,cie.Nombre as NombreCie
                from Cohan_Lappiz_Bodega b
                join Cohan_Lappiz_Transcripcionformulas tf on tf.BodegaFk = b.Id
                join Cohan_Lappiz_DetalleTranscripcionFormulas dtf on dtf.TranscripcionFK = tf.Id
                join Cohan_Lappiz_TripleA ta on ta.Id = dtf.TripleAFK
                join Cohan_Lappiz_Producto p on ta.ProductoFk = p.Id
                join Cohan_Lappiz_Afiliados a on a.Id = tf.AfiliadoFk
                join Cohan_Lappiz_TipoDocumento td on td.Id = a.TipoDocumentoFK
                join Cohan_Lappiz_Ciudad c on a.CiudadFk = c.Id
                join Cohan_Lappiz_CIE cie on cie.Id = tf.CIEFk
                where tf.DateFechacre¿acion BETWEEN  '${fechaInicial}' and  '${fechaFinal}' and b.Id in (${bodegas}) and isNull(dtf.Faltantes,0) > 0` */



                execQuery(query).then(success => {
                    var pedidos = success.data[0]

                    $("#grid-producto-recepcion").kendoGrid({
                        toolbar: ["excel", "pdf"],
                        excel: {
                            fileName: "Reporte seguimiento pedidos.xlsx",
                            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                            filterable: true,
                            pageSize: pedidos.length,
                            allPages: true
                        },
                        pdf: {
                            allPages: true,
                            avoidLinks: true,
                            paperSize: "A4",
                            margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                            landscape: true,
                            repeatHeaders: true,
                            template: $("#page-template").html(),
                            scale: 0.3,
                            title: "Reporte seguimiento pedidos"
                        },
                        dataSource: {
                            data: pedidos,
                            schema: {
                                model: {
                                    fields: {
                                        codigo_documento: {
                                            type: "string",
                                            editable: false
                                        },
                                        numero_documento: {
                                            type: "string",
                                            editable: false
                                        },
                                        CodPuntoVenta: {
                                            type: "string",
                                            editable: false
                                        },
                                        NombrePuntoVenta: {
                                            type: "string",
                                            editable: false
                                        },
                                        CodigoBodega: {
                                            type: "string",
                                            editable: false
                                        },
                                        NombreBodega: {
                                            type: "string",
                                            editable: false
                                        },
                                        FullName: {
                                            type: "string",
                                            editable: false
                                        },
                                        FechaAprobacionPedido: {
                                            type: "string",
                                            editable: false
                                        },
                                        Estado: {
                                            type: "string",
                                            editable: false
                                        },
                                        CodigoProducto: {
                                            type: "string",
                                            editable: false
                                        },
                                        NombreProducto: {
                                            type: "string",
                                            editable: false
                                        },
                                        Cantidad: {
                                            type: "string",
                                            editable: false
                                        },
                                        CantidadPendiente: {
                                            type: "string",
                                            editable: false
                                        },
                                        CodUnidadMedida: {
                                            type: "string",
                                            editable: false
                                        },
                                        NombreUnidadMedida: {
                                            type: "string",
                                            editable: false
                                        }
                                    }
                                }
                            },
                            pageSize: 5
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
                            refresh: false
                        },
                        dataBound: function () {
                            for (var i = 0; i < this.columns.length; i++) {
                                this.autoFitColumn(i);
                            }
                        },
                        columns: [
                            {
                                field: "codigo_documento",
                                title: "Código de documento"
                            },
                            {
                                field: "numero_documento",
                                title: "Número de documento"
                            },
                            {
                                field: "CodPuntoVenta",
                                title: "Código punto de Venta"
                            },
                            {
                                field: "NombrePuntoVenta",
                                title: "Punto de Venta"
                            },
                            {
                                field: "CodigoBodega",
                                title: "Código bodega"
                            },
                            {
                                field: "NombreBodega",
                                title: "Nombre Bodega"
                            },
                            {
                                field: "FullName",
                                title: "Usuario aprueba"
                            },
                            {
                                field: "FechaAprobacionPedido",
                                title: "Hora aprobación pedido",
                                template: "#= kendo.toString(kendo.parseDate(FechaAprobacionPedido), 'hh:mm') #"
                            },
                            {
                                field: "Estado",
                                title: "Estado",
                            },
                            {
                                field: "CodigoProducto",
                                title: "Codigo producto",
                            },
                            {
                                field: "NombreProducto",
                                title: "Nombre Producto",
                            },
                            {
                                field: "Cantidad",
                                title: "Unidades pedidas",
                            },
                            {
                                field: "CantidadPendiente",
                                title: "Unidades pendientes",
                            },
                            {
                                field: "CodUnidadMedida",
                                title: "Código unidad de medida",
                            },
                            {
                                field: "NombreUnidadMedida",
                                title: "Unidad de medida",
                            }
                        ],
                        //selectable: true
                    });
                });
            } else {
                toastr.warning('Debes ingresar todos los campos obligatorios.')
            }
        });

    }, 2000);
}