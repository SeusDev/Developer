// padre

function openModal() {
    debugger;

    var modalHeader1 = `<h4 class="modal-title">Carga masiva Cip</h4>`;
    var modalBody1 = `
    <style>
    .containButton {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-left: 20%;
        margin-top: -2%;
    }

    .buttonDiv {
        width: 33%
    }

    .button {
        width: 100%;
    }

    input[type="file"]#btn-cargar {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        padding-top: 20px;
    }

    .cargar {
        color: #fff;
        background-color: #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
        border: 1px solid #257f1e;
        margin: 3px;
        padding-top: 23px;
        padding-right: 25px;
        padding-bottom: 3px;
        padding-left: 25px;
        text-align: center;
        border-radius: 50px 50px 50px 50px;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        box-sizing: border-box;
        border-width: 2px;
        padding: 5px;
        width: 220px;
    }

    label[for="btn-cargar"] {
        color: #fff;
        background-color: #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
        border: 1px solid #257f1e;
        margin: 3px;
        padding-top: 23px;
        padding-right: 25px;
        padding-bottom: 3px;
        padding-left: 25px;
        text-align: center;
        border-radius: 50px 50px 50px 50px;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        box-sizing: border-box;
        border-width: 2px;
        padding: 5px;
        width: 220px;
    }

    label[for="btn-cargar"]:hover {
        background-color: #257f1e;
    }

    .labelCargar {
        width: 100%;
        height: 75%;
        padding-top: 3px;
    }
</style>
<br>
<div class="containButton">
    <div class="buttonDiv">
        <a class="button cargar" id='btn-descargar'>Descargar plantilla <i class="fa fa-download"></i></a>
    </div>

    <div class="buttonDiv">
    <input type="file" id="btn-cargar" class="download-products" />

    <label for="btn-cargar" class="active mdl-button mdl-button--acciones mdl-button--primary btn-cargar" style="margin-bottom: 8px; ">
        <span>Cargar plantilla <i class="fa fa-upload" style="color: white;"></i></span>
    </label>
</div>
</div>
<br>`;

    var modalFooter1 = `<h3></h3>`;

    var configModal = {
        htmlTemplate: true,
        headerTemplate: modalHeader1,
        bodyTemplate: modalBody1,
        footerTemplate: modalFooter1,
        showBtnsFooter: false,
        size: "xl",
        scrollable: true,
        centered: false,
        keyboard: false,
    };

    var doneModal = () => {
        debugger;
        console.log("Dió click en done");
    };

    var cancelModal = () => {
        debugger;
        console.log("Dió click en cancel");
    };

    openCustomModal(configModal, doneModal, cancelModal);
    $("#btn-descargar").ready(() => {
        $("#btn-descargar").click(() => {
            debugger;
            let empresas;
            let unidades;
            let stringQuery = `select ci.Ci,ci.Id as Idci ,ci.Ntecnico, e.Nempresa,e.Id from Logius_Lappiz_CI ci
            inner join Logius_Lappiz_Empresas e on e.Id = ci.EmpresaFk`;
            execQuery(stringQuery).then((Success) => {
                empresas = Success[0];
                stringQuery = `SELECT Id,CodFisica, Unifisica FROM Logius_Lappiz_Maunidadfisica ORDER BY Unifisica ASC`;
                execQuery(stringQuery).then((Success) => {
                    unidades = Success[0];

                    var excelCI = XLSX.utils.book_new(); // Creando Excel
                    excelCI.Props = {
                        // Cambiando propiedades
                        Title: "Cuadro insumo producto",
                        Subject: "Plantilla para carga masiva de CIP",
                        Author: "Logius",
                    };
                    excelCI.SheetNames.push("CIP");
                    excelCI.SheetNames.push("Empresas");
                    excelCI.SheetNames.push("Unidades físicas");

                    var CI = [
                        [
                            "Empresa",
                            "NCIP",
                            "Nombre técnico y comercial del producto",
                            "Subpartida Arancelaria",
                            "Unidad física",
                            "Valor FOB unitario",
                            "Peso en Kg",
                            "Fecha presentación",
                        ],
                    ];

                    var empresa = [["Id", "Empresa","Ci","Id Ci"]];
                    var unidad = [["Id", "N°unidad","Unidad física"]];

                    for (let i = 0; i < empresas.length; i++) {
                        empresa[i + 1] = [empresas[i].Id, empresas[i].Nempresa,empresas[i].Ci,empresas[i].Idci];
                    }
            
                    for (let i = 0; i < unidades.length; i++) {
                        unidad[i + 1] = [unidades[i].Id, unidades[i].CodFisica, unidades[i].Unifisica];
                    }

                    /*XLSX.utils.aoa_to_sheettoma una matriz de matrices de valores JS y devuelve una hoja*/
                    var hoja1 = XLSX.utils.aoa_to_sheet(CI);
                    var hoja2 = XLSX.utils.aoa_to_sheet(empresa);
                    var hoja3 = XLSX.utils.aoa_to_sheet(unidad);

                    excelCI.Sheets["CIP"] = hoja1;
                    excelCI.Sheets["Empresas"] = hoja2;
                    excelCI.Sheets["Unidades físicas"] = hoja3;
                    //exportando

                    /*Las funciones exportadas write y writeFile aceptan un argumento de opciones:*/
                    var archivo = XLSX.write(excelCI, {
                        bookType: "xlsx",
                        type: "binary",
                    });

                    function conversion(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
                        return buf;
                    }

                    if (confirm("¿Quiere descargar la plantilla de excel?")) {
                        /*nombre del archivo de excell*/

                        saveAs(
                            new Blob([conversion(archivo)], {
                                type: "application/octet-stream",
                            }),
                            "Carga-CIP.xlsx"
                        );
                    }
                });
            });
        });
    });

    $("#btn-cargar").ready(() => {
        $('#btn-cargar').change(function (oEvent) {
            debugger;
            //beginAuto = true
            var oFile = oEvent.target.files[0];
            var sFilename = oFile.name;

            //Validar que sea excel
            var separador = sFilename.split('.');
            if (separador[(separador.length) - 1].toLowerCase() != 'xlsx') {
                toastr.warning('El archivo debe ser tipo excel');
                $('#btn-cargar').val(null);
            } else {

                var reader = new FileReader();
                //reader.readAsText(oFile);
                reader.onload = function (e) {

                    var data = e.target.result;
                    //puede manejar HTML representado como cadenas
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    var sheetName = workbook.SheetNames[0]
                    /*funciones aceptan una hoja de trabajo y un objeto de opciones opcionales.
                     Las *_to_sheetfunciones aceptan un objeto de datos y un objeto de opciones opcionales.   */
                    let excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                    if (excelData.length > 0) {
                        var dataArray = [];
                        var data = {}
                        // padre 
                        for (let index = 0; index < excelData.length; index++) {
                            
                            if(excelData[index]['ITEM CIP'] != "FIN"){
                                if(excelData[index]['ITEM CIP'] != "MATERIAS PRIMAS E INSUMOS" ){
                                    if(excelData[index]['ITEM CIP'] != "INSUMO" ){
                                        if(excelData[index]['ITEM CIP'] != "ITEM CIP" ){
                                        data.CIP = excelData[index]['ITEM CIP'];
                                        data.EmpresaFk = excelData[index]['EMPRESA'];
                                        data.Nombre = excelData[index]['NOMBRE TECNICO Y COMERCIAL DEL PRODUCTO'];
                                        data.Subpartida = excelData[index]['SUBPARTIDA ARANCELARIA DEL PRODUCTO'];
                                        data.campobd = excelData[index]['UNIDAD FISICA'];
                                        data.ValorFOB = excelData[index]['VALOR FOB UNITARIO PRODUCTO (USD)'];
                                        data.Peso = excelData[index]['PESO EN KG UNIDAD FISICA DEL PRODUCTO'];
                                        data.Fabrica = excelData[index]['¿LA FABRICACION DEL PRODUCTO GENERA SUBPRODUCTO?'];
                                        data.SubProducto = excelData[index]['SUBPRODUCTO GENERADO'];
                                        data.PresentaReaccion = excelData[index]['¿EL PROCESO PRODUCTIVO PRESENTA REACCION QUIMICA?'];
                                        data.Reaccion = excelData[index]['REACCION QUIMICA']  == undefined ? '' : excelData[index]['REACCION QUIMICA'];
                                        data.insumos = []
                                        continue;
                                        }
                                    }
                                }
                            }
                            
                            // Detalle
                            if(excelData[index]['ITEM CIP'] != "FIN"){
                                if(excelData[index]['ITEM CIP'] != "MATERIAS PRIMAS E INSUMOS" ){
                                    if(excelData[index]['ITEM CIP'] == "INSUMO" ){
                                        var insumo = {}
                                        insumo.CI = excelData[index]['NOMBRE TECNICO Y COMERCIAL DEL PRODUCTO'];
                                        insumo.ValorFOBCI = excelData[index]['SUBPARTIDA ARANCELARIA DEL PRODUCTO'] == undefined ? '' : excelData[index]['SUBPARTIDA ARANCELARIA DEL PRODUCTO'];
                                        insumo.Consumo = excelData[index]['VALOR FOB UNITARIO PRODUCTO (USD)'] == undefined ? '' : excelData[index]['VALOR FOB UNITARIO PRODUCTO (USD)'];
                                        insumo.PesoConsumo = excelData[index]['PESO EN KG UNIDAD FISICA DEL PRODUCTO'] == undefined ? '' : excelData[index]['PESO EN KG UNIDAD FISICA DEL PRODUCTO'];
                                        insumo.PorcentajeDesperdicio = excelData[index]['¿LA FABRICACION DEL PRODUCTO GENERA SUBPRODUCTO?'] == undefined ? '' : excelData[index]['¿LA FABRICACION DEL PRODUCTO GENERA SUBPRODUCTO?'];
                                        insumo.DestinoDesperdicio = excelData[index]['SUBPRODUCTO GENERADO']  == undefined ? '' : excelData[index]['SUBPRODUCTO GENERADO'];
                                        insumo.SubProducto = excelData[index]['¿EL PROCESO PRODUCTIVO PRESENTA REACCION QUIMICA?']  == undefined ? '' : excelData[index]['¿EL PROCESO PRODUCTIVO PRESENTA REACCION QUIMICA?'];
                                        data.insumos.push(insumo)
                                        continue;
                                    }
                                }
                            }

                            if(excelData[index]['ITEM CIP'] == "MATERIAS PRIMAS E INSUMOS"){
                                continue;
                            }

                            if(excelData[index]['ITEM CIP'] == "ITEM CIP"){
                                dataArray.push(data);
                                data = {}
                                continue;
                            }

                            if(excelData[index]['ITEM CIP'] == "FIN"){
                                dataArray.push(data);
                                data = {}
                                continue;
                            }

                        }
                        
                        for (let index = 0; index < dataArray.length; index++) {
                            
                            // padre
                
                            var query ='';
                            query +=`INSERT INTO Tabla (Campos) VALUES (@Id)`
                            dataArray[index].length
                            
                            //Detalle

                            for (let index = 0; index < dataArray[index].insumos.length; index++) {
                             
                             // insert hijo
                                query +=`INSERT INTO Tabla (Campos) VALUES (@Id)` 
                            
                            }

                            
                            
                        }


                        console.log(dataArray);
                       
                    }else{
                        $("#btn-cargar'").val(null);
                        $("#btn-close").click()
                        toastr.info(`Plantilla sin datos para cargar`,'Atención');
                    }
                }
            }

            reader.onerror = function (ex) {
                $("#btn-cargar'").val(null);
                console.log(ex);
            };
            reader.readAsBinaryString(oFile);

            $("#btn-cargar'").val(null);
        });
    });

}