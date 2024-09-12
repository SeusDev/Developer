/* Reporte */
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

setTimeout(function () {
    debugger
    console.clear()
    var fechaInicio = $("#64d40264-c883-4d11-be7b-e3a47978e18d > div > div > input")[0].value
    var fechaFin = $("#b97ec4db-46f3-45d4-be88-bf4762d3f7f3 > div > div > input")[0].value
    
    fechaInicio = fixDate(fechaInicio)
    fechaFin = fixDate(fechaFin)
    var ingreso = $('#789829d4-c026-488b-9880-1344cf2f7a99').val()
    var queryingreso = ``
    if (ingreso != null || ingreso != undefined) {
        queryingreso = `isr.Id = '${ingreso}' AND `
    }
    var query = `select 
    sdsr.NumeroSolicitud [NumeroReserva],
    format (sdsr.Fecha,'dd-MM-yyyy') [Fecha],
    sdsr.Hora [Hora],
    isr.Nombre [NombreReserva],
    u.FullName [Colaborador],
    isnull (s.CESede,'No se seleccionó sede') [Sede],
	isnull (sdsr.Observaciones,'') [Observacion]
    from Skandias_Lappiz_SolicitudesDeIngresoSinReserva sdsr
    left join Skandias_Lappiz_IngresoSinReserva isr on isr.Id= sdsr.IngrsoReservaFk
	left join Skandias_Lappiz_Sedes s on s.Id = sdsr.SedeFk
	left join Skandias_Lappiz_Users u on u.Id= sdsr.UsuarioFk
    WHERE ${queryingreso} (format(sdsr.Fecha,'yyyy-MM-dd') BETWEEN '${fechaInicio}' AND '${fechaFin}')`
   var data = ajaxQuery(query)
   debugger;
        
        if (data.length >0) {
        $('#GridReporteIngresoSinReserva').kendoGrid({
            dataSource: {
                data: data,
                autoSync: true,
                schema: {
                    model: {
                        fields: {
                            NumeroReserva: { type: "string", editable: false },
                            Sede: { type: "string", editable: false },
                            Fecha: { type: "string", editable: false },
                            Hora: { type: "string", editable: false },
                            NombreReserva: { type: "string", editable: false },
                            Colaborador: { type: "string", editable: false },
                            Observacion: { type: "string", editable: false },
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
            dataBound: function () {
                for (var i = 0; i < this.columns.length; i++) {
                    this.autoFitColumn(i);
                }
            },
            columns: [
                { field: "NumeroReserva", title: "Numero Reserva" },
                { field: "Sede", title: "Sede" },
                { field: "Fecha", title: "Fecha" },
                { field: "Hora", title: "Hora" },
                { field: "NombreReserva", title: "Nombre Reserva" },
                { field: "Colaborador", title: "Colaborador" },
                { field: "Observacion", title: "Observación" },
            ],
        });


        } else{

            toastr.info('las fechas ingresadas no obtienen información')

        }
    function fixDate(fecha) {
        var fechaSplit = fecha.split('/')
        fecha = fechaSplit[2] + '-' + fechaSplit[1] + '-' + fechaSplit[0] 
        return fecha
    }
}, 850);