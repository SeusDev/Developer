var data = e.dataItem
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1].split('&')[0]
    //Lista Picking
if (idVista == '50433a15-2349-4121-b2a2-76fc053d3ab9') {
    setTimeout(function() {
        debugger;
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)').remove()
        $('#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)').remove()
        $('.title-section').remove()
        $('.header-section').append(`          
         <div style="text-align: center;">              
         <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: white !important;font-weight: bold;font-family: Montserrat;">                  
         Reserva de puesto</h1>              
         <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Fondo-puesto.jpg" alt="Sin Imagen">          
         </div>          
         `)
        $("#Back").click(function() {
            debugger;
            location.assign(`#/forms?viewName=Skandias_Lappiz_DeafultView&entityId=98d25e73-8dbb-4d69-afe6-4b4c7e9a6db7&viewMenu=undefined&appViewId=7a4326f8-2fc0-4555-95ab-ee5d211d5c6e`);
        });

        debugger;
        var urlRequest = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`;
        let Query = {
            "query": `Select RP.NumerodeReserva, S.CESede,FORMAT(RP.FechaAsistirOficina,'dd-MM-yyyy') FechaAsistirOficina, JA.Jornada,P.CENombre, U.CENombreUbicacion, A.CENombreAsiento, RP.TomarAlmuerzoOficina, RP.TomarParqueadero, isnull(Enquehorario,'N/A') Horario
            from Skandias_Lappiz_ReservaDePuesto RP
            join Skandias_Lappiz_Asientos A on RP.AsientoFK =A.Id
            Join Skandias_Lappiz_Ubicacion U on A.UbicacionFK = U.Id
            Join Skandias_Lappiz_Pisos P on U.PisoFK = P.Id
            join Skandias_Lappiz_Sedes S on P.SedeFK = S.Id
            join Skandias_Lappiz_JornadaAsistencia JA on RP.JornadaFk = JA.Id
            where RP.Id = '${sessionStorage.Id}'`,
            "tenantId": "null",
            "parameters": {
                "aType": "execTx",
                "environment": `${backandGlobal.environment}`

            }
        }

        $.ajax({
            async: false,
            url: urlRequest,
            type: "POST",
            data: JSON.stringify(Query),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", localStorage.Authorization);
            },
            success: function(result) {
                var html = `
                    <p class="card-text" >Tu reserva es la ${result[0][0].NumerodeReserva}</p>
                    <p class="card-text">Sede: ${result[0][0].CESede}</p>
                    <p class="card-text">Fecha: ${result[0][0].FechaAsistirOficina}</p>
                    <p class="card-text">Jornada: ${result[0][0].Jornada}</p>
                    <p class="card-text">Piso: ${result[0][0].CENombre}</p>
                    <p class="card-text">Ubicación: ${result[0][0].CENombreUbicacion}</p>
                    <p class="card-text">Asiento: ${result[0][0].CENombreAsiento}</p>
                    <p class="card-text">Almuerzo en la oficina: ${result[0][0].TomarAlmuerzoOficina}</p>
                    <p class="card-text">Hora de almuerzo: ${result[0][0].Horario}</p>
                    <p class="card-text">¿Hará uso del parqueadero? : ${result[0][0].TomarParqueadero}</p>
                `;
                $('#infoResumen').append(html);
            },
            error: function(error) {
                toastr.error("Hubo un error al eliminar el registro");
            },
        });

    }, 350);
}