setTimeout(() => {
    var url = location.href;
    var urlSplit = url.split('appViewId=')
    var idVista = urlSplit[1]

    if (idVista == '87ac4268-53e1-4a40-a80c-3102f2bb9de1') {
        
        $('#btnExportar').click(function () {
            debugger;
            debugger;
			let FechaFinal = $("#dateFechaFinal").val();
			let FechaInicial = $("#dateFechaInicial").val();
            //validamos que los campos esten diligenciados
            /* var FechaIni = $("#fechainicial").val();
            var FechaFin = $("#fechafinal").val();
            var Sede = $("#ddlSede").val();
            var NombreSede = $("#ddlSede").data('kendoDropDownList').text(); */
            if (FechaInicial && FechaFinal) {
                $("#report-container").empty();
                $("#report-container").html(`<iframe class = "resp-iframe" src = "https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fCohan_Lappiz_Reporte_Devo_Proveedor&rs:embed=true" gesture = "media" allow = "encrypted-media" allowfullscreen ></iframe>`)
            }
        });
        $('#btnExportar2').click(function () {
            debugger
            //validamos que los campos esten diligenciados
            //var FechaIni = $("#fechainicial").val();
            //var FechaFin = $("#fechafinal").val();
            //var Sede = $("#ddlSede").val();
            //var NombreSede = $("#ddlSede").data('kendoDropDownList').text();
            if (FechaInicial && FechaFinal) {
                $("#report-container").empty();
                $("#report-container").html(`<iframe class = "resp-iframe" src = "https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fReporte_Devo_Proveedor&rs:Command=Render&rs:embed=true" gesture = "media" allow = "encrypted-media" allowfullscreen ></iframe>`)
            }
        });
    }}, 2000);
