setTimeout(function () {
	debugger;
	var query = `select Id, Ci, Ntecnico,Span,Unidad from Logius_Lappiz_CI`;
	var data = ajaxQuery(query);
	if (data.length > 0) {
		$("#data").kendoMultiSelect({
			placeholder: "Seleccione un Ci",
			dataTextField: "Ci",
			dataValueField: "Id",
			dataSource: data,
		});
	}

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
}, 1000);
