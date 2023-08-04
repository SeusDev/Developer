//Asigar empresa Id

var query1 = `select*from Lappiz_Users
            where PuestoFijo='1' and Id='${sessionStorage.userId}'`;

			var response = evalQuery(query1);

			var PuestoFijo ="";
			if (response.length > 0) {

				PuestoFijo = "Si";

			}else{

				PuestoFijo = "No"; 

			}	

				var Estado = "Aprobado";
				
				var dataItem = {
					FechaAsistirOficina: Fecha,
					//"Jornada": $('#SectionsFields > div > div > ng-form > select')[0].options[$('#SectionsFields > div > div > ng-form > select')[0].options.selectedIndex].text,
					Jornada: Jornada,
					JornadaFk: Jornadafk,
					TomarAlmuerzoOficina: $("input:radio[name=TomarAlmuerzoOficina]:checked").val(),
					TomarParqueadero: $("input:radio[name=TomarParqueadero]:checked").val(),
					TipoTransporte: $("input:radio[name=vehiculo]:checked").val(),
					//"Enquehorario": $('#SectionsFields > div > div > ng-form > select')[1].options[$('#SectionsFields > div > div > ng-form > select')[1].options.selectedIndex].text,
					Enquehorario: HoraAlmuerzo,
					HoraAlmuerzofk: HoraAlmuerzoFk,
					AsientoFK: $("input[name=Asientos]:checked").val(),
					Observacion: observacion,
					ReservaPuesto: $("input:radio[name=ReservaPuesto]:checked").val(),
					RazonVisita: $("#SectionsFields > div > div > ng-form > textarea").val(),
					SolicitanteFk: sessionStorage.userId,
					SedeFk: $("#a58bfb96-d84b-484a-a783-10e6786364be").val(),
					Estado: Estado,
					Auditorio: Auditorio,
					PuestoFijo: PuestoFijo,
					tenantId: "null",
					parameters: {
						userId: sessionStorage.userId,
						tablaId: "",
						appViewId: window.location.href.split("appViewId=")[1],
						actionId: "00000000-0000-0000-0000-000000000000",
						pType: "Guardar",
						aType: "view",
						environment: backandGlobal.environment,
						lappizFunctionId: "00000000-0000-0000-0000-000000000000",
					},
				};
				clean(dataItem);
				$.ajax({
					sync: false,
					url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Skandias_Lappiz_ReservaDePuesto`,
					type: "POST",
					data: JSON.stringify(dataItem),
					beforeSend: function (xhr) {
						xhr.setRequestHeader("Content-Type", "application/json");
						xhr.setRequestHeader("Authorization", localStorage.Authorization);
					},
					success: function (success) {
						sessionStorage.Id = success.Id;
						let tiene = 0;
						if (JSON.parse(sessionStorage.LappizUser).PuestoFijo == true) {
							tiene = 1;
						}
						toastr.info("Se ha notificado la solicitud de ingreso");
					},
					error: function (error) {
						console.log(`Error-->${JSON.stringify(error)}`);
					},
				});