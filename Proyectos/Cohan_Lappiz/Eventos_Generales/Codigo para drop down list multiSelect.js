//Codigo para drop down list multiSelect

function NombreDeLaFuncion() {
    let Query = {
        query: `MI CONSULTA`,
        tenantId: "null",
        parameters: {
            aType: "execTx",
            environment: `${backandGlobal.environment}`,
        },
    };
    // Le pasamos la variable con nuestra consulta a ajax en la parte de "data"
    $.ajax({
        async: false,
        url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
        type: "POST",
        data: JSON.stringify(Query),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", localStorage.Authorization);
        },
        success: function (Success) {
            //Aquí desarrollamos nuestro codigo cuando la respuesta de nuestra consula fue success
            var r = Success[0][0]
            //En esta parte es donde asignaremos el valor y comenzaremos a llenar nuestro ddl
            $("#idDeMiDDL").kendoMultiSelect({
                dataSource: [ r ]
              });
        },
        error: function (error) {
            console.log(`Error-->${error}`);
        },
    });
}