
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista === '39700239-06e9-4b27-9128-da985d8db989') {
    debugger
    setTimeout(function () {
        let queryTdoc = `select Id, TipoDocumento from Cohan_Lappiz_TipoDocumento`

        execQuery(queryTdoc).then(success => {

            let TdocData = success.data[0]

            $("#ddltipodoc").kendoDropDownList({
                dataTextField: "TipoDocumento",
                dataValueField: "Id",
                dataSource: TdocData,
                optionLabel: "Seleccionar Tipo Documento..",
                change: function () {
                    debugger
                    var TipoDoc = $(`#ddltipodoc`).val();
                    var consultaNombre = `select Id, NombreAfiliado, NumeroIdentificacion from Cohan_Lappiz_Afiliados where TipoDocumentoFK = '${TipoDoc}'`
                    execQuery(consultaNombre).then(success1 => {
                        let dataAfiliado = success1.data[0];
                        $("#i_nombre").kendoDropDownList({
                            dataTextField: "NombreAfiliado",
                            dataValueField: "Id",
                            dataSource: dataAfiliado,
                            template: `<span class="k-state-default" style="width:50% !important ; font-size: x-small;"> <p>#: NombreAfiliado #</p> </span> <span class="k-state-default" style="width:50% !important ; font-size: x-small;"> <p>#: NumeroIdentificacion #</p> </span>`,
                            headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px "> <span class="k-widget k-header" style="width:50% ; font-size: x-small">Nombre Afiliado</span> <span class="k-widget k-header" style="width:50% ; font-size: x-small">Número de Identificación</span> </div>`,
                            valueTemplate: `<span> <p>#: NombreAfiliado #</p> </span><span class="selected-value"> <p>#: NumeroIdentificacion #</p> </span>`,
                            optionLabel: {
                                NombreAfiliado: "Seleccione un registro...",
                                Id: "",
                                NumeroIdentificacion: ""
                            },
                            filter: "startswith",
                            filtering: function (ev) {
                                delete sessionStorage.dataGrid
                                var filterValue = ev.filter != undefined ? ev.filter.value : "";
                                ev.preventDefault();

                                this.dataSource.filter({
                                    logic: "or",
                                    filters: [{
                                        field: "NombreAfiliado",
                                        operator: "startswith",
                                        value: filterValue
                                    },
                                    {
                                        field: "NumeroIdentificacion",
                                        operator: "startswith",
                                        value: filterValue
                                    }
                                    ]
                                });
                            }
                        });
                    });
                }
            });
        });

        let queryEstado = `select distinct Estado from Cohan_Lappiz_Transcripcionformulas where Estado is not null`

        execQuery(queryEstado).then(success => {
            let dataEstado = success.data[0]

            $("#ddlestado").kendoDropDownList({
                dataTextField: "Estado",
                dataValueField: "Estado",
                dataSource: dataEstado
            });
        });


        $('#btnGenerarReporte').click(function () {
            debugger;
            var TipoDoc = $('#ddltipodoc').val()
            var Num_Doc = $('#i_numerodoc').val()
            var nombre = $('#i_nombre').val()
            var estado = $('#ddlestado').data("kendoDropDownList").value()
            function makeDateNow() {
                function pad(n) {
                    if (n < 10) {
                        return '0' + n;
                    }
                    return n;
                };

                var date = new Date();
                return date.getFullYear() + '-' +
                    pad(date.getMonth() + 1) + '-' +
                    pad(date.getDate());
            };
            var fechaHoy = makeDateNow();

            var fin = $('#dateFechaFinal').val()
            var inicio = $('#dateFechaInicial').val()

            if (inicio == "") {
                toastr.warning("Debe seleccionar una fecha inicio");
                return
            }
            else if (fin == "") {
                toastr.warning("Debe seleccionar una fecha fin");
                return
            }
            else if (fin < inicio) {
                toastr.warning("La fecha fin no puede ser menor a la fecha inicio");
                return
            } else if (fin == fechaHoy) {
                const fechaDeManana = () => {
                    let hoy = new Date();
                    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
                    let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);
                    return manana;
                };
                function manana() {
                    function pad(n) {
                        if (n < 10) {
                            return '0' + n;
                        }
                        return n;
                    };
                    var date = fechaDeManana();
                    return date.getFullYear() + '-' +
                        pad(date.getMonth() + 1) + '-' +
                        pad(date.getDate());
                };
                fin = manana();
                console.log(fin);
            }
            if (inicio && fin && estado && TipoDoc && nombre) {
               

                var query = `select distinct tf.ConsecutivoFormula, tf.DateFechacreacion, tf.UsuarioCreacion from Cohan_Lappiz_DetalleTranscripcionFormulas dtf
                inner join Cohan_Lappiz_Transcripcionformulas tf on tf.id = dtf.TranscripcionFK
                inner join Cohan_Lappiz_Afiliados a on a.id = tf.AfiliadoFk
                inner join Cohan_Lappiz_TipoDocumento td on a.TipoDocumentoFK = td.Id
                where  CONVERT(varchar, tf.DateFechacreacion, 23) between '${inicio}' and '${fin}' and td.id = '${TipoDoc}' and a.Id = '${nombre}' 
                and tf.Estado = '${estado}'`

                    execQuery(query).then(success => {
                        let cliente = success.data[0]

                        $("#grid-producto-recepcion").kendoGrid({
                            toolbar_click: ["excel",{template: kendo.template($("#template").html())}],
                            excel:{
                                fileName: "Datos Grid Solicitudes.xlsx",
                                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                                filterable: true,
                                pageSize: cliente.length,
                                allPages: true
                            },
                                dataSource: {
                                data: cliente,
                                schema: {
                                    model: {
                                        fields: {
                                            ConsecutivoFormula: {
                                                type: "string",
                                                editable: false
                                            },
                                            DateFechacreacion: {
                                                type: "date",
                                                editable: false
                                            },
                                            UsuarioCreacion: {
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
                            columns: [{
                                field: "ConsecutivoFormula",
                                title: "Código Interno"
                            },
                            {
                                field: "DateFechacreacion",
                                title: "Fecha Creación",
                                format: "{0:dd-MM-yyyy}"
                            },
                            {
                                field: "UsuarioCreacion",
                                title: "Usuario"
                            },
                            { command: { text: "descargar", click: descargar, template: "<a class='k-grid-descargar btn'><i class='fa fa-download'></i> Descargar información</a>" } }
                            ],
                            //selectable: true
                        });
                    });
            } else {
                toastr.warning('Debes ingresar todos los campos obligatorios.')
            }
        });

        function descargar(e) {

            e.preventDefault();
            var grid = $("#grid-producto-recepcion").data("kendoGrid");
            var productos = grid.dataItem($(e.target).closest("tr"));  
            var consecutivo = productos.ConsecutivoFormula  
            $("#reporte").empty();
            $("#reporte").html(`<iframe class = "resp-iframe" src = "https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fValidación_de_derechos&rs:Command=Render&ConsecutivoFormula=${consecutivo}&rs:embed=true" gesture = "media" allow = "encrypted-media" allowfullscreen ></iframe>`)
              
            $("#modalInformacion").modal("show");

        }
        $('.btnPDF').click(toolbar_click());
        function toolbar_click() {
            debugger;
               var fechaInicial = $('#dateFechaInicial').val()
               var fechaFinal = $('#dateFechaFinal').val()
               window.open(`https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fCohan_Lappiz_Acta_Recepcion_SF&rs:Command=Render&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}&rs:embed=false`)
        }


    }, 1000);

}


<script id="template" type="text/x-kendo-template">
	<a class="k-button btnPDF" href="\#" >Command</a>
</script>