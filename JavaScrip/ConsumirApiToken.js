var axios = require('axios');
var data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\r\n<soapenv:Header>\r\n<tem:Autenticacion>\r\n<!--Optional:-->\r\n<tem:UsuarioClave>Tavo2021</tem:UsuarioClave>\r\n<!--Optional:-->\r\n<tem:UsuarioID>3117</tem:UsuarioID>\r\n</tem:Autenticacion>\r\n</soapenv:Header>\r\n<soapenv:Body>\r\n<tem:Consulta>\r\n<!--Optional:-->\r\n<tem:tIdentificacion>1</tem:tIdentificacion>\r\n<!--Optional:-->\r\n<tem:sIdentificacion>1037605487</tem:sIdentificacion>\r\n<!--Optional:-->\r\n<tem:Token>dAylAkFT/gSkkvpDoI89aORiq2C8LI3z9uHAnBFaF08/32nPrGQhH4HhIkyJHgMD30HMssetl+/ZahmqQ1l/TCl9JOZ0yQwg0iiI36zY4xBipvVlkwZR+ZjqHUuiB4weW8T9vSbEQL83gQVd8FjpjcqL5XBvjk89PEX8tf3eHevJgIDWDAm6iWRPb4HhiOqcXmsk2ZIc7yC+GyawwedNX5gP8L9zSe+C</tem:Token>\r\n<!--Optional:-->\r\n<tem:app>?</tem:app>\r\n</tem:Consulta>\r\n</soapenv:Body>\r\n</soapenv:Envelope>';

var config = {
  method: 'post',
  url: 'http://172.16.8.105/Webservice/WSPersonas.asmx?op=consulta',
  headers: { 
 'Content-Type': 'application/xml'
  },
  data : data
};

axios(config)
.then(function (response) {
    return res.status(200).json("Conexion establecida");

})
.catch(function (error) {
    return res.status(400).json("No cuenta con los permisos");
});
