/* 
todo Crear campo personas 
*/

$("#b7f2714a-37bf-4954-ad02-ddb3bfd38101").kendoDropDownList({
    autoBind: false,
    optionLabel: "Selecione una sede...",
    dataTextField: "Sede",
    dataValueField: "Id",
    dataSource: { 
        data: []
    }
}).data("kendoDropDownList");



/* *
! campo creado en lappiz 
*/

var queryEmpresasdata = `select  E.* from Lappiz_Users U inner join SafeWork_Lappiz_EmpresaContratista E on E.Id = U.EmpresaContratistaFK
where U.Id='${sessionStorage.userId}'`

queryEmpresasdata = ajaxQuery(queryEmpresasdata);


/* campo personalizado ID */
$('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c').data('kendoDropDownList').dataSource.data(queryEmpresasdata)




setTimeout(function () {
	debugger;
	var query = `select c.Id as Id,c.RefCliente as Cliente,d.RefDeudor as deudor,ca.Prefijo as Prefijo,
    concat('Ac'+RefCliente,'.',RefDeudor, '.', ca.PreFijo) as Refacuerdo
    From Londonomesa_Lappiz_Clientes c,Londonomesa_Lappiz_Deudor d
    join  Londonomesa_Lappiz_Categoria ca on d.CategoriaFk = ca.Id
    where c.Id ='${e.value}'`;
	var data = ajaxQuery(query);
	if (data.length > 0) {
		$("#data").kendoDropDownList({
			placeholder: "Seleccione un acuerdo",
			dataTextField: "Refacuerdo",
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
