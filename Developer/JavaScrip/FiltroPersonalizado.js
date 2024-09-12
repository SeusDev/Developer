let idVista = location.href.split("appViewId=")[1];
setTimeout(() => {
 debugger;
    if (idVista == "4ba12187-0ebc-40d0-8fcb-6a9a01a642ba") {
        let idTema = $('#b1d4fb58-cca0-4329-b284-05d878db71d9').val()
        let consulta = `select * from Logius_Lappiz_subtemaacta where TemaFk = '${idTema}'`
        execQuery(consulta).then(function (res) {
            var result = res[0];
            kendo.jQuery("#eec0b215-43a0-4a16-921c-3c14cdcc6a7c").data("kendoDropDownList").setDataSource(result);
        });
    }
}, 1000);