const Habitaciones= e.dataItem.lappizhotels_Lappiz_DetalleHabitacion

if (Habitaciones.length > 0) {

    Habitaciones.forEach(element => {
        element.lappizhotels_Lappiz_Habitaciones
    let Habitacion = element.lappizhotels_Lappiz_Habitaciones
        Habitacion.Estado = 'Reservado'
    });
    
}
