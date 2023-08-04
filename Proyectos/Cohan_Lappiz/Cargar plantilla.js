/* Cargar plantilla */
var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == "de208efc-9daa-4194-bc28-1e8dccf0e3b9"){
    debugger;
setTimeout(() => {
    
    var datosAfiliados

    // carga masiva
    $('#uploadProducts').change(function (oEvent) {
        var Query = " "
        var oFile = oEvent.target.files[0];
        var sFilename = oFile.name;

        //Validar que sea excel
        var separador = sFilename.split('.');
        if (separador[(separador.length) - 1] != 'xlsx') {
            toastr.warning('El archivo debe ser tipo excel');
            $('#uploadProducts').val(null);
        } else {

            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;

                /*puede manejar HTML representado como cadenas*/
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

                var resultado = Newobject.replace(re, "");

                var Data = JSON.parse(resultado);

                // acá empiezan Las validaciones gordas
                debugger
                let missedFile = 0

                if (Data.length > 0) {

                    console.log(Data);
                    var fecha = new Date();
                    var anio = fecha.getFullYear();
                    var mes = fecha.getMonth() + 1;
                    var dia = fecha.getDate();
                    var hora = fecha.getHours();
                    var minuto = fecha.getMinutes();
                    var segundo = fecha.getSeconds();
                    var today = `${anio}-${mes}-${dia} ${hora}:${minuto}:${segundo}Z`
                    
                                        
                    var datosNuevos = Data.reduce((acc, current) => {
                        const x = acc.find(item => (item.Identificacion === current.Identificacion)&&(  item.NombreUsuario === current.NombreUsuario)&&( item.Email === current.Email )   );
                        if (!x) {
                          return acc.concat([current]);
                        } else {
                          return acc;
                        }
                      }, []);
                 
                    var omitidos = Data.length - datosNuevos.length
                    
                    Data = datosNuevos;

                    datosNuevos = [];

                    for (let i = 0; i < Data.length; i++) {
    
                        var urlRequest = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`

                        var query = `SELECT * FROM Lappiz_Users where Email='${Data[i].Correo}'`;

                        $.ajax({
                            async: false,
                            url: urlRequest,
                            type: 'POST',
                            data: JSON.stringify({
                                query: query,
                                "parameters": {
                                    "aType": "execTx",
                                    "environment": `${backandGlobal.environment}`
                                }
                            }),
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Content-Type', 'application/json');
                                xhr.setRequestHeader('Authorization', localStorage.Authorization);
                            },
                            success: function (result) {
                                if (result[0].length  === 0) {
                                    datosNuevos.push(Data[i])
                                } else {
                                    toastr.error(`En la fila ${i+2} usuario ya se encuentra registrado`, 'Atención');
                                }
                            },
                            error: function (error) {
                                toastr.error('Hubo un error al trer información del detalle', 'Atención');
                            }
                        })
                    }

                    Data = datosNuevos;

                
                    var usuariosIngresados = 0;

                    for (let i = 0; i < Data.length; i++) {
                        var correo = Data[i]["Correo"];
                        var info = ValidarCorreo(correo);
                        if (info == null) {
                            var body = {
                                "FullName":Data[i]["Nombre y Apellidos"],
                                "TipoDocumentoFK": Data[i]["Tipo documento"],
                                "Identification": Data[i]["Identificacion"],
                                "Address":Data[i]["Direccion"],
                                "Phone": Data[i]["Telefono"],
                                "Email": Data[i]["Correo"],
                                "Contrasena": Data[i]["Contraseña"],
                                "TipoUsuario": Data[i]["Tipo usuario"],
                                "Usuarios": Data[i]["Nombre usuario"],
                                "PuntoVentaFK": Data[i]["Punto de venta"],
                                "DireccionPuntoVenta": Data[i]["Direccion punto de venta"],
                                "BodegasFK": Data[i]["Bodega"],
                                "Descripcion": Data[i]["Descripcion"],                                                    
                                "Activo": true,
                                "Created_by": sessionStorage.userId,
                                "UsuarioCreacion": JSON.parse(sessionStorage.LappizUser).Usuarios,
                                "FechaCreacion": today,
                                "tenantId": "null",
                                "parameters": {
                                    "aType": "event",
                                    "environment": `${backandGlobal.environment}`
                                }
                            }
                            debugger;
                            $.ajax({
                                async: false,
                                url: `${backandGlobal.api2}/${sessionStorage.configAppName}.api/api/lappiz/Lappiz_Users`,
                                type: 'POST',
                                data: JSON.stringify(body),
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('Content-Type', 'application/json');
                                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                                },
                                success: function (result) {
                                    debugger;
                                    if (result != "") {
                                        //Replicar en LappizV2
                                        var Id = result.Id;

                                        var body = {
                                            "UserName": Data[i]['Correo'],
                                            "Email": Data[i]['Correo'],
                                            "PasswordHash": Data[i]['Contraseña'],
                                            "Activo": true,
                                            "Id": Id,
                                            "parameters": {
                                                "aType": "event",
                                                "environment": `${backandGlobal.environment}`
                                            }
                                        }

                                        $.ajax({
                                            async: false,
                                            url: `https://designer.lappiz.io/Api/api/Users/replicate?appCode=Cohan_Lappiz `,
                                            type: 'POST',
                                            data: JSON.stringify(body),
                                            beforeSend: function (xhr) {
                                                xhr.setRequestHeader('Content-Type', 'application/json');
                                                xhr.setRequestHeader('Authorization', localStorage.Authorization);
                                            },
                                            success: function (result) {
                                                debugger;
                                                var obj = [];
                                                obj.push({
                                                    IdRol: 'f58105ed-7fe0-446d-9c56-4d82126ee978',
                                                    Action: 'Save',
                                                    "parameters": {
                                                        "aType": "event",
                                                        "environment": `${backandGlobal.environment}`
                                                    }
                                                });

                                                $.ajax({
                                                    async: false,
                                                    url: backandGlobal.url + '/api/Roles/SaveChanges?idUser=' + Id,
                                                    type: 'POST',
                                                    data: JSON.stringify(obj),
                                                    beforeSend: function (xhr) {
                                                        xhr.setRequestHeader('Content-Type', 'application/json');
                                                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                                                    },
                                                    success: function (data) {
                                                        //Guardó satisfactoriamente la asignación del rol
                                                        //toastr.info("Guardo bien");
                                                        usuariosIngresados++
                                                    }
                                                });
                                            }
                                        });
                                    }
                                },
                                error: function (error) {
                                    console.log(`Error-->${JSON.stringify(error)}`);
                                }
                            });
                        } else {
                            if (info.EmpresaId == sessionStorage.empresaId) {
                                toastr.info('Ya hay un usuario registrado con este email en esta aplicacion, por favor cambie el email de este usuario para poder crear el usuario en la aplicacion y poderle dar ingreso')
                            } else {
                                toastr.warning('Ya hay un usuario registrado con este email en otra aplicacion, por favor contactese con el adminsitrador del sistema para validar esta informacion o cambie el email de este usuario para continuar')
                            }
                        }
                    }

                    if (usuariosIngresados > 0) {
                        toastr.success(`Usuario(s)${usuariosIngresados} guardado(s) correctamente`, 'Atención');
                    }

                    if (omitidos > 0) {
                        toastr.info(`Se omitieron ${omitidos} usuario(s) por duplicidad en alguno de los siguientes campos: Identificacion, NombreUsuario y/o Email`, 'Atención');
                    }
                } else {
                    toastr.error('Sin información el archivo, asegúrese de que el documento esté bien diligenciado')
                }
            }

            reader.onerror = function (ex) {
                $('#uploadProducts').val(null);
                console.log(ex);
            };
            reader.readAsBinaryString(oFile);
        }
        //else
        $('#uploadProducts').val(null);
    });
    function ValidarCorreo(Email) {
        var x = '';
        //VAIDAR SI CORREO EXISTE
        $.ajax({
            async: false,
            url: `${backandGlobal.url}/api/Users/getStatus?email=${Email}`,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', localStorage.Authorization);
            },
            success: function (success) {
                x = success;
            },
            error: function (error) {
                console.log(`Error-->${JSON.stringify(error)}`);
            }
        })
        return x;
    }
}, 2000);

}