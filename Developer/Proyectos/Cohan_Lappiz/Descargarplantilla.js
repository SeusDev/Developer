/*Descargar plantilla*/
var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == "de208efc-9daa-4194-bc28-1e8dccf0e3b9") {

        setTimeout(() => {
        debugger;
    
        $("#descargar").click(function () {
            debugger;
            descargar();
        });
        //document.getElementById("downloadProducts").addEventListener("click", descargarPlantilla);

        //Descargar plantilla()
        function descargar() {
            debugger;

            var Tipodocumento = '';
            var Bodegas = '';
            var Puntodeventa = '';
            var TipoUsuario =[{
                "Administrador" : "Administrador",
                "AuxiliarFS" : "Auxiliar FS",
                "RegenteFarmacia" : "Regente farmacia",
                "Cliente" : "Cliente",
                "Proveedor" : "Proveedor",
                "Recepcion" : "Recepción",
                "PickingYPacking" : "Picking y Packing",
                "CadenaFrio" : "Cadena de frío",
                "UsuarioESE" : "Usuario ESE",
                "Transportador": "Transportador",
                "Control" : "Control",
                "AltoCosto" : "AltoCosto",
                "Dispensacion" : "Dispensación"
            }];
           
            var Query = `select Id, Tipodocumento from Cohan_Lappiz_TipoDocumento`;
            let newquery = {
                "query":  Query,
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }
            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: "POST",
                data: JSON.stringify(newquery),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", localStorage.Authorization);
                },
                success: function (Success) {
                    debugger;
                    Tipodocumento = Success[0];
                    var Query1 = `select Id, NombreBodega from Cohan_Lappiz_Bodega`;
                    let newquery1 = {
                        "query":  Query1,
                        "parameters": {
                            "aType": "execTx",
                            "environment": `${backandGlobal.environment}`
                        }
                    }
                    $.ajax({
                        async: false,
                        url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                        type: "POST",
                        data: JSON.stringify(newquery1),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.setRequestHeader("Authorization", localStorage.Authorization);
                        },
                        success: function (Success) {
                            debugger;
                            Bodegas = Success[0];
                            var Query2 = `select Id, NombrePuntoVenta,Direccion from Cohan_Lappiz_PuntoVenta`;
                            let newquery2 = {
                                "query":  Query2,
                                "parameters": {
                                    "aType": "execTx",
                                    "environment": `${backandGlobal.environment}`
                                }
                            }
                            $.ajax({
                                async: false,
                                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                                type: "POST",
                                data: JSON.stringify(newquery2),
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("Content-Type", "application/json");
                                    xhr.setRequestHeader("Authorization", localStorage.Authorization);
                                },
                                success: function (Success) {
                                    debugger;
                                    Puntodeventa = Success[0];
                                    if (
                                        Tipodocumento == undefined ||
                                        Bodegas == undefined ||
                                        Puntodeventa == undefined
                                    ) {
                                        toastr.error("No hay registros para descargar");
                                    } else {
                                        let excelUsuarios = XLSX.utils.book_new(); // Creando Excel
                                        excelUsuarios.Props = {
                                            // Cambiando propiedades
                                            Title: "Usuarios",
                                            Subject: "Usuarios",
                                            Author: "Cohan",
                                        };

                                        excelUsuarios.SheetNames.push("Usuarios");
                                        excelUsuarios.SheetNames.push("Tipodocumento");
                                        excelUsuarios.SheetNames.push("Bodegas");
                                        excelUsuarios.SheetNames.push("Puntodeventa");
                                        excelUsuarios.SheetNames.push("TipoUsuario");

                                        let UsuariosHoja = [
                                            [
                                                "Nombre y Apellidos",
                                                "Tipo documento",
                                                "Identificacion",
                                                "Direccion",
                                                "Telefono",
                                                "Correo",
                                                "Contraseña",
                                                "Tipo usuario",
                                                "Nombre usuario",
                                                "Punto de venta",
                                                "Direccion punto de venta",
                                                "Bodega",
                                                "Descripcion",
                                            ],
                                        ];

                                        let Tipodocumentoshoja = [["Id", "Tipo documento"]];

                                        let Bodegashoja = [["Id", "Nombre"]];

                                        let Puntodeventahoja = [["Id", "Nombre punto de venta", "Direccion"]];

                                        let Tipousuariohoja = [["Administrador",
                                                                "AuxiliarFS",
                                                                "RegenteFarmacia",
                                                                "Cliente",
                                                                "Proveedor",
                                                                "Recepcion",
                                                                "PickingYPacking",
                                                                "CadenaFrio",
                                                                "UsuarioESE",
                                                                "Transportador",
                                                                "Control",
                                                                "AltoCosto",
                                                               " Dispensacion"
                                                                                ]];

                                        //Llenar hojas

                                        for (let i = 0; i < Tipodocumento.length; i++) {
                                            Tipodocumentoshoja[i + 1] = [
                                                Tipodocumento[i].Id,
                                                Tipodocumento[i].Tipodocumento,
                                            ];
                                        }

                                        for (let j = 0; j < TipoUsuario.length; j++) {
                                            Tipousuariohoja[j + 1] = [ 
                                                TipoUsuario[j].Administrador,
                                                TipoUsuario[j].AuxiliarFS,
                                                TipoUsuario[j].RegenteFarmacia,
                                                TipoUsuario[j].Cliente,
                                                TipoUsuario[j].Proveedor,
                                                TipoUsuario[j].Recepcion,
                                                TipoUsuario[j].PickingYPacking,
                                                TipoUsuario[j].CadenaFrio,
                                                TipoUsuario[j].UsuarioESE,
                                                TipoUsuario[j].Transportador,
                                                TipoUsuario[j].Control,
                                                TipoUsuario[j].AltoCosto,
                                                TipoUsuario[j].Dispensacion,
                                            ];
                                        }
                                        
                                        for (let k = 0; k < Bodegas.length; k++) {
                                            Bodegashoja[k + 1] = [Bodegas[k].Id, Bodegas[k].NombreBodega];
                                        }

                                        for (let l = 0; l < Puntodeventa.length; l++) {
                                            Puntodeventahoja[l + 1] = [
                                                Puntodeventa[l].Id,
                                                Puntodeventa[l].NombrePuntoVenta,
                                                Puntodeventa[l].Direccion,
                                            ];
                                        }

                                        /*XLSX.utils.aoa_to_sheettoma una matriz de matrices de valores JS y devuelve una hoja*/
                                        let hoja0 = XLSX.utils.aoa_to_sheet(UsuariosHoja);
                                        let hoja1 = XLSX.utils.aoa_to_sheet(Tipodocumentoshoja);
                                        let hoja2 = XLSX.utils.aoa_to_sheet(Bodegashoja);
                                        let hoja3 = XLSX.utils.aoa_to_sheet(Puntodeventahoja);
                                        let hoja4 = XLSX.utils.aoa_to_sheet(Tipousuariohoja);

                                        excelUsuarios.Sheets["Usuarios"] = hoja0;
                                        excelUsuarios.Sheets["Tipodocumento"] = hoja1;
                                        excelUsuarios.Sheets["Bodegas"] = hoja2;
                                        excelUsuarios.Sheets["Puntodeventa"] = hoja3;
                                        excelUsuarios.Sheets["TipoUsuario"] = hoja4;
                                        //exportando

                                        /*Las funciones exportadas write y writeFile aceptan un argumento de opciones:*/
                                        let archivo = XLSX.write(excelUsuarios, {
                                            bookType: "xlsx",
                                            type: "binary",
                                        });

                                        function conversion(s) {
                                            let buf = new ArrayBuffer(s.length);
                                            let view = new Uint8Array(buf);
                                            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
                                            return buf;
                                        }

                                        if (confirm("¿Quiere descargar la plantilla de excel?")) {
                                            /*nombre del archivo de excell*/

                                            saveAs(
                                                new Blob([conversion(archivo)], {
                                                    type: "application/octet-stream",
                                                }),
                                                "Usuarios.xlsx"
                                            );
                                        }
                                    } //else
                                },
                                error: function (error) {
                                    console.log(`Error-->${error}`);
                                },
                            });//punto de venta
                        },
                        error: function (error) {
                            console.log(`Error-->${error}`);
                        },
                    });//bodega
                },
                error: function (error) {
                    console.log(`Error-->${error}`);
                },
            });//tipo documento
        }
        
    }, 2500);
    
}
