debugger;
var Nombre = $("#a4f7281a-6a3c-484c-9822-666e405111ba").data("kendoDropDownList").dataItem()
    .NombreCp;

function Confirmar() {

    if (Confirm('¿Desea confirmar la entrega?')) {
        debugger;
        var DataGrid = $("#gridInfoDespacho").data("kendoGrid").dataSource;
        var NombreCliente = DataGrid.options.data[0].Nombre;
        var CodigoCliente = DataGrid.options.data[0].Codigo;
        var NumeroPedido = DataGrid.options.data[0].NumeroPedido;

        var Query = {

            query: `select EmailPersonaResponsable from Cohan_Lappiz_DetalleCliente
        where Codigo = ${CodigoCliente} and Nombre = '${NombreCliente}'`,
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
            data: JSON.stringify(Query),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", localStorage.Authorization);
            },
            success: function (Success) {
                debugger;

                var correo = Success[0];

                var to = correo;
                var Asunto = `Pedido despachado No. ${NumeroPedido}`;
                var Texto = `Nro. De pedido (${NumeroPedido}) ha sido despachado con la remesa Nro. () Y  por  la transportadora (nombre de la tr`;
                var Html = `<h2>Envio de despacho </h2> <br>
        
           `;

                toastr.success("se ha enviado correo al responsable");

                sendEmail(to, Asunto, Texto, Html);


            },
            error: function (error) {
                console.log(`Error-->${error}`);
            },
        });

    } else {
        console.log('ok')
    }

}