/**
 * FormLoaded funcionalidad tema de consulta: Documentos
 * Actualización: 13 Julio 2022
 */
let idVista = location.href.split("appViewId=")[1];
if (idVista == "4d677b2f-5821-4971-97cd-cbf856630de8") {
  setTimeout(function () {
    debugger;
    let tema = $("7d294541-54fd-411a-9ae2-4c28a6074077");
    if (tema != null) {
      /**
       * Grid Documentos de actividad de la solicitud
       */
      setTimeout(function () {
        debugger;
        var stringQueryDocumentos = `SELECT
                 DO.Id AS IdObservacionDoc,
                 D.Id AS IdDocumento,
                 S.Id AS IdSolicitud,
                 TP.NombreProcesoMisional AS Proceso,
                 A.Nombre AS Actividad,
                 D.NombreDocumento AS NombreDocumento,
                 TD.TipoDocumento,
                 D.FechaDocumento,
                 D.Estado,
                 ISNULL (DO.TextoObservacion,'') as Observacion,
                 D.Archivo
                 FROM PGN_Lappiz_detalleObservacion AS DO 
                 FULL JOIN PGN_Lappiz_Documentos AS D ON DO.DocumentoFK=D.Id
                 JOIN PGN_Lappiz_Solicitud AS S ON D.SolicitudFK=S.Id
                 JOIN PGN_Lappiz_TipoProcesoMisional AS TP ON S.TipoProcesoMisionalFK=TP.Id
                 LEFT JOIN PGN_Lappiz_TipoDocumentoAP AS TD ON D.TipoDocumentoFK=TD.Id
                 JOIN PGN_Lappiz_Actividad AS A ON TD.ActividadFK=A.Id
                 WHERE D.SolicitudFK ='${sessionStorage.SolicitudFK}'`;

        execQuery(stringQueryDocumentos).then((success) => {
          var data = success[0];

          if (!(data.length == 0)) {
            $("#gridDocumento").kendoGrid({
              dataSource: {
                data: data,
                autoSync: true,
                schema: {
                  model: {
                    id: "IdObservacionDoc",
                    fields: {
                      IdObservacionDoc: { type: "string", editable: false },
                      Proceso: { type: "string", editable: true },
                      Actividad: { type: "string", editable: false },
                      NombreDocumento: { type: "string", editable: false },
                      TipoDocumento: { type: "string", editable: false },
                      FechaDocumento: { type: "date", editable: false },
                      Estado: { type: "string", editable: false },
                    },
                  },
                },
                pageSize: 10,
              },
              selectable: true,
              create: true,
              update: true,
              destroy: true,
              batch: true,
              scrollable: true,
              sortable: true,
              filterable: true,
              resizable: true,
              pageable: {
                input: true,
                numeric: true,
                refresh: true,
              },
              dataBound: function () {
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
              

              columns:[
      
                {command:{ text: "Observaciones",click: observaciones,template:"<a class='k-grid-carga btn1' ><i class='far fa-file-archive'></i></a>",
                    },                  
                },

                {command:{ text: "Archivo",click: archivo,template:"<a class='k-grid-carga btn2' ><i class='fa fa-solid fa-paperclip'></i></a>",
                     },                  
                },
                { field: "Proceso", title: "Proceso" },
                { field: "Actividad", title: "Actividad" },
                { field: "NombreDocumento", title: "Nombre documento" },
                { field: "TipoDocumento", title: "Tipo documento" },
                {
                  field: "FechaDocumento",
                  title: "Fecha documento",
                  template:"#= kendo.toString(kendo.parseDate(FechaDocumento, 'yyyy-MM-dd'), 'yyyy/MM/dd') #",
                },
                { field: "Estado", title: "Estado" },
              ],
            });

            $("#gridDocumento").kendoTooltip({
              filter: ".k-grid-carga.btn",
              content: function (e) {
                return "Observaciones";
              },
            });
            $("#gridDocumento").kendoTooltip({
                filter: ".k-grid-carga.btn",
                content: function (e) {
                  return "Archivo";
                },
              });
          } else {
            toastr.info("No hay documentos registrados es esta solicitud.");
          }
        });
        /*Filtro para la grid*/

        function isNumeric(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }

        $("#filtrar").on("input", function (e) {
          var grid = $("#gridDocumento").data("kendoGrid");
          var columns = grid.columns;

          var filter = { logic: "or", filters: [] };
          columns.forEach(function (x) {
            if (x.field) {
              var type =
                grid.dataSource.options.schema.model.fields[x.field].type;
              if (type == "string") {
                filter.filters.push({
                  field: x.field,
                  operator: "contains",
                  value: e.target.value,
                });
              } else if (type == "number") {
                if (isNumeric(e.target.value)) {
                  filter.filters.push({
                    field: x.field,
                    operator: "eq",
                    value: e.target.value,
                  });
                }
              }
            }
          });
          grid.dataSource.filter(filter);
          if (grid.dataSource._total == 0) {
            $(".error-message").empty().append("No se encontraron resultados.");
          } else {
            grid.dataSource.filter(filter);
            $(".error-message").empty();
          }
        });
        function archivo(e) {
            debugger;
            e.preventDefault();
            let value = $("#gridDocumento").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
            var strimgQuery = `select * from PGN_Lappiz.dbo.Lappiz_AllDocuments where Id='${
              value.Archivo.split("/")[0]
            }'`;

            execQuery(strimgQuery).then(function (response) {
              debugger;
              var dataArchivo = response[0];
              if (dataArchivo.length > 0) {
                var html =
                  '<a Id="DownloadFile" style="display:none;" download="' +
                  dataArchivo[0].Name +
                  '" href="data:' +
                  dataArchivo[0].MimeType +
                  ";base64," +
                  dataArchivo[0].Buffer +
                  '" target="_blank" class="k-button k-button-icontext k-grid-pdf"><span class="k-icon k-i-file-pdf"></span> Ver cédula</a>';
                if ($("#DownloadFile")[0])$("#DownloadFile").remove();
                $("#gridDocumento").append(html);
                setTimeout(() => {
                    $("#DownloadFile")[0].click();
                }, 1000);
              }
            });
          }
          function observaciones(e) {
            debugger;
            e.preventDefault();
            /* Código para capturar información del registro seleccionado*/
            let value = e.currentTarget.closest("tr");
            let grid = $("#gridDocumento").data("kendoGrid");
            let selectedRow = grid.dataItem(value);
            let id = selectedRow.IdObservacionDoc;
            let IdProceso = selectedRow.IdProceso;
            let IdSolicitud = selectedRow.IdSolicitud;
            //Variables globales:
            delete sessionStorage.IdDocumentos;
            delete sessionStorage.IdProceso;
            delete sessionStorage.IdSolicitud;
            sessionStorage.IdDocumentos = id;
            sessionStorage.IdProceso = IdProceso;
            sessionStorage.IdSolicitud = IdSolicitud;

            console.log("Id: " + id);
            toastr.info(
              `Se seleccionó el documento ${selectedRow.NombreDocumento}`
            );
            $("#observacion").val(`${selectedRow.TextoObservacion}`);
            var SeccionObservacion = "Observación";
            var idSeccionObservacion = $(`div[id="${SeccionObservacion}"]`);
            idSeccionObservacion.show();
          }
        setTimeout(() => {
          $(".k-grid-carga.btn1").bind("click", observaciones);
          let a = $(".form-section-title");
          a.hide();
          
          $(".k-grid-carga.btn2").bind("click", archivo);
          
        }, 1800);
      }, 1200);
      /**
       * Grid Documentos de actividad preventiva
       */
      setTimeout(function () {
        debugger;
        var stringQueryDocumentos = `SELECT
                 S.Id AS IdSolicitud, 
                 TP.NombreProcesoMisional AS Proceso,
                 AP.NombreActividad AS ActividadPreventiva,
                 A.Nombre AS Actividad,
                 ISNULL (D.NombreDocumento,'') AS NombreDocumento,
                 ISNULL (TD.TipoDocumento,'') AS TipoDocumento,
                 ISNULL (D.FechaDocumento, '')AS FechaDocumento,
                 ISNULL (D.Estado,'') AS Estado,
                 ISNULL (D.Archivo, '') AS Archivo
                 FROM PGN_Lappiz_Solicitud AS S
                 JOIN PGN_Lappiz_DetalleActividadPreventiva AS DAP ON DAP.SolicitudFk = S.Id
                 JOIN PGN_Lappiz_TipoProcesoMisional AS TP ON S.TipoProcesoMisionalFK = TP.Id
                 JOIN PGN_Lappiz_ActividadPreventiva AS AP ON DAP.Actividad = AP.Id
                 JOIN PGN_Lappiz_Actividad AS A ON AP.ActividadFK = A.Id
                 LEFT JOIN PGN_Lappiz_Documentos AS D ON D.DetalleActividadPreventiva = DAP.Id
                 LEFT JOIN PGN_Lappiz_TipoDocumentoAP AS TD ON D.TipoDocumentoFK = TD.Id
                 WHERE S.Id ='${sessionStorage.SolicitudFK}' AND TD.TipoDocumento IS NOT NULL`;

        execQuery(stringQueryDocumentos).then((success) => {
          var data = success[0];

          if (!(data.length == 0)) {
            $("#gridDocumentosActividadPreventiva").kendoGrid({
              dataSource: {
                data: data,
                autoSync: true,
                schema: {
                  model: {
                    id: "IdSolicitud",
                    fields: {
                      IdSolicitud: { type: "string", editable: false },
                      Proceso: { type: "string", editable: true },
                      ActividadPreventiva: { type: "string", editable: false },
                      Actividad: { type: "string", editable: false },
                      NombreDocumento: { type: "string", editable: false },
                      TipoDocumento: { type: "string", editable: false },
                      FechaDocumento: { type: "date", editable: false },
                      Estado: { type: "string", editable: false },
                    },
                  },
                },
                pageSize: 10,
              },
              selectable: true,
              create: true,
              update: true,
              destroy: true,
              batch: true,
              scrollable: true,
              sortable: true,
              filterable: true,
              resizable: true,
              pageable: {
                input: true,
                numeric: true,
                refresh: true,
              },
              dataBound: function () {
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },

              columns: [
                {command:{ text: "Archivo",click: archivo,template:"<a class='k-grid-carga btn2' ><i class='fa fa-solid fa-paperclip'></i></a>",
                     },                  
                },
                { field: "Proceso", title: "Proceso" },
                { field: "ActividadPreventiva", title: "Actividad preventiva" },
                { field: "Actividad", title: "Actividad" },
                { field: "NombreDocumento", title: "Nombre documento" },
                { field: "TipoDocumento", title: "Tipo documento" },
                {
                  field: "FechaDocumento",
                  title: "Fecha documento",
                  template:
                    "#= kendo.toString(kendo.parseDate(FechaDocumento, 'yyyy-MM-dd'), 'yyyy/MM/dd') #",
                },
                { field: "Estado", title: "Estado" },
              ],
            });
            $("#gridDocumentosActividadPreventivao").kendoTooltip({
              filter: ".k-grid-carga.btn",
              content: function (e) {
                return "Archivo";
              },
            });
          } else {
            toastr.info(
              "No hay documentos con actividad preventiva registrados es esta solicitud."
            );
          }
        });

        function archivo(e) {
            debugger;
            e.preventDefault();
            let value = $("#gridDocumento").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
            var strimgQuery = `select * from PGN_Lappiz.dbo.Lappiz_AllDocuments where Id='${
              value.Archivo.split("/")[0]
            }'`;
            
            //download
            execQuery(strimgQuery).then(function (response) {
              debugger;
              var dataArchivo = response[0];
              if (dataArchivo.length > 0) {
                var html =
                  '<a Id="DownloadFile" style="display:none;" download="' +
                  dataArchivo[0].Name +
                  '" href="data:' +
                  dataArchivo[0].MimeType +
                  ";base64," +
                  dataArchivo[0].Buffer +
                  '" target="_blank" class="k-button k-button-icontext k-grid-pdf"><span class="k-icon k-i-file-pdf"></span> Ver cédula</a>';
                if ($("#DownloadFile")[0])$("#DownloadFile").remove();
                $("#gridDocumento").append(html);
                setTimeout(() => {
                    $("#DownloadFile")[0].click();
                }, 1000);
              }
            });
          }
        /*Filtro para la grid*/

        function isNumeric(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }

        $("#filtrar").on("input", function (e) {
          var grid = $("#gridDocumentosActividadPreventiva").data("kendoGrid");
          var columns = grid.columns;

          var filter = { logic: "or", filters: [] };
          columns.forEach(function (x) {
            if (x.field) {
              var type =
                grid.dataSource.options.schema.model.fields[x.field].type;
              if (type == "string") {
                filter.filters.push({
                  field: x.field,
                  operator: "contains",
                  value: e.target.value,
                });
              } else if (type == "number") {
                if (isNumeric(e.target.value)) {
                  filter.filters.push({
                    field: x.field,
                    operator: "eq",
                    value: e.target.value,
                  });
                }
              }
            }
          });
          grid.dataSource.filter(filter);
          if (grid.dataSource._total == 0) {
            $(".error-message").empty().append("No se encontraron resultados.");
          } else {
            grid.dataSource.filter(filter);
            $(".error-message").empty();
          }
        });
        /*fin filtro*/
      }, 1000);
    }
  }, 800);
}