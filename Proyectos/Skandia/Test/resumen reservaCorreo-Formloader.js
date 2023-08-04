setTimeout(function() {
    debugger;
    var data = e.dataItem
    if (window.location.href.includes('appViewId=7d8e05c5-d983-406f-956c-4264c1d6b2a2')) {


        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
        $('.title-section').remove()
        $('.header-section').append(`          
         <div style="text-align: center;">              
         <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Montserrat;">                  
         Reserva sala de reuniones</h1>              
         <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Reservadepuesto.jpg" alt="Sin Imagen">          
         </div>          
         `)

        $("#Back").click(function() {
            debugger;
            location.assign(`#/forms?workspaceId=30042d5a-040b-4a9f-bf81-0db631987230&viewName=Skandias_Lappiz_DeafultView&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&viewMenu=undefined&appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e`);
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

        $('#infoResumen').append(`
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