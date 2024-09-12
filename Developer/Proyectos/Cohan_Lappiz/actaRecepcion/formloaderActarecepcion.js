//acta recepcion original
setTimeout(() => {
    var url = location.href;
    var urlSplit = url.split('appViewId=')
    var idVista = urlSplit[1]

    if (idVista == 'f3a5c9ab-1242-45c8-80b0-3813e7034f99') {

        debugger
        let queryProd = `select distinct
        p.Id, p.CodigoProducto
        from Cohan_Lappiz_Recepciones r
        inner join Cohan_Lappiz_Bodega b on b.Id = r.BodegaFK
        inner join Cohan_Lappiz_PuntoVenta pv on pv.Id = b.PuntoVentaFK
        inner join Cohan_Lappiz_PedidosClientes pc on pc.id = r.PedidoFK
        inner join Cohan_Lappiz_DetalleRecepcion dr on dr.RecepcionFk = r.Id
        inner join Cohan_Lappiz_Producto p on dr.ProductoFK = p.Id
        inner join Cohan_Lappiz_FormaFarmaceutica ff on ff.Id = p.FormaFarmaceuticaFK
        inner join Cohan_Lappiz_Laboratorio l on l.id = p.LaboratorioFk
        inner join Cohan_Lappiz_UnidadMedidaProducto ump on ump.ProductoFk = p.Id
        inner join Cohan_Lappiz_TripleA ta on ta.ProductoFk = p.Id
        inner join Cohan_Lappiz_Proveedor provee on ta.ProveedorFk = provee.Id
        inner join Lappiz_Users u on u.id = dr.UsuarioCreacion`

        execQuery(queryProd).then(success => {
            let ProdData = success.data[0]

            $("#ddlProducto").kendoMultiSelect({
                dataTextField: "CodigoProducto",
                dataValueField: "Id",
                dataSource: ProdData,
            });
        });

        let queryPuntoVenta = `select distinct
                    pv.Id, pv.CodPuntoVenta
                    from Cohan_Lappiz_Recepciones r
                    inner join Cohan_Lappiz_Bodega b on b.Id = r.BodegaFK
                    inner join Cohan_Lappiz_PuntoVenta pv on pv.Id = b.PuntoVentaFK
                    inner join Cohan_Lappiz_PedidosClientes pc on pc.id = r.PedidoFK
                    inner join Cohan_Lappiz_DetalleRecepcion dr on dr.RecepcionFk = r.Id
                    inner join Cohan_Lappiz_Producto p on dr.ProductoFK = p.Id
                    inner join Cohan_Lappiz_FormaFarmaceutica ff on ff.Id = p.FormaFarmaceuticaFK
                    inner join Cohan_Lappiz_Laboratorio l on l.id = p.LaboratorioFk
                    inner join Cohan_Lappiz_UnidadMedidaProducto ump on ump.ProductoFk = p.Id
                    inner join Cohan_Lappiz_TripleA ta on ta.ProductoFk = p.Id
                    inner join Cohan_Lappiz_Proveedor provee on ta.ProveedorFk = provee.Id
                    inner join Lappiz_Users u on u.id = dr.UsuarioCreacion;`

        execQuery(queryPuntoVenta).then(success => {

            let dataPuntoVenta = success.data[0]

            $("#ddlPuntoVenta").kendoMultiSelect({
                dataTextField: "CodPuntoVenta",
                dataValueField: "Id",
                dataSource: dataPuntoVenta,
            });
        });

        let queryBodega = `select distinct
                                b.Id, b.NombreBodega 
                                from Cohan_Lappiz_Recepciones r
                                inner join Cohan_Lappiz_Bodega b on b.Id = r.BodegaFK
                                inner join Cohan_Lappiz_PuntoVenta pv on pv.Id = b.PuntoVentaFK
                                inner join Cohan_Lappiz_PedidosClientes pc on pc.id = r.PedidoFK
                                inner join Cohan_Lappiz_DetalleRecepcion dr on dr.RecepcionFk = r.Id
                                inner join Cohan_Lappiz_Producto p on dr.ProductoFK = p.Id
                                inner join Cohan_Lappiz_FormaFarmaceutica ff on ff.Id = p.FormaFarmaceuticaFK
                                inner join Cohan_Lappiz_Laboratorio l on l.id = p.LaboratorioFk
                                inner join Cohan_Lappiz_UnidadMedidaProducto ump on ump.ProductoFk = p.Id
                                inner join Cohan_Lappiz_TripleA ta on ta.ProductoFk = p.Id
                                inner join Cohan_Lappiz_Proveedor provee on ta.ProveedorFk = provee.Id
                                inner join Lappiz_Users u on u.id = dr.UsuarioCreacion;`

        execQuery(queryBodega).then(success => {

            let dataBodega = success.data[0];

            $("#ddlBodega").kendoMultiSelect({
                dataTextField: "NombreBodega",
                dataValueField: "Id",
                dataSource: dataBodega,

            });
        });

        $('#btnGenerarReporte').click(function () {

            debugger;
            let fechaFinal = $('#dateFechaFinal').val()
            let fechaInicial = $('#dateFechaInicial').val()

            let producto = $(`#ddlProducto`).data("kendoMultiSelect").value();
            producto = JSON.stringify(producto)
            producto = producto.replace('[', '');
            producto = producto.replace(']', '');
            producto = producto.replaceAll('"', "'");

            let puntoVenta = $(`#ddlPuntoVenta`).data("kendoMultiSelect").value();
            puntoVenta = JSON.stringify(puntoVenta)
            puntoVenta = puntoVenta.replace('[', '');
            puntoVenta = puntoVenta.replace(']', '');
            puntoVenta = puntoVenta.replaceAll('"', "'");


            let bodega = $(`#ddlBodega`).data("kendoMultiSelect").value();
            bodega = JSON.stringify(bodega)
            bodega = bodega.replace('[', '');
            bodega = bodega.replace(']', '');
            bodega = bodega.replaceAll('"', "'");

            if (fechaFinal && fechaInicial) {

                fechaInicial += ' 00:00:01.000'
                fechaFinal += ' 00:00:01.000'

                let queryReporte = `select distinct cast (r.FechaCreacion as date) as 'FechaCreacion', provee.NombreCompleto + ' ' + provee.NIT as Proveedor, bo.NombreBodega as BodegaOrigenFk,bd.NombreBodega as BodegaDestinoFk, r.NumeroEntrada, p.CodigoProducto
                , p.NombreProducto, p.Concentracion, p.NombreProducto, p.NombreProducto as Nombre_Comercial, ff.NombreFormaFarmaceutica, p.NombreProducto as presentacion_comercial
                , l.NombreLaboratorio, dr.Cantidad, p.RegistroInvima, p.FechaVencimientoInvima, dr.Lote, dr.Temperatura, dr.NiveInspeccion, dr.CantidadInspeccionada, dr.CantidadExcluida
                , dr.Estado, u.FullName, cast (dr.FechaCreacion as date) as 'FechaCreacion1',pc.NumeroPedido as Consecutivo
                from Cohan_Lappiz_Recepciones r
                inner join Cohan_Lappiz_Bodega b on b.Id = r.BodegaFK
                inner join Cohan_Lappiz_PuntoVenta pv on pv.Id = b.PuntoVentaFK
                inner join Cohan_Lappiz_PedidosClientes pc on pc.id = r.PedidoFK
                inner join Cohan_Lappiz_DetalleRecepcion dr on dr.RecepcionFk = r.Id
                inner join Cohan_Lappiz_Producto p on dr.ProductoFK = p.Id
                inner join Cohan_Lappiz_FormaFarmaceutica ff on ff.Id = p.FormaFarmaceuticaFK
                inner join Cohan_Lappiz_Laboratorio l on l.id = p.LaboratorioFk
                inner join Cohan_Lappiz_UnidadMedidaProducto ump on ump.ProductoFk = p.Id
                inner join Cohan_Lappiz_TripleA ta on ta.ProductoFk = p.Id
                inner join Cohan_Lappiz_Proveedor provee on ta.ProveedorFk = provee.Id
                inner join Lappiz_Users u on u.id = dr.UsuarioCreacion
                inner join Cohan_Lappiz_Bodega bo on bo.Id = pc.BodegaOrigenFk
                inner join Cohan_Lappiz_Bodega bd on bd.Id = pc.BodegaDestinofk
                where r.FechaCreacion between '${fechaInicial}' and '${fechaFinal}'`;
                
                if (typeof producto != 'undefined' && producto != "") {
                    queryReporte += ` and p.Id in (${producto})`

                }

                if (typeof puntoVenta != 'undefined' && puntoVenta != "") {
                    queryReporte += ` and pv.Id in (${puntoVenta})`
                }

                if (typeof bodega != 'undefined' && bodega != "") {
                    queryReporte += ` and b.Id in (${bodega})`
                }
                
                execQuery(queryReporte).then(success => {

                    let acta = success.data[0];

                    $("#grid-producto-recepcion").kendoGrid({
                        toolbar: ["excel", "pdf"],
                        excel: {
                            fileName: "Acta Recepcion SF.xlsx",
                            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                            filterable: true,
                            pageSize: acta.length,
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
                            scale: 0.5
                        },
                        dataSource: {
                            data: acta,
                            schema: {
                                model: {
                                    fields: {
                                        FechaCreacion: {
                                            type: "date",
                                            editable: false,
                                        },
                                        Proveedor: {
                                            type: "string",
                                            editable: false
                                        },
                                        BodegaOrigenFk: {
                                            type: "string",
                                            editable: false
                                        },
                                        BodegaDestinoFk: {
                                            type: "string",
                                            editable: false
                                        },
                                        Consecutivo: {
                                            type: "string",
                                            editable: false
                                        },
                                        CodigoProducto: {
                                            type: "string",
                                            editable: false
                                        },
                                        Nombre_generico: {
                                            type: "string",
                                            editable: false
                                        },
                                        Concentracion: {
                                            type: "string",
                                            editable: false
                                        },
                                        NombreProducto: {
                                            type: "string",
                                            editable: false
                                        },
                                        Nombre_Comercial: {
                                            type: "string",
                                            editable: false
                                        },
                                        NombreFormaFarmaceutica: {
                                            type: "string",
                                            editable: false
                                        },
                                        presentacion_comercial: {
                                            type: "string",
                                            editable: false
                                        },
                                        NombreLaboratorio: {
                                            type: "string",
                                            editable: false
                                        },
                                        Cantidad: {
                                            type: "string",
                                            editable: false
                                        },
                                        RegistroInvima: {
                                            type: "string",
                                            editable: false
                                        },
                                        FechaVencimientoInvima: {
                                            type: "string",
                                            editable: false
                                        },
                                        Lote: {
                                            type: "string",
                                            editable: false
                                        },
                                        Temperatura: {
                                            type: "string",
                                            editable: false
                                        },
                                        NiveInspeccion: {
                                            type: "string",
                                            editable: false
                                        },
                                        CantidadInspeccionada: {
                                            type: "string",
                                            editable: false
                                        },
                                        CantidadExcluida: {
                                            type: "string",
                                            editable: false
                                        },
                                        Estado: {
                                            type: "string",
                                            editable: false
                                        },
                                        FullName: {
                                            type: "string",
                                            editable: false
                                        },
                                        FechaCreacion1: {
                                            type: "date",
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
                        columns: [{
                            field: "FechaCreacion",
                            title: "Fecha Ingreso",
                            template: "#= kendo.toString(kendo.parseDate(FechaCreacion, 'yyyy-MM-dd'), 'yyyy/MM/dd') #"
                        },
                        {
                            field: "Proveedor",
                            title: "Proveedor"
                        },
                        {
                            field: "BodegaOrigenFk",
                            title: "Bodega origen"
                        },
                        {
                            field: "BodegaDestinoFk",
                            title: "Bodega Destino"
                        },
                        {
                            field: "Consecutivo",
                            title: "Consecutivo"
                        },
                        {
                            field: "CodigoProducto",
                            title: "Codigo producto"
                        },
                        {
                            field: "Nombre_generico",
                            title: "Nombre genérico"
                        },
                        {
                            field: "Concentracion",
                            title: "Concentración"
                        },
                        {
                            field: "NombreProducto",
                            title: "Nombre comercial"
                        },
                        {
                            field: "NombreFormaFarmaceutica",
                            title: "Forma farmacéutica"
                        },
                        {
                            field: "presentacion_comercial",
                            title: "Presentación comercial"
                        },
                        {
                            field: "NombreLaboratorio",
                            title: "Laboratorio fabricante"
                        },
                        {
                            field: "Cantidad",
                            title: "Unidades recibidas"
                        },
                        {
                            field: "RegistroInvima",
                            title: "registro invima"
                        },
                        {
                            field: "FechaVencimientoInvima",
                            title: "Fecha vencimiento",
                            template: "#= kendo.toString(kendo.parseDate(FechaVencimientoInvima, 'yyyy-MM-dd'), 'yyyy/MM/dd') #"
                        },
                        {
                            field: "Lote",
                            title: "Lote"
                        },
                        {
                            field: "Temperatura",
                            title: "Temperatura"
                        },
                        {
                            field: "NiveInspeccion",
                            title: "Nivel de inspección"
                        },
                        {
                            field: "CantidadInspeccionada",
                            title: "Cantidad muestreo"
                        },
                        {
                            field: "CantidadExcluida",
                            title: "Unidades defectuosas"
                        },
                        {
                            field: "Estado",
                            title: "Estado"
                        },
                        {
                            field: "FullName",
                            title: "Usuario que recibe"
                        },
                        {
                            field: "FechaCreacion1",
                            title: "Fecha recepción",
                            template: "#= kendo.toString(kendo.parseDate(FechaCreacion1, 'yyyy-MM-dd'), 'yyyy/MM/dd') #"
                        }
                        ]
                        //selectable: true
                    });
                });

            }
            else {
                toastr.warning('Debes ingresar todos los campos obligatorios.')
            }

        });
    }
}, 1000);
