/*if (location.href.includes("9da0cec2-65a6-4df8-9500-ed536b9a2046")) {*/
setTimeout(function() {
    debugger
    console.clear()
    var fechaInicio = $("#0f930476-7db2-4d3a-a6bc-ec5b1aa5617e > div > div > input")[0].value
    var fechaFin = $("#f867133d-f2cd-49dd-a469-cc9829e04e62 > div > div > input")[0].value
    fechaInicio = fixDate(fechaInicio)
    fechaFin = fixDate(fechaFin)
    var sede = $('#63b5db43-b733-4e5c-9b1b-3e93bb23b90d').val()
    var querySede = ``
    if (sede != null || sede != undefined) {
        querySede = ` sedes.Id = '${sede}' AND `
    }
    var query = `SELECT
    reserva.FechaAsistirOficina [Fecha],
reserva.NumerodeReserva [Reserva],
users.Identification [Identificacion],
users.FullName [Nombre],
users.Email,
asiento.CENombreAsiento [Asiento],
ubicacion.CENombreUbicacion [Ubicacion],
pisos.CENombre [Piso],
sedes.CESede [Sede],
ISNULL(reserva.TomarAlmuerzoOficina,'') [Almuerzo],
ISNULL(reserva.Enquehorario,'') [HoraAlmuerzo],
ISNULL(reserva.TomarParqueadero,'') [Parqueadero],
jornada.Jornada,
reserva.Observacion
FROM Skandias_Lappiz_ReservaDePuesto reserva
INNER JOIN Lappiz_Users users on reserva.SolicitanteFk = users.Id
LEFT JOIN Skandias_Lappiz_HoraAlmuerzo almuerzo on almuerzo.Id = reserva.HoraAlmuerzofk
INNER JOIN Skandias_Lappiz_JornadaAsistencia jornada on jornada.Id = reserva.JornadaFk
INNER JOIN Skandias_Lappiz_Asientos asiento on asiento.Id = reserva.AsientoFK
INNER JOIN Skandias_Lappiz_Ubicacion ubicacion on ubicacion.Id = asiento.UbicacionFK
INNER JOIN Skandias_Lappiz_Pisos pisos on pisos.Id = ubicacion.PisoFK
INNER JOIN Skandias_Lappiz_Sedes sedes on sedes.Id = pisos.SedeFK
WHERE ${querySede} (reserva.FechaAsistirOficina BETWEEN '${fechaInicio}' AND '${fechaFin}')`
    execQuery(query).then(function(response) {
        var data = response.data[0]
        for (var i = 0; i < data.length; i++) {
            var fecha = data[i].Fecha
            fecha = fecha.split('T')
            data[i].Fecha = fecha[0]
        }
        $('#GridReservaSala').kendoGrid({
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
                            Observacion: { type: "string", editable: false },
                        },
                    },
                },
                sort: [{ field: "Reserva", dir: "asc" }],
            },
            height: 450,
            scrollable: true,
            sortable: true,
            filterable: false,
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
                { field: "Identificacion", title: "Identificación" },
                { field: "Nombre", title: "Nombre" },
                { field: "Email", title: "Email" },
                { field: "Asiento", title: "Asiento" },
                { field: "Ubicacion", title: "Ubicación" },
                { field: "Piso", title: "Piso" },
                { field: "Sede", title: "Sede" },
                { field: "Almuerzo", title: "Almuerzo" },
                { field: "HoraAlmuerzo", title: "Hora de almuerzo" },
                { field: "Parqueadero", title: "Parqueadero" },
                { field: "Jornada", title: "Jornada" },
                { field: "Observacion", title: "Observación" },
            ],
        });
    });

    function fixDate(fecha) {
        var fechaSplit = fecha.split('/')
        fecha = fechaSplit[2] + '-' + fechaSplit[1] + '-' + fechaSplit[0] + '  05:00:00.000'
        return fecha
    }
}, 850);