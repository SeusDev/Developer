if ( e.dataItem.Clasederiesgo >= 4) {
    debugger;

    // Ocultar boton guardar
    $('body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.actions-form-header > div > div > div > div > button:nth-child(1)').hide()

    // Ocultar boton guardar y editar
    $('body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.actions-form-header > div > div > div > div > button:nth-child(2)').hide()

    // Ocultar boton guardar y nuevo
    $('body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.actions-form-header > div > div > div > div > button:nth-child(3)').hide()

    //Bloquear formulario
    $('body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form').css('pointer-events', "none")

    //oscurecer formulaio
    $('body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form').css('opacity', "0.4");

    toastr.info("Este software está en proceso de desarrollo para las carateristicas de su tipo de empresa");    
}