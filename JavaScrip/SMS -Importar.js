if (  window.location.href.includes("appViewId=21300b4c-ad8e-4b83-bbd4-431942150b0d")) {
  debugger;
  setTimeout(() => {
    debugger;
    var defecto = e.value;
    var fieldId = "87B31681-9BD7-4527-B8C7-0F63B764357C";
    setFieldValue(fieldId, defecto);
    
    var defecto1 = "35D1362B-B888-4D6F-8682-D94ACF19896C";
    var fieldId = "52BC604B-D81A-4D4E-9ACF-A03F0A9D03A1";
    setFieldValue(fieldId, defecto1);

    // Contenido msj
    setTimeout(() => {
      $(".txtSMS").ready(() => {
        let Texto = document.getElementById("9da65af6-1f31-4444-9055-44a0f803be90");
        Texto.addEventListener("input", function (e) {
          debugger;
          let valor = e.target.value;
          let cardtext = document.querySelectorAll(".txtSMS");

          cardtext.forEach((element) => {
            let card = element;
            card.textContent = valor;
          });
        });
      });
    }, 60);
    
    (function ($) {
      $(function () {
        var agRandomInteger = function (argMin, argMax) {
          var agRand = argMin + Math.random() * (argMax + 1 - argMin);
          return Math.floor(agRand);
        };
        setInterval(function () {
          var agInteger1,
            agInteger2,
            agInteger3,
            agInteger4,
            agInteger5,
            agDecimalNumber1,
            agDecimalNumber2,
            agDecimalNumber3,
            agDecimalNumber4,
            agDecimalNumber5;
          agInteger1 = agRandomInteger(500, 999);
          agInteger2 = agRandomInteger(500, 999);
          agInteger3 = agRandomInteger(500, 999);
          agInteger4 = agRandomInteger(500, 999);
          agInteger5 = agRandomInteger(500, 999);
          agDecimalNumber1 = agRandomInteger(11, 99);
          agDecimalNumber2 = agRandomInteger(11, 99);
          agDecimalNumber3 = agRandomInteger(11, 99);
          agDecimalNumber4 = agRandomInteger(11, 99);
          agDecimalNumber5 = agRandomInteger(11, 99);

          kendo.jQuery(".js-primary-phone_sum-1");
          kendo.jQuery(".js-primary-phone_sum-2");
          /* kendo.jQuery('.js-primary-phone_sum-1').text(agSum1);      
                  kendo.jQuery('.js-primary-phone_sum-2').text(agSum2) */
          /*  $('.js-primary-phone_sum-3').text(agSum3);      
                $('.js-primary-phone_sum-4').text(agSum4);      
            $('.js-primary-phone_sum-5').text(agSum5); */
        }, 5000);
      });
    })(jQuery);
    $("#Importar").click(() => {
      debugger;
      //Reference the FileUpload element.
      var fileUpload = document.getElementById("fileUpload");
      //Validate whether File is valid Excel file.     //
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
      if (fileUpload) {
        if (typeof FileReader != "undefined") {
          var reader = new FileReader();
          //For Browsers other than IE.
          if (reader.readAsBinaryString) {
            reader.onload = function (e) {
              ProcessExcel(e.target.result);
            };
            reader.readAsBinaryString(fileUpload.files[0]);
          } else {
            //For IE Browser.
            reader.onload = function (e) {
              var data = "";
              var bytes = new Uint8Array(e.target.result);
              for (var i = 0; i < bytes.byteLength; i++) {
                data += String.fromCharCode(bytes[i]);
              }
              ProcessExcel(data);
            };
            reader.readAsArrayBuffer(fileUpload.files[0]);
          }
        } else {
          alert("This browser does not support HTML5.");
        }
      } else {
        alert("Please upload a valid Excel file.");
      }
      function ProcessExcel(data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
          type: "binary",
          dateNF: "mm/dd/yyyy",
        });
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[firstSheet]
        );
        toastr.success("Archivo cargado correctamente");
        //ocultar boton de descargar
        setTimeout(function () {
          $(
            "#agregarCampos > div.k-grid-content.k-auto-scrollable > table > tbody > tr > td.k-command-cell > a"
          ).css("display", "none");
        }, 200);
        var excel = JSON.stringify(excelRows, undefined, 2);
        excel = JSON.parse(excel);
        sessionStorage.datosEnvio = JSON.stringify(excel);
        kendo.jQuery("#agregarCampos").data("kendoGrid").setDataSource(excel);
        kendo
          .jQuery("#agregarCampos")
          .data("kendoGrid")
          .dataSource.pageSize(10);
        kendo.jQuery("#agregarCampos").data("kendoGrid").refresh();
      }
    });
  }, 1000);
}



document.querySelector("#\\39 da65af6-1f31-4444-9055-44a0f803be90")