$('#PanelGrid > div.ng-isolate-scope').append(`<button style='display:none' id='prueba' type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
  Open modal
</button>

<!-- The Modal -->
<div class="modal" id="myModal">
    <div class="modal-dialog" style="display: block;">
        <div class="modal-content" style="justify-content: center;">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Carga de usuarios</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <div class="buttonDiv" style="margin-left: 5cm;">
                    <input type="file" id="uploadUsers" class="download-products" />
                    <label for="uploadUsers"
                        class="active mdl-button mdl-button--acciones mdl-button--primary labelCargar"
                        style="margin-bottom: 8px; ">
                        <span><i class="fa fa-upload" style="color: white;"></i> Cargar usuarios</span>
                    </label>
                </div>
                <div class="buttonDiv" style="margin-left: 5cm;">
                    <a class="button active mdl-button mdl-button--acciones mdl-button--primary labelCargar"
                        id="downloadTemplate"><i class="fa fa-download" style="color: white;margin-bottom: 8px; "></i>
                        Descargar plantilla</a>
                </div>
                <div class="buttonDiv" style="margin-left: 5cm;">
                    <input type="file" id="disableUsers" class="download-products" />
                    <label for="disableUsers"
                        class="active mdl-button mdl-button--acciones mdl-button--primary labelCargar"
                        style="margin-bottom: 8px; ">
                        <span><i class="fa fa-user" style="color: white;"></i> Deshabilitar usuarios</span>
                    </label>
                </div>
                <div class="buttonDiv" style="margin-left: 5cm;">
                    <input type="file" id="actualizarusuarios" class="download-products" />
                    <label for="actualizarusuarios"
                        class="active mdl-button mdl-button--acciones mdl-button--primary labelCargar"
                        style="margin-bottom: 8px; ">
                        <span><i class="fas fa-user-edit" style="color: white;"></i> Actualizar usuarios </span>
                    </label>
                </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<style>
    input[type="file"]#uploadUsers {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        padding-top: 20px;
    }

    input[type="file"]#disableUsers {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        padding-top: 20px;
    }

    input[type="file"]#downloadTemplate {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        padding-top: 20px;
    }

    input[type="file"]#actualizarusuarios {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        padding-top: 20px;
    }
    
    .a{
        color: #fff;
        background-color: #257f1e;
        border: 1px solid #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
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

    label[for="uploadUsers"] {
        color: #fff;
        background-color: #257f1e;
        border: 1px solid #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
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

    label[for="disableUsers"] {
        color: #fff;
        background-color: #257f1e;
        border: 1px solid #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
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

    label[for="actualizarusuarios"] {
        color: #fff;
        background-color: #257f1e;
        border: 1px solid #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
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

    a[for="downloadTemplate"] {
        color: #fff;
        background-color: #257f1e;
        border: 1px solid #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
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
    
    #downloadTemplate{
        color: #fff;
        background-color: #257f1e;
        border: 1px solid #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
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
        width: 182px;
        height: 33px;
        text-decoration: none;
        margin-bottom: 8px;
    }

    #actualizarusuarios{
        color: #fff;
        background-color: #257f1e;
        border: 1px solid #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
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
        width: 182px;
        height: 33px;
        text-decoration: none;
        margin-bottom: 8px;
    }

    label[for="uploadUsers"]:hover {
        background-color: #7a7a7a;
    }

    #downloadTemplate:hover {
        background-color: #7a7a7a;
    }

    label[for="disableUsers"]:hover {
        background-color: #7a7a7a;
    }

    label[for="actualizarusuarios"]:hover {
        background-color: #7a7a7a;
    }

    .containButton {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .buttonDiv {
        width: 33%
    }

    .button {
        width: 100%;
    }

    .descargar {
        color: #fff;
        background-color: #257f1e;
        border: 1px solid #257f1e;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
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
</style>
<script lang="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.3/xlsx.full.min.js"></script>
<script lang="javascript" src="https://cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"></script>`)

setTimeout(() => {
    $('#uploadUsers').change(function(oEvent) {
        debugger;
        //beginAuto = true
        var oFile = oEvent.target.files[0];
        var sFilename = oFile.name;

        //Validar que sea excel
        var separador = sFilename.split('.');
        if (separador[(separador.length) - 1] != 'xlsx') {

            toastr.warning('El archivo debe ser tipo excel');
            $('#uploadUsers').val(null);
        } else {

            var reader = new FileReader();
            reader.onload = function(e) {

                var data = e.target.result;
                //puede manejar HTML representado como cadenas
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
                var resultado = Newobject.replace(re, "");
                var Data = JSON.parse(resultado);
                var Query = ` `
                var fila = 0;
                var filasFaltantes = 0;
                console.log(Data)
                debugger;

                var fecha = new Date();
                var anio = fecha.getFullYear();
                var mes = fecha.getMonth() + 1;
                var dia = fecha.getDate();
                var hora = fecha.getHours();
                var minuto = fecha.getMinutes();
                var segundo = fecha.getSeconds();
                var today = `${anio}-${mes}-${dia} ${hora}:${minuto}:${segundo}`

                var datosNuevos = [];
                for (let i = 0; i < Data.length; i++) {
                    var user = "";
                    if (Data[i].FULLNAME == undefined || Data[i].EMAIL == undefined || Data[i].CONTRASEÑA == undefined) {
                        user += parseInt(i + 1) + ","
                    } else {
                        datosNuevos.push(Data[i])
                    }
                }

                var omitidos = Data.length - datosNuevos.length;
                var usuariosIngresados = 0;
                var existenA = "";
                var existenO = "";

                Data = datosNuevos;

                for (let i = 0; i < Data.length; i++) {

                    var correo = Data[i].EMAIL;
                    var info = ValidarCorreo(correo);
                    if (info == null) {
                        if (Data[i].IDENTIFICATION == undefined) {
                            Data[i].IDENTIFICATION = "null"
                        }

                        if (Data[i].PHONE == undefined) {
                            Data[i].PHONE = "null"
                        }

                        if (Data[i].ADDRESS == undefined) {
                            Data[i].ADDRESS = "null"
                        }

                        if (Data[i].COMPAÑIA == undefined) {
                            Data[i].COMPAÑIA = "null"
                        }

                        var body = {
                            "Identification": Data[i].IDENTIFICATION,
                            "FullName": Data[i].FULLNAME,
                            "Email": Data[i].EMAIL,
                            "Phone": Data[i].PHONE,
                            "ADDRESS": Data[i].ADDRESS,
                            "Contrasena": Data[i].CONTRASEÑA,
                            "Activo": true,
                            "Compania": Data[i].COMPAÑIA,
                            "Created_by": sessionStorage.userId,
                            "FechaCreacion": today,
                            "tenantId": "null",
                            "parameters": {
                                "userId": `${sessionStorage.userId}`,
                                "tablaId": "",
                                "actionId": "00000000-0000-0000-0000-000000000000",
                                "pType": "Guardar",
                                "aType": "ffija",
                                "environment": `${backandGlobal.environment}`,
                                "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
                            }
                        }

                        debugger;

                        $.ajax({
                            async: false,
                            url: `${backandGlobal.api2}/${sessionStorage.configAppName}.api/api/lappiz/Skandias_Lappiz_Users`,
                            type: 'POST',
                            data: JSON.stringify(body),
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader('Content-Type', 'application/json');
                                xhr.setRequestHeader('Authorization', localStorage.Authorization);
                            },
                            success: function(result) {
                                debugger;
                                if (result != "") {
                                    //Replicar en LappizV2
                                    //Replicar en LappizV2
                                    var Id = result.Id;

                                    var body = {
                                        "UserName": Data[i].EMAIL,
                                        "Email": Data[i].EMAIL,
                                        "PasswordHash": Data[i].CONTRASEÑA,
                                        "Activo": true,
                                        "Id": Id
                                    }

                                    $.ajax({
                                        async: false,
                                        url: backandGlobal.url + `/api/Users/replicate?appCode=Skandias_Lappiz&languageApp=es`,
                                        type: 'POST',
                                        data: JSON.stringify(body),
                                        beforeSend: function(xhr) {
                                            xhr.setRequestHeader('Content-Type', 'application/json');
                                            xhr.setRequestHeader('Authorization', localStorage.Authorization);
                                        },
                                        success: function(result) {
                                            debugger;
                                            var obj = [];
                                            obj.push({ IdRol: 'c3ca039e-9368-4a28-af2b-8f7ae2fefa4d', Action: 'Save' });

                                            $.ajax({
                                                async: false,
                                                url: backandGlobal.url + '/api/Roles/SaveChanges?idUser=' + Id,
                                                type: 'POST',
                                                data: JSON.stringify(obj),
                                                beforeSend: function(xhr) {
                                                    xhr.setRequestHeader('Content-Type', 'application/json');
                                                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                                                },
                                                success: function(data) {
                                                    usuariosIngresados++
                                                }
                                            });
                                        }
                                    });
                                }
                            },
                            error: function(error) {
                                console.log(`Error-->${JSON.stringify(error)}`);
                            }
                        });
                    } else {
                        if (info.EmpresaId == sessionStorage.empresaId) {
                            existenA += info.Email + ","
                        } else {
                            existenO += info.Email + ","
                        }
                    }
                }

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
                $('#uploadUsers').val(null);

                if (user.length > 0) {
                    toastr.info(`Las filas ${user} no tienen diligenciado los campos obligatorios completos para ser guardados (NombreUsuario, Email, Password`, 'Atención')
                }

                if (usuariosIngresados > 0) {
                    toastr.success(`Usuario(s) ${usuariosIngresados} guardado(s) correctamente`, 'Atención');
                }

                if (existenA.length > 0) {
                    toastr.info(`Ya hay usuario(s) registrado con este email ${existenA} en esta aplicacion, por favor contactese con el adminsitrador del sistema para validar esta informacion o cambie el email de este usuario para continuar`, 'Atención');
                }

                if (existenO.length > 0) {
                    toastr.info(`Ya hay usuario(s) registrado con este email ${existenO} en otra aplicacion, por favor contactese con el adminsitrador del sistema para validar esta informacion o cambie el email de este usuario para continuar`, 'Atención');
                }


            }
        }

        reader.onerror = function(ex) {
            $('#uploadUsers').val(null);
            console.log(ex);
        };

        reader.readAsBinaryString(oFile);

        function ValidarCorreo(Email) {
            var x = '';
            //VAIDAR SI CORREO EXISTE
            $.ajax({
                async: false,
                url: `${backandGlobal.url}/api/Users/getStatus?email=${Email}`,
                type: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function(success) {
                    x = success;
                },
                error: function(error) { console.log(`Error-->${JSON.stringify(error)}`); }
            })
            return x;
        }
    })

    $('#actualizarusuarios').change(function(oEvent) {

        debugger;
        //beginAuto = true
        var oFile = oEvent.target.files[0];
        var sFilename = oFile.name;

        //Validar que sea excel
        var separador = sFilename.split('.');
        if (separador[(separador.length) - 1] != 'xlsx') {

            toastr.warning('El archivo debe ser tipo excel');
            $('#actualizarusuarios').val(null);
        } else {


            var reader = new FileReader();
            reader.onload = function(e) {

                var data = e.target.result;
                //puede manejar HTML representado como cadenas
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
                var resultado = Newobject.replace(re, "");

                var Data = JSON.parse(resultado);

                var query = `update Skandias_Lappiz_Users`

                if (Data[i].IDENTIFICATION != "") {

                    query += `SET IDENTIFICATION = ${},`
                }

                if (FULLNAME != "") {

                    query += `SET FULLNAME = ${FULLNAME},`
                }

                if (ADDRESS != "") {

                    query += `SET ADDRESS = ${ADDRESS},`
                }

                if (EMAIL != "") {

                    query += `SET EMAIL = ${EMAIL},`
                }
                if (PHONE != "") {

                    query += `SET PHONE = ${PHONE},`
                }

                if (COMPANIA != "") {

                    query += `SET COMPANIA = ${COMPANIA},`
                }

                if (AREA != "") {

                    query += `SET AREA = ${AREA},`
                }

                if (CONTRASENA != "") {

                    query += `SET CONTRASENA= ${CONTRASENA}`
                }

                query = query.substring(0, query.length - 1);
                query == `WHERE Email= ${EMAIL}`


                /*  var query = `select Identification,UPPER (Email) as Email from Skandias_Lappiz_Users` */

                /* execQuery(query).then(function(edicion) {
                    var dataquery=edicion.data[0];
                    var Nuevoquery = ''
                    for (let i = 0; i < Data.length; i++) {
                        var sw = true

                        for (let j = 0; j < dataquery.length ; j++) {

                            if (Data[i].IDENTIFICATION==dataquery[j].Identification) {                                   
                                   sw=true   
                                   j = dataquery.length                     
                            }
                            else{
                                sw=false
                            } 
                        }
                        if (sw) {                                   
                            Nuevoquery += ` update Skandias_Lappiz_Users
                            set FULLNAME='${Data[i].FULLNAME}',ADDRESS='${Data[i].ADDRESS}',EMAIL='${Data[i].EMAIL}',PHONE='${Data[i].PHONE}',COMPANIA='${Data[i].COMPAÑIA}',AREA='${Data[i].ÁREA}',CONTRASENA='${Data[i].CONTRASEÑA}',ACTIVO=1
                            where EMAIL='${Data[i].EMAIL}'`                           
                        }
                        else{
                            Nuevoquery += `insert into Skandias_Lappiz_Users (Id,IDENTIFICATION,FULLNAME,ADDRESS,EMAIL,PHONE,COMPANIA,AREA,CONTRASENA,ACTIVO)
                            values (NewID(),'${Data[i].IDENTIFICATION}','${Data[i].FULLNAME}','${Data[i].ADDRESS}','${Data[i].EMAIL}','${Data[i].PHONE}','${Data[i].COMPAÑIA}','AREA='${Data[i].ÁREA}','${Data[i].CONTRASEÑA}',1)`
                        }  
                    }
                })  */
            }
        }
    })

    $('#downloadTemplate').click(function() {
        var excelContratos = XLSX.utils.book_new(); // Creando Excel
        excelContratos.Props = { // Cambiando propiedades
            Title: "Skandia-Users",
            Subject: "Plantilla para carga masiva de usuarios",
            Author: "Skandia",
        };
        excelContratos.SheetNames.push("USERS");

        var users = [
            [
                "IDENTIFICATION", "FULLNAME", "ADDRESS", "EMAIL", "PHONE", "COMPAÑÍA", "ÁREA", "CONTRASEÑA", "ACTIVO",
            ]
        ]

        /*XLSX.utils.aoa_to_sheettoma una matriz de matrices de valores JS y devuelve una hoja*/
        var hoja1 = XLSX.utils.aoa_to_sheet(users);

        excelContratos.Sheets["USERS"] = hoja1;
        //exportando

        /*Las funciones exportadas write y writeFile aceptan un argumento de opciones:*/
        var archivo = XLSX.write(excelContratos, {
            bookType: 'xlsx',
            type: 'binary'
        });

        function conversion(s) {

            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        if (confirm('¿Quiere descargar la plantilla de excel?')) {
            /*nombre del archivo de excell*/

            saveAs(new Blob([conversion(archivo)], {
                type: "application/octet-stream"
            }), 'Skandia-Users.xlsx');
        }

    })
    $('#disableUsers').change(function(oEvent) {
        debugger;
        //beginAuto = true
        var oFile = oEvent.target.files[0];
        var sFilename = oFile.name;

        //Validar que sea excel
        var separador = sFilename.split('.');
        if (separador[(separador.length) - 1] != 'xlsx') {

            toastr.warning('El archivo debe ser tipo excel');
            $('#disableUsers').val(null);
        } else {

            var reader = new FileReader();
            reader.onload = function(e) {

                var data = e.target.result;
                //puede manejar HTML representado como cadenas
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
                var resultado = Newobject.replace(re, "");
                var Data = JSON.parse(resultado);
                var query = ""

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

                console.log(Data)
                debugger;

                var actualizadosV = 0;
                var actualizadosA = 0
                if (Data.length > 0) {
                    for (let i = 0; i < Data.length; i++) {
                        if (Data[i].EMAIL != undefined) {
                            let correo = Data[i].EMAIL;
                            query = `SELECT * FROM Skandias_Lappiz_Users WHERE Email = '${correo}'`
                            let result = ajaxQuery(query);

                            if (result.length > 0) {

                                var Id = result[0].Id;

                                var body = {
                                    "UserName": result[0].Email,
                                    "Email": result[0].Email,
                                    "PasswordHash": result[0].Contrasena,
                                    "Id": result[0].Id,
                                    "Activo": false,
                                    "Contrasena": result[0].Contrasena,
                                    "OldPass": result[0].Contrasena
                                }

                                $.ajax({
                                    async: false,
                                    url: backandGlobal.url + `/api/Users/replicateUpd?AppCode=Skandias_Lappiz&languageApp=es`,
                                    type: 'PUT',
                                    data: JSON.stringify(body),
                                    beforeSend: function(xhr) {
                                        xhr.setRequestHeader('Content-Type', 'application/json');
                                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                                    },
                                    success: function(result) {
                                        debugger;
                                        actualizadosV++
                                        query = `UPDATE Skandias_Lappiz_Users SET Activo = 0  WHERE Id = '${Id}'`

                                        var newquery = {
                                            "query": query,
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
                                            success: function(data) {
                                                actualizadosA++
                                            }
                                        });
                                    }
                                });
                            }
                        }

                    }

                    if (actualizadosV == actualizadosA) {
                        toastr.success(`Usuarios deshabilitados correctamente`, 'Atención');
                    } else {
                        //No actualizo en las dos bd
                        toastr.warning(`No se hizo las modificaciones correctamnete, contacte administrador`, 'Atención');
                    }

                } else {
                    toastr.warning(`Archivo sin información`, 'Atención');
                }

                $('#disableUsers').val(null);
            }
        }

        reader.onerror = function(ex) {
            $('#disableUsers').val(null);
            console.log(ex);
        };

        reader.readAsBinaryString(oFile);

        function ajaxQuery(query) {
            var data
            var newquery = {
                "query": query,
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
                success: function(result) {
                    data = result[0];
                },
                error: function(error) {
                    console.log(error)
                }
            })

            return data
        }
    })
}, 2000)