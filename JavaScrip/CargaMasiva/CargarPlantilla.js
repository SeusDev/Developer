/* Cargar plantilla2 */
setTimeout(() => {
	debugger;

	var url = location.href;
	var urlSplit = url.split("appViewId=");
	var idVista = urlSplit[1];

	if (idVista == "ac6518b0-17e0-4bf8-a605-800357deb9b6") {
		if (e.isNew) {
			debugger;
			$("#CargarExportacion").change(function (oEvent) {
				    debugger;
					/* beginAuto = true; */
					var oFile = oEvent.target.files[0];
					var sFilename = oFile.name;
					//Validar que sea excel
					var separador = sFilename.split(".");
					if (separador[separador.length - 1] != "xlsx") {
						toastr.warning("El archivo debe ser tipo excel");
						$("#uploadloadP").val(null);
					} else {
						var reader = new FileReader();
						reader.onload = function (e) {
							//debugger;
							var data = e.target.result;
							/puede manejar HTML representado como cadenas/;
							var workbook = XLSX.read(data, {
								type: "binary",
								cellDates: "True",
							});
							var sheetName = workbook.SheetNames[0];
							/*funciones aceptan una hoja de trabajo y un objeto de opciones opcionales.
                     Las *_to_sheetfunciones aceptan un objeto de datos y un objeto de opciones opcionales.   */

                            let Data =  XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);                                         
							var Query = ``;
							var fila = 0;
							var filasFaltantes = 0; 
							var nuevosRegistros = 0;
							var registrosActualizados = 0;
							debugger;
							console.clear();
							for (let i = 0; i < Data.length; i++) {
								var dex = Data[i]["Dex"];
                                let date = Data[i]["Fecha Dex"];
                                if(!date){
                                    date = ""
                                }else{
                                date = date.getUTCFullYear() + '-' +
                                    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                                    ('00' + date.getUTCDate()).slice(-2) + ' ' ;
                                }
								var Exportacion = ajaxQuery(
									`select * from Logius_Lappiz_Exportacion where DEX ='${dex}'`
								);
								if (Exportacion.length == 0) {
									var Empresa = Data[i]["Empresa"];
									var Fechadex = date;
									var Aduana = Data[i]["Aduana"];
									var Cip = Data[i]["N CIP"];
									var Cantidad = Data[i]["Cantidad"];
									var ValorFob = Data[i]["Valor FOB"];
									var Valorvan = Data[i]["Valor VAN"];
									var paisdestino = Data[i]["País destino"];
                                    
									Query += `insert into Logius_Lappiz_Exportacion (EmpresaFk,DEX,Fechadex,Aduana,Ccid,Cant,VFob,Vvan,Pdestino)
                                    VALUES ('${Empresa}','${dex}','${Fechadex}','${Aduana}','${Cip}','${Cantidad}','${ValorFob}','${Valorvan}','${paisdestino}')`;
									nuevosRegistros++;
								} else {
									var cambios = 0;
									var update = ``;
									var Empresa = Data[i]["Empresa"];
									if (Empresa != Exportacion[0].EmpresaFk) {
										update += ` EmpresaFk = '${Empresa}' `;
										cambios++;
									}
									var Dex = Data[i]["Dex"];
									if (Dex != Exportacion[0].Dex) {
										if (cambios > 0) {
											update += `, `;
										}
										update += ` DEX = '${Dex}' `;
										cambios++;
									}

									var Fechadex = Data[i]["Fecha Dex"];
									if (Fechadex != Exportacion[0].Fechadex) {
										if (cambios > 0) {
											update += `, `;
										}
										update += ` Fechadex = '${date}' `;
										cambios++;
									}

									var Aduana = Data[i]["Aduana"];
									if (Aduana != Exportacion[0].Aduana) {
										if (cambios > 0) {
											update += `, `;
										}
										update += ` Aduana = '${Aduana}' `;
										cambios++;
									}

									var Cip = Data[i]["N CIP"];
									if (Cip != Exportacion[0].Ccid) {
										if (cambios > 0) {
											update += `, `;
										}
										update += ` Ccid = '${Cip}' `;
										cambios++;
									}

									var Cantidad = Data[i]["Cantidad"];
									if (Cantidad == null || Cantidad == undefined) {
										Cantidad = "";
									}
									if (Cantidad != Exportacion[0].Cant) {
										if (cambios > 0) {
											update += `, `;
										}
										update += ` Cant = '${Cantidad}' `;
										cambios++;
									}

									var ValorFob = Data[i]["Valor FOB"];
									if (ValorFob == null || ValorFob == undefined) {
										ValorFob = "";
									}
									if (ValorFob != Exportacion[0].Vfob) {
										if (cambios > 0) {
											update += `, `;
										}
										update += ` Vfob = '${ValorFob}' `;
										cambios++;
									}

									var Valorvan = Data[i]["Valor VAN"];
									if (Valorvan == null || Valorvan == undefined) {
										Valorvan = "";
									}
									if (Valorvan != Exportacion[0].Vvan) {
										if (cambios > 0) {
											update += `, `;
										}
										update += ` Vvan = '${Valorvan}' `;
										cambios++;
									}

									var paisdestino = Data[i]["País destino"];
									if (paisdestino == null || paisdestino == undefined) {
										paisdestino = "";
									}
									if (paisdestino != Exportacion[0].Pdestino) {
										if (cambios > 0) {
											update += `, `;
										}
										update += ` Pdestino = '${paisdestino}' `;
										cambios++;
									}

									if (cambios > 0) {
										Query += `UPDATE Logius_Lappiz_Exportacion
                            			SET ${update}
                             			where DEX = '${dex}'`;
										registrosActualizados++;
									}
								}
							}
							toastr.options = {
								closeButton: true,
								debug: false,
								newestOnTop: false,
								progressBar: false,
								positionClass: "toast-top-right",
								preventDuplicates: false,
								onclick: null,
								showDuration: "300",
								hideDuration: "5000",
								timeOut: "5000",
								extendedTimeOut: "3000",
								showEasing: "swing",
								hideEasing: "linear",
								showMethod: "fadeIn",
								hideMethod: "fadeOut",
							};
							
							ajaxQuery(Query);
							if (nuevosRegistros > 0 || registrosActualizados > 0) {
								if (nuevosRegistros > 0) {
									toastr.success(
										"Se registraron " +
											nuevosRegistros +
											" nuevos registros en Exportación"
									);
								}
								if (registrosActualizados > 0) {
									toastr.success(
										"Se actualizaron " +
											registrosActualizados +
											" registros en Exportación"
									);
								}
							} else if (nuevosRegistros == 0 && registrosActualizados == 0) {
								toastr.warning(
									`No se realizaron cambios: los datos no tenian cambios con respecto a la información previa`
								);
							}
							
						};
					}
					reader.onerror = function (ex) {
						$("#CargarExportacion").val(null);
						console.log(ex);
					};
					reader.readAsBinaryString(oFile);
				
				$("#CargarExportacion").val(null);
			});
		}
        function ajaxQuery(Query) {
            var respuesta;
            let newquery = {
                "query": Query,
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }
            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: 'POST',
                data: JSON.stringify(newquery),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (Success) {
                    respuesta = Success[0];
                },
                error: function (error) { console.log(`Error-->${error}`); }
            });
            return respuesta;
        }
	}
}, 2000);