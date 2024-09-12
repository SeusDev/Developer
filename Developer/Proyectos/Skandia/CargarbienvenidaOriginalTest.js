original 

setTimeout(function () {
    debugger
    if (window.location.href.includes('appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e')) {
        $('#AllContent').css({ 'margin-top': '50px' })//bajar menu
        if (sessionStorage.rolesId != 'f4f9ca2b-7fd0-4fb5-a8cb-3a01ae780d23') {


            $("#container > div.btn-menu").hide()//oculta menu menos para el admin
            $('#container > nav').css({ 'left': '-100%' })
            $('#container > div.main-container').css({ 'padding-left': '25px' })
            $('#container > div.main-container > div > section > section > div > div').css("margin", "-46px")//oculta bordes

        }
        debugger
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
        $('.title-section').remove()
        let titulo = evalQuery(`select Titulo from Skandias_Lappiz_ParametrizacionTitulo where CEVista = 'Menú Principal'`)
        $('.header-section').append(`
        <div>

            <div style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Verdana;">
               ${titulo[0].Titulo}
                
            </div>
            <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Anywhere-09.jpg" alt="" class="5">
            </div>
        `)

        if (sessionStorage.rolesId === 'dfe3ad92-19aa-4f73-a87d-c63962677dd6' || sessionStorage.rolesId === 'f4f9ca2b-7fd0-4fb5-a8cb-3a01ae780d23') {
            $('#Reportes').css({ 'display': 'block' })
        }

        $('#AllContent > div.container-main.ng-scope > div.container-card > div:nth-child(10)').css('margin-bottom', '0')
        $("#ReporteSalud").kendoButton({ click: Form });
        $("#ReservaPuesto").kendoButton({ click: Form });
        $("#ReservaReuniones").kendoButton({ click: Form });
        $("#Solicitudes").kendoButton({ click: Form });
        $("#NovedadesSalud").kendoButton({ click: Form });
        $("#Beneficios").kendoButton({ click: Form });
        $("#Question").kendoButton({ click: Form });
        $("#btnReportes").kendoButton({ click: Form });
        $("#Politicas").kendoButton({ click: Form });

        function Form(e) {
            e.preventDefault();
            console.clear();

            if (this.element[0].id == "ReporteSalud") {
                location.assign(`#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&viewMenu&appViewId=6c573d8b-7812-400f-b5a7-f9014e726b04`) //Reporte diario de salud
            } else if (this.element[0].id == "ReservaPuesto") {
                location.assign(`#/forms?viewName=Skandias_Lappiz_ReservaDePuesto&entityId=47981612-3721-48ac-99eb-9367114a6127&viewMenu&appViewId=cb77d1fd-9464-496a-8f32-3c698da7a4c4`) //Reserva de Puesto
            } else if (this.element[0].id == "ReservaReuniones") {
                location.assign(`#/forms?viewName=Skandias_Lappiz_ReservaSaladeReuniones&entityId=e9f31bdc-b18a-4931-85ce-bb0ebc5b7e4c&viewMenu&appViewId=ae653b0e-c1c4-4869-a088-e98177c90adc`) //Reserva de Puesto
            } else if (this.element[0].id == "Solicitudes") {
                location.assign(`#/forms?viewName=Skandias_Lappiz_SolicitudesDeIngresoSinReserva&entityId=38eb5600-1b9d-48f4-b915-5ee729011a83&viewMenu&appViewId=964ee09c-1339-4ee4-94fa-a8fee7199c7a`) //Reserva de Puesto
            } else if (this.element[0].id == "btnReportes") {
                location.assign(`#/forms?viewName=Skandias_Lappiz_Users&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&viewMenu&appViewId=e34ee7bb-1142-4350-bc6e-13a81280b653`)
            } else if (this.element[0].id == "Politicas") {
                $(`#Modal`).modal('show');
            }
        }
    } else if (location.href.includes('appViewId=e34ee7bb-1142-4350-bc6e-13a81280b653')) {
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
        $('.title-section').remove()
        $('.header-section').append(`
        <div style="text-align: center;">
            <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: black !important;font-weight: bold;font-family: Verdana;">
                Reportes</h1>
            <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Generico.jpg" alt="Sin Imagen">
        </div>
        `)
        $("#Back").kendoButton({ click: Back });
        function Back(e) {
            e.preventDefault();
            console.clear();
            history.back()
        }

        $("#EncuestaSalud").kendoButton({ click: ingresar });
        function ingresar(e) {
            e.preventDefault();
            location.assign(`#/forms?viewName=Skandias_Lappiz_EncuestasDeSalud&entityId=dc89bad0-5a57-42b1-a446-259ba32fee50&viewMenu&appViewId=9da0cec2-65a6-4df8-9500-ed536b9a2046`)
        }

        $("#ReservaPuestos").kendoButton({ click: ingresarReserva });
        function ingresarReserva(e) {
            e.preventDefault();
            location.assign(`#/forms?viewName=Skandias_Lappiz_ReporteReservaPuestos&entityId=c250aadc-ac0b-4e5e-bed1-14ca93a2d5ca&viewMenu&appViewId=2f1fff85-c19a-4ea0-b394-3e9cd3c01c3f`)
        }

        $("#ReservaSalas").kendoButton({ click: ingresarReservaSala });
        function ingresarReservaSala(e) {
            e.preventDefault();
            location.assign(`#/forms?viewName=Skandias_Lappiz_ReporteReservaSalas&entityId=988e5d69-329d-41a3-a3b6-e6bd0327bef3&viewMenu&appViewId=46942553-4350-40bf-aa64-d9c3cf41b1a6`)
        }

    }

    function evalQuery(Query) {
        var Response = ''
        $.ajax(
            {
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: 'POST',
                data: JSON.stringify(
                    {
                        query: Query,
                        parameters:
                        {
                            aType: "execTx",
                            environment: `${backandGlobal.environment}`
                        }
                    }
                ),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (x) {
                    Response = x[0];
                }
            }
        );
        return Response;
    }
    
    if(window.document.location.href.includes('testbeta')){
    debugger;
    $('.container-card')[0].style.display='block' 
    
    //Estilos card pagina principal
     var nuevoCSS = { "vertical-align": 'middle',"border-style": 'none',"max-width": '30%',"display": 'flex',"margin-left": '35%'};
    $(".1").css(nuevoCSS);

    var nuevoCSS = { "vertical-align": 'middle',"border-style": 'none',"max-width": '30%',"display": 'flex',"margin-left": '35%'};
    $(".3").css(nuevoCSS);

    var nuevoCSS = { "vertical-align": 'middle',"border-style": 'none',"max-width": '25%',"display": 'flex',"margin-left": '35%'};
    $(".2").css(nuevoCSS);
    
    var nuevoCSS = { "vertical-align": 'middle',"border-style": 'none',"max-width": '17%',"display": 'flex',"margin-left": '40%'};
    $(".4").css(nuevoCSS);
    
    var nuevoCSS = { "width":'100%',"max-width":'100%',"height":'14rem',"display":'block',"margin": '177px auto'};
    $(".5").css(nuevoCSS);
    
    }

}, 800);