function seleccionm() {
	let Query = {
		query: `SELECT distinct ff.id, CONCAT ('',dt.NombreDefectotecnico,'-','-',dt.Criticidad) as Resultado 
        from Cohan_Lappiz_DefectoTecnico ff INNER JOIN Cohan_Lappiz_DetalleDefectoTecnico dt       
        on ff.id = dt.DefectoTecnicoFK`,
		tenantId: "null",
		parameters: {
			aType: "execTx",
			environment: `${backandGlobal.environment}`,
		},
	};
	// Le pasamos la variable con nuestra consulta a ajax en la parte de "data"
	$.ajax({
		async: false,
		url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
		type: "POST",
		data: JSON.stringify(Query),
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", localStorage.Authorization);
		},
		success: function (Success) {
			//Aquí desarrollamos nuestro codigo cuando la respuesta de nuestra consula fue success
			var r = Success[0];
			//En esta parte es donde asignaremos el valor y comenzaremos a llenar nuestro ddl

			$("#28feeb93-643e-4699-9a34-27f66dd109bf").kendoMultiSelect({
				dataTextField: "Resultado",
				dataValueField: "id",
				placeholder: "Seleccione uno o varios registros...",
				dataSource: r,
				animation: {
					open: {
						effects: "zoom:in",
						duration: 300,
					},
				},
				
				filter: "contains",
			});
		},
		error: function (error) {
			console.log(`Error-->${error}`);
		},
	});
}