/* orginal */
/*Formulario Transacciones de despacho*/
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == 'f81c24f3-82c3-4609-a15a-0abab34deeb9') {

    setTimeout(function () {
        debugger;
        $('#AllContent > div > div:nth-child(3) > div:nth-child(1)').hide()//identificación cliente
        $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div').hide()//nit proveedor
        $('#AllContent > div > div:nth-child(7)').hide()//cliente detalle cliente
        $('#AllContent > div > div:nth-child(8)').hide()//proveedor detalle proveedor
        $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').hide();//motivo devolución
        $("#generar").hide();
        $("#buscar").hide();
        //Se ponen los campos readonly hasta que escogan el tipo de transaccion
        /* $("#nit").attr("readonly", true);
        $("#identifi").attr("readonly", true); */

        $("#tipo").change(function (e) {
            debugger;
            var tipoTransaccion = $("#tipotransa").val();
            if (parseInt(e.currentTarget.value) == 0) {
                $('#AllContent > div > div:nth-child(3) > div:nth-child(1)').hide();//identificación cliente
                $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div').hide();//nit proveedor
                $('#AllContent > div > div:nth-child(7)').hide();//cliente detalle cliente
                $('#AllContent > div > div:nth-child(8)').hide();//proveedor detalle proveedor
                $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').hide()
                //Limpiar los campos del segundo formulario
                $('#nompro').val("")
                $('#nomdetalle').val("")
                $('#nomcli').val("")
                $('#detallecli').val("")
                //Limpiar el nit y la identificacion del cliente
                $('#identifi').data('kendoDropDownList').value("")
                $('#nit').data('kendoDropDownList').value("")
                //Limpiar la orden de compra
                $('#ordencompra').data('kendoDropDownList').value("")
                $("#ordencompra").data("kendoDropDownList").enable(false);
            }
            if (parseInt(e.currentTarget.value) == 1 && tipoTransaccion != "") {
                $('#AllContent > div > div:nth-child(3) > div:nth-child(1)').show();//identificación cliente
                $('#AllContent > div > div:nth-child(7)').show();//cliente detalle cliente
                $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div').hide();//nit proveedor
                $('#AllContent > div > div:nth-child(8)').hide();//proveedor detalle proveedor
                $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').hide()
                Llenaridenti()
                  //Limpiar los campos del segundo formulario
                $('#nompro').val("")
                $('#nomdetalle').val("")
                $('#identifi').data('kendoDropDownList').value("")
                $('#nit').data('kendoDropDownList').value("")
                $('#ordencompra').data('kendoDropDownList').value("")
                $("#ordencompra").data("kendoDropDownList").enable(false);
            }
            if (parseInt(e.currentTarget.value) == 2 && tipoTransaccion != "") {
                $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div').show();//nit proveedor
                $('#AllContent > div > div:nth-child(8)').show();//proveedor detalle proveedor
                $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').show()
                $('#AllContent > div > div:nth-child(3) > div:nth-child(1)').hide();//identificación cliente
                $('#AllContent > div > div:nth-child(7)').hide();//cliente detalle cliente
                LlenarNit()
                $('#nomcli').val("")
                $('#detallecli').val("")
                $('#identifi').data('kendoDropDownList').value("")
                $('#nit').data('kendoDropDownList').value("")
                $('#ordencompra').data('kendoDropDownList').value("")
                $("#ordencompra").data("kendoDropDownList").enable(false);

            }
        });

        $("#nit").kendoDropDownList({
            dataTextField: "NIT",
            dataValueField: "Id",
            template: `<span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: NIT #</p></span><span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: Detalle #</p></span>`,
            headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px "><span class="k-widget k-header"  style="width:50% ; font-size: x-small">NIT</span><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Detalle proveedor</span>`,
            valueTemplate: `<span><p style="margin-top:8px">#: NIT #</p></span>`,
            dataSource: [],
            filter: "startswith",
            optionLabel: "Seleccione un NIT",
            change: function () {
                debugger
                var index = $('#nit').data('kendoDropDownList').select();
                var getSelected = $('#nit').data('kendoDropDownList').dataSource.options.data[index - 1]

                $('#nompro').val(getSelected.NombreCompleto)
                $('#nomdetalle').val(getSelected.Detalle)
                numord()


            },
            enable: false
        });
        $("#identifi").kendoDropDownList({
            dataTextField: "NumeroIdentificacion",
            dataValueField: "Id",
            template: `<span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: NumeroIdentificacion #</p></span><span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: Detalle #</p></span>`,
            headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px "><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Identificación</span><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Detalle cliente</span>`,
            valueTemplate: `<span><p style="margin-top:8px">#: NumeroIdentificacion #</p></span>`,
            dataSource: [],
            filter: "startswith",
            optionLabel: "Seleccione un Número de identificación",
            change: function () {
                debugger
                var index = $('#identifi').data('kendoDropDownList').select();
                var getSelected = $('#identifi').data('kendoDropDownList').dataSource.options.data[index - 1]

                $('#nomcli').val(getSelected.NombreCompleto)
                $('#detallecli').val(getSelected.Detalle)
                numord()
            },
            enable: false
        })

        $("#ordencompra").kendoDropDownList({
            dataTextField: "NumeroFactura",
            dataValueField: "Id",
            // template: `<span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: NombreProducto #</p></span><span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: CodigoProducto #</p></span>`,
            headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px "><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Número fáctura</span>`,
            dataSource: [],
            filter: "startswith",
            optionLabel: "Seleccione una fáctura",
            change: function () {
                debugger
                var index = $('#ordencompra').data('kendoDropDownList').select();
                var getSelected = $('#ordencompra').data('kendoDropDownList').dataSource.options.data[index - 1]
                $("#buscar").show();
            },
            enable: false
        })

        let query = `select Id,NombreTransaccion
                    from Cohan_Lappiz_TipoTransaccion
                    where Estado='Activo'`;

        let data = ajaxQuery(query)

        $('#tipotransa').kendoDropDownList({
            autoBind: false,
            dataTextField: "NombreTransaccion",
            dataValueField: "Id",
            dataSource: data,
            optionLabel: "Seleccione tipo transacción",
            change: function () {
                debugger
                var getSelected = this.dataItem();
                var tipo = $("#tipo option:selected").text();
                if (tipo === undefined || tipo === null || tipo === "" || tipo === 'Seleccione una opción') {
                    toastr.warning('Debe ingresar un tipo');
                    $('#AllContent > div > div:nth-child(3) > div:nth-child(1)').hide();//identificación cliente
                    $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div').hide();//nit proveedor
                    $('#AllContent > div > div:nth-child(7)').hide();//cliente detalle cliente
                    $('#AllContent > div > div:nth-child(8)').hide();//proveedor detalle proveedor
                    $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').hide()
                } else {
                    if (tipo === "Proveedor" && getSelected.NombreTransaccion === "Devolución") {
                        $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').show();
                        $('#observacion').val(getSelected.NombreTransaccion)
                        $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div').show();//nit proveedor
                        $('#AllContent > div > div:nth-child(8)').show();//proveedor detalle proveedor
                        $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').show()
                        $('#AllContent > div > div:nth-child(3) > div:nth-child(1)').hide();//identificación cliente
                        $('#AllContent > div > div:nth-child(7)').hide();//cliente detalle cliente
                        LlenarNit()
                    }else if(getSelected.Id === ""){
                        $('#AllContent > div > div:nth-child(3) > div:nth-child(1)').hide();//identificación cliente
                        $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div').hide();//nit proveedor
                        $('#AllContent > div > div:nth-child(7)').hide();//cliente detalle cliente
                        $('#AllContent > div > div:nth-child(8)').hide();//proveedor detalle proveedor
                        $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').hide()
                    } 
                    else if(tipo === "Cliente"){
                        $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').hide();
                        $('#AllContent > div > div:nth-child(3) > div:nth-child(1)').show();//identificación cliente
                        $('#AllContent > div > div:nth-child(7)').show();//cliente detalle cliente
                        $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div').hide();//nit proveedor
                        $('#AllContent > div > div:nth-child(8)').hide();//proveedor detalle proveedor
                        $('#AllContent > div > div:nth-child(9) > div:nth-child(2) > div').hide()
                        $('#observacion').val(getSelected.NombreTransaccion)
                        Llenaridenti()
                        toastr.warning('Solamente debe seleccionar el tipo de transacción Devolución, los demás están pendientes por la integración con el ERP');
                    }

                }
            }
        });


        function LlenarNit() {
            debugger
            let Query = ` select distinct p.Id,p.NIT,dp.NombreCompleto'Detalle',dp.Id'IdDetalle',p.NombreCompleto 
                            from  Cohan_Lappiz_Recepciones r
                            join Cohan_Lappiz_Proveedor p on r.ProveedorFk=p.Id
                            join Cohan_Lappiz_DetallesProveedores dp on dp.ProveedorFK=p.Id
                            where  r.Estado='Almacenado' and r.FechaCreacion >= DATEADD(month, -6, GETDATE())
                            order by p.NombreCompleto`

            let data = ajaxQuery(Query)
            $("#nit").data("kendoDropDownList").enable(true);
            $("#nit").data("kendoDropDownList").setDataSource(data);

        }

        function Llenaridenti() {
            debugger
            let Query = `select distinct c.Id,c.NumeroIdentificacion,dc.Nombre 'Detalle',dc.Id 'IdDetalle',c.NombreCompleto 
                        from Cohan_Lappiz_PedidosClientes pc
                        join Cohan_Lappiz_Cliente c on pc.ClienteFk=c.Id
                        join Cohan_Lappiz_DetalleCliente dc on pc.DetalleClienteFk=dc.Id
                        where pc.Estado='Despachado' and pc.FechaCreacion>= DATEADD(month, -6, GETDATE())`

            let data = ajaxQuery(Query)
            $("#identifi").data("kendoDropDownList").enable(true);
            $("#identifi").data("kendoDropDownList").setDataSource(data)
        }


        function numord() {
            debugger
            var tipoC = $("#tipo option:selected").text();
            if (tipoC == "Cliente") {
                toastr.warning('Debe seleccionar un proveedor el flujo de cliente esta pendiente');
            } else {
                let Query = ` select o.Id,r.NumeroFactura
                            from Cohan_Lappiz_Recepciones r
                            join Cohan_Lappiz_OrdenesCompra o on r.OrdenCompraFk=o.Id
                            where r.ProveedorFk='${$("#nit").data('kendoDropDownList').dataItem().Id}'
                            and o.DetalleProveedorFK= '${$("#nit").data('kendoDropDownList').dataItem().IdDetalle}'
                            and r.Estado='Almacenado'
                            and r.FechaCreacion >= DATEADD(month, -6, GETDATE())
                            order by o.NumeroFactura`

                let data = ajaxQuery(Query)

                if (data.length > 0) {
                    $("#ordencompra").data("kendoDropDownList").enable(true);
                    $("#ordencompra").data("kendoDropDownList").setDataSource(data)

                } else {
                    toastr.warning('Este proveedor no tiene facturas asociadas');
                }

            }
        }

        $('#buscar').click(function () {
            llenarGrid()
        })

        function llenarGrid() {
            debugger
            var idorden = $("#ordencompra").data('kendoDropDownList').dataItem().Id;
            var NombreProductoInput = $('#NombreProducto').val();
            var codigoProductoInput = $('#CodigoProducto').val();
            var obser = $('#observacion').val()
            var motidev = $("#motidevo option:selected").text()

            if (obser == undefined || obser == null || obser == "") {
                toastr.warning('Debe ingresar una observación');
            } else {
                if (motidev == undefined || motidev == null || motidev == "" || motidev == 'Seleccione una opción') {
                    toastr.warning('Debe ingresar un motivo devolución');
                } else {
                    if (todoVacio(idorden)) {
                        toastr.warning('Debe ingresar una fáctura');
                    } else if (!(todoVacio(NombreProductoInput))) {
                        consultarDatosGrid('nombre', idorden, NombreProductoInput);
                    } else if (!(todoVacio(codigoProductoInput))) {
                        consultarDatosGrid('codigo', idorden, codigoProductoInput);
                    } else {
                        toastr.warning('Debe ingresar un Código o Nombre de producto');
                    }
                }
            }
        }

        function consultarDatosGrid(tipo, idorden, valorProducto) {
            debugger;
            var Query = "";
            var condicion = "";
            if (tipo == 'nombre') {
                condicion = 'NombreProducto'
            } else if (tipo == 'codigo') {
                condicion = 'CodigoProducto'
            }
            Query += `select	o.Id,do.Id'IdOrDetalle',p.Id'IdProducto',p.CodigoProducto,p.NombreProducto,do.ValorProducto,do.Cantidad
                        from Cohan_Lappiz_DetalleOrdenesCompra do
                        join Cohan_Lappiz_OrdenesCompra o on do.OrdenesCompraFk=o.Id
                        join Cohan_Lappiz_Recepciones r on r.OrdenCompraFk=o.Id and r.Estado='Almacenado'
                        join Cohan_Lappiz_Proveedor prv on o.ProveedorFK=prv.Id
                        join Cohan_Lappiz_DetallesProveedores dprv on o.DetalleProveedorFK=dprv.Id
                        join Cohan_Lappiz_TipoProveedor tprv on prv.TipoProveedorFK=tprv.Id
                        join Cohan_Lappiz_Producto p on do.ProductoFk=p.Id
                        where do.OrdenesCompraFk= '${idorden}'and p.${condicion} like '%${valorProducto}%'`
            let data = ajaxQuery(Query)
            debugger
            $("#container-grid").empty()
            $("#container-grid").html(`<div id="gridProductos"></div>`)
            $("#gridProductos").kendoGrid({
                dataSource: {
                    data: data,
                    pageSize: 10,
                    autoSync: true,
                    schema: {
                        model: {
                            fields: {
                                Id: { type: 'string', editable: false },
                                IdOrDetalle: { type: 'string', editable: false },
                                IdProducto: { type: 'string', editable: false },
                                CodigoProducto: { type: 'string', editable: false },
                                NombreProducto: { type: 'string', editable: false },
                                ValorProducto: { type: 'number', editable: false },
                                Cantidad: { type: 'number', editable: false },
                                CantidadIngresar: { type: 'number', editable: true },
                                Subtotal: { type: 'number', editable: false },
                                Total: { type: 'number', editable: false }
                            }
                        }
                    },
                    pageSize: 10
                },
                batch: true,
                editable: true,
                scrollable: true,
                sortable: true,
                filterable: false,
                resizable: true,
                pageable: {
                    input: true,
                    numeric: true,
                    refresh: true
                },
                dataBound: function (e) {
                    var gridPro = $("#gridProductos").data("kendoGrid");
                    for (var i = 0; i < gridPro.columns.length; i++) {
                        gridPro.autoFitColumn(i);
                    }
                },
                columns: [
                    // { template: "<input type='checkbox' class='checkbox' />" },
                    { field: "CodigoProducto", title: "Código producto" },
                    { field: "NombreProducto", title: "Nombre producto" },
                    { field: "ValorProducto", title: "Valor unitario" },
                    { field: "Cantidad", title: "Cantidad" },
                    { field: "CantidadIngresar", title: "Cantidad a ingresar" },
                    { command: { text: "ingresar", click: ingresar, template: "<a class='k-grid-ingresar btn'><i class='fa fa-sign-in'><span>Ingresar</span></i></a>" } },
                ],
            })

        }

        $("#gridDevolverProd").kendoGrid({
            dataSource: {
                data: [],
                pageSize: 10,
                autoSync: true,
                schema: {
                    model: {
                        fields: {
                            Id: { type: 'string', editable: false },
                            IdOrDetalle: { type: 'string', editable: false },
                            IdProducto: { type: 'string', editable: false },
                            CodigoProducto: { type: 'string', editable: false },
                            NombreProducto: { type: 'string', editable: false },
                            ValorProducto: { type: 'number', editable: false },
                            Cantidad: { type: 'number', editable: false },
                            CantidadIngresar: { type: 'number', editable: false },
                            Subtotal: { type: 'number', editable: false },
                            Total: { type: 'number', editable: false }
                        }
                    }
                },
                pageSize: 10
            },
            batch: true,
            editable: false,
            scrollable: true,
            sortable: true,
            filterable: false,
            resizable: true,
            pageable: {
                input: true,
                numeric: true,
                refresh: true
            },
            dataBound: function (e) {
                debugger;
                e.preventDefault()
                var gridDev = $("#gridDevolverProd").data("kendoGrid");
                for (var i = 0; i < gridDev.columns.length; i++) {
                    gridDev.autoFitColumn(i);
                }
            },
            columns: [
                { field: "CodigoProducto", title: "Código producto" },
                { field: "NombreProducto", title: "Nombre producto" },
                { field: "ValorProducto", title: "Valor unitario" },
                { field: "CantidadIngresar", title: "Cantidad ingresada" },
                { field: "Subtotal", title: "Subtotal", format: "{0:n}" },
                { command: { text: "Eliminar", click: Eliminar, template: "<a class='k-grid-Eliminar btn'><i class='fa fa-trash'><span> Eliminar</span></i></a>" } },
            ],
        })


        function ingresar(e) {
            debugger;
            $("#generar").show();
            e.preventDefault()
            var grid = $("#gridProductos").data("kendoGrid")
            var Producto = grid.dataItem($(e.currentTarget).closest("tr"))
            var repetido = false;
            var Total = 0

            if (Producto.CodigoProducto != undefined || Producto.NombreProducto != undefined) {

                if (Producto.Cantidad != null) {

                    if (parseInt(Producto.CantidadIngresar) <= parseInt(Producto.Cantidad) && parseInt(Producto.CantidadIngresar) > 0) {
                        Producto.Subtotal = parseInt(Producto.CantidadIngresar) * Producto.ValorProducto;
                        var getGrid = $("#gridDevolverProd").data("kendoGrid");
                        //validar que no esté repetido

                        if (getGrid != undefined) {
                            for (let i = 0; i < getGrid.dataSource._data.length; i++) {
                                if (Producto.IdProducto == getGrid.dataSource._data[i].IdProducto) {
                                    repetido = true;
                                }
                            }
                        }
                        if (repetido == false) {
                            if (window.confirm("Está seguro de separar el producto")) {
                                var data = []
                                Producto.Total = Total;
                                var dataGrid = $("#gridDevolverProd").data('kendoGrid').dataSource.data()
                                if (dataGrid.length != 0) {

                                    for (let i = 0; i < dataGrid.length; i++) {

                                        data.push(dataGrid[i])

                                    }
                                }

                                /*Se modifico 03-05-2021
                                  data.push(Producto)
                                  $("#gridDevolverProd").data('kendoGrid').setDataSource(data); 
                                  Se añade el producto*/
                                $("#gridDevolverProd").data('kendoGrid').dataSource.add(Producto);

                                $('#gridProductos').data('kendoGrid').dataSource.remove(Producto)
                                debugger;
                                var grid = $(`#gridDevolverProd`).data('kendoGrid');

                                for (let j = 0; j < grid.dataSource._data.length; j++) {

                                    Total = Total + grid.dataSource._data[j].Subtotal

                                }
                                sessionStorage.Total = Total
                                var TotalFormat = new Intl.NumberFormat().format(Total);

                                $(".total").empty().append(`<span><strong> Total: $ ${TotalFormat}</strong>`);

                                toastr.success("Producto separado con exito")
                            }
                        } else {
                            toastr.warning('El producto ya se ingresó');
                        }
                    } else {
                        toastr.warning("La cantidad a ingresar no puede ser mayor a la cantidad  o menor a 0", "Recuerde")
                    }
                } else {
                    toastr.warning("Debe ingresar una cantidad a ingresar", "Recuerde")
                }
            } else {
                toastr.warning("Debe seleccionar un producto", "Recuerde")
            }
        }

        function Eliminar(e) {
            if (window.confirm("Está seguro de eliminar el producto")) {
                e.preventDefault()
                debugger
                var grid = $("#gridDevolverProd").data("kendoGrid")
                var Producto = grid.dataItem($(e.currentTarget).closest("tr"));
                /* $("#gridProductos").data('kendoGrid').dataSource._data.push(Producto); */
                //Se modifica 03-05-2021
                $("#gridProductos").data('kendoGrid').dataSource.add(Producto)
                $('#gridDevolverProd').data('kendoGrid').dataSource.remove(Producto)
                var Total = 0
                //Actualizar el total
                var gridDevolver = $(`#gridDevolverProd`).data('kendoGrid');
                for (let j = 0; j < gridDevolver.dataSource._data.length; j++) {
                    Total = Total + gridDevolver.dataSource._data[j].Subtotal

                }
                sessionStorage.Total = Total
                var TotalFormat = new Intl.NumberFormat().format(Total);

                $(".total").empty().append(`<span><strong> Total: $ ${TotalFormat}</strong>`);
            }

            if ($('#gridDevolverProd').data('kendoGrid').dataSource.data().length == 0) {

            }

        }

        function setData(data) {
            var dataSource = new kendo.data.DataSource({
                data: data,
                pageSize: 10,
                autoSync: true,
                schema: {
                    model: {
                        fields: {
                            Id: { type: 'string', editable: false },
                            IdOrDetalle: { type: 'string', editable: false },
                            IdProducto: { type: 'string', editable: false },
                            CodigoProducto: { type: 'string', editable: false },
                            NombreProducto: { type: 'string', editable: false },
                            ValorProducto: { type: 'number', editable: false },
                            Cantidad: { type: 'number', editable: true },
                            Subtotal: { type: 'number', editable: true },
                            Total: { type: 'number', editable: true }
                        }
                    }
                },
                editable: true,
                scrollable: true,
                sortable: true,
                filterable: false,
                resizable: true,
                pageable: {
                    input: true,
                    numeric: true,
                    refresh: true
                }
            });
            $('#gridProductos').data('kendoGrid').setDataSource(dataSource)


        }

        $('#generar').click(function () {
            debugger

            if (confirm('¿Desea generar la transación?')) {

                function uuid() {
                    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                    )
                }
                var Idpedi = uuid();

                var query = "";
                var tipotransa = $('#tipotransa').data("kendoDropDownList").value();
                var provee = $("#nit").data('kendoDropDownList').dataItem().Id;
                var detaprove = $("#nit").data('kendoDropDownList').dataItem().IdDetalle;
                var numfac = $("#ordencompra").data('kendoDropDownList').dataItem().NumeroFactura;
                var obser = $('#observacion').val()
                var motidev = $("#motidevo option:selected").text()
                var priori = $("#prioridad option:selected").text()

                var data = $("#gridDevolverProd").data('kendoGrid').dataSource.data();

                query = `
                        insert into Cohan_Lappiz_PedidosClientes 
                        Values ('${Idpedi}',null, GETDATE(),null,'${JSON.parse(sessionStorage.LappizUser).Id}',null,null,'${priori}',null,
                                '${JSON.parse(sessionStorage.LappizUser).PuntoVentaFK}',null,null,null,'${obser}',null,'Picking',null,
                                'Interno', GETDATE(),null,null,null,null,null,null,null,'${JSON.parse(sessionStorage.LappizUser).BodegasFK}',null,null,'${tipotransa}','${provee}',null,
                                'Proveedor','${detaprove}',null, GETDATE(),null,'${JSON.parse(sessionStorage.LappizUser).Email}',null,null)
                                
                        insert into Cohan_Lappiz_FichoRecepcion 
                        Values (NEWID(), null, GETDATE(),null,'${JSON.parse(sessionStorage.LappizUser).Id}',null, '${tipotransa}',
                                'Proveedor',null,null, '${provee}','${detaprove}','${numfac}','${obser}','${motidev}','${priori}','${Idpedi}',
                                GETDATE())`
                for (let i = 0; i < data.length; i++) {

                    var cantIngre = $("#gridDevolverProd").data('kendoGrid').dataSource.data()[i].CantidadIngresar
                    var precio = $("#gridDevolverProd").data('kendoGrid').dataSource.data()[i].ValorProducto
                    var total = $("#gridDevolverProd").data('kendoGrid').dataSource.data()[i].Subtotal
                    var IdOrDetalle = $("#gridDevolverProd").data('kendoGrid').dataSource.data()[i].IdOrDetalle
                    var producto = $("#gridDevolverProd").data('kendoGrid').dataSource.data()[i].IdProducto

                    query += ` 
                        update Cohan_Lappiz_DetalleOrdenesCompra 
                        set  ObservacionCohan='${obser}',NombreResponsableCohan='${JSON.parse(sessionStorage.LappizUser).Usuarios}', MotivoDevolucion='${motidev}',CantidadDevuelta=${parseInt(cantIngre)}
                        where Id='${IdOrDetalle}'
                        
                        insert into Cohan_Lappiz_DetallePedidosClientes
                        Values (NEWID(), null, GETDATE(),null,'${JSON.parse(sessionStorage.LappizUser).Id}',null, '${Idpedi}','${producto}',${precio},${parseInt(cantIngre)},${total},null
                        ,null,null,null,null,null,null,null,null,null,null,GETDATE(),null,'${JSON.parse(sessionStorage.LappizUser).Id}',null) 
                        `
                }
                var Query = {
                    "query": query,
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
                        debugger
                        $('#tipotransa').data("kendoDropDownList").value("")
                        $('#nit').data("kendoDropDownList").value("")
                        $("#ordencompra").data('kendoDropDownList').value("")

                        $('#observacion').val("")
                        $("#motidevo option:selected").val(0)
                        $("#prioridad option:selected").text("")
                        $("#gridProductos").data('kendoGrid').dataSource.read()
                        $('#gridDevolverProd').data('kendoGrid').dataSource.read()
                        $("#generar").hide();
                        $("#buscar").hide();
                        $('#AllContent > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)').hide()
                        toastr.success("La transacción fue generada correctamente")
                        //redireccionar
                        location.assign(`#/grids?viewName=Cohan_Lappiz_FichoRecepcion&workspaceId=e5f42d60-1f55-46e5-b2a2-efdd0496be21&entityId=3be8f72a-5714-4037-a6b2-cf445567bc5e&dato=Transacciones%20de%20despacho&appViewId=26b38980-31cf-4a05-b863-eec0492fe415`);
                    }
                });

            }
        })
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
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (result) {
                    data = result[0];
                },
                error: function (error) {
                    console.log(error)
                }
            })

            return data
        }


        function todoVacio(valor) {
            if (valor == undefined || valor == null || valor == "") {
                return true;
            }
            return false;
        }

    }, 1500)
}