setTimeout(function () {
    debugger;

    if (!window.location.href.includes('9da0cec2-65a6-4df8-9500-ed536b9a2046')) {

        if (window.location.href.includes('appViewId=804ba3af-5f2e-4839-8bdb-ee4e1b4dc869')) {
            $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
            $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
            $('.title-section').remove()
            $('.header-section').append(`
            <div style="text-align: center;">
            <!-- <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">
            Reporte de Salud Diario</h1> -->
                <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Anywhere-06.jpg" alt="Sin Imagen">
            </div>
        `)
        }
        if (window.location.href.includes('appViewId=f1f849b8-97d4-4513-aa55-cddf02d9a0ba')) {
            $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
            $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
            $('.title-section').remove()
            $('.header-section').append(`
        <div style="text-align: center;">
            <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">
                Confirmación</h1>
            <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Fondo-Salud.jpg" alt="Sin Imagen">
        </div>
        `)
        }
        if (window.location.href.includes('appViewId=6c573d8b-7812-400f-b5a7-f9014e726b04')) {
            $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
            $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
            $('.title-section').remove()
            $('.header-section').append(`
        <div style="text-align: center;">
        <!-- <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">
        Reporte de Salud Diario</h1> -->
            <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Anywhere-05.jpg" alt="Sin Imagen">
        </div>
        `)
        }
        if (window.location.href.includes('appViewId=ac7f437d-c43b-4e2e-828c-bfa8086c3b29')) {
            $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
            $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
            $('.title-section').remove()
            $('.header-section').append(`
        <div style="text-align: center;">
            <!-- <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">
            Reporte de Salud Diario</h1> -->
            <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Anywhere-07.jpg" alt="Sin Imagen">
        </div>
        `)
        }


        if (window.location.href.includes('appViewId=6c573d8b-7812-400f-b5a7-f9014e726b04')) {
            $('#AllContent > div.container-main.ng-scope > div.container-card > div:nth-child(3)').css('margin-bottom', '0')
        } else if (window.location.href.includes('appViewId=ac7f437d-c43b-4e2e-828c-bfa8086c3b29')) {
            $('#AllContent > div.container-main.ng-scope > div.container-card > div:nth-child(10)').css('margin-bottom', '0')
            let data = ajaxQuery("select * from Skandias_Lappiz_Sedes")

            $("#8d446930-b2a3-4d0b-9a39-76096d562f00").kendoDropDownList({
                autoBind: false,
                optionLabel: "Seleccione una sede...",
                dataTextField: "CESede",
                dataValueField: "Id",
                dataSource: {
                    data: data
                }
            }).data("kendoDropDownList");
        } else if (window.location.href.includes('appViewId=804ba3af-5f2e-4839-8bdb-ee4e1b4dc869')) {
            $('#AllContent > div.container-main.ng-scope > div.container-card > div:nth-child(6)').css('margin-bottom', '0')
        }

        $("#Presencial").kendoButton({ click: Form });
        $("#Remoto").kendoButton({ click: Form });
        $("#Back").kendoButton({ click: Back });
        $("#Save").kendoButton({ click: Save });
        $("#Home").kendoButton({ click: Home });


        function Back(e) {
            e.preventDefault();
            console.clear();
            history.back()
            var url = '#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&viewMenu=&appViewId=6c573d8b-7812-400f-b5a7-f9014e726b04';
            goLocation(url);
        }

        function Home(e) {
            /* location.assign(`#/forms?viewName=Skandias_Lappiz_DeafultView&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e`) //Home */
            var url = '#/forms?viewName=Skandias_Lappiz_DeafultView&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e';
            goLocation(url); // Beta
        }

        function Save(e) {
            e.preventDefault();
            console.clear();

            if (!window.location.href.includes('804ba3af-5f2e-4839-8bdb-ee4e1b4dc869')) {
                if ($("#8d446930-b2a3-4d0b-9a39-76096d562f00").val() == '') {
                    toastr.error("La sede es obligatoria", 'Recuerde')
                    return
                }
            }

            // navigator.geolocation.getCurrentPosition(success, error)

            // function success(position) {

            //     var geo = `[${position.coords.latitude},${position.coords.longitude}]`

            var temperatura = $("#cc9a9dc0-544a-4994-9c41-d6daf6b153f5").val()
            if (temperatura.includes(",")) {
                temperatura = temperatura.replace(",", ".")
            }
            var dataItem = {
                "Temperatura": temperatura,
                "Fiebre": $("#Fiebre").is(':checked') == true ? 'Si' : 'No',
                "Tos": $("#Tos").is(':checked') == true ? 'Si' : 'No',
                "DolorCabeza": $("#DolorCabeza").is(':checked') == true ? 'Si' : 'No',
                "DolorGarganta": $("#DolorGarganta").is(':checked') == true ? 'Si' : 'No',
                "MalestarGeneral": $("#MalestarGeneral").is(':checked') == true ? 'Si' : 'No',
                "DificultadRespirar": $("#DificultadRespirar").is(':checked') == true ? 'Si' : 'No',
                "SecrecionesNasales": $("#SecrecionesNasales").is(':checked') == true ? 'Si' : 'No',
                "Diarrea": $("#Diarrea").is(':checked') == true ? 'Si' : 'No',
                "Ninguno": $("#Ninguno").is(':checked') == true ? 'Si' : 'No',
                "ContactoReciente": $('input:radio[name=ContactoReciente]:checked').val(),
                "Covid": $('input:radio[name=Covid]:checked').val(),
                "Observacion": $("#SectionsFields > div > div > ng-form > textarea").val(),
                "RealizoLavado": $('input:radio[name=RealizoLavado]:checked').val() != undefined ? $('input:radio[name=RealizoLavado]:checked').val() : "",
                "RecibioEPP": $('input:radio[name=RecibioEPP]:checked').val() != undefined ? $('input:radio[name=RecibioEPP]:checked').val() : "",
                "UsuarioFk": sessionStorage.userId,
                "tenantId": "null",
                "parameters": {
                    "userId": sessionStorage.userId,
                    "tablaId": "",
                    "appViewId": window.location.href.split('appViewId=')[1],
                    "actionId": "00000000-0000-0000-0000-000000000000",
                    "pType": "Guardar",
                    "aType": "view",
                    "environment": backandGlobal.environment,
                    "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
                }
            }

            if (!window.location.href.includes('804ba3af-5f2e-4839-8bdb-ee4e1b4dc869')) {
                Object.assign(dataItem, { "SedeFk": $("#8d446930-b2a3-4d0b-9a39-76096d562f00").val() })
            }

            clean(dataItem)

            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Skandias_Lappiz_EncuestasDeSalud`,
                type: 'POST',
                data: JSON.stringify(dataItem),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (success) {

                    var Id = success.Id
                    /*toastr.success(`Se guardaron los siguientes sintomas: <br>
                    Temperatura : <strong>${success.Temperatura} </strong>, <br>
                    Fiebre : <strong>${success.Fiebre} </strong>, <br>
                    Tos : <strong>${success.Tos} </strong>, <br>
                    DolorCabeza : <strong>${success.DolorCabeza} </strong>, <br>
                    DolorGarganta : <strong>${success.DolorGarganta} </strong>, <br>
                    MalestarGeneral : <strong>${success.MalestarGeneral} </strong>, <br>
                    DificultadRespirar : <strong>${success.DificultadRespirar} </strong>, <br>
                    SecrecionesNasales : <strong>${success.SecrecionesNasales} </strong>, <br>
                    Diarrea : <strong>${success.Diarrea} </strong>, <br>
                    Ninguno : <strong>${success.Ninguno} </strong> <br>
        
                    Observacion : ${success.Observacion ? success.Observacion : ''}`, 'Se guardó el registro satisfactoriamente', { "closeButton": true, "timeOut": "0", "tapToDismiss": true })*/

                    if ($('input:radio[name=Covid]:checked').val() == "Si") {
                        var email = JSON.parse(sessionStorage.LappizUser).Email
                        sendEmail(email, "Persona con covid", `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem corporis aut cum recusandae similique exercitationem modi ullam unde alias facere omnis, explicabo pariatur repellendus dicta quis? Labore dolorum dignissimos nostrum?
                        `, "").then(function (respuesta) {


                        });
                    }
                    setTimeout(() => {

                        var tipo = ""
                        if (location.href.includes("appViewId=804ba3af-5f2e-4839-8bdb-ee4e1b4dc869")) {
                            tipo = "Home"
                        } else {
                            tipo = "Oficina"
                        }
                        let cuerpo = ajaxQuery(` EXEC [Skandias_Lappiz_ReplaceEmailEncuestaSalud] '${Id}', '${tipo}'`)

                        debugger
                        if ($("#SectionsFields > div > div > ng-form > textarea").val() == " ") {
                            $("#SectionsFields > div > div > ng-form > textarea").val() = undefined
                        }

                        if (parseInt($("#cc9a9dc0-544a-4994-9c41-d6daf6b153f5").val()) >= 37 ||
                            $("#Fiebre").is(':checked') == true ||
                            $("#Tos").is(':checked') == true ||
                            $("#DolorCabeza").is(':checked') == true ||
                            $("#DolorGarganta").is(':checked') == true ||
                            $("#MalestarGeneral").is(':checked') == true ||
                            $("#DificultadRespirar").is(':checked') == true ||
                            $("#SecrecionesNasales").is(':checked') == true ||
                            $("#Diarrea").is(':checked') == true ||
                            $('input:radio[name=ContactoReciente]:checked').val() == "Si" || $("#SectionsFields > div > div > ng-form > textarea").val() != undefined) {
                            //location.assign(`#/forms?workspaceId=30042d5a-040b-4a9f-bf81-0db631987230&viewName=Skandias_Lappiz_DeafultView&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&viewMenu=undefined&appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e`) //Presencial
                            var email
                            if (window.location.href.includes('appViewId=ac7f437d-c43b-4e2e-828c-bfa8086c3b29')) {
                                email = 'smmesa@skandia.com.co'
                            } else {
                                email = 'amgonzalez@skandia.com.co'
                            }

                            sendEmail(cuerpo[0].Destinatarios, cuerpo[0].Asunto, '', cuerpo[0].Cuerpo).then(function (respuesta) {
                                toastr.info('Se ha notificado la solicitud de ingreso');
                                debugger

                            });
                        }

                        /* location.assign(`#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&viewMenu&appViewId=f1f849b8-97d4-4513-aa55-cddf02d9a0ba`) */

                        var url = '#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&viewMenu&appViewId=f1f849b8-97d4-4513-aa55-cddf02d9a0ba';
                        goLocation(url);



                    }, 1000);
                },
                error: function (error) { console.log(`Error-->${JSON.stringify(error)}`); }
            })
            // }

            // function error(error) {
            //     switch (error.code) {
            //         case error.PERMISSION_DENIED:
            //             toastr.error("Para diligenciar la encuesta debe aceptar la geolocalización", "Recuerde")
            //             break;
            //         case error.POSITION_UNAVAILABLE:
            //             console.log(error.POSITION_UNAVAILABLE)
            //             break;
            //         case error.TIMEOUT:
            //             console.log(error.TIMEOUT)
            //             break;
            //         case error.UNKNOWN_ERROR:
            //             console.log(error.TIMEOUT)
            //             break;
            //     }
            // }



        }

        function clean(obj) {
            for (var prop in obj) {
                if (obj[prop] === "" || obj[prop] === undefined || obj[prop] === null) {
                    delete obj[prop];
                }
            }
        }

        function Form(e) {

            e.preventDefault();
            console.clear();

            if (this.element[0].id == "Presencial") {
                /* location.assign(`#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&appViewId=ac7f437d-c43b-4e2e-828c-bfa8086c3b29`) //Presencial */
                var url = '#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&appViewId=ac7f437d-c43b-4e2e-828c-bfa8086c3b29';
                goLocation(url); //Presencial Beta


            } else if (this.element[0].id == "Remoto") {
                /* location.assign(`#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&appViewId=804ba3af-5f2e-4839-8bdb-ee4e1b4dc869`) //Remoto */
                var url = '#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&appViewId=804ba3af-5f2e-4839-8bdb-ee4e1b4dc869';
                goLocation(url); //Remoto Beta
            }
        }

        function ajaxQuery(params) {

            let newquery = {
                "query": params,
                "parameters": {
                    "aType": "execTx",
                    "environment": `${backandGlobal.environment}`
                }
            }
            let data

            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: 'POST',
                data: JSON.stringify(newquery),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (result) {
                    debugger

                    data = result[0]

                },
                error: function (error) {
                    console.log(error)
                }

            })

            return data
        }
        
                // actualizacion beta
        if(window.document.location.href.includes('testbeta')){
            debugger;
            
            $('.container-card')[0].style.display='block'
            
            var nuevoCSS = { "vertical-align": 'middle',"border-style": 'none',"max-width": '30%',"display": 'flex',"margin-left": '35%'};
            $(".1").css(nuevoCSS);
            
        }
        
    }
}, 350);