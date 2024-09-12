setTimeout(function () {
	debugger;
	var data = e.dataItem;
	if (window.location.href.includes("appViewId=b0d3fbbc-f041-4d6a-a499-86abb66f96bc")) {
		$(
			"#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)"
		).remove();
		$(
			"#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)"
		).remove();
		$(".title-section").remove();
		$(".header-section").append(`          
         <div style="text-align: center;">              
         <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">                  
         Solicitud de ingreso sin reserva de puesto</h1>              
         <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Reservadepuesto.jpg" alt="Sin Imagen">          
         </div>          
         `);

		$("#Back").click(function () {
			debugger;
			location.assign(
				`#/forms?workspaceId=30042d5a-040b-4a9f-bf81-0db631987230&viewName=Skandias_Lappiz_DeafultView&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&viewMenu=undefined&appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e`
			);
		});

		var fecha = moment(data.DiaReunion).utc().format("MM/DD/YYYY");

		//var Sede = evalQuery(`select * from Skandias_Lappiz_Sedes where Id = '${idSede}'`)
		//var Solicitante = evalQuery(`select * from Skandias_Lappiz_Users where Id ='${idSolicitante}'`)
		// numReserva = evalQuery(`select * from Skandias_Lappiz_ReservaDePuesto where Id = '${data.Id}'`)

		var Query = evalQuery(`exec [Skandias_Lappiz_Resumen_IngresoSinReserva] '${data.Id}'`);

		$("#infoResumen").append(`
        <p class="card-text" id="Reserva"> Su solicitud es la ${Query[0].NumeroSolicitud}</p>
        <p class="card-text" id="Sede"> Sede ${Query[3].CESede}</p>
        <p class="card-text" id="Fecha"> Fecha: ${fecha}</p>
        <p class="card-text" id= "Horario"> Hora ${data.Hora}</p>
        <p class="card-text" id="Capacidad"> Motivo: ${Query[2].Nombre}</p><br><br><br>
        <p class="card-text" id="Observaciones"> Observaciones: ${Query[0].Observaciones}</p>
        <p class="card-text" style="font-size: small;text-align: -webkit-left;">¿Algo por adicionarle a tu reserva?</p>
        <p class="card-text" style="font-size: small;text-align: -webkit-left;">Llámanos al 3144110309</p>
        <p class="card-text" style="font-size: small;text-align: -webkit-left;">Lun - Vie (8am - 5pm)</p>
                `);

		function evalQuery(query) {
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
	}
}, 1000);
