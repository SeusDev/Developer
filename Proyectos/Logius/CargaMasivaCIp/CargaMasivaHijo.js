// Carga masiva hijo
if (window.location.href.includes("appViewId=bad50f89-9d20-4fd2-ad7f-158ad68fe888")) {
  setTimeout(function () {
    debugger;
    if(e.isNew){
        $("div[id='3.CI']").css('pointer-events', "none");
        $("div[id='3.CI']").css('opacity', "0.4");
    }
    /*var query = `select Id, Ci, Ntecnico,Span,UnidadFk from Logius_Lappiz_CI`;
    var data = ajaxQuery(query);
    if (data.length > 0) {
      $("#data").kendoMultiSelect({
        placeholder: "Seleccione un Ci",
        dataTextField: "Ci",
        dataValueField: "Id",
        dataSource: data,
      });
    }*/

    $("#DescargarExport").click(() => {
      debugger;
      let infoCI;
      let stringQuery = `select CI.Id, CI.Ci,CI.Ntecnico,Span,U.Unifisica from Logius_Lappiz_CI AS CI
              join Logius_Lappiz_Maunidadfisica AS U ON U.Id = CI.UnidadFk`;
      execQuery(stringQuery).then((Success) => {
        infoCI = Success[0];

        var excelCI = XLSX.utils.book_new(); // Creando Excel
        excelCI.Props = {
          // Cambiando propiedades
          Title: "Cuadro insumo producto",
          Subject: "Plantilla para carga masiva de CI",
          Author: "Logius",
        };
        excelCI.SheetNames.push("Agregar");
        excelCI.SheetNames.push("CI");

        var CI = [
          [
            "Ci",
            "Consumo x unidad",
            "Porcentaje de desperdicio",
            "Destino de desperdicio",
            "Subproducto"
          ],
        ];

        var ciInfo = [["Id", "Ci", "Nombre técnico y comercial", "Subpartida Arancelaria", "Unidad física"]];

        for (let i = 0; i < infoCI.length; i++) {
          ciInfo[i + 1] = [infoCI[i].Id, infoCI[i].Ci, infoCI[i].Ntecnico, infoCI[i].Span, infoCI[i].Unifisica];
        }

        /*XLSX.utils.aoa_to_sheettoma una matriz de matrices de valores JS y devuelve una hoja*/
        var hoja1 = XLSX.utils.aoa_to_sheet(CI);
        var hoja2 = XLSX.utils.aoa_to_sheet(ciInfo);

        excelCI.Sheets["Agregar"] = hoja1;
        excelCI.Sheets["CI"] = hoja2;
        //exportando

        /*Las funciones exportadas write y writeFile aceptan un argumento de opciones:*/
        var archivo = XLSX.write(excelCI, {
          bookType: "xlsx",
          type: "binary",
        });

        function conversion(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
          return buf;
        }

        if (confirm("¿Quiere descargar la plantilla de excel?")) {
          /*nombre del archivo de excell*/

          saveAs(
            new Blob([conversion(archivo)], {
              type: "application/octet-stream",
            }),
            "Carga-CI.xlsx"
          );
        }
      });
    });

    $("#CargarCI").change(function (oEvent) {
      debugger;
      /* beginAuto = true; */
      var oFile = oEvent.target.files[0];
      var sFilename = oFile.name;
      //Validar que sea excel
      var separador = sFilename.split(".");
      if (separador[separador.length - 1] != "xlsx") {
        toastr.warning("El archivo debe ser tipo excel");
        $("#CargarCI").val(null);
      } else {
        var reader = new FileReader();
        //reader.readAsText(oFile);
        reader.onload = function (e) {
          //debugger;
          var data = e.target.result;
          //puede manejar HTML representado como cadenas;
          var workbook = XLSX.read(data, {
            type: "binary",
            cellDates: "True",
          });
          var sheetName = workbook.SheetNames[0];
          /*funciones aceptan una hoja de trabajo y un objeto de opciones opcionales.
       Las *_to_sheetfunciones aceptan un objeto de datos y un objeto de opciones opcionales.   */

          let Data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        }
      }

      reader.onerror = function (ex) {
        $("#CargarCI").val(null);
        console.log(ex);
      };
      reader.readAsBinaryString(oFile);

      $("#CargarCI").val(null);
    })


    function ajaxQuery(query) {
      let data;
      let newquery = {
        query: query,
        parameters: {
          aType: "execTx",
          environment: `${backandGlobal.environment}`,
        },
      };

      $.ajax({
        async: false,
        url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
        type: "POST",
        data: JSON.stringify(newquery),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", localStorage.Authorization);
        },
        success: function (result) {
          data = result[0];
        },
        error: function (error) {
          console.log(error);
        },
      });
      return data;
    }
  }, 2000)
}