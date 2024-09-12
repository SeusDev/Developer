//actualizar stock
debugger;
let id = e.dataItem.Apuntador_Lappiz_DatalleLabor[0].ProductoFk
let queryCantidad = `select 
isnull (CantidadSaldo, '') [Saldo]
from Apuntador_Lappiz_Detalleproducto
where ProductoFk = '${id}'`
execQuery(queryCantidad).then(function (Result) {
    let stock = Result[0][0].Saldo;
    let newCanti = parseFloat(stock) - parseFloat(localStorage.cantidad)
    let newStock = `
    Update Apuntador_Lappiz_Detalleproducto 
    set CantidadSaldo = ${newCanti} 
    where Id = '${id}'`
    execQuery(newStock).then(success => {
        toastr.info("Se actualizo el stock");
    });
})

