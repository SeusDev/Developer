
/*validacion de derechos*/
debugger;
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == 'f05050af-cbb2-4945-ab27-b33f201f6fe3') {
    formulacionMedicamentos();
}

else if (idVista == 'b3e85bff-989c-43b1-ae88-0ccbf473404e') {
    validacionDerechos();
}

else if (idVista == 'ee785d95-023f-4016-8de4-d2f5cf1d36d2') {
    transcripcionFormulas();
}

else if (idVista == 'aeac4d53-18fe-4153-a69b-2c70a82a43a9') {
    devolucion();
}

function devolucion() {
    // peguelo peguelo pim pum pam bin....
    $('.panel-default').click(function () {
        $(this).find('#form').toggle();
        alert("holaa");
    });
}

function formulacionMedicamentos() {
    if (e.isNew) {
        var caja = JSON.parse(sessionStorage.LappizUser).CajasFk
        if (caja != undefined || caja != null || caja != "") {
            setFieldValue("5c20c2d6-85c9-45a9-a64c-102b7ae35773", caja);
        }
    }
}

function validacionDerechos() {
    setTimeout(() => {
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
            // let afiliado = {
            //     "tipoDocumento": `${tipoDocumento}`,
            //     "numeroDocumento": `${numeroDocumento}`,
            //     "fechaNacimiento": "",
            //     "primerNombre": "",
            //     "segundoNombre": "",
            //     "primerApellido": "",
            //     "segundoApellido": ""
            // }

            // let afiliadoData = JSON.stringify(afiliado);

            // let consutoken = "";

            // let datasavia = "";

            
            // execSP('CallRestAPI').then(success => {
            //     debugger;
            //     consutoken = JSON.parse(success.data[0][0].content).access_token;

            //     var parajson = null;

            //     execSP('CallRestAPIAfiliados', ["'" + parajson + "'", "'" + consutoken + "'", "'" + afiliadoData + "'"]).then(success => {
            //         debugger;


            //         if (success.data[0][0].content === 'Sin respuesta 2 - MENSAJE: ERROR. MENSAJE: null') {
            //             toastr.warning('El servicio de Savia no se encuentra disponible')
            //             return
            //         } else {
            //             datasavia = JSON.parse(success.data[0][0].content);
            //             if (datasavia.afiliados != null) {

            //                 var stringQuery = `select * from Cohan_Lappiz_Afiliados
            //                     where NumeroIdentificacion = '${numeroDocumento}'`;

            //                 execQuery(stringQuery).then(success => {
            //                     debugger;
            //                     var afildata = success.data[0];
            //                     var ubicacion = ` declare @pais uniqueidentifier,declare @departamento uniqueidentifier,declare @ciudad uniqueidentifier 
            //                         set @pais=(select PaisFk from Cohan_Lappiz_Departamento where CodigoDepartamento = '${datasavia.afiliados[0].codDepartamentoResidencia}')
            //                         set @departamento=(select Id from Cohan_Lappiz_Departamento where CodigoDepartamento = '${datasavia.afiliados[0].codDepartamentoResidencia}')
            //                         set @ciudad=(select Id from Cohan_Lappiz_Ciudad where CodigoCiudad='${datasavia.afiliados[0].codCiudadResidencia}' DepartamentoFk = @departamento )
                                    
            //                         `;

            //                     if (afildata.length > 0) {
            //                         var nombre1 = datasavia.afiliados[0].primerNombreAfiliado;
            //                         var nombre2 = datasavia.afiliados[0].segundoNombreAfiliado;
            //                         var apellido1 = datasavia.afiliados[0].primerApellidoAfiliado;
            //                         var apellido2 = datasavia.afiliados[0].segundoApellidoAfiliado;
            //                         var nombrecom = nombre1 + ' ' + nombre2 + ' ' + apellido1 + ' ' + apellido2;

            //                         var afilQuery = ` update  Cohan_Lappiz_Afiliados set FechaModificacion= GETDATE(), UsaurioModificacion='${usuario.Id}',Estado='${datasavia.afiliados[0].estadoAfiliacion}',NombreAfiliado= '${nombrecom}',PrimerNombre='${nombre1}',
            //                                                 SegundoNombre='${nombre2}',PrimerApellido='${apellido1}',SegundoApellido='${apellido2}',Sexo='${datasavia.afiliados[0].sexoAfiliado}',Direccion='${datasavia.afiliados[0].direccion}',
            //                                                 Telefono='${datasavia.afiliados[0].telefono}',NivelAfiliado='${datasavia.afiliados[0].nivelSisben}',FechaNacimiento='${datasavia.afiliados[0].fechaNacimientoAfiliado}',CiudadFk = @ciudad,PaisFk=@pais,DepartamentoFk=@departamento,
            //                                                 TipoDocumentoFK='${$('#ddlTipoDocumento').data('kendoDropDownList').dataItem().Id}',Regimen='${datasavia.afiliados[0].regimen}'
            //                                                 where Id = '${afildata[0].Id}'`;

            //                         afilQuery = ubicacion + afilQuery;
            //                         execQuery(afilQuery).then(success => {
            //                             debugger;
            //                             toastr.success('Afiliado actualizado correctamente')
            //                             console.log(success.data[0])
            //                         });

            //                     } else {
            //                         var inserafilQuery = ` insert into  Cohan_Lappiz_Afiliados values(NEWID(),null,GETDATE(),null,null,'${usuario.Id}',${datasavia.afiliados[0].estadoAfiliacion}','${nombrecom}','${nombre1}','${nombre2}',
            //                             '${apellido1}','${apellido2}','${datasavia.afiliados[0].sexoAfiliado}','${datasavia.afiliados[0].direccion}','${datasavia.afiliados[0].telefono}',null,null,'${datasavia.afiliados[0].nivelSisben}',
            //                             '${datasavia.afiliados[0].fechaNacimientoAfiliado}',null,@ciudad,@pais,@departamento,'${$('#ddlTipoDocumento').data('kendoDropDownList').dataItem().Id}',
            //                             '${datasavia.afiliados[0].documentoAfiliado}',null,'${usuario.Usuarios}',null,'${datasavia.afiliados[0].regimen}',null,null,null,null,null,null)`

            //                         execQuery(inserafilQuery).then(success => {
            //                             debugger;
            //                             console.log(success.data[0]);
            //                             toastr.success('Afiliado creado correctamente')
            //                         });

            //                     }
            //                 });
            //             } else {
            //                 toastr.warning(datasavia.mensaje);

            //             }

            //         }

            //     });
            // });

            execSP('Cohan_Lappiz_ConsultInfoValidacionDerechos', ["'" + tipoDocumento + "'", "'" + numeroDocumento + "'"]).then(success => {
                debugger;
                var dataAfiliado = success.data[0];

                if (dataAfiliado.length > 0) {
                    $('#txtidAfiliado').val(dataAfiliado[0].idAfiliado)
                    $('#txtEstado').val(dataAfiliado[0].Estado);
                    $('#txtNumeroDocumento2').val(dataAfiliado[0].NumeroIdentificacion)
                    $('#txtNombreCompleto').val(dataAfiliado[0].NombreAfiliado)
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
                                            </div>
                                            <div id="Novedades" class="tabcontent">
                                                <div>
                                                    <div id="gridNovedades"></div>
                                                </div>
                                            </div>`);

                    var dataDespacho = dataAfiliado.filter(function (e) {
                        return e.Tab == 1;
                    });
                    var dataPendiente = dataAfiliado.filter(function (e) {
                        return e.Tab == 2;
                    });
                    var dataFaltante = dataAfiliado.filter(function (e) {
                        return e.Tab == 3;
                    });
                    var dataNovedades = dataAfiliado.filter(function (e) {
                        return e.Tab == 4;
                    });

                    cargarGrids(dataDespacho, dataPendiente, dataFaltante, dataNovedades);
                } else {
                    toastr.warning('No se econtró información relacionada a este afiliado');
                }
            });

        });

        //Hasta aquí
        /*----------------------------------Sección 2-----------------------------------------------------------*/

        /* Generar novedad*/
        $('#btnNovedad').click(function () {
            debugger;
            let idAfiliado = $('#txtidAfiliado').val()

            if (!vacio(idAfiliado)) {
                $(`#modalNovedad`).modal('show');

                $("#ddlMotivoNovedad").kendoDropDownList({
                    dataTextField: "Val",
                    dataValueField: "Val",
                    dataSource: [{ "Val": "Formula vencida" }, { "Val": "No cumple 780" }, { "Val": "No tiene direccionamiento" }, { "Val": "No tiene autorización" }],
                    filter: "contains"
                });

                let idAfiliado = $('#txtidAfiliado').val()
                let nombreAfiliado = $('#txtNombreCompleto').val()
                let documentoAfiliado = $('#txtNumeroDocumento2').val()

                $('#txtidAfiliadoN').val(idAfiliado)
                $('#txtDocumentoAfiliado').val(documentoAfiliado)
                $('#txtNombreAfiliado').val(nombreAfiliado)

            } else {
                toastr.warning('Debes buscar el afiliado primero.')
            }
        });

        $(`#btnGuardarNovedad`).click(function () {
            debugger;
            let idAfiliadoFK = $('#txtidAfiliadoN').val()
            let fechaFormula = $('#dateFormula').val()
            let numeroFormula = $('#txtNumeroFormula').val()
            let motivo = $('#ddlMotivoNovedad').data("kendoDropDownList").value()
            fechaFormula = fechaFormula + " 00:00:00.000"

            if (!(vacio(idAfiliadoFK) || vacio(fechaFormula) || vacio(numeroFormula) || vacio(motivo))) {
                let Query = `insert into Cohan_Lappiz_Novedades (FechaFormula,NumeroFormula,Motivo,AfiliadoFK) values('${fechaFormula}','${numeroFormula}','${motivo}','${idAfiliadoFK}')`
                execQuery(Query);
                $(`#modalNovedad`).modal('hide');
                $('#txtidAfiliadoN').val('')
                $('#txtDocumentoAfiliado').val('')
                $('#txtNombreAfiliado').val('')
                setTimeout(() => {
                    debugger;
                    $('#btnBuscar').click();
                }, 1000);
            } else {
                toastr.warning('Debes ingresar todos los campos.');
            }
        });

        /*_----------------------------------Sección 3--------------------------------------------------*/
        cargarGrids(null, null, null, null);

        function cargarGrids(dataDespachos, dataPendiende, dataFaltante, dataNovedades) {
            if (vacio(dataDespachos)) {
                dataDespachos = []
            }

            if (vacio(dataPendiende)) {
                dataPendiende = []
            }

            if (vacio(dataFaltante)) {
                dataFaltante = []
            }

            if (vacio(dataNovedades)) {
                dataNovedades = []
            } else {
                for (let i = 0; i < dataNovedades.length; i++) {
                    let formatFecha = dataNovedades[i].FechaFormula.split('T')
                    formatFecha = formatFecha[0]

                    dataNovedades[i].FechaFormula = formatFecha;
                }
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
                    { field: "ConsecutivoFormula", title: "Consecutivo entrega" },
                    { field: "Tutela", title: "Tutela" },
                    { field: "Txtnumeroformula", title: "Formula" },
                    { field: "Sede", title: "Sede" },
                    { command: [{ text: "informacionD", click: informacionD, template: "<a class='k-grid-informacionD btn'><i class='fa fa-info'></i> Información</a>" }] },
                    { command: [{ text: "biometria", click: biometria, template: "<a class='k-grid-biometria btn'><i class='fa fa-heartbeat'></i> Biometría</a>" }] }
                ]
            });

            function informacionD(e) {
                debugger;

                var grid = $("#gridDespachos").data("kendoGrid");
                var row = grid.dataItem($(e.target).closest("tr"));

                execSP('Cohan_Lappiz_ConsultModalValidacionDerechos', ["'" + row.Id + "'", "'" + 'despacho' + "'"]).then(success => {
                    var dataInformacion = success.data[0];

                    if (dataInformacion.length > 0) {
                        $("#gridInformacionF").kendoGrid({
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
                                { field: "CodigoNUA", title: "Código NUA" },
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

                    $('#modalInformacionF').modal('show');
                });
            }

            function biometria() {
                console.log('Toma lo tuyo felipe')
            }

            $("#gridPendientes").kendoGrid({
                dataSource: {
                    data: dataPendiende,
                    schema: {
                        model: {
                            fields: {
                                Id: { type: "string", editable: false },
                                DateFechaFormula: { type: "date", editable: false },
                                ConsecutivoFormula: { type: "string", editable: false },
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
                    { field: "ConsecutivoFormula", title: "Consecutivo entrega" },
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

                execSP('Cohan_Lappiz_ConsultModalValidacionDerechos', ["'" + row.Id + "'", "'" + 'pendiente' + "'"]).then(success => {
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
                sessionStorage.transcripcionActual = row.Id

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

                execSP('Cohan_Lappiz_ConsultModalValidacionDerechos', ["'" + row.Id + "'", "'" + 'pendiente' + "'"]).then(success => {
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
                                                        <input type="text" class="input-basic input-expand" placeholder="Código ATC" id="txtATC_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].CodigoATC}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Producto:</label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Nombre producto"
                                                            id="txtNombreProducto_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].NombreProducto}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Solicitados:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Solicitados"
                                                            id="txtSolicitados_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Solicitados}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Entregados:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Entregados"
                                                            id="txtEntregados_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Entregados}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Cantidad a entregar:<span class="requiredClass"> *</span></label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="A entregar" id="txtAEntregar_${dataTranscripcion[i].Id}" readonly value="${dataTranscripcion[i].aEntregar}">
                                                    </div>
                                                </div>

                                                <div class="divduo2">
                                                    <div>
                                                        <label class="labelInput"> Código NUA:<span class="requiredClass"> *</span> </label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Código NUA" id="txtNUA_${dataTranscripcion[i].Id}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Faltantes:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Faltantes"
                                                            id="txtFaltantes_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Faltantes}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Durante:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Durante" id="txtDurante_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Durante}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Genera faltante:<span class="requiredClass"> *</span> </label><br>
                                                        <div id="ddlGeneraFaltante_${dataTranscripcion[i].Id}" class="dropDown"></div>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Motivo faltante:<span class="requiredClass"> *</span> </label><br>
                                                        <div id="ddlMotivoFaltante_${dataTranscripcion[i].Id}" class="dropDown"></div>
                                                    </div>
                                                    <div style="display:none;">
                                                        <label class="labelInput"> Faltante:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Faltante" id="txtFaltanteEnPendiente_${dataTranscripcion[i].Id}" value= 0 readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`

                            $('#accordion').append(html);

                            $(`#ddlMotivoFaltante_${dataTranscripcion[i].Id}`).kendoDropDownList({
                                autoBind: false,
                                dataTextField: "Value",
                                dataValueField: "Id",
                                dataSource: {
                                    data: [{ Value: "Sin existencias en el CEDI", Id: "Sin existencias en el CEDI" }, { Value: "Medicamentos son impacto", Id: "Medicamentos son impacto" }, { Value: "Medicamentos agotados", Id: "Medicamentos agotados" }]
                                },
                                optionLabel: {
                                    Value: "Seleccione...",
                                    Id: null
                                },
                                value: null
                            });

                            var motivoFaltante = $(`#ddlMotivoFaltante_${dataTranscripcion[i].Id}`);
                            motivoFaltante[0].parentElement.parentElement.hidden = true

                            $(`#ddlGeneraFaltante_${dataTranscripcion[i].Id}`).kendoDropDownList({
                                autoBind: false,
                                dataTextField: "Value",
                                dataValueField: "Id",
                                dataSource: {
                                    data: [{ Value: "No", Id: "No" }, { Value: "Si", Id: "Si" }]
                                },
                                value: "No",
                                change: function () {
                                    debugger
                                    var selected = $(`#ddlGeneraFaltante_${dataTranscripcion[i].Id}`).data('kendoDropDownList').dataItem();
                                    var motivoFaltante = $(`#ddlMotivoFaltante_${dataTranscripcion[i].Id}`);

                                    if (selected.Id == 'Si') {
                                        $(`#txtAEntregar_${dataTranscripcion[i].Id}`).attr("readonly", false);
                                        motivoFaltante[0].parentElement.parentElement.hidden = false
                                    } else {
                                        $(`#txtAEntregar_${dataTranscripcion[i].Id}`).val(dataTranscripcion[i].aEntregar);
                                        $(`#txtAEntregar_${dataTranscripcion[i].Id}`).attr("readonly", true);
                                        motivoFaltante[0].parentElement.parentElement.hidden = true
                                    }
                                }
                            });

                            $(`#txtAEntregar_${dataTranscripcion[i].Id}`).change(function (e) {
                                debugger
                                var aEntregar = e.target.valueAsNumber;
                                var aEntregarDefault = dataTranscripcion[i].aEntregar;

                                if (aEntregar > aEntregarDefault) {
                                    toastr.warning(`La cantidad a entregar debe ser menor o igual a ${aEntregarDefault}`);
                                    $(`#txtAEntregar_${dataTranscripcion[i].Id}`).val(aEntregarDefault);
                                }
                                else if (aEntregar <= 0) {
                                    toastr.warning('La cantidad a entregar debe ser mayor a cero');
                                    $(`#txtAEntregar_${dataTranscripcion[i].Id}`).val(aEntregarDefault);
                                } else {
                                    $(`#txtFaltanteEnPendiente_${dataTranscripcion[i].Id}`).val(aEntregarDefault - aEntregar)
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
                    { field: "ConsecutivoFormula", title: "Consecutivo entrega" },
                    { field: "Tutela", title: "Tutela" },
                    { field: "Txtnumeroformula", title: "Formula" },
                    { field: "Sede", title: "Sede" },
                    { command: [{ text: "informacionF", click: informacionF, template: "<a class='k-grid-informacionF btn'><i class='fa fa-info'></i> Información</a>" }] },
                    { command: [{ text: "transcribirF", click: transcribirF, template: "<a class='k-grid-transcribirF btn'><i class='fa fa-paste'></i> Transcribir</a>" }] }
                ]
            });

            function informacionF(e) {
                debugger;

                var grid = $("#gridFaltantes").data("kendoGrid");
                var row = grid.dataItem($(e.target).closest("tr"));

                execSP('Cohan_Lappiz_ConsultModalValidacionDerechos', ["'" + row.Id + "'", "'" + 'faltante' + "'"]).then(success => {
                    var dataInformacion = success.data[0];

                    if (dataInformacion.length > 0) {
                        $("#gridInformacionF").kendoGrid({
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
                                            Faltantes: { type: "number", editable: false },
                                            MotivoFaltante: { type: "string", editable: false }
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
                                { field: "CodigoNUA", title: "Código NUA" },
                                { field: "NombreProducto", title: "Producto" },
                                { field: "Durante", title: "Durante" },
                                { field: "Solicitados", title: "Formula" },
                                { field: "Entregados", title: "Entregados" },
                                { field: "Pendientes", title: "Pendientes" },
                                { field: "Faltantes", title: "Faltantes" },
                                { field: "MotivoFaltante", title: "Motivo" }
                            ]
                        });
                    } else {
                        toastr.warning("No se encontraron registros");
                    }

                    $('#modalInformacionF').modal('show');
                });
            }

            function transcribirF(e) {
                debugger;
                var grid = $("#gridFaltantes").data("kendoGrid");
                var row = grid.dataItem($(e.target).closest("tr"));
                $('#accordionF').empty()

                $('#ddlEntregoDocF').kendoDropDownList({
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

                var entregaDoc = $('#ddlEntregoDocF');
                entregaDoc[0].parentElement.parentElement.hidden = true

                $('#ddlMotivoF').kendoDropDownList({
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
                        var selected = $('#ddlMotivoF').data('kendoDropDownList').dataItem();
                        var entregaDoc = $('#ddlEntregoDocF');

                        if (selected.Id == 'No cuenta con solvencia económica') {
                            entregaDoc[0].parentElement.parentElement.hidden = false
                        } else {
                            entregaDoc[0].parentElement.parentElement.hidden = true
                        }
                    }
                });

                $('#ddlGeneraCobroF').kendoDropDownList({
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
                        var selected = $('#ddlGeneraCobroF').data('kendoDropDownList').dataItem();
                        var motivo = $('#ddlMotivoF');
                        var entregaDoc = $('#ddlEntregoDocF');

                        if (selected.Id == 'Si') {
                            motivo[0].parentElement.parentElement.hidden = true
                            entregaDoc[0].parentElement.parentElement.hidden = true
                        } else {
                            var selectedMotivo = $('#ddlMotivoF').data('kendoDropDownList').dataItem();

                            if (selectedMotivo.Id == 'No cuenta con solvencia económica') {
                                entregaDoc[0].parentElement.parentElement.hidden = false
                            } else {
                                entregaDoc[0].parentElement.parentElement.hidden = true
                            }
                            motivo[0].parentElement.parentElement.hidden = false
                        }
                    }
                });

                execSP('Cohan_Lappiz_ConsultModalValidacionDerechos', ["'" + row.Id + "'", "'" + 'faltante' + "'"]).then(success => {
                    debugger
                    var dataTranscripcion = success.data[0];

                    if (dataTranscripcion.length > 0) {
                        for (let i = 0; i < dataTranscripcion.length; i++) {
                            var html =
                                `<div class="card">
                                <div class="card-header" id="headingF_${dataTranscripcion[i].Id}">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseF_${dataTranscripcion[i].Id}" aria-expanded="true"
                                            aria-controls="collapseF_${dataTranscripcion[i].Id}" style="width: 100%; text-align: left;">
                                            ${dataTranscripcion[i].NombreProducto}
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseF_${dataTranscripcion[i].Id}" class="collapse" aria-labelledby="headingF_${dataTranscripcion[i].Id}" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="containerInput">
                                            <div class="rowInputal">
                                                <div class="divduo">
                                                    <div>
                                                        <label class="labelInput"> Código ATC:</label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Código ATC" id="txtATCF_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].CodigoATC}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Producto:</label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Nombre producto"
                                                            id="txtNombreProductoF_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].NombreProducto}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Solicitados:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Solicitados"
                                                            id="txtSolicitadosF_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Solicitados}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Entregados:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Entregados"
                                                            id="txtEntregadosF_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Entregados}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Motivo faltante:</label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Motivo faltante"
                                                            id="txt_motivoFaltante${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].MotivoFaltante}" readonly>
                                                    </div>
                                                    
                                                </div>

                                                <div class="divduo2">
                                                    <div>
                                                        <label class="labelInput"> Código NUA:</label><br>
                                                        <input type="text" class="input-basic input-expand" placeholder="Código NUA" id="txtNUAF_${dataTranscripcion[i].Id}">
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Faltantes:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Faltantes"
                                                            id="txtFaltantesF_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Faltantes}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Durante:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="Durante" id="txtDuranteF_${dataTranscripcion[i].Id}" value="${dataTranscripcion[i].Durante}" readonly>
                                                    </div>
                                                    <div>
                                                        <label class="labelInput"> Cantidad a entregar:</label><br>
                                                        <input type="number" class="input-basic input-expand" placeholder="A entregar" id="txtAEntregarF_${dataTranscripcion[i].Id}" readonly value="${dataTranscripcion[i].aEntregar}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`

                            $('#accordionF').append(html);

                            $(`#txtAEntregarF_${dataTranscripcion[i].Id}`).change(function (e) {
                                debugger
                                var aEntregar = e.target.valueAsNumber;
                                var aEntregarDefault = dataTranscripcion[i].aEntregar;

                                if (aEntregar > aEntregarDefault) {
                                    toastr.warning(`La cantidad a entregar debe ser menor o igual a ${aEntregarDefault}`);
                                    $(`#txtAEntregarF_${dataTranscripcion[i].Id}`).val(aEntregarDefault);
                                }
                                else if (aEntregar <= 0) {
                                    toastr.warning('La cantidad a entregar debe ser mayor a cero');
                                    $(`#txtAEntregarF_${dataTranscripcion[i].Id}`).val(aEntregarDefault);
                                }
                            });

                        }
                    } else {
                        toastr.warning('No se encontraron productos asociados');
                    }

                    sessionStorage.transcripcionActual = row.Id;
                    $('#modalTranscribirF').modal('show');
                });
            }

            $("#gridNovedades").kendoGrid({
                dataSource: {
                    data: dataNovedades,
                    schema: {
                        model: {
                            fields: {
                                Id: { type: "string", editable: false },
                                NumeroFormula: { type: "string", editable: false },
                                Motivo: { type: "string", editable: false },
                                FechaFormula: { type: "date", editable: false }
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
                    { field: "NumeroFormula", title: "Número fórmula" },
                    { field: "Motivo", title: "Motivo" },
                    { field: "FechaFormula", title: "Fecha", format: "{0:yyyy/MM/dd}" }
                ]
            });

            showFirstTab();
        }

        function showFirstTab() {

            //Pone en negro el primer tab y desactiva el resto
            let tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }

            tablinks[0].className += " active";

            //Muestra el contenido del primer tab y oculta el resto.
            let tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            tabcontent[0].style.display = "block";
        }

        $('#btnConfirmarMT').click(function () {
            debugger;
            var faltantes = $("#gridFaltantes").data("kendoGrid");

            if (faltantes.dataSource._data.length == 0) {
                debugger;

                var accordion = document.getElementById('accordion');

                if (accordion.childElementCount > 0) {
                    var Query = `declare @newTranscripcion UNIQUEIDENTIFIER
                    declare @idProducto UNIQUEIDENTIFIER
                    set @newTranscripcion = NEWID()
                    insert INTO Cohan_Lappiz_Transcripcionformulas (Id,DateFechaFormula,
                    NumeroFormula,Txttipodeatencion,DateFechacreacion,Txtusuario,AfiliadoFk,
                    IPSFk,MedicoFk,CIEFk,PagadorFk,Valor,EntregDocumento,Motivo,GenerarCobro,
                    AplicaHemofilia,Servicio,Ingreso,Peso,DefinirFormula,Prioridad,
                    Tipo,PuntoDeVentaFk,TranscripcionFk)(
                    select @newTranscripcion, DateFechaFormula,NumeroFormula, Txttipodeatencion, getDate(),
                    '${sessionStorage.userId}', AfiliadoFk,
                    IPSFk, MedicoFk, CIEFk, PagadorFk, Valor, EntregDocumento, Motivo, GenerarCobro, AplicaHemofilia,
                    Servicio, Ingreso, Peso, DefinirFormula, Prioridad, Tipo, PuntoDeVentaFk,'${sessionStorage.transcripcionActual}'
                    from Cohan_Lappiz_Transcripcionformulas where Id = '${sessionStorage.transcripcionActual}')`

                    var nuaVacios = 0

                    for (let i = 0; i < accordion.childElementCount; i++) {
                        var headingId = accordion.children[i].children[0].id
                        var idDetalleTrans = headingId.split('_');
                        idDetalleTrans = idDetalleTrans[1];

                        if (vacio($(`#txtNUA_${idDetalleTrans}`).val())) {
                            nuaVacios++;
                        } else {
                            var generaFaltante = $(`#ddlGeneraFaltante_${idDetalleTrans}`).val()
                            var motivoFaltante = $(`#ddlMotivoFaltante_${idDetalleTrans}`).val()

                            if(generaFaltante == 'Si'){
                                if(vacio(motivoFaltante)){
                                    nuaVacios++;
                                }
                            }

                            var solicitada = $(`#txtSolicitados_${idDetalleTrans}`).val()
                            var durante = $(`#txtDurante_${idDetalleTrans}`).val()
                            var aEntregar = $(`#txtAEntregar_${idDetalleTrans}`).val()
                            var nua = $(`#txtNUA_${idDetalleTrans}`).val()
                            var faltanteEnPendiente = $(`#txtFaltanteEnPendiente_${idDetalleTrans}`).val()

                            Query += `update Cohan_Lappiz_DetalleTranscripcionFormulas set PendienteCalculado = PendienteCalculado - ${parseInt(aEntregar) + parseInt(faltanteEnPendiente)} where Id = '${idDetalleTrans}'
                            select @idProducto = TripleAFK from Cohan_Lappiz_DetalleTranscripcionFormulas where Id= '${idDetalleTrans}'
                            insert INTO Cohan_Lappiz_DetalleTranscripcionFormulas (UsuarioCreacion,FechaCreacion,TripleAFK,Cantidad,Durante,TranscripcionFK,Pendientes,Faltantes,FaltanteCalculado,CantidadEntregada,CodigoNUA,MotivoFaltante,Tipo)
                            values('${sessionStorage.userId}',GETDATE(),@idProducto,'${solicitada}','${durante}',@newTranscripcion,0,${faltanteEnPendiente},${faltanteEnPendiente},'${aEntregar}','${nua}','${motivoFaltante}','Pendiente');`
                        }

                    }

                    if (nuaVacios == 0) {

                        execQuery(Query).then(success => {
                            debugger;
                            $('#modalTranscribir').modal('hide');
                            setTimeout(() => {
                                debugger;
                                $('#btnBuscar').click();
                                delete sessionStorage.transcripcionActual
                            }, 1000);
                        });
                    } else {
                        toastr.warning('Debes ingresar todos los campos obligatorios.');
                    }
                }
            } else {
                toastr.warning('Debes terminar la sección de faltantes primero.');
                $('#modalTranscribir').modal('hide');
            }

        })

        $('#btnConfirmarMTF').click(function () {
            debugger;

            var accordion = document.getElementById('accordionF');

            if (accordion.childElementCount > 0) {
                var Query = `declare @newTranscripcion UNIQUEIDENTIFIER
                declare @idProducto UNIQUEIDENTIFIER
                set @newTranscripcion = NEWID()
                insert INTO Cohan_Lappiz_Transcripcionformulas (Id,DateFechaFormula,NumeroFormula,
                Txttipodeatencion,DateFechacreacion,Txtusuario,AfiliadoFk,IPSFk,MedicoFk,
                CIEFk,PagadorFk,Valor,EntregDocumento,Motivo,GenerarCobro,AplicaHemofilia,
                Servicio,Ingreso,Peso,DefinirFormula,Prioridad,Tipo,PuntoDeVentaFk,TranscripcionFk)
                (select @newTranscripcion, DateFechaFormula, NumeroFormula, Txttipodeatencion, getDate(), '${sessionStorage.userId}', 
                AfiliadoFk, IPSFk, MedicoFk,
                CIEFk, PagadorFk, Valor, EntregDocumento, Motivo, GenerarCobro, AplicaHemofilia, 
                Servicio, Ingreso, Peso, DefinirFormula, Prioridad, Tipo,PuntoDeVentaFk,'${sessionStorage.transcripcionActual}'
                from Cohan_Lappiz_Transcripcionformulas where Id = '${sessionStorage.transcripcionActual}')`

                var nuaVacios = 0

                for (let i = 0; i < accordion.childElementCount; i++) {
                    var headingId = accordion.children[i].children[0].id
                    var idDetalleTrans = headingId.split('_');
                    idDetalleTrans = idDetalleTrans[1];

                    if (vacio($(`#txtNUAF_${idDetalleTrans}`).val())) {
                        nuaVacios++;
                    } else {

                        var solicitada = $(`#txtSolicitadosF_${idDetalleTrans}`).val()
                        var durante = $(`#txtDuranteF_${idDetalleTrans}`).val()
                        var aEntregar = $(`#txtAEntregarF_${idDetalleTrans}`).val()
                        var nua = $(`#txtNUAF_${idDetalleTrans}`).val()

                        Query += `update Cohan_Lappiz_DetalleTranscripcionFormulas set FaltanteCalculado = FaltanteCalculado - ${aEntregar} where Id = '${idDetalleTrans}'
                        select @idProducto = TripleAFK from Cohan_Lappiz_DetalleTranscripcionFormulas where Id= '${idDetalleTrans}'
                        insert INTO Cohan_Lappiz_DetalleTranscripcionFormulas (UsuarioCreacion,FechaCreacion,TripleAFK,Cantidad,Durante,TranscripcionFK,Pendientes,Faltantes,CantidadEntregada,CodigoNUA,Tipo)
                        values('${sessionStorage.userId}',GETDATE(),@idProducto,'${solicitada}','${durante}',@newTranscripcion,0,0,'${aEntregar}','${nua}','Faltante')`
                    }
                }

                if (nuaVacios == 0) {
                    execQuery(Query).then(success => {
                        debugger
                        $('#modalTranscribirF').modal('hide');
                        setTimeout(() => {
                            debugger;
                            $('#btnBuscar').click();
                            delete sessionStorage.transcripcionActual
                        }, 1500);
                    });
                } else {
                    toastr.warning('Todos los códigos NUA deben ser diligenciados');
                }
            }
        })

    }, 1000);

}

function transcripcionFormulas() {
    if (e.isNew) {
        debugger;
        setTimeout(() => {
            //setear información a la grid desde otro formulario
            var Afiliado2 = sessionStorage.IdAfiliado1;
            //var Afiliado3 = sessionStorage.Afiliadotext;

            if (!vacio(sessionStorage.IdAfiliado1)) {
                setFieldValue('98bdefae-a9f7-4102-ab68-a936972af93e', Afiliado2)
                delete sessionStorage.IdAfiliado1

                //Setea la información en los campos bloqueados
                setTimeout(() => {
                    var NumIdAfiliado = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().NumeroIdentificacion
                    $('#28147147-9b1d-4d59-bc1e-72bd45b25aee').val(NumIdAfiliado)
                    var SexAfiliado = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().Sexo
                    $('#832f8c09-a910-424b-845c-babb4002f27a').val(SexAfiliado)
                    var direAfi = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().Direccion
                    $('#d99ad380-1118-4270-9548-760e4185fbb1').val(direAfi)
                    var celAfi = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().Celular
                    $('#968e6e33-1359-4041-a26e-6f46f34b1ec5').val(celAfi)
                    var emailAfi = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().Email
                    $('#45f5605d-317d-4ba5-ab2d-4bdef7cde303').val(emailAfi)
                    var telAfi = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().Telefono
                    $('#48a9eaf4-cc03-48f2-a53c-6ce02741d9bd').val(telAfi)
                    var edadAfi = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().Edad
                    $('#40e00ae2-c475-4fed-a51a-c20b8c433b16').val(edadAfi)
                    var CodEmpAfi = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().CodigoEmpresa
                    $('#c7d735d9-4556-40e1-8113-c031a6e6c952').val(CodEmpAfi)
                    /*var aseguradora = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().AseguradorasFk
                 $('#c680445e-0693-4e2c-91b4-1db21d4b2f52').data('kendoDropDownList').val(aseguradora)*/
                    debugger;
                    var nivel = $('#98bdefae-a9f7-4102-ab68-a936972af93e').data('kendoDropDownList').dataItem().NivelAfiliado

                    var stringQuery = `select Id,Nivel,ValorPorcentaje 
                                        from Cohan_Lappiz_Copagos`;

                    execQuery(stringQuery).then(response => {
                        debugger;
                        var valor = response.data[0][0].ValorPorcentaje;
                        if (nivel == response.data[0][0].Nivel) {

                            setFieldValue("930d5372-cfac-4680-9567-f250c8187c7e", valor);
                        }

                    });
                    debugger;
                    var info2 = JSON.parse(sessionStorage.infoProductos);
                    info2.forEach(element => {
                        $('#6d66a8eb-c3bb-498d-be76-cd67c90cf0d7').data('kendoGrid').dataSource._data.push(element);//887ce4be-2116-450d-bf5c-383f4bc60af8'4042b27f-5def-4c1e-8d89-25ee381b6b32''
                    });
                }, 1000);
            }
        }, 2000);
    }
}

function vacio(valor) {
    if (valor == undefined || valor == null || valor == "") {
        return true;
    }
    return false;
}