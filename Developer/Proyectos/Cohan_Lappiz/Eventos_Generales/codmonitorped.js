<body>
    <script src="https://kendo.cdn.telerik.com/2017.2.504/js/messages/kendo.messages.es-ES.min.js"></script>
    <style>
        /* Header */
        .modalTitle {
            font-size: 24px;
            width: 80%;
            padding-left: 8px;
        }

        .k-multiselect-wrap {
            border-width: 1px !important;
        }

        .footer {
            border-top: 1px solid #eeeeee;
            height: 30px;
        }

        .modalCloseButton {
            width: 20%;
            text-align: end;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .titulo {
            padding-bottom: 8px;
        }

        .modalBodyTitle {
            text-align: center;
            font-size: 24px;
            background-color: #0072bf;
            color: #ffffff;
        }

        .containerFooter {
            align-items: baseline;
            justify-content: space-around;
            display: flex;
        }

        .footerInput {
            width: 45%;
        }

        .modal-footer {
            text-align: end;
        }

        .modal-Container {
            width: 70%;
            padding-bottom: 20px;
            padding-top: 20px;
            margin: auto;
        }

        #ModalInfor>div.modal-Container>div.dropdown-container>div:nth-child(1)>span {
            width: 100%;
        }

        #ModalInfor>div.modal-Container>div.dropdown-container>div:nth-child(2)>span {
            width: 100%;
        }

        .user-select {
            width: 45%;
        }

        .button-container {
            text-align: end;
            padding-top: 10px;
        }

        label {
            padding: 12px 0 2px 0;
            font-weight: 500;
            font-size: 15px;
        }

        .btn-reasignar {
            width: 120px;
            margin: 0px;
        }

        .input-container {
            height: unset !important;
            margin-right: 2px;
        }

        .dropdown-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        @media only screen and (max-width: 1024px) {
            .modal-Container {
                width: 80%;
            }
        }

        @media only screen and (max-width: 535px) {
            .modal-Container {
                width: 99%;
            }
        }

        @media only screen and (max-width: 425px) {
            #ModalInfor {
                width: "100%";
                text-align: center;
            }

            .modal-Container {
                display: inline-block;
                padding-bottom: 0px;
            }

            label {
                padding: 0px;
            }

            .user-select {
                width: 100%;
            }

            .button-container {
                text-align: end;
                width: 100%;
                padding-top: 15px;
            }

            .btn-reasignar {
                padding: 3px 25px;
                width: initial;
            }
        }
    </style>
    <br>
    <div class="modal fade" id="modalInfo" data-keyboard="false" data-backdrop="static" role="dialog">
        <div class="modal-dialog" style="width: 95%;overflow-x: initial;height: 90%;overflow-y: visible;">
            <div class="modal-content" style="padding: 0px !important">
                <div class="modal-header">
                    <div class="modalTitle">
                        Información
                    </div>
                    <div class="modalCloseButton">
                        <button id="volverinfor" onclick="volverInfor()" class="closeButton">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body" id="ModalInfor">
                    <div class="modalBodyTitle">
                        Información
                    </div>
                    <br>
                    <div>
                        <div id="informacion"></div>
                    </div>
                </div>
                <div class="footer"></div>
            </div>
        </div>
    </div>

    <!-- Modal reasignar -->
    <div class="modal fade" id="modalReasignar" data-keyboard="false" data-backdrop="static" role="dialog">
        <div class="modal-dialog" style="width: 95%;overflow-x: initial;height: 90%;overflow-y: visible;">
            <div class="modal-content" style="padding: 0px !important">
                <div class="modal-header">
                    <div class="modalTitle"> Reasignar Tarea</div>
                    <div class="modalCloseButton">
                        <button id="volverinfor" onclick="volverReasignar()" class="closeButton">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body" id="ModalInfor">
                    <div class="modalBodyTitle">
                        Reasignar
                    </div>
                    <div class="modal-Container">
                        <div class="dropdown-container">
                            <input type="text" style="display: none;" id="idPedidoReasignar">

                            <div class="user-select">
                                <label for="">Nombre de usuario asignado</label> <br>
                                <input id="assigned-user" class="user-input" />
                            </div>
                            <div class="user-select">
                                <label for="">Nombre de usuario a reasignar</label> <br>
                                <input id="change-user" class="user-input" />
                            </div>
                        </div>
                        <div class="button-container">
                            <button class="btn-reasignar" id="save-changes">Reasignar</button>
                        </div>
                    </div>

                </div>
            </div>
            <div class="footer"></div>
        </div>
    </div>
    <!-- End modal reasignar -->

    <!-- Modal asignar pedidos -->
    <div class="modal fade" id="modalAsignar" data-keyboard="false" data-backdrop="static" role="dialog">
        <div class="modal-dialog" style="width: 95%;overflow-x: initial;height: 90%;overflow-y: visible;">
            <div class="modal-content" style="padding: 0px !important">
                <div class="modal-header">
                    <div class="modalTitle">Asignar Pedido</div>
                    <div class="modalCloseButton">
                        <button id="volverinfor" onclick="volverAsignar()" class="closeButton">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body" id="ModalInfor">
                    <div class="modalBodyTitle">
                        Asignar Pedido
                    </div>
                    <div class="modal-Container">
                        <div class="dropdown-container">
                            <div class="user-select">
                                <label for="">Nombre de usuario</label> <br>
                                <input id="usuario" class="user-input" />
                            </div>
                            <div class="user-select">
                                <label for="">Número de pedido</label> <br>
                                <input id="numPedido" class="user-input" />
                            </div>
                        </div>
                        <div class="button-container">
                            <button class="btn-reasignar" onclick="asignarPedidoBtn()"
                                id="save-changes">Asignar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer"></div>
        </div>
    </div>

    <div class="modal fade" id="modalUbicacion" data-keyboard="false" data-backdrop="static" role="dialog">
        <div class="modal-dialog modal-dialog" style="overflow-x: initial;height: 90%;overflow-y: visible;">
            <div class="modal-content" style="padding: 0px !important">
                <div class="card-container">
                    <div role="dialog" aria-hidden="true">
                        <div class="header-section">
                            <div class="actions-form-header">
                                <div style="display:inline-block" class="ng-scope">
                                    <ng-switch on="Action.Type">
                                        <!-- ngSwitchWhen: Save -->
                                        <!-- ngIf: showSave --><button id="guardar" class="btn-basic ng-scope"> <i
                                                class="fa fa-plus-circle"></i>
                                        </button>
                                        <!-- ngIf: showSaveContinue --><button class="btn-basic ng-scope"
                                            disabled="disabled"> <i class="fas fa-plus-square"></i> </button>
                                        <!-- end ngIf: showSaveContinue -->
                                        <!-- end ngSwitchWhen: -->
                                        <!-- ngSwitchWhen: Save -->
                                        <!-- ngIf: showSaveEdit --><button class="btn-basic ng-scope" disabled="disabled">
                                            <i class="fa fa-clipboard"></i> </button>
                                        <!-- end ngIf: showSaveEdit -->
                                        <!-- end ngSwitchWhen: -->
                                    </ng-switch>
                                </div> <!-- ngIf: showCancel --><button class="btn-basic ng-scope" id="volverinfor"
                                    title="Cancelar"> <i class="fa fa-undo"></i> </button><!-- end ngIf: showCancel -->
                                <!-- ngIf: ShowHistory && !isNew -->
                                <nav class="inner-nav-actions ng-hide" ng-show="actionsMenuOptions || taskId">
                                    <div class="container-fluid">
                                        <ul class="nav navbar-nav">
                                            <li class="dropdown"> <button ng-show="showActions" data-toggle="dropdown"
                                                    translate="moreActions_form" class="ng-scope">Más Acciones</button>
                                                <ul class="dropdown-menu contextual-menu">
                                                    <!-- quickNgRepeat: Action in configInfo.Actions -->
                                                    <li class="sub_menu ng-scope">
                                                    </li> <!-- <li> -->
                                                    <li>
                                                        <!-- ngIf: taskId -->
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div> <br><br>
                            <div class="title-section">
                                <h1 class="ng-binding">Inventario cicliclo por producto </h1>
                                <h5 translate="description_form" class="ng-scope">Formulario</h5>
                            </div>
                        </div>
    
                        <div class="tab-content">
                            <div class="ng-scope">
                                <br>
                                <div id="1._Cliente">
                                    <div class="form-section-title ng-binding">Datos básicos</div>
                                </div>
                                <div class="panel-body">
                                    <div class="row ng-scope">
                                        <div id="SectionsFields" class="col-md-6 col-xs-12 form-group">
                                            <div class="col-xs-12 ng-scope"><label class="control-label ng-scope"><span
                                                        class="ng-binding">Tipo de
                                                        busqueda </span><span
                                                        class="ft-appengine-field-required ng-scope">*</label>
                                                <div class="ng-scope"> <select name="field" id="selectTipo"
                                                        class="ng-not-empty ng-valid-required ng-touched">
                                                        <option label="Codigo" value="codigo">Código producto</option>
                                                        <option label="Nombre" value="nombre">Nombre producto</option>
                                                    </select>
                                                    <div class="input-group ng-hide"> <select id="selectTipo"
                                                            class="form-control ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required">
                                                            <option label="Codigo" value="codigo">Código producto</option>
                                                            <option label="Nombre" value="nombre">Nombre producto</option>
                                                        </select> <span class="input-group-btn"> <button type="button"
                                                                class="btn btn-default" data-toggle="modal"> <i
                                                                    class="fa custom-icon ng-isolate-scope fa-table"
                                                                    icon-type="grid"></i>
                                                            </button> </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
    
                                        <div id="SectionsFields" class="col-md-6 col-xs-12 form-group">
                                            <div class="col-xs-12 ng-scope"> <label class="control-label ng-scope">
                                                    <span class="ng-binding">Código de producto(s) </span><span
                                                        class="ft-appengine-field-required ng-scope">*</span></label>
                                                <br>
                                                <input id="txtcodigo" class="form-control" placeholder="Código producto">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ng-scope">
                                        <div id="SectionsFields" class="col-md-12 col-xs-12 form-group">
                                            <div class="col-xs-12 ng-scope"><label class="control-label ng-scope"><span
                                                        class="ng-binding">Nombre producto(s) </span><span
                                                        class="ft-appengine-field-required ng-scope">*</span></label>
                                                <div class="ng-scope">
                                                    <div id="contain-mutliselect">
                                                        <div id="ddlProductos" class="dropDown">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="SectionsFields" class="col-md-12 col-xs-12 form-group">
                                            <div class="col-xs-12 ng-scope"><label class="control-label ng-scope"><span
                                                        class="ng-binding">Usuario asignado </span></label>
                                                <div class="ng-scope">
                                                    <div id="contain-ddl">
                                                        <div id="ddlUsuario" class="dropDown">
                                                        </div>
                                                    </div>
                                                    <span class="ng-binding">Seleccionar usuario solo si este estará
                                                        asignado para todos los productos ingresados o seleccionados</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End modal asignar pedidos -->

    <div>
        <div class="input-container">
            <i class="fas fa-search input-icon"></i>
            <input type="text" id="filtrar" class="input-basic input-expand" placeholder="Filtrar registros ">
        </div>
        <div id="containerGrid">
            <div id="monitorPedidos"></div>
        </div>

    </div>
    <script>
        function volverInfor() {
            $("#modalInfo").modal('hide');
        }

        function volverReasignar() {
            $("#modalReasignar").modal('hide');

        }
        function volverAsignar() {
            $("#modalAsignar").modal('hide');
            var multiselect = $("#usuario").data("kendoMultiSelect");
            multiselect.value("");
        }

        //--------------------------monitor---------------------------------------------

        //Filtro para la grid de controlador
        function isNumeric(n) {
            debugger
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        $('#filtrar').change('input', function (e) {
            debugger
            //aqui capturo la informacion de la grid .data()
            var grid = $('#monitorPedidos').data('kendoGrid');
            var columns = grid.columns;

            var filter = { logic: 'or', filters: [] };
            columns.forEach(function (x) {
                debugger;
                if (x.field) {
                    var type = grid.dataSource.options.schema.model.fields[x.field].type;
                    if (type == 'string') {
                        filter.filters.push({
                            field: x.field,
                            operator: 'contains',
                            value: e.target.value
                        })
                    }
                    else if (type == 'number') {
                        if (isNumeric(e.target.value)) {
                            filter.filters.push({
                                field: x.field,
                                operator: 'contains',
                                value: e.target.value
                            });
                        }
                    }
                }
            });

            grid.dataSource.filter(filter);
            if (grid.dataSource._total == 0) {
                $('.error-message').empty().append('No se encontraron resultados...')
            } else {
                grid.dataSource.filter(filter);
                $('.error-message').empty()
            }
        });
        //en filtro

        //Este metodo obtiene, consulta la informacion desde la basse de datos/

        function ConsultarPedidos() {

            var stringQuery = {
                "query": `select  pc.Id, pc.NumeroPedido,c.NombreCompleto,c.NumeroIdentificacion,Pc.Prioridad,pc.Prioridad 'FlagPrioridad',
										pc.Estado, format(Pc.FechaAprobacionPedido, 'dd/MM/yyyy') as FechaAprobacionPedido,
										left( CONVERT(time, Pc.FechaAprobacionPedido, 0),5) as HoraAprobacionPedido,ci.NombreDeLaCiudad,r.NombreRegional,
										 Pc.TipoEnvio, Pc.TipoEnvio 'FlagTipoEnvio',Count(dpc.PedidosClientesFk) [CantidadDeItems],Pc.Observaciones,Pc.TipoDePedido,cp.NombreClaseProducto'NombreLinea'

								from Cohan_Lappiz_PedidosClientes pc
								join Cohan_Lappiz_Cliente c on pc.ClienteFk=c.Id
								join Cohan_Lappiz_DetalleCliente dc on pc.DetalleClienteFk=dc.Id
								join Cohan_Lappiz_Ciudad ci on dc.CiudadFK=ci.Id
								join Cohan_Lappiz_Regional r on dc.RegionFK=r.Id
								join Cohan_Lappiz_DetallePedidosClientes dpc on pc.Id=dpc.PedidosClientesFk
								join Cohan_Lappiz_Producto p on dpc.ProductoFk=p.Id
								join Cohan_Lappiz_ClaseProductos cp on p.ClaseFK=cp.Id
								  where pc.Estado <> 'Generado' and pc.Estado <> 'No generado' and pc.Estado <> 'Despachado' and 
                                pc.Estado <> 'Aprobado'
								group by pc.Id, pc.NumeroPedido,c.NombreCompleto,c.NumeroIdentificacion, 
                                pc.Prioridad, pc.Prioridad,pc.Estado,format(pc.FechaAprobacionPedido, 'dd/MM/yyyy'),
                                left( CONVERT(time, pc.FechaAprobacionPedido, 0),5),ci.NombreDeLaCiudad,r.NombreRegional, 
								Pc.TipoEnvio, Pc.TipoEnvio,Pc.Observaciones,Pc.TipoDePedido,cp.NombreClaseProducto
								order by pc.NumeroPedido
                                `,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }
            // creo variable
            var monitor = "";

            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: 'POST',
                data: JSON.stringify(stringQuery),

                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },

                success: function (Success) {

                    monitor = Success[0];
                    //esta vaariable es la almacena  el resultado de query
                }
            });

            var stringQuery1 = {
                "query": `select   distinct Pc.Id, Pc.NumeroPedido,PV.NombrePuntoVenta,B.NombreBodega'BodegaDestino',Pc.Estado,Pc.FechaAprobacionPedido,
				                left( CONVERT(time, Pc.FechaAprobacionPedido, 0),5) as HoraAprobacionPedido,Pc.TipoDePedido,Pc.Prioridad, Pc.Prioridad 'FlagPrioridad',Pc.TipoEnvio, Pc.TipoEnvio'FlagTipoEnvio',Pc.CantidadDeItems,Pc.Observaciones,C.NombreDeLaCiudad,R.NombreRegional
                                from Cohan_Lappiz_PedidosClientes Pc
                                inner  join Cohan_Lappiz_PuntoVenta PV on PV.Id = Pc.PuntosVentasFk
                                left outer join Cohan_Lappiz_Bodega B on B.Id=Pc.BodegaDestinoFk
                                left outer  join Cohan_Lappiz_Ciudad C on  C.Id=B.CiudadFk
                                left outer  join Cohan_Lappiz_DetallesCiudadesRegionales Dtr on C.Id=Dtr.CiudadesFk
                                left outer  join Cohan_Lappiz_Regional R on R.Id=Dtr.RegionalesFk
                                where Pc.Estado <> 'Generado' and Pc.Estado <> 'No generado' and Pc.Estado <> 'Despachado'and Pc.TipoDePedido='Interno' and R.NombreRegional is not null order by Pc.NumeroPedido`,
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
                data: JSON.stringify(stringQuery1),

                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },


                success: function (Success) {
                    monitor1 = Success[0];

                    for (let i = 0; i < Success[0].length; i++) {
                        let element = {
                            "Id": Success[0][i].Id,
                            "NumeroPedido": Success[0][i].NumeroPedido,
                            "NombreCompleto": Success[0][i].BodegaDestino,
                            "NumeroIdentificacion": "",
                            "Prioridad": Success[0][i].Prioridad,
                            "Estado": Success[0][i].Estado,
                            "FechaAprobacionPedido": Success[0][i].FechaAprobacionPedido,
                            "HoraAprobacionPedido": Success[0][i].HoraAprobacionPedido,
                            "NombreDeLaCiudad": Success[0][i].NombreDeLaCiudad,
                            "NombreRegional": Success[0][i].NombreRegional,
                            "TipoEnvio": Success[0][i].TipoEnvio,
                            "CantidadDeItems": Success[0][i].CantidadDeItems,
                            "Observaciones": Success[0][i].Observaciones,
                            "TipoDePedido": Success[0][i].TipoDePedido,
                            "NombreLinea": Success[0][i].NombreLinea,
                            "FlagPrioridad": Success[0][i].FlagPrioridad,
                            "FlagTipoEnvio": Success[0][i].FlagTipoEnvio
                        }
                        //esta vaariable es la almacena  el resultado de query

                        monitor.push(element)

                    }
                }
            });
            for (let i = 0; i < monitor.length; i++) {

                if (monitor[i].TipoEnvio == undefined || monitor[i].TipoEnvio == null || monitor[i].TipoEnvio == "null" || monitor[i].TipoEnvio == "") {
                    monitor[i].Opciones =
                    {
                        "Tipo": `Seleccione una opción`
                    }
                } else {
                    monitor[i].Opciones =
                    {
                        "Tipo": `${monitor[i].TipoEnvio}`
                    }
                }
                monitor[i].Prioridad = {
                    "Tipo": `${monitor[i].Prioridad}`
                }

            }
            return monitor
        }

        sessionStorage.dataMonitor = JSON.stringify(['Primero'])
        crearGrid();
        //esta  grid es la que ve el usuario , despues dar click soobre Monitor de pedidos
        function crearGrid(dataGrid) {

            if (dataGrid == null) {
                dataGrid = ConsultarPedidos()
                sessionStorage.dataMonitor = JSON.stringify(dataGrid);
            }

            $("#monitorPedidos").kendoGrid({
                dataSource: {
                    data: dataGrid,
                    schema: {
                        model: {
                            fields: {
                                Id: { type: "string", editable: false },
                                NumeroPedido: { type: "number", editable: false },
                                NombreCompleto: { type: "string", editable: false },
                                NumeroIdentificacion: { type: "number", editable: false },
                                Prioridad: { defaultValue: { Tipo: "Normal" } },
                                Estado: { type: "string", editable: false },
                                FechaAprobacionPedido: { type: "date", editable: false },
                                HoraAprobacionPedido: { type: "datetime", editable: false },
                                FechaFacturacion: { type: "datetime", editable: false },
                                HoraFacturacion: { type: "datetime", editable: false },
                                Opciones: { defaultValue: { Tipo: "Enviar" } },
                                NombreDeLaCiudad: { type: "string", editable: false },
                                NombreRegional: { type: "string", editable: false },
                                NombreLinea: { type: "string", editable: false },
                                CantidadDeItems: { type: "number", editable: false },
                                Observaciones: { type: "string", editable: false },
                                NombrePuntoVenta: { type: "string", editable: false },
                                BodegaDestino: { type: "string", editable: false },
                                TipoDePedido: { type: "string", editable: false },
                                FlagTipoEnvio: { type: "string", editable: false },
                                FlagPrioridad: { type: "string", editable: false }
                            } // fields
                        } // models
                    }, // schema
                    pageSize: 10
                },
                batch: true,
                editable: true,
                persistSelection: true,
                scrollable: true,
                sortable: true,
                filterable: false,
                resizable: true,
                pageable: {
                    input: true,
                    numeric: true,
                },
                dataBound: function () {

                    for (var i = 0; i < this.columns.length; i++) {
                        this.autoFitColumn(i);
                    }
                },
                columns: [

                    { field: "NumeroPedido", title: "Número/Pedido" },
                    { field: "NombreCompleto", title: "Nombre/Cliente" },
                    { field: "NumeroIdentificacion", title: "Identificación" },
                    { field: "Prioridad", title: "Criticidad", editor: DropDownListPrioridad, template: "#=Prioridad.Tipo#" },
                    { field: "Estado", title: "Estado" },
                    { field: "FechaAprobacionPedido", title: "F/Aprobación pedido", format: "{0:dd-MM-yyyy}" },
                    { field: "HoraAprobacionPedido", title: "H/Aprobación pedido", format: "{0:dd-MM-yyyy}" },
                    { field: "FechaFacturacion", title: "F/Facturacion", format: "{0:dd-MM-yyyy}" },
                    { field: "HoraFacturacion", title: "H/Facturacion", format: "{0:dd-MM-yyyy}" },
                    { field: "Opciones", title: "Tipo de envio", editor: DropDownListOpciones, template: "#=Opciones.Tipo#" },
                    { field: "NombreDeLaCiudad", title: "Ciudad" },
                    { field: "NombreRegional", title: "Regional" },
                    { field: "NombreLinea", title: "Tipo de línea " },
                    { field: "CantidadDeItems", title: "Número ítem" },
                    { field: "Observaciones", title: "Observaciones" },
                    { field: "TipoDePedido", title: "Tipo de pedido" },
                    { command: [{ text: "informacion", click: informacion, template: "<a class='k-grid-informacion btn'><i class='fa fa-info'></i> Información</a>" }] },
                    { command: [{ text: "cambiosdeubicacion", click:cambiosdeubicacion, template: "<a class='k-grid-cambiosdeubicacion btn'><i class='fas fa-people-carry'></i> Cambios de ubicación</a>" }] },
                    { command: [{ text: "reasignar", click: reasignar, template: "<a class='k-grid-reasignar btn'><i class='fa fa-refresh'></i> Reasignar</a>" }] },
                    { command: [{ text: "asignarPedido", click: asignarPedido, template: "<a class='k-grid-asignarPedido btn'><i class='fa fa-check-square'></i> Asignar pedido</a>" }] },
                    { command: [{ text: "imprimirfactura", click: imprimirfactura, template: "<a class='k-grid-imprimirfactura btn'><i class='fa fa-print'></i> Imprimir factura</a>" }] },
                    { command: [{ text: "remision", click: remision, template: "<a class='k-grid-remision btn'><i class='fa fa-file-text-o'></i> Remisión</a>" }] },
                    { command: [{ text: "traslado", click: traslado, template: "<a class='k-grid-traslado btn'><i class='fa fa-car'></i> Traslado</a>" }] },
                    { command: [{ text: "listaEmpaque", click: listaEmpaque, template: "<a class='k-grid-listaEmpaque btn'><i class='fa fa-list-ol'></i> Lista empaque</a>" }] },                    
                    //{ command: [{ text: "Aprobarcambio", click: Aprobarcambio, template: "<a class='k-grid-Aprobarcambio btn'><i class='fa fa-list-ol'></i>Aprobar cambio</a>" }] },
                    { command: [{ text: "salida", click: salida, template: "<a class='k-grid-salida btn'><i class='fa fa-external-link'></i> Salida</a>" }] }
                ]
            });

            function cambiosdeubicacion () {
            debugger;
            $("#modalUbicacion").modal('show')
            }

            function Aprobarcambio() {
              debugger;  
            }

            $('#save-changes').click(function () {
                debugger

                var getUserTochange = $("#change-user").val()
                var getAssignedUser = $("#assigned-user").val()
                var idPedido = $('#idPedidoReasignar').val()

                if (getUserTochange && getAssignedUser) {
                    var Query = {
                        "query": `declare @idLogTareas uniqueidentifier
                            select top 1 @idLogTareas = lt.Id from Cohan_Lappiz_LogDeTareas lt
                            join Cohan_Lappiz_DetalleLogDeTareas dlt on dlt.LogTareasFk = lt.Id
                            where PedidosFK = '${idPedido}' and dlt.UsuariosFk = '${getAssignedUser}'

                            update Cohan_Lappiz_DetalleLogDeTareas
                            set UsuariosFk = '${getUserTochange}' 
                            where UsuariosFk = '${getAssignedUser}' and LogTareasFk = @idLogTareas`,
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
                        data: JSON.stringify(Query),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.setRequestHeader('Authorization', localStorage.Authorization);
                        },
                        success: function (Success) {
                            debugger;
                            $("#modalReasignar").modal('hide');
                            if (Success) {
                                debugger;
                                toastr.success('Tarea reasignada con éxito')
                            } else {
                                toastr.warning('No se ha podido reasignar la tarea')
                            }

                        }
                    })
                } else {
                    toastr.warning('Debes ingresar ambos campos.');
                }
            });

            $("#usuario").kendoMultiSelect({
                filter: "startswith",
                dataTextField: "FullName",
                dataValueField: "Id",
                dataSource: [],
                change: function (e) {
                    debugger;
                    var cantidad = sessionStorage.CantidadLineas;
                    cantidad = parseInt(cantidad);
                    if (cantidad < 20) {
                        var seleccion = $('#usuario').data('kendoMultiSelect').value().length;
                        if (parseInt(seleccion) > 1) {
                            toastr.info('Solo puede seleccionar un encargado para este pedido');
                            $('#usuario').data('kendoMultiSelect').value($('#usuario').data('kendoMultiSelect').value().splice(0, 1));
                        }
                    }
                }
            });
        }

        var loop = setInterval(() => {
            var url = location.href;
            var urlSplit = url.split('appViewId=')
            var idVista = urlSplit[1]

            if (idVista == 'a9a977a0-22d3-4f47-8524-e9f04a7f3f41') {
                debugger;
                let dataMonitor = ConsultarPedidos()
                if (JSON.stringify(dataMonitor) != sessionStorage.dataMonitor) {

                    sessionStorage.dataMonitor = JSON.stringify(dataMonitor)

                    $('#containerGrid').empty();
                    $('#containerGrid').html(`<div id="monitorPedidos"></div>`);

                    crearGrid(dataMonitor);
                }
            } else {
                clearInterval(loop)
                delete sessionStorage.dataMonitor
            }
        }, 6000);

        function imprimirfactura() {
             toastr.info('Pendiente funcionalidad');
            console.log('impreso');
        }

        function remision() {
             toastr.info('Pendiente funcionalidad');
            console.log('remitido');
        }

        function traslado() {
             toastr.info('Pendiente funcionalidad');
            console.log('trasladado')
        }

        function listaEmpaque(e) {
            debugger;
            var grid = $("#monitorPedidos").data("kendoGrid");
            var row = grid.dataItem($(e.target).closest("tr"));

            sessionStorage.idPedidoReporte = row.Id
            location.assign(`#/forms?viewName=Cohan_Lappiz_PedidosClientes&entityId=29cd89a6-d1ab-4c1d-9de0-f69b610f1adb&viewMenu&appViewId=51b80fdd-e5df-4c5e-898e-af776a8ac912`);
        }

        function salida() {
            toastr.info('Pendiente funcionalidad');
            console.log('sacado');
        }

        function DropDownListOpciones(container, options, val) {

            //var tipoEmpaque = [{ "Tipo": "Caja" }, { "Tipo": "Nevera" }]
            var Opciones = [{
                "Tipo": "Recogen"
            }, {
                "Tipo": "Enviar"
            }]


            $('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
                autoBind: false,
                dataTextField: "Tipo",
                dataValueField: "Tipo",
                //optionLabel: "Seleccione un tipo",
                dataSource: {
                    data: Opciones
                },
                change: function (e) {
                    debugger
                    var Id = this.dataItem().parent().Id
                    var value = this.value();

                    var Query = {
                        "query": `update Cohan_Lappiz_PedidosClientes
                                set TipoEnvio = '${value}' 
                                where Id = '${Id}'`,
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
                        data: JSON.stringify(Query),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.setRequestHeader('Authorization', localStorage.Authorization);
                        },
                        success: function (Success) {
                            debugger;
                            var element = e.sender.element;
                            var row = element.closest("tr");
                            var grid = $("#monitorPedidos").data("kendoGrid");
                            var dataItem = grid.dataItem(row);

                            dataItem.set("value", e.sender.value());
                            $("#monitorPedidos").data('kendoGrid').setDataSource(ConsultarPedidos())
                            toastr.success('Tipo de envío actualizado correctamente')
                        }
                    })
                    console.log(value)
                }
            });

        }

        function DropDownListPrioridad(container, options) {
            var Prioridad = [{
                "Id": 'Normal',
                "Tipo": "Normal"
            }, {
                "Id": "Urgente",
                "Tipo": "Urgente"
            }]


            $('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
                autoBind: false,
                dataTextField: "Tipo",
                dataValueField: "Id",
                //optionLabel: "Seleccione un tipo",
                dataSource: {
                    data: Prioridad
                },
                change: function (e) {
                    debugger
                    let Id = this.dataItem().parent().Id
                    let value = this.value();
                    var Query = {
                        "query": `update Cohan_Lappiz_PedidosClientes
                                set Prioridad = '${value}' 
                                where Id = '${Id}'`,
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
                        data: JSON.stringify(Query),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.setRequestHeader('Authorization', localStorage.Authorization);
                        },
                        success: function (Success) {
                            debugger;
                            var element = e.sender.element;
                            var row = element.closest("tr");
                            var grid = $("#monitorPedidos").data("kendoGrid");
                            var dataItem = grid.dataItem(row);

                            dataItem.set("value", e.sender.value());
                            $("#monitorPedidos").data('kendoGrid').setDataSource(ConsultarPedidos())

                            toastr.success('Prioridad actualizada correctamente')
                        }
                    })

                }
            });

        }



        $("#monitorPedidos > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap > a.k-pager-refresh.k-link").click(function () {
            debugger;


            $('#loaderDiv').css('display', 'block')

            var Newdata = new kendo.data.DataSource({ data: [] });


            //la data que estoy recibiendo, o capturando con  (setDataSource())
            // atravez de "Newdata". Es para que se muestre en la sgt grid

            $('#monitorPedidos').data('kendoGrid').setDataSource(Newdata);
            var pedidos = new kendo.data.DataSource({
                data: ConsultarPedidos(),
                pageSize: 30
            });


            $('#monitorPedidos').data('kendoGrid').setDataSource(pedidos);
            $('#loaderDiv').css('display', 'none')
        });

        function informacion(e) {
            debugger;

            $("#modalInfo").modal('show');

            //capturo la informacion de esta grid
            var grid = $("#monitorPedidos").data("kendoGrid");
            //capturo elregistro  seleccionado 
            var pedicli = grid.dataItem($(e.target).closest("tr"));

            var Query = {
                "query": `select	PC.Id,P.CodigoProducto,P.NombreProducto,DC.Cantidad,DC.CantidadComprometida,
                                        DC.CantidadSeparada,DC.CantidadEmpacada,DC.CantidadExcluida,ISNULL(DC.Cantidad,0) - (ISNULL(DC.CantidadEmpacada,0) + ISNULL(DC.CantidadExcluida,0)) as CantidadPendiente
                                from Cohan_Lappiz_DetallePedidosClientes DC
                                inner join Cohan_Lappiz_PedidosClientes PC on PC.Id=DC.PedidosClientesFk
                                left outer join Cohan_Lappiz_Producto P on P.Id=DC.ProductoFk
                                where PC.Id='${pedicli.Id}' `,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }
                //consulto para  saber quien fue el # de registro 
                ;

            //realizo la peticion al servidor             
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
                    //la respuesta de la petcion la conviero a un array de estring, ya que la 
                    //inormacion devulta llega como JSON
                    var respuesta = JSON.stringify(Success[0]);

                    //El array de String lo convieerto a String, y 
                    //ese nuevo resultado lo almaceno es  una variable
                    var monitor = JSON.parse(respuesta);




                    //aqui pintamos el resultado  (GRID) obtenido por la consulta
                    $("#informacion").kendoGrid({
                        dataSource: {
                            data: monitor, //El resultado=========>>>>>> (lo que trae la consulta) <<<<<<<<< =======
                            schema: {
                                model: {
                                    //campos de la  grid
                                    fields: {
                                        Id: { type: "string", editable: false },
                                        CodigoProducto: { type: "number", editable: false },
                                        NombreProducto: { type: "string", editable: false },
                                        Cantidad: { type: "number", editable: false },
                                        CantidadComprometida: { type: "number", editable: false },
                                        CantidadSeparada: { type: "number", editable: false },
                                        CantidadEmpacada: { type: "number", editable: false },
                                        CantidadExcluida: { type: "number", editable: false },
                                        CantidadPendiente: { type: "number", editable: false }

                                    } // fields
                                } // models
                            }, // schema
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

                            // Columnas de la grid
                            { field: "CodigoProducto", title: "Cód/Producto" },
                            { field: "NombreProducto", title: "Nombre producto" },
                            { field: "Cantidad", title: "Cant/Solicitada" },
                            { field: "CantidadComprometida", title: "Cant/Comprometida" },
                            { field: "CantidadSeparada", title: "Cant/Separada" },
                            { field: "CantidadEmpacada", title: "Cant/Empacada" },
                            { field: "CantidadExcluida", title: "Cant/Excluida" },
                            { field: "CantidadPendiente", title: "Cant/Pendiente" }
                        ]
                    });
                }
            });

        }

        function ValidarLineas(Id) {
            var StringQuery = {
                "query": `select COUNT(Id) [Cantidad] from Cohan_Lappiz_DetallePedidosClientes 
            where PedidosClientesFk = '${Id}'`,
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
                data: JSON.stringify(StringQuery),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (Success) {
                    debugger;
                    sessionStorage.CantidadLineas = Success[0][0].Cantidad;
                    var cantidad = parseInt(Success[0][0].Cantidad);
                    if (cantidad < 20) {
                        toastr.info('El pedido al tener menos de 20 líneas, solo puede ser asignado a un usuario', 'Recordatorio');
                    }
                },
                error: function (error) {
                    toastr.warning('Ha ocurrido un error al hacer la consulta');
                }
            })
        }

        function asignarPedido(e) {
            debugger
            var tasktRow = this.dataItem($(e.currentTarget).closest("tr"));
            var pedido = []
            ValidarLineas(tasktRow.Id);
            pedido.push({ 'Id': tasktRow.Id, 'NombreCompleto': tasktRow.NombreCompleto, 'NumeroPedido': tasktRow.NumeroPedido, 'Tarea': tasktRow.Estado, 'FlagPrioridad': tasktRow.FlagPrioridad })
            $("#modalAsignar").modal('show');
            var Query = {
                "query": `select * from Lappiz_Users where TipoUsuario = 'Picking y Packing' or TipoUsuario = 'Alto costo' or TipoUsuario = 'Control' or TipoUsuario = 'Cadena de frío'`,
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
                data: JSON.stringify(Query),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (Success) {
                    debugger
                    var usuarios = Success[0]
                    if (usuarios.length > 0) {
                        $("#numPedido").kendoDropDownList({
                            // filter: "startswith",
                            dataTextField: "NumeroPedido",
                            dataValueField: "Id",
                            dataSource: pedido,
                            enable: false
                        });
                        var usuarios = Success[0]
                        var users = new kendo.data.DataSource({
                            data: usuarios
                        });
                        var dropdownlist = $("#usuario").data("kendoMultiSelect");
                        dropdownlist.setDataSource(users);
                    }
                }
            })
        }

        // Botón Asignar pedidos
        function uid() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            )
        }

        function asignarPedidoBtn() {
            debugger
            var uuid = uid()
            var current_date = new Date().format('Y-m-d H:i:s')
            var selectedUsers = $("#usuario").data('kendoMultiSelect').value()
            var index = $('#numPedido').data('kendoDropDownList').select();
            var getSelected = $('#numPedido').data('kendoDropDownList').dataSource.options.data[index]

            var respuestaValidacion = ajaxSP('Cohan_Lappiz_ValidacionAsignacionPedidos', [getSelected.Id, getSelected.Tarea])
            let Query = ""

            if (respuestaValidacion[0].Respuesta == 1) {
                var string = `INSERT INTO Cohan_Lappiz_LogDeTareas
            VALUES ('${uuid}', null, '${getSelected.Id}', null, '${getSelected.Tarea}', null, null, null, null)`
                var childString = ''
                selectedUsers.forEach(users =>
                    childString = `INSERT INTO Cohan_Lappiz_DetalleLogDeTareas
                VALUES (newID(), null, '${uuid}', '${users}', '${current_date}', null, null, null, null, null) ` + ' \n ' + childString
                );

                var completeString = {
                    "query": string + ' \n ' + childString + ' \n ' + Query,
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
                    data: JSON.stringify(completeString),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                    },
                    success: function (Success) {
                        toastr.success('Tarea asignada correctamente')
                        $("#modalAsignar").modal('hide');
                        var multiselect = $("#usuario").data("kendoMultiSelect");
                        multiselect.value("");
                    }
                })
            } else {
                toastr.warning('El pedido ya fue asignado a alguien más utiliza la opción de "reasignar"');
            }
        }

        function reasignar(e) {
            debugger
            //obtengo l registro que quiero reasignR
            var monitor_pedido = this.dataItem($(e.currentTarget).closest("tr"));
            var idPedido = monitor_pedido.Id
            var numero_pedido = monitor_pedido.NumeroPedido

            $('#idPedidoReasignar').val(idPedido)

            var Query = {
                "query": `select * from Lappiz_Users where TipoUsuario = 'Picking y Packing' or TipoUsuario = 'Cadena de frío'`,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }

            var Query2 = {
                "query": `select lu.Id, lu.FullName, lu.TipoUsuario from Cohan_Lappiz_PedidosClientes pc 
					inner join Cohan_Lappiz_LogDeTareas lt on lt.PedidosFK = pc.Id 
					left outer join Cohan_Lappiz_DetalleLogDeTareas dlt on dlt.LogTareasFk = lt.Id
					left outer join Lappiz_Users lu on dlt.UsuariosFk = lu.Id
                    where pc.NumeroPedido = '${numero_pedido}'`,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }

            //PETICION AL SERVIDOR
            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: 'POST',
                data: JSON.stringify(Query2),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (Success) {
                    //RESPUESTA 
                    var change_user = Success[0]
                    if (change_user.length > 0) {
                        $("#modalReasignar").modal('show');
                        var change_user = Success[0]
                        $("#assigned-user").kendoDropDownList({
                            filter: "startswith",
                            dataTextField: "FullName",
                            dataValueField: "Id",
                            dataSource: change_user// ESTA ES LA RESPUESTA, PARA MOSTRARSE EN EL DROPDOWNLIST
                        });

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
                                var usuario = Success[0]

                                for (let i = 0; i < usuario.length; i++) {
                                    for (let index = 0; index < change_user.length; index++) {
                                        if (usuario[i].Id == change_user[index].Id) {

                                            usuario.splice(i, 1)
                                            i--
                                            break
                                        }
                                    }
                                }
                                $("#change-user").kendoDropDownList({
                                    filter: "startswith",
                                    dataTextField: "FullName",
                                    dataValueField: "Id",
                                    dataSource: usuario
                                });


                            }
                        })

                    } else {
                        toastr.warning('Este registro aún no está asignado')
                    }
                }
            })


        }

        function ajaxSP(nombreSp, parametros) {
            var respuesta;

            var Query = {
                "query": 'exec ' + nombreSp,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }
            if (parametros != null) {
                for (let i = 0; i < parametros.length; i++) {
                    if (i < 1) {
                        if (typeof (parametros[i]) == 'string') {
                            Query.query += " '" + parametros[i] + "'";
                        } else {
                            Query.query += ' ' + parametros[i];
                        }

                    } else {
                        if (typeof (parametros[i]) == 'string') {
                            Query.query += ",'" + parametros[i] + "'";
                        } else {
                            Query.query += "," + parametros[i];
                        }

                    }
                }
            }

            $.ajax({
                async: false,
                url: backandGlobal.api2 + "/" + sessionStorage.workspace + ".api/api/lappiz/sp/query",
                type: 'POST',
                data: JSON.stringify(Query),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (Success) {
                    respuesta = Success[0];
                },
                error: function (error) { console.log(error); }
            });

            return respuesta;
        }

    </script>
</body>