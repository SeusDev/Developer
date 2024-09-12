let Id= e.dataItem.Id

let StringQuery = `
select 
r.Numeroreserva[numeroReserva],
c.Nombrecompleto [Nombrecompleto],
c.Correo [correoCliente],
isnull (format(r.Fechacheckin,'dd-MM-yyyy'),'') [fechaLlegada],
isnull (format(r.Fechacheckout,'dd-MM-yyyy'),'')[fechaSalida],
r.Cantidadnoches[numeroNoches],
r.Cantidadpersonas[cantidadPersonas],
mp.CEMetodosdepagos [metodoPago],
ht.Nombrehotel [Hotel],
th.CETipodehabitacines [tipoHabitacion],
h.Numerohabitacion[numeroHabitacion]
from lappizhotels_Lappiz_Reserva r
inner join lappizhotels_Lappiz_DetalleHabitacion dh on dh.ReservaFk = r.Id
inner join lappizhotels_Lappiz_Habitaciones h on dh.HabitacionFk = h.Id
inner join lappizhotels_Lappiz_Clientes c on r.ClienteFK = c.Id
inner join lappizhotels_Lappiz_Metodospago mp on r.MetodosdepagoFk = mp.Id
inner join lappizhotels_Lappiz_Hotel ht on r.HotelFk = ht.Id
inner join lappizhotels_Lappiz_Tipohabitacion th on h.TipohabitacionFk = th.Id
where r.Id = '${Id}'
`
execQuery(StringQuery).then(function (response) {

  var reserva = response[0][0].numeroReserva;
  var nombreCompleto = response[0][0].Nombrecompleto;
  var correoCliente = response[0][0].correoCliente;
  var fechaLLegada = response[0][0].fechaLlegada;
  var fechaSalida = response[0][0].fechaSalida;
  var numeroNoches= response[0][0].numeroNoches;
  var cantidadPersonas= response[0][0].cantidadPersonas;
  var metodoPago= response[0][0].metodoPago;
  var hotel= response[0][0].Hotel;
  var tipoHabitacion= response[0][0].tipoHabitacion;
  var numeroHabitacion= response[0][0].numeroHabitacion;

  var email = `${correoCliente}`;
  var subject = 'Reserva numero' +' '+ reserva ;
  var text = '';
  var HTML = `<div style="background-color:#eeeeee;border-radius:20px;text-align:center;">
  <h1 style="color: rgb(255, 8, 8); margin-top: 40px; padding: 30px;">Reservación</h1>
  <p style="padding: 0px 30px 0px 30px;font-size: 18px;">
      <b>Estimado</b> ${nombreCompleto},
      <br>
      <br>
      Le escribimos para informarle que hemos recibido su reserva con número <b>${reserva}</b> <br> en  el hotel <b>${hotel}</b> con los siguientes detalles:
      <br>
      <br>
      <b>Tipo habitación:</b> ${tipoHabitacion}
      <br>
      <b>Número habitación:</b> ${numeroHabitacion}
      <br>
      <b>Fecha de llegada:</b> ${fechaLLegada}
      <br>
      <b>Fecha de salida:</b> ${fechaSalida}
      <br>
      <b>Número de noches:</b> ${numeroNoches}
      <br>
      <b>Número de personas:</b> ${cantidadPersonas}
      <br>
      <b>Método de pago:</b> ${metodoPago}
      <br>
      <br>
      Le recordamos que debe llegar al hotel antes de la <b> 1:00 PM</b> , para poder hacer el check-in. <br> Si llega tarde, el hotel no podrá garantizarle la disponibilidad de la habitación <br> y podría haber cargos adicionales. <br> <br>
      Por favor, asegúrese de llevar todos los documentos necesarios (pasaporte, tarjeta de identidad, etc.) <br> para poder realizar el check-in.
      <br>
      <br>
      Si tiene alguna pregunta, no dude en contactarnos.
      <br>
      Esperamos que disfrute de su estancia con nosotros.
      <br>
      <br>
      <b>Atentamente,</b> 
      <br>
      ${hotel}
      </p>
  </p>
  <img src="https://runtimetest.lappiz.io/assets/images/LappizHoteleria/lappiz-vertical-hoteleria-removebg-preview.png "style="width: 20% !important; margin-top: -2%;" alt="lappiz-vertical-hoteleria-removebg-preview" border="0">
  </div>`;
  
  sendEmail(email, subject, text, HTML).then(function (response) {
    toastr.info('Se ha enviado el correo a ' + `${email}`);
  }, function (error) {
    toastr.warning('Ha ocurrido un error al enviar el correo a ' + `${email}`);
  });

})