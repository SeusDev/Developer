if (window.location.href.includes('appViewId=9391b53c-21da-4e0d-be43-5e22f4527056')) {

    setTimeout(function () {
        debugger;

        var query = `select c.Id as Id,c.RefCliente as Cliente,d.RefDeudor as deudor,ca.Prefijo as Prefijo,
        concat('Ac'+RefCliente,'.',RefDeudor, '.', ca.PreFijo) as Refacuerdo
        From Londonomesa_Lappiz_Clientes c,Londonomesa_Lappiz_Deudor d
        join  Londonomesa_Lappiz_Categoria ca on d.CategoriaFk = ca.Id
        where c.Id = '${e.value}' `;
        var data = ajaxQuery(query);
        if (data.length > 0) {
            $("#data").kendoDropDownList({
                placeholder: "Seleccione un acuerdo",
                dataTextField: "Refacuerdo",
                dataValueField: "Id",
                dataSource: data,
            });
        }    
        function ajaxQuery(query) {
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
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: "POST",
                data: JSON.stringify(newquery),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", localStorage.Authorization);
                },
                success: function (result) {
                    data = result[0];
                },
                error: function (error) {
                    console.log(error);
                },
            });
            return data;
        }
    }, 3000);
}