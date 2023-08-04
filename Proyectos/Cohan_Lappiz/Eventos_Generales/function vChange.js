function vChangeTipoEntrega(params) {
    
    debugger;
    // Capturar valor del campo tipo entrega
    var tipoEntrega = '3f595b0d-bda5-4c5c-ab0e-e11e10e1aa7b';
    var valorentrega= getFieldValue(tipoEntrega);

    // setiamos el valor de tipo en entrega en campo Entregado
    var Entregado = '5a230402-cb5d-44fd-b72d-be8ebc02f6ab';
    setFieldValue(Entregado, valorentrega);
  
    if (valorentrega == 'Presencial') {
        console.log("Presencial");

    } else if (valorentrega=='Domicilio') {
        
        


    }

}