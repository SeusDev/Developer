var Querynombrebodega = {
                        
    query: `select NombreBodega from Cohan_Lappiz_Bodega where id='${JSON.parse(sessionStorage.LappizUser).BodegasFK}'`,
    tenantId: "null",
    parameters: {
        aType: "execTx",
        environment: `${backandGlobal.environment}`,
    },
}                   

$.ajax({
    async: false,
    url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
    type: "POST",
    data: JSON.stringify(Querynombrebodega),
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", localStorage.Authorization);
    },
    success: function (Success) {
       debugger;
       $("#nombrebodega").val(Success[0][0].NombreBodega)
    },
    error: function (error) {
        console.log(`Error-->${error}`);
    },
});