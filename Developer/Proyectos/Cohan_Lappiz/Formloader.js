
// volver registro
$('#d333a94e-7470-4d12-8fb3-918cefec8b05').val("")

debugger;
var tipoEntrega = e.value;
if (tipoEntrega == "Domicilio") {
    document.getElementById("d333a94e-7470-4d12-8fb3-918cefec8b05").disabled=false
	var dll = $("#a167b842-1b25-467e-9a71-bf1dbc8f2fe9").data("kendoDropDownList");
        dll.value("");
	//deshabilitar campo sede entrega
    setFieldValue('a167b842-1b25-467e-9a71-bf1dbc8f2fe9','')
	dll.enable(false);
    
} else if (tipoEntrega == "Presencial") {
	var dll = $("#a167b842-1b25-467e-9a71-bf1dbc8f2fe9").data("kendoDropDownList");
    document.getElementById("d333a94e-7470-4d12-8fb3-918cefec8b05").disabled=true
	dll.enable(true);
    setFieldValue('d333a94e-7470-4d12-8fb3-918cefec8b05', '');  
}



___________________________________

// formloader 

setTimeout(() => {
	debugger;
	var url = location.href;
	var urlSplit = url.split("appViewId=");
	var idVista = urlSplit[1];

	if (idVista == "749a56a3-b361-4dd2-b39a-c8dbeeb55705") {
		var fechaIni = $("#dateInicial").val();

		debugger;
		if (!e.isNew) {
			var fechaIni = e.dataItem.FechaPosibleEntrega;
			var fieldId = "a167b842-1b25-467e-9a71-bf1dbc8f2fe9";
			//deshabilitar campo sede entrega
			disabledField(fieldId, true);
			fechaIni = fechaIni.split("T")[0];
			$("#dateInicial").val(fechaIni);
		} else {
			var dll = $("#a167b842-1b25-467e-9a71-bf1dbc8f2fe9").data("kendoDropDownList");
			dll.enable(false);
			document.getElementById("d333a94e-7470-4d12-8fb3-918cefec8b05").disabled=true
		}
	}
}, 1000);

