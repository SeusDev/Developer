/*validacion de derechos web service*/
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == 'b3e85bff-989c-43b1-ae88-0ccbf473404e') {
    debugger;
    setTimeout(function () {


        debugger;
        document.addEventListener('keyup', validarCamposInputs);

        function validarCamposInputs() {
            var numeroDocumento = $('#txtNumeroDocumento').val();

            if (vacio(numeroDocumento)) {
                $('#btnBuscar').prop("disabled", true);
            } else {
                $('#btnBuscar').prop("disabled", false);
            }
        }

        $('#txtNumeroDocumento').prop("disabled", true);


        /* ---------------------------Sección 1---------------------------------------- */

        var stringQuery = `select Id,TipoDocumento from Cohan_Lappiz_TipoDocumento`;

        execQuery(stringQuery).then(success => {
            debugger;
            var dataTipoDoc = success.data[0];

            $('#ddlTipoDocumento').kendoDropDownList({
                autoBind: false,
                dataTextField: "TipoDocumento",
                dataValueField: "Id",
                dataSource: {
                    data: dataTipoDoc
                },
                optionLabel: {
                    Id: undefined,
                    TipoDocumento: 'Seleccionar...'
                },
                change: function () {
                    var selected = $('#ddlTipoDocumento').data('kendoDropDownList').dataItem();

                    if (selected.Id == undefined) {
                        $('#txtNumeroDocumento').prop("disabled", true);
                        $('#btnBuscar').prop("disabled", true);
                    } else {
                        $('#txtNumeroDocumento').prop("disabled", false);
                    }
                }
            });
        });

        $('#btnBuscar').click(function () {
            debugger;
            var tipoDocumento = $('#ddlTipoDocumento').data('kendoDropDownList').dataItem().TipoDocumento;
            var numeroDocumento = $('#txtNumeroDocumento').val();
            var usuario = JSON.parse(sessionStorage.LappizUser);
            let afiliado = {
                "tipoDocumento": `${tipoDocumento}`,
                "numeroDocumento": `${numeroDocumento}`,
                "fechaNacimiento": "",
                "primerNombre": "",
                "segundoNombre": "",
                "primerApellido": "",
                "segundoApellido": ""
            }

            let afiliadoData = JSON.stringify(afiliado);

            let consutoken = "";

            let datasavia = "";


            execSP('CallRestAPI').then(success => {
                debugger;
                consutoken = JSON.parse(success.data[0][0].content).access_token;

                var parajson = null;

                execSP('CallRestAPIAfiliados', ["'" + parajson + "'", "'" + consutoken + "'", "'" + afiliadoData + "'"]).then(success => {
                    debugger;


                    if (success.data[0][0].content === 'Sin respuesta 2 - MENSAJE: ERROR. MENSAJE: null') {
                        toastr.warning('El servicio de Savia no se encuentra disponible')
                        consulsp()
                        return
                    } else {
                        datasavia = JSON.parse(success.data[0][0].content);
                        if (datasavia.afiliados != null) {

                            var stringQuery = `select * from Cohan_Lappiz_Afiliados
                                where NumeroIdentificacion = '${numeroDocumento}'`;

                            execQuery(stringQuery).then(success => {
                                debugger;
                                var afildata = success.data[0];
                                var ubicacion = `   declare @pais uniqueidentifier
                                                    declare @departamento uniqueidentifier
                                                    declare @ciudad uniqueidentifier 
                                                    set @pais=(select PaisFk from Cohan_Lappiz_Departamento where CodigoDepartamento = '${datasavia.afiliados[0].codDepartamentoResidencia.replace("0", "")}')
                                                    set @departamento=(select Id from Cohan_Lappiz_Departamento where CodigoDepartamento = '${datasavia.afiliados[0].codDepartamentoResidencia.replace("0", "")}')
                                                    set @ciudad=(select Id from Cohan_Lappiz_Ciudad where CodigoCiudad='${datasavia.afiliados[0].codDepartamentoResidencia.replace("0", "")}' and DepartamentoFk = @departamento )
                                    `;

                                var nombre1 = datasavia.afiliados[0].primerNombreAfiliado;
                                var nombre2 = datasavia.afiliados[0].segundoNombreAfiliado;
                                var apellido1 = datasavia.afiliados[0].primerApellidoAfiliado;
                                var apellido2 = datasavia.afiliados[0].segundoApellidoAfiliado;
                                var nombrecom = nombre1 + ' ' + nombre2 + ' ' + apellido1 + ' ' + apellido2;

                                $('#txtEstado').val(datasavia.afiliados[0].estadoAfiliacion);
                                $('#txtNumeroDocumento2').val(datasavia.afiliados[0].documentoAfiliado)
                                $('#txtNombreCompleto').val(nombrecom)
                                $('#txtCiudadAfiliacion').val(datasavia.afiliados[0].ciudadAfiliacion)
                                $('#txtCiudadResidencia').val(datasavia.afiliados[0].ciudadAfiliacion)
                                if (afildata.length > 0) {


                                    var afilQuery = ` update  Cohan_Lappiz_Afiliados set FechaModificacion= GETDATE(), UsaurioModificacion='${usuario.Id}',Estado='${datasavia.afiliados[0].estadoAfiliacion}',NombreAfiliado= '${nombrecom}',PrimerNombre='${nombre1}',
                                                            SegundoNombre='${nombre2}',PrimerApellido='${apellido1}',SegundoApellido='${apellido2}',Sexo='${datasavia.afiliados[0].sexoAfiliado}',Direccion='${datasavia.afiliados[0].direccion}',
                                                            Telefono='${datasavia.afiliados[0].telefono}',FechaNacimiento='${datasavia.afiliados[0].fechaNacimientoAfiliado}',CiudadFk = @ciudad,PaisFk=@pais,DepartamentoFk=@departamento,
                                                            TipoDocumentoFK='${$('#ddlTipoDocumento').data('kendoDropDownList').dataItem().Id}',Regimen='${datasavia.afiliados[0].regimen}',NivelAfiliado='${datasavia.afiliados[0].nivelSisben}'
                                                            where Id = '${afildata[0].Id}'`;

                                    afilQuery = ubicacion + afilQuery;
                                    execQuery(afilQuery).then(success => {
                                        debugger;
                                        toastr.success('Afiliado actualizado correctamente')
                                        console.log(success.data[0])
                                        consulsp()
                                    });

                                } else {
                                    var inserafilQuery = ` 
                                        
                                        insert into  Cohan_Lappiz_Afiliados values(NEWID(),null,GETDATE(),null,null,'${usuario.Id}','${datasavia.afiliados[0].estadoAfiliacion}','${nombrecom}','${nombre1}','${nombre2}',
                                        '${apellido1}','${apellido2}','${datasavia.afiliados[0].sexoAfiliado}','${datasavia.afiliados[0].direccion}','${datasavia.afiliados[0].telefono}',null,null,
                                        '${datasavia.afiliados[0].fechaNacimientoAfiliado}',null,@ciudad,@pais,@departamento,'${$('#ddlTipoDocumento').data('kendoDropDownList').dataItem().Id}',
                                        '${datasavia.afiliados[0].documentoAfiliado}',null,'${usuario.Usuarios}',null,'${datasavia.afiliados[0].regimen}',null,'${datasavia.afiliados[0].nivelSisben}',null,null,null,null)`

                                    inserafilQuery = ubicacion + inserafilQuery;
                                    execQuery(inserafilQuery).then(success => {
                                        debugger;
                                        console.log(success.data[0]);
                                        toastr.success('Afiliado creado correctamente')
                                    });

                                }
                            });
                        } else {
                            toastr.warning(datasavia.mensaje);
                            consulsp()
                        }

                    }

                });
            });

            function consulsp() {
                debugger
                execSP('Cohan_Lappiz_ConsultInfoValidacionDerechos', ["'" + tipoDocumento + "'", "'" + numeroDocumento + "'"]).then(success => {
                    debugger;
                    var dataAfiliado = success.data[0];

                    if ((dataAfiliado != undefined && dataAfiliado != null)) {
                        $('#txtEstado').val(dataAfiliado[0].Estado);
                        $('#txtNumeroDocumento2').val(dataAfiliado[0].NumeroIdentificacion)
                        $('#txtNombreCompleto').val(dataAfiliado[0].NombreAfiliado)
                        $('#txtCiudadAfiliacion').val(dataAfiliado[0].NombreDeLaCiudad)
                        $('#txtCiudadResidencia').val(dataAfiliado[0].NombreDeLaCiudad)

                        $('#contenedorTab').empty();
                        $('#contenedorTab').html(`<div id="Despachos" class="tabcontent">
                                <div id="gridDespachos"></div>
                            </div>
                            <div id="Pendientes" class="tabcontent">
                                <div>
                                    <div id="gridPendientes"></div>
                                </div>
                            </div>
                            <div id="Faltantes" class="tabcontent">
                                <div>
                                    <div id="gridFaltantes"></div>
                                </div>
                            </div>`);

                        cargarGrids(dataAfiliado, dataAfiliado, dataAfiliado);
                    }
                });
            }

        });

        /*_----------------------------------Sección 3--------------------------------------------------*/
        cargarGrids(null, null, null);

        function cargarGrids(dataDespachos, dataPendiende, dataFaltante) {
            if (vacio(dataDespachos)) {
                dataDespachos = []
            }

            if (vacio(dataPendiende)) {
                dataPendiende = []
            }

            if (vacio(dataFaltante)) {
                dataFaltante = []
            }

            $("#gridDespachos").kendoGrid({
                dataSource: {
                    data: dataDespachos,
                    schema: {
                        model: {
                            fields: {
                                Id: { type: "string", editable: false },
                                DateFechaFormula: { type: "date", editable: false },
                                ConsecutivoFormula: { type: "string", editable: false },
                                ConsecutivoEntrega: { type: "string", editable: false },
                                Tutela: { type: "string", editable: false },
                                Txtnumeroformula: { type: "string", editable: false },
                                Atc: { type: "string", editable: false },
                                NombreProducto: { type: "string", editable: false },
                                Entregado: { type: "string", editable: false }
                            }
                        }
                    },
                    pageSize: 5
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
                    refresh: false
                },
                dataBound: function () {
                    for (var i = 0; i < this.columns.length; i++) {
                        this.autoFitColumn(i);
                    }
                },
                columns: [
                    { field: "DateFechaFormula", title: "Fecha", template: "#= kendo.toString(kendo.parseDate(DateFechaFormula, 'yyyy-MM-dd'), 'yyyy/MM/dd') #" },
                    { field: "ConsecutivoFormula", title: "Consecutivo formula" },
                    { field: "ConsecutivoEntrega", title: "Consecutivo entrega" },
                    { field: "Tutela", title: "Tutela" },
                    { field: "Txtnumeroformula", title: "Formula" },
                    { field: "Atc", title: "Código ATC" },
                    { field: "NombreProducto", title: "Producto" },
                    { field: "Entregado", title: "Entregado" },
                    { command: [{ text: "ReporteEntrega", click: ReporteEntrega, template: "<a class='k-grid-ReporteEntrega btn'><i class='fa fa-file-text'></i> Reporte entrega</a>" }] },
                    { command: [{ text: "informacion", click: informaciond, template: "<a class='k-grid-informacion btn'><i class='fa fa-info'></i> Información</a>" }] }
                ]
            });

            function informaciond(e) {
                debugger;
                var grid = $("#gridDespachos").data("kendoGrid");
                var row = grid.dataItem($(e.target).closest("tr"));

                execSP('Cohan_Lappiz_ConsultModalValidacionDerechos', ["'" + row.Id + "'","'" + row.Tab + "'"]).then(success => {
                    var dataInformacion = success.data[0];

                    if (dataInformacion.length > 0) {
                        $("#gridInformacion").kendoGrid({
                            dataSource: {
                                data: dataInformacion,
                                schema: {
                                    model: {
                                        fields: {
                                            Id: { type: "string", editable: false },
                                            CodigoATC: { type: "string", editable: false },
                                            CodigoNUA: { type: "string", editable: false },
                                            NombreProducto: { type: "string", editable: false },
                                            Durante: { type: "number", editable: false },
                                            Solicitados: { type: "number", editable: false },
                                            Entregados: { type: "number", editable: false },
                                            Pendientes: { type: "number", editable: false },
                                            Faltantes: { type: "number", editable: false }
                                        }
                                    }
                                },
                                pageSize: 5
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
                                refresh: false
                            },
                            dataBound: function () {
                                for (var i = 0; i < this.columns.length; i++) {
                                    this.autoFitColumn(i);
                                }
                            },
                            columns: [
                                { field: "CodigoATC", title: "Código ATC" },
                                { field: "CodigoNUA", title: "Código NUAC" },
                                { field: "NombreProducto", title: "Producto" },
                                { field: "Durante", title: "Durante" },
                                { field: "Solicitados", title: "Formula" },
                                { field: "Entregados", title: "Entregados" },
                                { field: "Pendientes", title: "Pendientes" },
                                { field: "Faltantes", title: "Faltantes" }
                            ]
                        });
                    } else {
                        toastr.warning("No se encontraron registros");
                    }

                    $('#modalInformacion').modal('show');
                });
            }

            function ReporteEntrega(e) {
            debugger;      
            var grid = $("#gridDespachos").data("kendoGrid");
            var report = grid.dataItem($(e.target).closest("tr"));            
            var win = window.open(
            `https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fValidación_de_derechos&rs:Command=Render&ConsecutivoFormula=${report.ConsecutivoFormula}&rs:embed=false`
          
            );
            win.focus();
        };
                
         

            $("#gridPendientes").kendoGrid({
                dataSource: {
                    data: dataPendiende,
                    schema: {
                        model: {
                            fields: {
                                Id: { type: "string", editable: false },
                                DateFechaFormula: { type: "date", editable: false },
                                ConsecutivoFormula: { type: "string", editable: false },
                                ConsecutivoEntrega: { type: "string", editable: false },
                                Tutela: { type: "string", editable: false },
                                Txtnumeroformula: { type: "string", editable: false },
                                Sede: { type: "string", editable: false }
                            }
                        }
                    },
                    pageSize: 5
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
                    refresh: false
                },
                dataBound: function () {
                    for (var i = 0; i < this.columns.length; i++) {
                        this.autoFitColumn(i);
                    }
                },
                columns: [
                    { field: "DateFechaFormula", title: "Fecha", template: "#= kendo.toString(kendo.parseDate(DateFechaFormula, 'yyyy-MM-dd'), 'yyyy/MM/dd') #" },
                    { field: "ConsecutivoFormula", title: "Consecutivo formula" },
                    { field: "ConsecutivoEntrega", title: "Consecutivo entrega" },
                    { field: "Tutela", title: "Tutela" },
                    { field: "Txtnumeroformula", title: "Formula" },
                    { field: "Sede", title: "Sede" },
                    { command: [{ text: "informacion", click: informacion, template: "<a class='k-grid-informacion btn'><i class='fa fa-info'></i> Información</a>" }] },
                    { command: [{ text: "transcribir", click: transcribir, template: "<a class='k-grid-transcribir btn'><i class='fa fa-paste'></i> Transcribir</a>" }] }
                ]
            });

            function informacion(e) {
                debugger;
                var grid = $("#gridPendientes").data("kendoGrid");
                var row = grid.dataItem($(e.target).closest("tr"));

                execSP('Cohan_Lappiz_ConsultModalValidacionDerechos', ["'" + row.Id + "'","'" + row.Tab + "'"]).then(success => {
                    var dataInformacion = success.data[0];

                    if (dataInformacion.length > 0) {
                        $("#gridInformacion").kendoGrid({
                            dataSource: {
                                data: dataInformacion,
                                schema: {
                                    model: {
                                        fields: {
                                            Id: { type: "string", editable: false },
                                            CodigoATC: { type: "string", editable: false },
                                            CodigoNUA: { type: "string", editable: false },
                                            NombreProducto: { type: "string", editable: false },
                                            Durante: { type: "number", editable: false },
                                            Solicitados: { type: "number", editable: false },
                                            Entregados: { type: "number", editable: false },
                                            Pendientes: { type: "number", editable: false },
                                            Faltantes: { type: "number", editable: false }
                                        }
                                    }
                                },
                                pageSize: 5
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
                                refresh: false
                            },
                            dataBound: function () {
                                for (var i = 0; i < this.columns.length; i++) {
                                    this.autoFitColumn(i);
                                }
                            },
                            columns: [
                                { field: "CodigoATC", title: "Código ATC" },
                                { field: "CodigoNUA", title: "Código NUAC" },
                                { field: "NombreProducto", title: "Producto" },
                                { field: "Durante", title: "Durante" },
                                { field: "Solicitados", title: "Formula" },
                                { field: "Entregados", title: "Entregados" },
                                { field: "Pendientes", title: "Pendientes" },
                                { field: "Faltantes", title: "Faltantes" }
                            ]
                        });
                    } else {
                        toastr.warning("No se encontraron registros");
                    }

                    $('#modalInformacion').modal('show');
                });
            }

            function transcribir(e) {
                debugger;
                var grid = $("#gridPendientes").data("kendoGrid");
                var row = grid.dataItem($(e.target).closest("tr"));
                $('#accordion').empty()

                $('#ddlEntregoDoc').kendoDropDownList({
                    autoBind: false,
                    dataTextField: "Value",
                    dataValueField: "Id",
                    dataSource: {
                        data: [{ Value: "Si", Id: "Si" }, { Value: "No", Id: "No" }]
                    },
                    optionLabel: {
                        Id: undefined,
                        Value: 'Seleccionar...'
                    }
                });

                var entregaDoc = $('#ddlEntregoDoc');
                entregaDoc[0].parentElement.parentElement.hidden = true

                $('#ddlMotivo').kendoDropDownList({
                    autoBind: false,
                    dataTextField: "Value",
                    dataValueField: "Id",
                    dataSource: {
                        data: [{ Value: "No cuenta con solvencia económica", Id: "No cuenta con solvencia económica" }, { Value: "Tutela integral", Id: "Tutela integral" }, { Value: "Excepciones normativas", Id: "Excepciones normativas" }]
                    },
                    optionLabel: {
                        Id: undefined,
                        Value: 'Seleccionar...'
                    },
                    change: function (e) {
                        debugger;
                        var selected = $('#ddlMotivo').data('kendoDropDownList').dataItem();
                        var entregaDoc = $('#ddlEntregoDoc');

                        if (selected.Id == 'No cuenta con solvencia económica') {
                            entregaDoc[0].parentElement.parentElement.hidden = false
                        } else {
                            entregaDoc[0].parentElement.parentElement.hidden = true
                        }
                    }
                });

                $('#ddlGeneraCobro').kendoDropDownList({
                    autoBind: false,
                    dataTextField: "Value",
                    dataValueField: "Id",
                    dataSource: {
                        data: [{ Value: "Si", Id: "Si" }, { Value: "No", Id: "No" }]
                    },
                    optionLabel: {
                        Id: undefined,
                        Value: 'Seleccionar...'
                    },
                    change: function (e) {
                        debugger;
                        var selected = $('#ddlGeneraCobro').data('kendoDropDownList').dataItem();
                        var motivo = $('#ddlMotivo');
                        var entregaDoc = $('#ddlEntregoDoc');

                        if (selected.Id == 'Si') {
                            motivo[0].parentElement.parentElement.hidden = true
                            entregaDoc[0].parentElement.parentElement.hidden = true
                        } else {
                            var selectedMotivo = $('#ddlMotivo').data('kendoDropDownList').dataItem();

                            if (selectedMotivo.Id == 'No cuenta con solvencia económica') {
                                entregaDoc[0].parentElement.parentElement.hidden = false
                            } else {
                                entregaDoc[0].parentElement.parentElement.hidden = true
                            }
                            motivo[0].parentElement.parentElement.hidden = false
                        }
                    }
                });

                execSP('Cohan_Lappiz_ConsultModalValidacionDerechos', ["'" + row.Id + "'","'" + row.Tab + "'"]).then(success => {
                    debugger
                    var dataTranscripcion = success.data[0];
                    if (dataTranscripcion.length > 0) {
                        for (let i = 0; i < dataTranscripcion.length; i++) {
                            var html =
                                `<div class="card">
                                <div class="card-header" id="heading_${dataTranscripcion[i].Id}">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse_${dataTranscripcion[i].Id}" aria-expanded="true"
                                            aria-controls="collapse_${dataTranscripcion[i].Id}" style="width: 100%; text-align: left;">
                                            ${dataTranscripcion[i].NombreProducto}
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapse_${dataTranscripcion[i].Id}" class="collapse" aria-labelledby="heading_${dataTranscripcion[i].Id}" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="containerInput">
                                            <div class="rowInputal">
                                                <div class="divduo">
                                                    <div>
                                                        <label class="labelInput"> Código ATC:</label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Código ATC" id="txtATC_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].CodigoATC}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Producto:</label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Nombre producto"
                                                            id="txtNombreProducto_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].NombreProducto}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Solicitados:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Solicitados"
                                                            id="txtSolicitados_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Solicitados}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Entregados:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Entregados"
                                                            id="txtEntregados_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Entregados}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Cantidad a entregar:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="A entregar" id="txtAEntregar_${dataTranscripcion[i].Id}" readonly>
                                                    </div>
                                                </div>

                                                <div class="divduo2">
                                                    <div>
                                                        <label class="labelInput"> Código NUA:</label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Código NUA" id="txtNUA_${dataTranscripcion[i].Id}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Faltantes:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Faltantes"
                                                            id="txtFaltantes_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Faltantes}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Durante:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Durante" id="txtDurante_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Durante}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Genera faltante:</label><br>
                                                        <div id="ddlGeneraFaltante_${dataTranscripcion[i].Id}" class="dropDown"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`

                            $('#accordion').append(html);

                            $(`#ddlGeneraFaltante_${dataTranscripcion[i].Id}`).kendoDropDownList({
                                autoBind: false,
                                dataTextField: "Value",
                                dataValueField: "Id",
                                dataSource: {
                                    data: [{ Value: "Si", Id: "Si" }, { Value: "No", Id: "No" }]
                                },
                                optionLabel: {
                                    Id: undefined,
                                    Value: 'Seleccionar...'
                                },
                                change: function () {
                                    debugger
                                    var selected = $(`#ddlGeneraFaltante_${dataTranscripcion[i].Id}`).data('kendoDropDownList').dataItem();

                                    if (selected.Id == 'Si') {
                                        $(`#txtAEntregar_${dataTranscripcion[i].Id}`).attr("readonly", false);
                                    } else {
                                        $(`#txtAEntregar_${dataTranscripcion[i].Id}`).val('');
                                        $(`#txtAEntregar_${dataTranscripcion[i].Id}`).attr("readonly", true);
                                    }
                                    /*
                                    var id = $(this);
                                    id = id[0].element[0].id
                                    var index = $(`#${id}`).data('kendoDropDownList').select();
                                    var getSelected = $(`#${id}`).data('kendoDropDownList').dataSource.options.data[index]
                                    var index = id.split('_')
                                    index = index[1]
                                    $(`#lote${index}`).val(getSelected.Lote)*/
                                }
                            });

                        }
                    } else {
                        toastr.warning('No se encontraron productos asociados');
                    }

                    $('#modalTranscribir').modal('show');
                });
            }

            $("#gridFaltantes").kendoGrid({
                dataSource: {
                    data: dataFaltante,
                    schema: {
                        model: {
                            fields: {
                                Id: { type: "string", editable: false },
                                DateFechaFormula: { type: "date", editable: false },
                                ConsecutivoFormula: { type: "string", editable: false },
                                ConsecutivoEntrega: { type: "string", editable: false },
                                Tutela: { type: "string", editable: false },
                                Txtnumeroformula: { type: "string", editable: false },
                                Sede: { type: "string", editable: false }
                            }
                        }
                    },
                    pageSize: 5
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
                    refresh: false
                },
                dataBound: function () {
                    for (var i = 0; i < this.columns.length; i++) {
                        this.autoFitColumn(i);
                    }
                },
                columns: [
                    { field: "DateFechaFormula", title: "Fecha", template: "#= kendo.toString(kendo.parseDate(DateFechaFormula, 'yyyy-MM-dd'), 'yyyy/MM/dd') #" },
                    { field: "ConsecutivoFormula", title: "Consecutivo formula" },
                    { field: "ConsecutivoEntrega", title: "Consecutivo entrega" },
                    { field: "Tutela", title: "Tutela" },
                    { field: "Txtnumeroformula", title: "Formula" },
                    { field: "Sede", title: "Sede" },
                    /*{ command: [{ text: "informacion", click: informacion, template: "<a class='k-grid-informacion btn'><i class='fa fa-info'></i> Información</a>" }] },
                    { command: [{ text: "transcribir", click: transcribir, template: "<a class='k-grid-transcribir btn'><i class='fa fa-paste'></i> Transcribir</a>" }] }*/
                ]
            });

            document.getElementById('Pendientes').style.display = "none";
            document.getElementById('Faltantes').style.display = "none";
        } 
        function vacio(valor) {
            if (valor == undefined || valor == null || valor == "") {
                return true;
            }
            return false;
        }
    }, 1500)
}
