function enviarNotificacion(id) {
    var queryTabla1 = `select
    pc.NumeroPedido 'NumeroPedido',
    c.NumeroIdentificacion 'NumeroIdentificacion',
    c.NumeroIdentificacion 'NIT',
    c.NombreCompleto 'NombreCliente',
    format(pc.FechaCreacion,'yyyy-MM-dd') 'FechaCreacion'
    from Cohan_Lappiz_DetallePedidosClientes dpc
    inner join Cohan_Lappiz_PedidosClientes pc on dpc.PedidosClientesFk = pc.Id
    inner join Cohan_Lappiz_Cliente c on pc.ClienteFk = c.Id
    where pc.id='${id}'`

    execQuery(queryTabla1).then(success => {
        debugger;
        var Tabla1 = success.data[0][0];
        var queryTabla2 = `select 
    p.CodigoProducto,
    p.NombreProducto,
    dpc.Cantidad 'Unidades',
    dpc.Cantidad 'UnidadesDisp',
    isnull(dpc.CantidadSolicitada,0) 'UnidadesSus',
    dpc.Precio,
    dpc.ValorTotal
    from Cohan_Lappiz_DetallePedidosClientes dpc
    inner join Cohan_Lappiz_Producto p on dpc.ProductoFk = p.Id
    where dpc.PedidosClientesFk = '${id}'`

        execQuery(queryTabla2).then(Response => {
            debugger;
            var Tabla2 = Response.data[0];

            debugger;
            var email = 'sebastian.henao@lappiz.io';
            var subject = `SE HA CREADO EL PEDIDO No. ${Tabla1.NumeroPedido} - ${Tabla1.NIT} del cliente ${Tabla1.NombreCliente}`;
            var text = 'texto plano';
            var productos = ''

            for (let index = 0; index < Tabla2.length; index++) {
            
            debugger;

                const element = Tabla2[index];
                 productos += `<tr>
            <td>${element.CodigoProducto}</td>
            <td>${element.NombreProducto}</td>
            <td>${element.Unidades}</td>
            <td>${element.UnidadesDisp}</td>
            <td>${element.UnidadesSus}</td>
            <td>${element.Precio}</td>
            <td>${element.ValorTotal}</td>
            </tr>`
            }
            var HTML = `<h2>Pedido Generado </h2> <br>
            
                <table border="1"class="default">
                <thead>
                    <th>COD DOCUM</th>
                    <th>NUM DOCU</th>
                    <th>NIT</th>
                    <th>NOM CLIE</th>
                    <th>FECHA</th>
                </thead>
                <tbody>
                    <tr>
                        <td>${Tabla1.NumeroPedido}</td>
                        <td>${Tabla1.NumeroIdentificacion}</td>
                        <td>${Tabla1.NIT}</td>
                        <td>${Tabla1.NombreCliente}</td>
                        <td>${Tabla1.FechaCreacion}</td>
                    </tr>
                </tbody>
                </table>
                    <BR></BR>
                <table border="1" table class="2">
                    <thead>
                        <th>COD PROD</th>
                        <th>NOM PROD</th>
                        <th>UNIDADES</th>
                        <th>UNIDADES DISP</th>
                        <th>UNIDADES SUSTI</th>
                        <th>PRECIO</th>
                        <th>TOTAL</th>
                    </thead>
                    <tbody>
                    ${productos}
                    </tbody >
        </table >`;
            sendEmail(email, subject, text, HTML).then(function (response) {
                toastr.info('Notificacion enviada al correo');
            }, function (error) {
                toastr.warning('Ha ocurrido un error al enviar el correo');
            });
        });
    });
}