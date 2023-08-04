// Funcionalidad para generar el token para la función AJax
var token;

let dataToken = {
    grant_type: 'password',
    username: 'davidfb1438@gmail.com',
    password: 'Pactia.123',
    parameters: {
        aType: 'event',
        environment: `${backandGlobal.environment}`
    }
}

$.ajax({
    async: false,
    method: 'POST',
    url: `${backandGlobal.url}/token`,
    data: dataToken,
    success: function (response) {
        token = response.access_token;
        sessionStorage.token= token;
        return token;
    },
    error: function (error) {
        console.error(error);
        toastr.warning('No fue posible conectarse al servidor, contacte con el administrador.');
    }
});

// Funcion Ajax para realizar las peticiones a la BD
function ajaxQuery(query, token) {
    let data;
    let newquery = {
        query: query,
        parameters: {
            aType: "execTx",
            environment: `${backandGlobal.environment}`,
        },
    };
    $.ajax({
        async: false,
        url: `${backandGlobal.api2}/PactiaTest_lappiz.api/api/lappiz/sp/query`,
        type: "POST",
        data: JSON.stringify(newquery),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", `bearer ${token}`);
        },
        success: function (result) {
            data = result[0];
        },
        error: function (error) {
            console.log(error, "Fallo en consulta");
        },
    });

    return data;
}

// Query para alimentar DDL Criticidad
let StringQuery = `SELECT Id, CEPotencial, TiempoCorrecion FROM pactiatest_lappiz_CriticidadHallazgos`;

let data = ajaxQuery(StringQuery, token);

setTimeout(() => {
    debugger;

    var url = location.href.split("appViewId=")[1];

    if (url === "d7276958-673a-495c-b3e8-80de418379a0") {

        cargaDDLCriticidad();

        function cargaDDLCriticidad() {

            if (data.length > 0) {
                kendo.jQuery("#criticidad").kendoDropDownList({
                    autoBind: false,
                    dataTextField: "TiempoCorrecion",
                    dataTextField: "CEPotencial",
                    dataValueField: "Id",
                    dataSource: {
                        data: data,
                    },
                    optionLabel: {
                        CEPotencial: "Seleccione la criticidad...",
                        Id: "",
                    },
                    filter: "startswith",
                    filtering: function (ev) {
                        delete sessionStorage.dataGrid;
                        var filterValue = ev.filter != undefined ? ev.filter.value : "";
                        ev.preventDefault();

                        this.dataSource.filter({
                            logic: "or",
                            filters: [
                                {
                                    field: "TiempoCorrecion",
                                    field: "CEPotencial",
                                    operator: "startswith",
                                    value: filterValue,
                                },
                            ],
                        });
                    },
                });
            } else {
                toastr.warning("No se encontraron items de criticidad");
            }
        }

    }

}, 500);