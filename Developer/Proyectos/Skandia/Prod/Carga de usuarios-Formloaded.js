setTimeout(function() {
    if (location.href.includes('appViewId=cd5a8332-e1c2-43af-bbda-7a31b4d43a0d')) {
        $('#cargaUsuarios').change(function(oEvent) {
            debugger;
            console.log('cargar usuarios')
                //beginAuto = true
            var oFile = oEvent.target.files[0];
            var sFilename = oFile.name;
            //Validar que sea excel
            var separador = sFilename.split('.');
            if (separador[(separador.length) - 1] != 'xlsx') {
                toastr.warning('El archivo debe ser tipo excel');
                $('#uploadloadP').val(null);
            } else {
                var reader = new FileReader();
                reader.onload = function(e) {
                    //debugger;
                    var data = e.target.result;
                    /puede manejar HTML representado como cadenas/
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    var sheetName = workbook.SheetNames[0]
                        /*funciones aceptan una hoja de trabajo y un objeto de opciones opcionales.
                         Las *_to_sheetfunciones aceptan un objeto de datos y un objeto de opciones opcionales.   */
                    var object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    var Newobject = JSON.stringify(object)

                    function escapeRegExp(string) {
                        return string.replace(/[.*+?^${}()|[\]\\ó]/g, '\\$&');
                    }
                    // Cadena a procesar
                    var cadena = ""
                        // Simular entrada de usuario
                    var entradaUsuario = "abc";
                    // Aplicar la función para escapar la entrada de usuario
                    var re = new RegExp(escapeRegExp(cadena), 'g');
                    // Aplicar reemplazo
                    //debugger;
                    resultado = Newobject.replace(re, "");
                    var Data = JSON.parse(resultado);
                    var Query = ` `
                    var fila = 0;
                    var filasFaltantes = 0;
                    console.log(Data)
                    debugger;
                    console.clear()
                        /*for (let i = 0; i < Data.length; i++) {
                        var email = Data[i]['EMAIL'];
                        var users = ajaxQuery(`select * from Skandias_Lappiz_Users where Email = '${email}'`)
                        if (users.length == 0) {
                            var identification = Data[i]['IDENTIFICATION'];
                            var fullname = Data[i]['FULLNAME'];
                            var address = Data[i]['ADDRESS'];
                            //Si no se ingresa ningun valor en address colocar "" en vez de undefined
                            if (address == null || address == undefined) {
                                address = ""
                            }
                            var phone = Data[i]['PHONE'];
                            if (phone == null || phone == undefined) {
                                phone = ""
                            }
                            var compania = Data[i]['COMPAÑÍA'];
                            var area = Data[i]['ÁREA'];
                            if (area == null || area == undefined) {
                                area = ""
                            }
                            var contrasena = Data[i]['CONTRASEÑA'];
                            var activo = Data[i]['ACTIVO'];
                            if (activo == null || activo == undefined || activo == "FALSE") {
                                activo = 0
                            } else if (activo == "TRUE") {
                                activo = 1
                            }
                            debugger;
        
                            Query += `INSERT INTO Skandias_Lappiz_Users(Identification,FullName,Address,Email,Phone,Compania,Contrasena,Activo,AceptoTratamientoDatos)
        VALUES ('${identification}','${fullname}','${address}','${email}','${phone}','${compania}','${contrasena}',${activo},'No ha aceptado')`
                            ajaxQuery(Query)
                        } else {
                            var update = ` `
                            var conteoUpdate = 0
                            var identification = Data[i]['IDENTIFICATION'];
                            if (identification != users[0].Identification) {
                                update += ` Identification = '${identification}'`
                                conteoUpdate++
                                if (conteoUpdate > 0) {
                                    update += `, `
                                }
                            }
                            var fullname = Data[i]['FULLNAME'];
                            if (fullname != users[0].FullName) {
                                update += `FullName = '${fullname}'`
                                conteoUpdate++
                                if (conteoUpdate > 0) {
                                    update += `, `
                                }
                            }
                            var address = Data[i]['ADDRESS'];
                            //Si no se ingresa ningun valor en address colocar "" en vez de undefined
                            if (address == null || address == undefined) {
                                address = ""
                            }
                            if (address != users[0].Address) {
                                update += ` Address = '${address}'`
                                conteoUpdate++
                                if (conteoUpdate > 0) {
                                    update += `, `
                                }
                            }
                            var phone = Data[i]['PHONE'];
                            if (phone == null || phone == undefined) {
                                phone = ""
                            }
                            if (phone != users[0].Phone) {
                                update += ` Phone = '${phone}'`
                                conteoUpdate++
                                if (conteoUpdate > 0) {
                                    update += `, `
                                }
                            }
                            var compania = Data[i]['COMPAÑÍA'];
                            if (compania != users[0].Compania) {
                                update += ` Compania = '${compania}'`
                                conteoUpdate++
                                if (conteoUpdate > 0) {
                                    update += `, `
                                }
                            }
                            var area = Data[i]['ÁREA'];
                            if (area == null || area == undefined) {
                                area = ""
                            }
                            if (area != users[0].Area) {
                                update += ` Area = '${area}'`
                                conteoUpdate++
                                if (conteoUpdate > 0) {
                                    update += `, `
                                }
                            }
                            var contrasena = Data[i]['CONTRASEÑA'];
                            if (contrasena != users[0].Contrasena) {
                                update += ` Contrasena = '${contrasena}'`
                                conteoUpdate++
                                if (conteoUpdate > 0) {
                                    update += `, `
                                }
                            }
                            var activo = Data[i]['ACTIVO'];
                            if (activo == null || activo == undefined || activo == "FALSE") {
                                activo = 0
                            } else if (activo == "TRUE") {
                                activo = 1
                            }
                            if (activo != users[0].Activo) {
                                update += ` Activo = ${activo}`
                                conteoUpdate++
                                if (conteoUpdate > 0) {
                                    update += `, `
                                }
                            }
                            debugger;
                            if (conteoUpdate > 0) {
                                Query += `UPDATE Skandias_Lappiz_Users SET ${update} WHERE Email = '${email}'`
                                //ajaxQuery(Query)
                            }
        
                        }
                    }*/
                    toastr.options = {
                            "closeButton": true,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "5000",
                            "timeOut": "5000",
                            "extendedTimeOut": "3000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }
                        /*if (filasFaltantes == 0) {
                            toastr.error('No se cargo ningún registro')
                        } else {*/
                    ajaxQuery(Query);
                    if (filasFaltantes == 0) {
                        toastr.success('Todos los registros se guardaron')
                    } else {
                        toastr.success(`Registros guardados hasta la fila ${fila - 1}`)
                        toastr.warning(`Registros omitidos desde la fila ${fila}, por una error en esta`)
                    }
                    /*}*/
                }
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
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                    },
                    success: function(Success) {
                        respuesta = Success[0];
                    },
                    error: function(error) { console.log(`Error-->${error}`); }
                });
                return respuesta;
            }
        })
    }
}, 1000)