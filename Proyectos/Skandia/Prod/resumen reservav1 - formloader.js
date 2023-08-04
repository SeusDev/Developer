/* versionamiento */

setTimeout(function() {
    debugger;
    var data = e.dataItem
    if (window.location.href.includes('appViewId=7d8e05c5-d983-406f-956c-4264c1d6b2a2')) {


        $("#container > div.main-container > div > section > section > div > div > div > div > div.title-section > h5").hide() //Ocultar texto ">Formulario"
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
        $('.title-section').remove()
        $('.header-section').append(`          
         <div style="text-align: center;">              
         <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: black !important;font-weight: bold;font-family: Montserrat;">                  
         Reserva sala de reuniones</h1>              
         <img class="Imagen" src="https://runtime.lappiz.io/assets/img/Generico.jpg" alt="Sin Imagen">          
         </div>          
         `)

        $("#Back").click(function() {
            debugger;
            location.assign(`#/forms?viewName=Skandias_Lappiz_DeafultView&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&viewMenu=undefined&appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e`);
        });

        var idSede = data.Sede
        var idSolicitante = data.UsuarioFk
        var jornada = data.Horario
        var fecha = moment(data.DiaReunion).utc().format('MM/DD/YYYY')
        fecha = new Date(fecha);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };


        //var Sede = evalQuery(`select * from Skandias_Lappiz_Sedes where Id = '${idSede}'`)
        //var Solicitante = evalQuery(`select * from Skandias_Lappiz_Users where Id ='${idSolicitante}'`)
        // numReserva = evalQuery(`select * from Skandias_Lappiz_ReservaDePuesto where Id = '${data.Id}'`)

        var Query = evalQuery(`exec Skandias_Lappiz_Resumen_Sala '${data.Id}'`)
        var tiempo = evalQuery(`select Tiempo from Skandias_Lappiz_TiempoReuniones where Id = '${data.TiempoReunionFk}'`)[0].Tiempo


        //$('#Oficina').text("Oficina " + Query[0].CESede)
        //$('#Cliente').text(Query[1].FullName)
        $('#Fecha').text(fecha.toLocaleDateString("es-ES", options))
            //$('#Horario').text(jornada)

        $('#AllContent > div').append(`
        <style>
            .card-title {
                margin-bottom: 2.75rem;
                margin-top: 30px;
                text-align-last: auto;
        
            }
        
            .card-text {
                margin: -12px 0 10px;
                text-align-last: start;
            }
        
            * {
                margin: 0;
                padding: 0;
                font-family: Roboto, sans-serif;
                font-size: 15px;
            }
        
            .row {
                text-align-last: center;
            }
        
            @media only screen and (max-width: 820px) {
                .MenuOptns {
                    width: 100%;
                    margin-bottom: 10px;
                    margin: inherit;
                }
            }
        
            @media (min-width: 1200px) {
                .container {
                    width: 981px;
                }
            }
        </style>
    
    <body>
        <div class="container">
            <div class="card text-center">
    
                <div class="card-body">
                    <h4 class="card-title">Tu reserva de sala de reuniones se generó correctamente</h4>
                    <p class="card-text" id="Reserva">-Tu reserva es la ${Query[0].NumeroReserva}</p>
                    <p class="card-text" id="Oficina">-Oficina ${Query[1].CESede} </p>
                    <p class="card-text" id="Fecha"></p>
                    <p class="card-text" id="Horario">-Horario: ${Query[0].CEDescripcion}</p>
                    <p class="card-text" id="Duracion">-Duracion de la reunion: ${tiempo}</p>
                    <p class="card-text" id="Sala">-Sala:  ${Query[3].NombreSala} </p>
                    <p class="card-text" id="Capacidad">-Capacidad ${Query[3].CantidadPersonas} Personas</p><br><br><br>
                    <p class="card-text" style="font-size: small;text-align: -webkit-left;">¿Algo por adicionarle a tu reserva?</p>
                    <p class="card-text" style="font-size: small;text-align: -webkit-left;">Llámanos al 3144110309</p>
                    <p class="card-text" style="font-size: small;text-align: -webkit-left;">Lun - Vie (8am - 5pm)</p>
                    <h5 class="card-title">¡Gracias por tu colaboración!</h5>
                </div>
            </div>
        </div>
        <div class="row">
            <button class="MenuOptns" type="button" id="Back" OnClick="Home(event)"
                style="background-color: #00c83c !important;">
                <img class="Imagen" style="width: 4%;" src="https://runtimetest.lappiz.io/assets/img/Regresar.png"
                    alt="Sin Imagen">
                <span class="Texto" style="margin-left:10px">Regresar al inicio</span>
            </button>
        </div>
    </body>
    <script>
            
        function Home(e) {
            location.assign('#/forms?viewName=Skandias_Lappiz_DeafultView&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e') //Home
        }
    </script>
        `)

        function evalQuery(Query, Type) {
            debugger;
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
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function(x) {
                    Response = x[0];
                }
            });
            return Response;
        }

    }
}, 200);