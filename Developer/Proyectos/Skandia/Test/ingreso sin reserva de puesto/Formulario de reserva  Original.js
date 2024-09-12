/* Formulario de reserva */
setTimeout(function () {
    debugger;
    if (window.location.href.includes('appViewId=afb91bb7-1fcb-485c-a5d5-c45c3bbaacae')) {
        debugger;

        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
        $('.title-section').remove()
        $('.header-section').append(`
    <div style="text-align: center;">
        <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">
        Solicitud de ingreso sin reserva de puesto</h1>
        <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/ReportedeSaludDiariohomeoffice.jpg" alt="Sin Imagen">
    </div>
    `)


        $("#Save").kendoButton({ click: Save });
        $("#Back").kendoButton({ click: Back });

        function Back(e) {
            e.preventDefault();
            console.clear();
            history.back()
        }


        function Save(e) {
            debugger;
            console.clear();
            e.preventDefault();
            var Fecha = $("#eb42b06f-8f3b-4ce3-a27c-831fde791f04 > div.dx-dropdowneditor-input-wrapper > div > input").val()
            //new Date($("#eb42b06f-8f3b-4ce3-a27c-831fde791f04 > div.dx-dropdowneditor-input-wrapper > div > input").val()).toString('dd/MM/yyyy')
            Fecha = Fecha.replaceAll('-', '/');
            var Dia = Fecha.split('/')[0]
            var Mes = Fecha.split('/')[1]
            var Anio = Fecha.split('/')[2]
            Fecha = new Date(`${Mes}/${Dia}/${Anio}`).format('Y-m-d') + 'Z'

            var Hora = $('#start').val()
            
            /* $('#time > div.dx-dropdowneditor-input-wrapper > div > input').val() */

            var dataItem = {
                "Fecha": Fecha,
                "Hora": Hora,
                "IngrsoReservaFk": sessionStorage.IdSolicitud,
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

            clean(dataItem)

            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Skandias_Lappiz_SolicitudesDeIngresoSinReserva`,
                type: 'POST',
                data: JSON.stringify(dataItem),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (success) {

                    console.log('guardado')
                    location.assign(`#/forms?rowId=${success.Id}&viewName=Skandias_Lappiz_SolicitudesDeIngresoSinReserva&entityId=38eb5600-1b9d-48f4-b915-5ee729011a83&viewMenu&appViewId=b0d3fbbc-f041-4d6a-a499-86abb66f96bc`) //Resumen

                },
                error: function (error) { console.log(`Error-->${JSON.stringify(error)}`); }
            })
        }

        function clean(obj) {
            for (var prop in obj) {
                if (obj[prop] === "" || obj[prop] === undefined || obj[prop] === null) {
                    delete obj[prop];
                }
            }
        }

    }
    function evalQuery(Query) {
        var Response = ''
        $.ajax({
            async: false,
            url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
            type: 'POST',
            data: JSON.stringify({
                query: Query,
                parameters: {
                    aType: "execTx",
                    environment: `${backandGlobal.environment}`
                }
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', localStorage.Authorization);
            },
            success: function (x) {
                Response = x[0];
            }
        });
        return Response;
    }
}, 350);