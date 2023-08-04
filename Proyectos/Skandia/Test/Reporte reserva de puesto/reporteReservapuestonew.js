/* reporteReservapuestonew */

function ajaxQuery(query) {

    let data

    let newquery = {

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

            data = result[0]

        },

        error: function(error) {

            console.log(error)

        }

    })



    return data

}


/*if (location.href.includes("9da0cec2-65a6-4df8-9500-ed536b9a2046")) {*/
setTimeout(function() {
    debugger
    console.clear()
    var fechaInicio = $("#2e0d11b6-108e-407a-9d8d-2bb5af6d99e3 > div > div > input")[0].value
    var fechaFin = $("#7116a435-b8e4-46a7-99c1-f4b9d841e91b > div > div > input")[0].value
    fechaInicio = fixDate(fechaInicio)
    fechaFin = fixDate(fechaFin)
    var sede = $('#2354b8ff-521b-4cb9-a8e8-9364b352499b').val()
    var querySede = ``
    if (sede != null || sede != undefined) {
        querySede = ` reserva.SedeFK = '${sede}' AND `
    }
    var query = `SELECT
    format (reserva.FechaAsistirOficina,'yyyy-MM-dd') [Fecha],
    reserva.NumerodeReserva [Reserva],
    users.Identification [Identificacion],
    users.FullName [Nombre],
    users.Email,
    ISNULL(asiento.CENombreAsiento, 'Puesto fijo') [Asiento],
    ubicacion.CENombreUbicacion [Ubicacion],
    pisos.CENombre [Piso],
    sedes.CESede [Sede],
    ISNULL(reserva.TomarAlmuerzoOficina,'') [Almuerzo],
    ISNULL(reserva.Enquehorario,'') [HoraAlmuerzo],
    ISNULL(reserva.TomarParqueadero,'') [Parqueadero],
    jornada.Jornada
    FROM Skandias_Lappiz_ReservaDePuesto reserva
    LEFT JOIN Skandias_Lappiz_Asientos asiento on asiento.Id = reserva.AsientoFK
    LEFT JOIN Skandias_Lappiz_Ubicacion ubicacion on ubicacion.Id = asiento.UbicacionFK
    LEFT JOIN Skandias_Lappiz_Pisos pisos on pisos.Id = ubicacion.PisoFK
    LEFT JOIN Skandias_Lappiz_Sedes sedes on sedes.Id = pisos.SedeFK
    JOIN Skandias_Lappiz_Users users on reserva.SolicitanteFk = users.Id
    JOIN Skandias_Lappiz_JornadaAsistencia jornada on jornada.Id = reserva.JornadaFk
    WHERE ${querySede} (reserva.FechaAsistirOficina BETWEEN '${fechaInicio}' AND '${fechaFin}')`
    var data = ajaxQuery(query)
    debugger;

    if (data.length > 0) {

        $('#GridReservaPuesto').kendoGrid({
            dataSource: {
                data: data,
                autoSync: true,
                schema: {
                    model: {
                        fields: {
                            Fecha: { type: "string", editable: false },
                            Reserva: { type: "string", editable: false },
                            Identificacion: { type: "string", editable: false },
                            Nombre: { type: "string", editable: false },
                            Email: { type: "string", editable: false },
                            Asiento: { type: "string", editable: false },
                            Ubicacion: { type: "string", editable: false },
                            Piso: { type: "string", editable: false },
                            Sede: { type: "string", editable: false },
                            Almuerzo: { type: "string", editable: false },
                            HoraAlmuerzo: { type: "string", editable: false },
                            Parqueadero: { type: "string", editable: false },
                            Jornada: { type: "string", editable: false },
                        },
                    },
                },
                sort: [{ field: "Reserva", dir: "asc" }],
            },
            height: 450,
            scrollable: true,
            sortable: true,
            filterable: true,
            resizable: true,
            pageable: {
                pageable: true,
                previousNext: false,
                pageSize: 10,
                alwaysVisible: true,
                numeric: true,
                buttonCount: 5
            },
            dataBound: function() {
                for (var i = 0; i < this.columns.length; i++) {
                    this.autoFitColumn(i);
                }
            },
            columns: [
                { field: "Fecha", title: "Fecha" },
                { field: "Reserva", title: "Reserva" },
                { field: "Identificacion", title: "Identificacion" },
                { field: "Nombre", title: "Nombre" },
                { field: "Email", title: "Email" },
                { field: "Asiento", title: "Asiento" },
            ],
        });


    } else {

        toastr.info('las fechas ingresadas no obtienen información')

    }

    function fixDate(fecha) {
        var fechaSplit = fecha.split('/')
        fecha = fechaSplit[2] + '-' + fechaSplit[1] + '-' + fechaSplit[0] + '  05:00:00.000'
        return fecha
    }
}, 850);