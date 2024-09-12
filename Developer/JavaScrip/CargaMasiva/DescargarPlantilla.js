 //Descargar plantilla
setTimeout(() => {
    debugger;

    var url = location.href;
    var urlSplit = url.split('appViewId=')
    var idVista = urlSplit[1]

    if (idVista == 'ac6518b0-17e0-4bf8-a605-800357deb9b6') {
        if (e.isNew) {
      
            $("#DescargarExport").click(function() { descargarPlantilla() })
              
            //Descargar plantilla()
            function descargarPlantilla() {
                debugger;

                let Aduana, CIP, Destino, Empresa

                let Query = `select Id, Codigo , Ladministrativos from Logius_Lappiz_aduana order by Codigo asc`;
                let Query1 = `select Id, Cip, Ntcp from Logius_Lappiz_CIP order by Cip asc`;
                let Query2 = `select Id,CodPais,Dpais from Logius_Lappiz_pdestino order by CodPais asc`;
                let Query3 = `select Id, Nit, Nempresa from Logius_Lappiz_Empresas order by Nempresa asc`;

                execQuery(Query).then((Success) => {
                    Aduana = Success[0];
                    execQuery(Query1).then((Success1) => {
                        CIP = Success1[0];
                        execQuery(Query2).then((Success2) => {
                            Destino = Success2[0];
                            execQuery(Query3).then((Success3) => {
                                Empresa = Success3[0];

                            if (Aduana == undefined || CIP == undefined || Destino == undefined || Empresa == undefined) {
                                toastr.error("No hay registros para descargar")
                            } else {

                                let excelUsuarios = XLSX.utils.book_new(); // Creando Excel
                                excelUsuarios.Props = { // Cambiando propiedades
                                    Title: "Exportaciones",
                                    Subject: "Exportaciones",
                                    Author: "Logius",
                                };

                                excelUsuarios.SheetNames.push("Exportaciones");
                                excelUsuarios.SheetNames.push("Empresa");
                                excelUsuarios.SheetNames.push("Aduana");
                                excelUsuarios.SheetNames.push("CIP");
                                excelUsuarios.SheetNames.push("paisdestino");

                                let Exportaciones = [
                                    ['Empresa','Dex','Fecha Dex','Aduana','N CIP','Cantidad','Valor FOB','Valor VAN','País destino']
                                ]

                                let EmpresaHoja = [
                                    ['IdEmpresa','Nit','Empresa']
                                ]

                                let AduanaHoja = [
                                    ['IdAduana','Codigo','Lugar administrativo']
                                ]

                                let CIPHoja = [
                                    ['IdCip', 'Ci','Nombre tecnico y comercial']
                                ]

                                let paisdestino = [
                                    ['IdPaisdestino','Codigo pais','Nombre pais']
                                ]

                                //Llenar hojas
                               
                                for (let i = 0; i < Empresa.length; i++) {
                                    EmpresaHoja[i + 1] = [Empresa[i].Id, Empresa[i].Nit, Empresa[i].Nempresa]
                                }

                                for (let i = 0; i < Aduana.length; i++) {
                                    AduanaHoja[i + 1] = [Aduana[i].Id, Aduana[i].Codigo, Aduana[i].Ladministrativos]
                                }

                                for (let i = 0; i < CIP.length; i++) {
                                    CIPHoja[i + 1] = [CIP[i].Id, CIP[i].Cip, CIP[i].Ntcp]
                                }

                                for (let i = 0; i < Destino.length; i++) {
                                    paisdestino[i + 1] = [Destino[i].Id, Destino[i].CodPais, Destino[i].Dpais]
                                }

                                /*XLSX.utils.aoa_to_sheettoma una matriz de matrices de valores JS y devuelve una hoja*/
                                let hoja1 = XLSX.utils.aoa_to_sheet(Exportaciones);
                                let hoja2 = XLSX.utils.aoa_to_sheet(EmpresaHoja);
                                let hoja3 = XLSX.utils.aoa_to_sheet(AduanaHoja);
                                let hoja4 = XLSX.utils.aoa_to_sheet(CIPHoja);
                                let hoja5 = XLSX.utils.aoa_to_sheet(paisdestino);

                                excelUsuarios.Sheets["Exportaciones"] = hoja1;
                                excelUsuarios.Sheets["Empresa"] = hoja2;
                                excelUsuarios.Sheets["Aduana"] = hoja3;
                                excelUsuarios.Sheets["CIP"] = hoja4;
                                excelUsuarios.Sheets["paisdestino"] = hoja5;
                                //exportando

                                /*Las funciones exportadas write y writeFile aceptan un argumento de opciones:*/
                                let archivo = XLSX.write(excelUsuarios, {
                                    bookType: 'xlsx',
                                    type: 'binary'
                                });

                                function conversion(s) {

                                    let buf = new ArrayBuffer(s.length);
                                    let view = new Uint8Array(buf);
                                    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                                    return buf;
                                }

                                if (confirm('¿Quiere descargar la plantilla de excel?')) {
                                    /*nombre del archivo de excell*/

                                    saveAs(new Blob([conversion(archivo)], {
                                        type: "application/octet-stream"
                                    }), 'Exportaciones.xlsx');
                                }
                            } 
                        })

                      })

                   })

                })
            }
        } 
    }
}, 2000);