setTimeout(() => {
	debugger;
	var url = location.href;
	var urlSplit = url.split("appViewId=");
	var idVista = urlSplit[1];
	if (idVista == "f949e7ce-bc4f-43c2-9e36-25877d055a62") {
		var Query = "select Id,NombreCliente,CodigoCliente from Cohan_Lappiz_Bionexo";
		var newquery = {
			query: Query,
			parameters: {
				aType: "execTx",
				environment: `${backandGlobal.environment}`,
			},
		};

		$.ajax({
			async: false,
			url: `https://tx.lappiz.io/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
			type: "POST",
			data: JSON.stringify(newquery),
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", localStorage.Authorization);
			},
			success: function (result) {
				debugger;
				$("#contain-dllCliente").empty();
				$("#contain-dllCliente").html('<div id="dllCliente" class="dropDown"></div>');

				$("#dllCliente").kendoDropDownList({
					autoBind: false,
					dataTextField: "NombreCliente",
					dataValueField: "Id",
					template: `<span class="k-state-default"  style="width:80% !important ; font-size: x-small; margin-left:5px"><p>#: NombreCliente #</p></span>`,
					headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px; margin-left:5px"><span class="k-widget k-header" style="width:80% ; font-size: x-small">Cliente</span>`,
					valueTemplate: `<span><p style="margin-top:8px">#: NombreCliente #</p></span>`,
					dataSource: {
						data: result[0],
					},
					optionLabel: {
						NombreCliente: "Seleccione un registro...",
						Id: "",
					},
					filter: "startswith",
					filtering: function (ev) {
						delete sessionStorage.dataGrid;
						var filterValue = ev.filter != undefined ? ev.filter.value : "";
						ev.preventDefault();

						this.dataSource.filter({
							logic: "or",
							filters: [
								{
									field: "NombreCliente",
									operator: "startswith",
									value: filterValue,
								},
							],
						});
					},
					change: function (e) {
						debugger;
						let Id = this.dataItem().Id;

						$("#contain-grid-clientes").empty();
						$("#contain-grid-clientes").html('<div id="grid-clientes"></div>');

						$("#grid-clientes").kendoGrid({
							dataSource: {
								data: [],
								schema: {
									model: {
										fields: {
											Nrocotizacion: { type: "string", editable: false },
											Nombrecliente: { type: "number", editable: false },
											Usuarioasignado: { type: "number", editable: false },
											Fechacotizacion: { type: "string", editable: false },
											Facturacionminima: { type: "string", editable: false },
											Plazodeentrega: { type: "number", editable: false },
											Validezdepropuesta: { type: "string", editable: false },
											Observacion: { type: "date", editable: false },
                                            Informacioncotizacion: { type: "date", editable: false },
                                            Detallecotizacion: { type: "date", editable: false },
										},
									},
								},
								pageSize: 10,
							},
							batch: true,
							editable: true,
							persistSelection: true,
							scrollable: true,
							sortable: true,
							filterable: true,
							resizable: true,
							pageable: {
								buttonCount: 5,
								pageSizes: true,
								refresh: true,
							},
							dataBound: function () {
								//
								for (var i = 0; i < this.columns.length; i++) {
									this.autoFitColumn(i);
								}
							},
							cellClose: function (e) {
								debugger;
								let modelo = e.model;
								//Evento para actualizar los campos
							},

							columns: [
								
                                {
                                    command: [{
                                        text: "informacion",
                                        click: informacion,
                                        template: "<a class='k-grid-informacion btn' title='Información cotización'><i class='fas fa-info-circle'></i></a>",
                                        media: "(min-width: 450px)"
                                    },
                                    {
                                        text: "detalle",
                                        click: detalle,
                                        template: "<a class='k-grid-detalle btn' title='Detalle cotización'><i class='fas fa-file-alt'></i></a>",
                                        media: "(min-width: 450px)"
                                    }
                                ]
                                },


								{ field: "Nrocotizacion", title: "Nro cotización" },
								{ field: "Nombrecliente", title: "Nombre cliente" },
								{ field: "Usuarioasignado", title: "Usuario asignado" },
								{ field: "Fechacotizacion", title: "Fecha cotización", template: "#= kendo.toString(kendo.parseDate(Fechacotizacion, 'yyyy-MM-dd'), 'yyyy/MM/dd')#"},
								{ field: "Facturacionminima", title: "Facturacion minima" },
                                { field: "Plazodeentrega", title: "Plazode entrega" },
								{ field: "Validezdepropuesta", title: "Validezdepropuesta" },
								{ field: "Formadepago", title: "Formade pago" },
								{ field: "Manejaflete", title: "Maneja flete" },
								{ field: "Observacion", title: "Observacion" },
								{ field: "Informacioncotizacion", title: "Información cotización" },
                                { field: "Detallecotizacion", title: "Detalle cotización" },

								/* {
                                
                                }]
                            } */
							],
						});
						var grid = $("#grid-clientes").data("kendoGrid");
						grid.dataSource.add({
							
                            Nrocotizacion:'1',
                            Nombrecliente:'administrador@cohan.com',
                            Usuarioasignado:'administrador@cohan.com',
                            Fechacotizacion:new Date(),
                            FacturacionMinima:'1000',
                            Plazodeentrega:'PlazodeEntrega(dias)',
                            Validezdepropuesta:'muy valida',
                            Formadepago:'efectivo',
                            Manejaflete:'no',
                            Observacion:'aqui lo que hay es plata',
                            Informacioncotizacion:'data',
                            Detallecotizacion:'envio'
                            
						});
                        
                        function informacion() {
                            $("#modalInformacion").modal('show');
                        }

                        function detalle() {
                            $("#modaldetalle").modal('show');
                        }

					},
				});
			},
		});
	}
}, 2000);
