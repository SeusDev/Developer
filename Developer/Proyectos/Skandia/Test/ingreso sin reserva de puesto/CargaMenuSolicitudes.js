/* Casrga menu solicitudes */

setTimeout(function () {
    debugger;
    if (window.location.href.includes('appViewId=964ee09c-1339-4ee4-94fa-a8fee7199c7a')) {
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
        $('.title-section').remove()
        $('.header-section').append(`
        <div style="text-align: center;">
            <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">
            Solicitudes de ingreso sin reserva de puesto</h1>
            <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/ReportedeSaludDiariohomeoffice.jpg" alt="Sin Imagen">
        </div>
        `)

        $("#ContainerOpciones").on("click", ".btn-ingresar", function () {
            debugger
            sessionStorage.IdSolicitud = this.id
            sessionStorage.Sede = this.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
            location.assign(`#/forms?viewName=Skandias_Lappiz_SolicitudesDeIngresoSinReserva&entityId=38eb5600-1b9d-48f4-b915-5ee729011a83&viewMenu&appViewId=afb91bb7-1fcb-485c-a5d5-c45c3bbaacae`)
        });

        $("#Back").kendoButton({ click: Back });

        function Back(e) {
            e.preventDefault();
            console.clear();
            history.back()
        }

        $.ajax({
            async: false,
            url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
            type: 'POST',
            data: JSON.stringify({
                query: `select Id,Nombre,NombreIcono from Skandias_Lappiz_IngresoSinReserva`,
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
                var Response = x[0];
                let html = ""
                // $('#AllContent > div').append(`<h3 style="color : #00c83c;font-size: 1.7em;text-align-last: center;margin-block-end: 20px;">Elige una opción</h3>`)
                for (let i = 0; i < Response.length; i++) {

                    html += `<div class="card">
                            <div class="title-container-card">
                                <p class="title-card">
                                    ${Response[i].Nombre}
                                </p>
                            </div>
                            <div class="card-subcontent">
                                <div class="card-icon">
                                    <img src="https://runtimetest.lappiz.io/assets/img/${Response[i].NombreIcono}.png" alt="Sin Imagen">
                                </div>
                                <div class="card-description">
                                    <div class="description">
                                        
                                    </div>
                                    <div>
                                        <button class="btn-ingresar" id="${Response[i].Id}">Ingresar</button>
                                    </div>
                                </div>
                            </div>
                        </div>`


                }
                $('#ContainerOpciones').append(html)

            }
        });
    }
}, 350);