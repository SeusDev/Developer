debugger;

if ($location.$$search.appViewId == "ee785d95-023f-4016-8de4-d2f5cf1d36d2") {
	var query = `select ConsecutivoFormula from Cohan_Lappiz_Transcripcionformulas
where Id ='${e.dataItem.Id}'`;

	var consecutivo = ajaxQuery(query);

	function ajaxQuery(query) {
		var resultado;
		var Query = {
			query: query,
			tenantId: "null",
			parameters: {
				aType: "execTx",
				environment: `${backandGlobal.environment}`,
			},
		};
		$.ajax({
			async: false,
			url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
			type: "POST",
			data: JSON.stringify(Query),
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", localStorage.Authorization);
			},
			success: function (response) {
				resultado = response[0][0].ConsecutivoFormula;
			},
			error: function (error) {
				console.log("error: " + error);
			},
		});
		return resultado;
	}

	toastr.options = {
		closeButton: true,
		showDuration: "300",
		hideDuration: "1000",
		timeOut: "10000",
	};

	Command: toastr["info"](
		'¿Imprimir documento?<br /><br /><button type="button" id="imprimir" class="btn clear">Imprimir</button>',
		`Número transcripción:${consecutivo}`
	);
	toastr.options = {
		closeButton: false,
		showDuration: "300",
		hideDuration: "1000",
		timeOut: "5000",
	};
	$("#imprimir").click(function () {
		debugger;
		var win = window.open(
			`https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fValidación_de_derechos&rs:Command=Render&ConsecutivoFormula=${consecutivo}&rs:embed=false`
		);
		win.focus();
	});
}
