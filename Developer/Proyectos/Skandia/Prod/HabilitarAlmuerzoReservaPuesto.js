/* prod*/
var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == "cb77d1fd-9464-496a-8f32-3c698da7a4c4") {
	setTimeout(function () {
		debugger;
		//$('#AllContent > div.container-main.ng-scope > div.container-card > div:nth-child(10)').css('margin-bottom', '0')
		$(
			"#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)"
		).remove();
		$(
			"#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)"
		).remove();
		$(".title-section").remove();
		$(".header-section").append(`          
         <div style="text-align: center;">              
         <!-- <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">                  
         Reserva de puesto</h1>   -->            
         <img class="Imagen" src="https://runtime.lappiz.io/assets/img/Anywhere-08.jpg" alt="Sin Imagen">          
         </div>          
         `);
		$("#HoraAlmuerzo").css("display", "none");
		$("#almuerzo").css("display", "none");
		$("#parqueadero").css("display", "none");
		$("#vehiculo").css("display", "none");
		$("#Puesto").css("display", "none");
		$("#TomarParqueaderoNo")[0].checked = true;
		$("#TomarAlmuerzoOficinaSi").click(function (e) {
			MostrarSeccion();
		});
		$("#TomarAlmuerzoOficinaNo").click(function (e) {
			OcultarSeccion();
		});
		$("#vAutomóvil")[0].checked = false;
		$("#vMotocicleta")[0].checked = false;

		/*  funcion ocultar campo vehiculo */
		$("#TomarParqueaderoNo").click(function () {
			$("#vehiculo").hide();
			$("#vAutomóvil")[0].checked = false;
			$("#vMotocicleta")[0].checked = false;
			/* $("#vAutomòvil")[0].disabled = true;            
            $("#vMotocicleta")[0].disabled = true; */
		});

		$("#TomarParqueaderoSi").click(function () {
			if ($("#vMotocicleta")[0].checked == false && $("#vAutomóvil")[0].checked == false) {
				$("#vehiculo").show();
			}
		});

		$("#vAutomóvil").click(function () {
			debugger;

			var fecha = $(
				"#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input"
			).val();
			var query = `select COUNT (Id) ReservasPuesto from Skandias_Lappiz_ReservaDePuesto rdp
            where rdp.TomarParqueadero='Si' and rdp.TipoTransporte ='Automóvil' and format(FechaAsistirOficina,'dd/MM/yyyy')='${fecha}'`;

			var result = evalQuery(query);

			if (result[0].ReservasPuesto < 22) {
				toastr.info("Se puede asignar puesto en el parqueadero");
			} else {
				toastr.warning("Se ha alcanzado la cantidad maxima en el parquedero");

				$("#vAutomóvil")[0].checked = false;
				$("#vAutomóvil")[0].disabled = true;
				$("#TomarParqueaderoSi")[0].checked = true;
				/* $("#TomarParqueaderoNo")[0].checked = true; */
			}
			if ($("#vMotocicleta")[0].disabled == true && $("#vAutomóvil")[0].disabled == true) {
				$("#TomarParqueaderoSi")[0].checked = false;
				$("#TomarParqueaderoSi")[0].disabled = true;
				$("#TomarParqueaderoNo")[0].checked = true;
				$("#vehiculo").hide();
			}
		});

		$("#vMotocicleta").click(function () {
			debugger;

			var fecha = $(
				"#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input"
			).val();

			var query = `select COUNT (Id) ReservasPuesto from Skandias_Lappiz_ReservaDePuesto rdp
            where rdp.TomarParqueadero='Si' and rdp.TipoTransporte ='Motocicleta' and format(FechaAsistirOficina,'dd/MM/yyyy')='${fecha}'`;

			var result = evalQuery(query);

			if (result[0].ReservasPuesto < 12) {
				toastr.info("Se puede asignar puesto en el parqueadero");
			} else {
				toastr.warning("Se ha alcanzado la cantidad maxima en el parquedero");

				$("#vMotocicleta")[0].checked = false;
				$("#vMotocicleta")[0].disabled = true;
				$("#TomarParqueaderoSi")[0].checked = true;
				/* $("#TomarParqueaderoNo")[0].checked = true; */
			}
			if ($("#vMotocicleta")[0].disabled == true && $("#vAutomóvil")[0].disabled == true) {
				$("#TomarParqueaderoSi")[0].checked = false;
				$("#TomarParqueaderoSi")[0].disabled = true;
				$("#TomarParqueaderoNo")[0].checked = true;
				$("#vehiculo").hide();
			}
		});

		function MostrarSeccion(Index) {
			$("#HoraAlmuerzo").css("display", "block");
		}

		function OcultarSeccion(Index) {
			$("#HoraAlmuerzo").css("display", "none");
		}

		let sede = evalQuery("select * from Skandias_Lappiz_Sedes");
		$("#a58bfb96-d84b-484a-a783-10e6786364be").data("kendoDropDownList").setDataSource(sede);

		let Datajornada = evalQuery("select * from Skandias_Lappiz_JornadaAsistencia");
		$("#9f5510ec-79cb-4130-9c77-bafa54fece06").data("kendoDropDownList").setDataSource(Datajornada);

		$("#9f5510ec-79cb-4130-9c77-bafa54fece06")
			.data("kendoDropDownList")
			.value("645277EB-6EE1-4045-9D57-458276DCA320");

		let dataAlmuerzo = evalQuery(
			"select Id,HoraAlmuerzo from Skandias_Lappiz_HoraAlmuerzo order  by Orden"
		);
		$("#bf487094-c89e-4b57-aa1c-25e6c8f17bc1")
			.data("kendoDropDownList")
			.setDataSource(dataAlmuerzo);

		function sede_change(e) {
			debugger;
			$("#video").empty();
			$("#VideoUbicaciones").empty();
			$("#Pisos").css("display", "none");
			$("#Ubicaciones").css("display", "none");
			if (e.sender.dataItem().Video != null) {
				let video = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${
					e.sender.dataItem().Video.split("v=")[0]
				}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display: block; margin: auto;"></iframe>`;
				$("#video").append(video);
			}
			if (e.sender.dataItem().CESede == "Bogotá") {
				$("#AllContent > div > div.row").css("margin-top", "-152px");
				$("#almuerzo").css("display", "block");
				//muestra toma de almuezo
				$("#parqueadero").css("display", "block");
				$("#vehiculo").css("display", "none");
				$("#Puesto").css("display", "none");
				var fecha = $(
					"#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input"
				).val();
				if (fecha.includes("/")) {
					fecha = fecha.split("/");
				} else {
					fecha = fecha.split("-");
				}

				fecha = `${fecha[2]}-${fecha[1]}-${fecha[0]}`;
				let data = evalQuery(
					`select COUNT(Id) [Cantidad] from Skandias_Lappiz_ReservaDePuesto  where FORMAT(FechaAsistirOficina,'yyyy-MM-dd') = '${fecha}' and TomarParqueadero = 'Si'`
				);

                if (data[0].Cantidad >= 20) {
					$("#parqueadero").css("display", "none");
				} else {
					$("#parqueadero").css("display", "block");
                }

				if (new Date().format("Y-m-d") == fecha) {
					if (new Date().getHours() >= 11) {
						$("#almuerzo").css("display", "none");
					} else {
						$("#almuerzo").css("display", "block");
						ConsultarAlmuerzo(fecha);
					}
				} else {
					$("#almuerzo").css("display", "block");
					ConsultarAlmuerzo(fecha);
				}
				//muestra toma de almuezo
			} else if (e.sender.dataItem().Id == "4037C0D6-52E7-44B3-83B9-386EB0340021") {
				$("#AllContent > div > div.row").css("margin-top", "-152px");
				$("#parqueadero").css("display", "block");

				//muestra toma de parqueadero
				$("#almuerzo").css("display", "none");
				$("#HoraAlmuerzo").css("display", "none");
			} else {
				$("#AllContent > div > div.row").css("margin-top", "-10%");
				$("#almuerzo").css("display", "none"); //oculta toma de almuerzo
				$("#parqueadero").css("display", "none"); 
				$("#HoraAlmuerzo").css("display", "none");
			}
			if (e.sender.dataItem().VideoUbicaciones !== null) {
				var videos = e.sender.dataItem().VideoUbicaciones.split(";");
				let html = "";

				for (let i = 0; i < videos.length; i++) {
					html += `
                    <div class="card">
                        <div class="card-subcontent" style="display: block !important; ">
                            <div class="title-container-card">
                                <p class="title-card" style="padding: 0px; ">
                                    ${videos[i].split(":")[0]}
                                </p>
                            </div>
                            <div class="card-description">
                                <div class="description" style="    margin-top: 10px;">
                                    <iframe src="https://${
																			videos[i].split(":")[1]
																		}?autoplay=0&muted=0" allow="autoplay;"
                                        frameborder="" width="350" height="250" style="width: 100%;">
                                    </iframe>
                                </div>
                    
                            </div>
                        </div>
                    </div>
                    `;
				}

				$("#VideoUbicaciones").append(html);
			}

			let piso = evalQuery(
				`select * from Skandias_Lappiz_Pisos where SedeFK ='${
					e.sender.dataItem().Id
				}' order by Skandias_Lappiz_Pisos.CENombre asc `
			);
			$("#Contenedor-Asientos").empty();
			if (piso.length === 0) {
				toastr.warning("Los puestos de trabajo de esta sede no han sido configurados");
				return;
			}

			$("#31a1f5de-030f-46ac-88b5-18a43a4b9f51").data("kendoDropDownList").setDataSource(piso);

			if (piso.length > 1) {
				$("#Pisos").css("display", "block");
			} else {
				$("#31a1f5de-030f-46ac-88b5-18a43a4b9f51").data("kendoDropDownList").value(piso[0].Id);
				let Ubicacion = evalQuery(
					`select * from Skandias_Lappiz_Ubicacion where PisoFK ='${piso[0].Id}'`
				);
				$("#39ed6b48-9366-4010-94da-5524fa06c0d3")
					.data("kendoDropDownList")
					.setDataSource(Ubicacion);
				if (Ubicacion.length > 1) {
					$("#Ubicaciones").css("display", "block");
				} else {
					$("#39ed6b48-9366-4010-94da-5524fa06c0d3")
						.data("kendoDropDownList")
						.value(Ubicacion[0].Id);
					var fecha = $(
						"#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input"
					).val();
					var jornada = $("#9f5510ec-79cb-4130-9c77-bafa54fece06").val();
					if (fecha == "") {
						toastr.error("La fecha de visita es obligatoria", "Recuerde");
						return;
					}
					if (jornada == null || jornada == "") {
						toastr.error("La jornada es obligatoria", "Recuerde");
						return;
					}
					$("#Contenedor-Asientos").empty();

					if (fecha.includes("/")) {
						fecha = fecha.split("/");
					} else {
						fecha = fecha.split("-");
					}

					fecha = `${fecha[2]}-${fecha[1]}-${fecha[0]}`;
					ConsultarAsientos(Ubicacion[0].Id, fecha, jornada);
				}
			}
			/* validacion puestofijo */
			setTimeout(() => {
				debugger;
				var query = `select*from Lappiz_Users
                where PuestoFijo='1' and Id='${sessionStorage.userId}'`;

				var response = evalQuery(query);

				if (response.length > 0) {
					/* piso */
					$("#Pisos").css("display", "none");
					/* ubicacion */
					$("#Ubicaciones").css("display", "none");
					/* Puestotrabajo */
					$("#Contenedor-Asientos").css("display", "none");
					/* Puesto */
					$("#Puesto").css("display", "none");
				} else {
					/* piso */
					$("#Pisos").css("display", "block");
					/* ubicacion */
					$("#Ubicaciones").css("display", "block");
					/* Puestotrabajo */
					$("#Contenedor-Asientos").css("display", "block");
					/* Puesto */
					$("#Puesto").css("display", "Block");
				}
			}, 500);
		}

		$("#a58bfb96-d84b-484a-a783-10e6786364be")
			.data("kendoDropDownList")
			.bind("change", sede_change);

		function fecha_change(e) {
			debugger;
			var fecha = e.value.format("Y-m-d");
			var jornada = $("#9f5510ec-79cb-4130-9c77-bafa54fece06").val();
			var ubicacion = $("#39ed6b48-9366-4010-94da-5524fa06c0d3")
				.data("kendoDropDownList")
				.dataItem().Id;
			/*  if (ubicacion == null || ubicacion == "") {
                     toastr.error("La ubicación es obligatoria", "Recuerde")
                     return
                 } */
			$("#Contenedor-Asientos").empty();
			ConsultarAsientos(ubicacion, fecha, jornada);
			var sede = $("#a58bfb96-d84b-484a-a783-10e6786364be")
				.data("kendoDropDownList")
				.dataItem().CESede;
			if (sede === "Bogotá") {
				if (new Date().format("Y-m-d") == fecha) {
					if (new Date().getHours() >= 11) {
						$("#almuerzo").css("display", "none");
					} else {
						$("#almuerzo").css("display", "block");
						ConsultarAlmuerzo(fecha);
					}
				} else {
					$("#almuerzo").css("display", "block");
					ConsultarAlmuerzo(fecha);
				}

				let data = evalQuery(
					`select COUNT(Id) [Cantidad] from Skandias_Lappiz_ReservaDePuesto  where FORMAT(FechaAsistirOficina,'yyyy-MM-dd') = '${fecha}' and TomarParqueadero = 'Si'`
				);

				if (data[0].Cantidad >= 20) {
					$("#parqueadero").css("display", "none");
				} else {
					$("#parqueadero").css("display", "block");
				}
			}
		}

		$("#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e")
			.dxDateBox("instance")
			.on("valueChanged", fecha_change);

		function piso_change(e) {
			debugger;

			var cubicacion = $("#31a1f5de-030f-46ac-88b5-18a43a4b9f51").data("kendoDropDownList").text();
			if (cubicacion == "Auditorio") {
				/* Puestotrabajo */
				$("#Puesto").css("display", "none");

				/* ubicaciones */
				$("#Ubicaciones").css("display", "none");
			}
			e.preventDefault();
			var fecha =$("#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input").val();
			let Ubicacion = evalQuery(`
            
            SELECT  *
                    FROM    Skandias_Lappiz_Ubicacion U
                    WHERE   U.PisoFK='${e.sender.dataItem().Id}' and U.Id NOT IN
                            (
                    SELECT BL.UbicacionFk
                    FROM   Skandias_Lappiz_Bloqueo BL
                    where format(BL.FechaBloqueo,'dd/MM/yyyy')='${fecha}'
                    )
            
            `);

			$("#39ed6b48-9366-4010-94da-5524fa06c0d3").data("kendoDropDownList").setDataSource(Ubicacion);
			if (Ubicacion.length > 1) {
				$("#Ubicaciones").css("display", "block");
			} else {
				$("#39ed6b48-9366-4010-94da-5524fa06c0d3").data("kendoDropDownList").value(Ubicacion[0].Id);
				ConsultarAsientos(Ubicacion[0].Id);
				var sede = $("#a58bfb96-d84b-484a-a783-10e6786364be")
					.data("kendoDropDownList")
					.dataItem().CESede;
				// if (sede === "Bogotá") {

				//     if(new Date().format('Y-m-d') == fecha){
				//         ConsultarAlmuerzo(fecha)
				//     }

				// }
			}
		}

		$("#31a1f5de-030f-46ac-88b5-18a43a4b9f51")
			.data("kendoDropDownList")
			.bind("change", piso_change);

		function ubicacion_Change(e) {
			e.preventDefault();
			debugger;
			var fecha = $("#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input").val();
			var jornada = $("#9f5510ec-79cb-4130-9c77-bafa54fece06").val();
			if (fecha == "") {
				toastr.error("La fecha de visita es obligatoria", "Recuerde");
				return;
			}
			if (jornada == null || jornada == "") {
				toastr.error("La jornada es obligatoria", "Recuerde");
				return;
			}
			$("#Contenedor-Asientos").empty();

			if (fecha.includes("/")) {
				fecha = fecha.split("/");
			} else {
				fecha = fecha.split("-");
			}

			fecha = `${fecha[2]}-${fecha[1]}-${fecha[0]}`;

			var sede = $("#a58bfb96-d84b-484a-a783-10e6786364be")
				.data("kendoDropDownList")
				.dataItem().CESede;
			if (sede === "Bogotá") {
				if (new Date().format("Y-m-d") == fecha) {
					if (new Date().getHours() >= 11) {
						$("#almuerzo").css("display", "none");
					} else {
						$("#almuerzo").css("display", "block");
						ConsultarAlmuerzo(fecha);
					}
				} else {
					$("#almuerzo").css("display", "block");
					ConsultarAlmuerzo(fecha);
				}
			}

			ConsultarAsientos(e.sender.dataItem().Id, fecha, jornada);
		}
		$("#39ed6b48-9366-4010-94da-5524fa06c0d3")
			.data("kendoDropDownList")
			.bind("change", ubicacion_Change);

		function ConsultarAsientos(UbicacionId, fecha, jornada) {
			if (
				$("#a58bfb96-d84b-484a-a783-10e6786364be").data("kendoDropDownList").dataItem().CESede ===
				"Bogotá"
			) {
				let data = evalQuery(
					`select COUNT(Id) [Cantidad] from Skandias_Lappiz_ReservaDePuesto  where FORMAT(FechaAsistirOficina,'yyyy-MM-dd') = '${fecha}' and TomarParqueadero = 'Si'`
				);
				if (data[0].Cantidad >= 20) {
					$("#parqueadero").css("display", "none");
				} else {
					$("#parqueadero").css("display", "block");
				}
			}

			let query = `select distinct A.Id, A.Id,A.CENombreAsiento, A.Estado [EstadoAsiento],                      
            case                      
            when RP.AsientoFK is null and A.Estado = 'D' then 0                       
            when A.Estado = 'B' then 2                      
             when RP.AsientoFK is not null then 1                       
             else 1 end [Estado],                      
             A.Fila, A.columna                      
             from Skandias_Lappiz_Asientos A                      
             join Skandias_Lappiz_Ubicacion U on A.UbicacionFK =  U.Id                      
             left join Skandias_Lappiz_ReservaDePuesto RP on A.Id = RP.AsientoFK and FORMAT(RP.FechaAsistirOficina,'yyyy-MM-dd') = '${fecha}' and (RP.JornadaFk = '${jornada}' or '${jornada}' = '645277EB-6EE1-4045-9D57-458276DCA320')                      
             where U.Id = '${UbicacionId}'                      
             order by  A.Fila, A.columna`;

			let data = evalQuery(query);

			if (data.length == 0) {
				/*  toastr.warning("No se encontrarion asientos en este piso") */
				return;
			}
			debugger;
			let html = `<table  style="width: 99%;">                      
                  <tr>`;
			for (let i = 0; i < data.length; i++) {
				if (data[i].Estado == 0) {
					if (i != 0) {
						if (data[i].Fila != data[i - 1].Fila) {
							html += `</tr>`;
							if (i != data.length) {
								html += `<tr>`;
							}
						}
					}
					html += `<td>                           
                            <label for="${data[i].CENombreAsiento}" style="text-align: center; display:grid;">${data[i].CENombreAsiento}                                
                            <input type="radio" name="Asientos" value="${data[i].Id}" Id='${data[i].CENombreAsiento}'>                              
                            <img src="https://runtimetest.lappiz.io/assets/img/Free.png" height="30px" style="margin-top: 5px; margin: 0 auto;">                          
                            </label>                      
                            </td>                    
                            `;
				} else if (data[i].Estado == 1) {
					if (i != 0) {
						if (data[i].Fila != data[i - 1].Fila) {
							html += `</tr>`;
							if (i != data.length) {
								html += `<tr>`;
							}
						}
					}
					if (data[i].EstadoAsiento === "I") {
						html += `<td>                         
                        <label for="${data[i].CENombreAsiento}" style="text-align: center; display:grid;">${data[i].CENombreAsiento}                              
                        <input type="radio" name="Asientos" value="${data[i].Id}" Id='${data[i].Id}' disabled>                            
                        <img src="https://runtimetest.lappiz.io/assets/img/lockedUp.png" height="30px" style="margin-top: 5px; margin: 0 auto; -webkit-filter: grayscale(100%); filter: grayscale(100%);">                        
                        </label>                    
                        </td>                 
                         `;
					} else {
						html += `<td>                         
                        <label for="${data[i].CENombreAsiento}" style="text-align: center; display:grid;">${data[i].CENombreAsiento}                              
                        <input type="radio" name="Asientos" value="${data[i].Id}" Id='${data[i].Id}' disabled>                            
                        <img src="https://runtimetest.lappiz.io/assets/img/lockedUp.png" height="30px" style="margin-top: 5px; margin: 0 auto;">                        
                        </label>                    
                        </td>                 
                         `;
					}
				} else {
					if (i != 0) {
						if (data[i].Fila != data[i - 1].Fila) {
							html += `</tr>`;
							if (i != data.length) {
								html += `<tr>`;
							}
						}
					}
					html += `<td style="height: 30px;">                         
                                            <label style="text-align: center; display:grid;">${data[i].CENombreAsiento}</label>                    
                                            </td>                  
                                            `;
				}
			}
			$("#Contenedor-Asientos").append(html);
		}

		$("#Save").kendoButton({ click: Save });
		$("#Back").kendoButton({ click: Back });

		function Back(e) {
			e.preventDefault();
			console.clear();
			history.back();
		}

		function Save(e) {
			debugger;
			console.clear();
			e.preventDefault();

			if (window.location.href.includes("cb77d1fd-9464-496a-8f32-3c698da7a4c4")) {
				if (
					$("#a58bfb96-d84b-484a-a783-10e6786364be").val() == "" ||
					$("#a58bfb96-d84b-484a-a783-10e6786364be").val() == null
				) {
					toastr.error("La sede es obligatoria", "Recuerde");
					return;
				}
				var cubicacion = $("#31a1f5de-030f-46ac-88b5-18a43a4b9f51")
					.data("kendoDropDownList")
					.text();
				if (cubicacion == "Auditorio") {
				} else {
					if (JSON.parse(sessionStorage.LappizUser).PuestoFijo == false) {
						if ($("input[name=Asientos]:checked").val() == undefined) {
							toastr.error("Debe seleccionar un asiento", "Recuerde");
							return;
						}
					}
				}

				if (
					$(
						"#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input"
					).val() == ""
				) {
					toastr.error("La fecha es obligatoria", "Recuerde");
					return;
				}

				/*  validacion vehiculo */
				if (
					$("#TomarParqueaderoSi")[0].checked == true &&
					$("#vAutomóvil")[0].checked == false &&
					$("#vMotocicleta")[0].checked == false
				) {
					toastr.error("Recuerde seleccionar el tipo de vehiculo");
					return;
				}
			}
			/* validacion registro reserva puesto */
			var Fecha1 = $("#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input").val();
			var sede1 = $("#a58bfb96-d84b-484a-a783-10e6786364be").val();
			var query = `select * from Skandias_Lappiz_ReservaDePuesto
            where SolicitanteFk ='${sessionStorage.userId}' and SedeFK='${sede1}'and format(FechaAsistirOficina,'dd/MM/yyyy')='${Fecha1}'`;

			var resul = evalQuery(query);

			if (resul.length > 0) {
				toastr.warning("El usuario cuenta con una reserva");
			} else {
				var Fecha = $(
					"#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input"
				).val();
				//var Fecha = new Date($("#ee21ffdc-d4a6-434b-a4b5-eac631c5f59e > div.dx-dropdowneditor-input-wrapper > div > input").val()).toString('dd/MM/yyyy')
				if (Fecha.includes("/")) {
					Fecha = Fecha.split("/");
				} else {
					Fecha = Fecha.split("-");
				}
				var HoraAlmuerzoFk;
				var HoraAlmuerzo;
				Fecha = `${Fecha[2]}-${Fecha[1]}-${Fecha[0]} 00:00:00.000`;
				if ($("#bf487094-c89e-4b57-aa1c-25e6c8f17bc1").data("kendoDropDownList").value() !== "") {
					HoraAlmuerzoFk = $("#bf487094-c89e-4b57-aa1c-25e6c8f17bc1")
						.data("kendoDropDownList")
						.dataItem().Id;
					HoraAlmuerzo = $("#bf487094-c89e-4b57-aa1c-25e6c8f17bc1")
						.data("kendoDropDownList")
						.dataItem().HoraAlmuerzo;
				} else {
					HoraAlmuerzoFk = null;
					HoraAlmuerzo = null;
				}
				var Jornadafk;
				var Jornada;
				if ($("#9f5510ec-79cb-4130-9c77-bafa54fece06").data("kendoDropDownList").value() !== "") {
					Jornadafk = $("#9f5510ec-79cb-4130-9c77-bafa54fece06")
						.data("kendoDropDownList")
						.dataItem().Id;
					Jornada = $("#9f5510ec-79cb-4130-9c77-bafa54fece06")
						.data("kendoDropDownList")
						.dataItem().Jornada;
				} else {
					Jornadafk = null;
					Jornada = null;
				}

				var observacion;
				if ($("#observacion").val() !== "") {
					observacion = $("#observacion").val();
				} else {
					observacion = 'Ninguno';
				}
			
			/* validar y guardar auditorio */
			var Auditorio = $("#31a1f5de-030f-46ac-88b5-18a43a4b9f51").data("kendoDropDownList").text();
			if (Auditorio == "Auditorio"){

				Auditorio = "Si";
			}else{

				Auditorio = "No"; 

			}

			/* validar y guardar puestofijo */
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
						sessionStorage.IdSede = $("#a58bfb96-d84b-484a-a783-10e6786364be").val();
				    	let correo = evalQuery(
							`EXEC Skandias_EnviarReservaPuesto '${success.Id}',${tiene},'${$("#a58bfb96-d84b-484a-a783-10e6786364be"
							).val()}', ${Auditorio}`
						);
						if ($("input:radio[name=TomarAlmuerzoOficina]:checked").val() == "Si") {
							evalQuery(`EXEC Skandia_ReservaAlmuerzo '${success.Id}'`);
						}

						toastr.info("Se ha notificado la solicitud de ingreso");
						location.assign(
							`#/forms?viewName=Skandias_Lappiz_ReservaDePuesto&entityId=47981612-3721-48ac-99eb-9367114a6127&appViewId=5ff96d45-8370-4203-bde8-f3161e184e2a`
						);
					},
					error: function (error) {
						console.log(`Error-->${JSON.stringify(error)}`);
					},
				});
			}
		}

		function ConsultarAlmuerzo(fecha) {
			let cantidad = evalQuery(
				`	select COUNT(Id) [Cantidad] from Skandias_Lappiz_ReservaDePuesto where TomarAlmuerzoOficina = 'Si' and  FORMAT(FechaAsistirOficina, 'yyyy-MM-dd') ='${fecha}'`
			);
			if (cantidad[0].Cantidad >= 100) {
				$("#almuerzo").css("display", "none");
				toastr.info("Se ha superado la cantidad máxima de almuerzo");
			} else {
				$("#almuerzo").css("display", "block");
			}
		}

		function clean(obj) {
			for (var prop in obj) {
				if (obj[prop] === "" || obj[prop] === undefined || obj[prop] === null) {
					delete obj[prop];
				}
			}
		}

		function evalQuery(Query) {
			var Response = "";
			$.ajax({
				async: false,
				url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
				type: "POST",
				data: JSON.stringify({
					query: Query,
					parameters: {
						aType: "execTx",
						environment: `${backandGlobal.environment}`,
					},
				}),
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Authorization", localStorage.Authorization);
				},
				success: function (x) {
					Response = x[0];
				},
			});
			return Response;
		}
	}, 2500);
}