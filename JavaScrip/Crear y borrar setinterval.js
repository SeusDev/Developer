var notificacion  = setInterval(alerta, 15000);

$('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(3)').hide()

function alerta() {
  
    toastr.info('Se debe seleccionar un equipo de medición')
    

}

// Borrar setinterval
clearInterval( sessionStorage.setIntervalNotificacion)


sessionStorage.setIntervalNotificacion