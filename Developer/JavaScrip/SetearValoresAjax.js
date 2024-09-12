debugger;

var id = e.dataItem.Destinatario;

var query = `
select 
pc.Nombreproyecto [Nombreproyecto],
pc.Codigo [Codigo],
pc.Fecha [Fecha]
from Eje360_Lappiz_Proyecto p 
right join Eje360_Lappiz_Proyectosclientes pc on p.ProyectosClientesFK = p.Id
where pc.Id ='${id}'`; 

var Codigo = ajaxQuery(query)[0].Codigo
var Nombreproyecto = ajaxQuery(query)[0].Nombreproyecto
var Fecha = ajaxQuery(query)[0].Fecha

e.dataItem.Codigo = Codigo
e.dataItem.Nombreproyecto = Nombreproyecto
e.dataItem.Fecha = Fecha

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