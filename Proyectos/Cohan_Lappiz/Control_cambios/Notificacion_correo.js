debugger;
var email = 'comercial@cohan.org.co';
var subject = 'SE HA CREADO EL PEDIDO No.';
var text = 'texto plano';
var HTML = `<<h2>Pedido Generado </h2> <br>
h1>Design great ideas with HTML to personalize the different 
                emails you will send to your team.
                Worry about your business, leave the code to Lapiz</h1>`;

sendEmail(email, subject, text, HTML).then(function (response) {
    toastr.info('Se ha enviado el correo');
}, function (error) {
    toastr.warning('Ha ocurrido un error al enviar el correo');
});

