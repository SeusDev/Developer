var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == 'badad9ff-2ef3-44e2-bef0-90702f2f375f') {
    debugger;

    var Fecha = new Date($('#ec0c69ca-cfa4-4288-9d38-d8816f83a164 > div.dx-dropdowneditor-input-wrapper > div > input').val()).format("Y-m-d");

    var Ubicacion = $("#38bd2d60-83be-49c2-83ae-7b7efaf2b33c").val();

    var query = `select rsp.NumerodeReserva from Skandias_Lappiz_ReservaDePuesto rsp
            join Skandias_Lappiz_Asientos A on A.Id =rsp.AsientoFK
            join Skandias_Lappiz_Ubicacion u on u.Id= A.UbicacionFK
            where u.Id='${Ubicacion}' and format(FechaAsistirOficina,'yyyy-MM-dd')='${Fecha}'`

    var resultado = ajaxQuery(query)
    var NumeroReserva = ""
    if (resultado.length > 0) {
        for (let e = 0; e < resultado.length; e++) {
            NumeroReserva += resultado[e].NumerodeReserva + ','
        }
        toastr.info(`Numeros de reservas para esta zona ${NumeroReserva}`);
    }
}

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
            console.log(error, 'Falle en consulta 1')
        }
    })
    return data
}