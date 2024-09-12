/* setField */
debugger;

var id = $("#a7927f0a-d8ee-4610-bcc9-fe7a98510aff").val()

var query = `
select Cantidad from LondoTennis_Lappiz_producto
where Id = '${id}'`; 

var unidad = ajaxQuery(query)[0].Cantidad

var fieldId = 'a396a8fc-b85b-4aa5-8c38-7c41130b50c4';
setFieldValue(fieldId, unidad);

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