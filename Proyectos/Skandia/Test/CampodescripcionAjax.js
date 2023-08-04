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

$('#76e7d7bf-3adf-4028-ba27-31655f5130d1')[0].onchange = function(e) {
    debugger;
    var Query = `select TipoSala from Skandias_Lappiz_Salas where Id='${e.target.value}'`

    var data = ajaxQuery(Query)
    if (data.length > 0) {

        $('#descripciónsala').text(data[0].TipoSala)

    }

}