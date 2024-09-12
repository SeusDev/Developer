var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == "946f0f24-5745-407c-a653-3b5687033528") {
	debugger;
    
	var query = `select*from Cohan_Lappiz_Bodega
    where CentroDeCostosFK= '${$("#b6dc9922-71c3-4160-a043-4990100c6ec7").val()}' and TipoBodegasFK= '${e.value}' `;

	execQuery(query).then((response) => {
		$("#da24450e-7ed8-4928-b895-1fe1915a1588")
			.data("kendoDropDownList")
			.setDataSource(response.data[0]);
	});

	
}