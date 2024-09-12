var axios = require('axios');
var cedula = obj.body.Cedula;
var tipoIdentificacion = obj.body.tipoId;
var token = obj.body.token;
var xml;
var jwt;
var codUsuario = '3673';
var usuarioClave = '9F8970243605CDDB9562135193B595E9C03175DC'
var jsonResult = '';
if (cedula === undefined || tipoIdentificacion === undefined) {
    return res.status(400).json("Parametros erroneos");
} else {
    var data = JSON.stringify({
        "codUsuario": codUsuario,
        "usuarioClave": usuarioClave
    });

    var config = {
        method: 'post',
        url: 'https://apps.procuraduria.gov.co/SiriApi/api/Token',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            jwt = response.data;
            data = JSON.stringify({
                "query": "exec PGN_Lappiz_Registraduria '" + cedula + "','" + tipoIdentificacion + "','" + jwt + "'",
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": "TEST"
                }
            });
            var config = {
                method: 'post',
                url: 'https://txtest.lappiz.io/PGN_Lappiz.api/api/lappiz/sp/query',
                headers: {
                    'Authorization': 'Bearer ' + token + '',
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (xmlresponse) {
                    xml = xmlresponse.data[0][0].xml;
                    var config = {
                        method: 'post',
                        // ! se reemplaza por la de la registraduria
                        url: 'http://10.11.5.9/Webservice/WSPersonas.asmx',
                        headers: {
                            'Content-Type': 'text/xml'
                        },
                        data: xml
                    };

                    axios(config)
                        .then(function (responseRegistraduria) {

                            jsonResult = parser.toJson(responseRegistraduria.data);
                            jsonResult = JSON.parse(jsonResult);
                            
                            return res.status(200).json(jsonResult)
                        })
                        .catch(function (error) {
                            return res.status(400).json({ Message: "Error al tratar los metodos BAPI" });
                        });
                })
                .catch(function (error) {
                    return res.status(400).json(error);
                });

        })
        .catch(function (error) {
            return res.status(400).json(error);
        });
}