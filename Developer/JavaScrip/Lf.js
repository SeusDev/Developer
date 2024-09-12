// ! Lappiz Funtion

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');
var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');
var _typeof3 = _interopRequireDefault(_typeof2);

var _set = require('babel-runtime/core-js/set');
var _set2 = _interopRequireDefault(_set);

var filtering = require('kendo-grid-filter-sequelize-converter');

var _requestPromise = require('request-promise');
var _requestPromise2 = _interopRequireDefault(_requestPromise);

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var _lappiz = require('../lappiz/lappiz.model');
var _lappiz2 = _interopRequireDefault(_lappiz);

var controller = require('../lappiz/lappiz.controller');
var history = require('../audit/audit.controller');
var documents = require('../documents/documents.controller');
var utiles = require('../utiles/utiles.controller');

var _logger = require('../../config/logger');
var _logger2 = _interopRequireDefault(_logger);

var _environment = require('../../config/environment');
var _environment2 = _interopRequireDefault(_environment);

var _appsettings = require('../../config/appsettings');
var _appsettings2 = _interopRequireDefault(_appsettings);

var SQLConnector = require('../sqlConnector');
var modelo = require('../lappiz/lappiz.model');

var parser = require('xml2json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Devuelve la respuesta en JSON a la solicitud
 * @param {Object} res
 * @param {Number} statusCode
 */
function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

/**
 * Permite manejar los errores ocurridos durante el request
 * @param {Object} res
 * @param {Number} statusCode
 */
function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        _logger2.default.error(err);
        res.status(statusCode).send(err);
    };
}

exports.createNotifSap = createNotifSap;

// createNotifSap
function createNotifSap(obj, res) {
    if (obj.body.parameters) {

        var urlPermissions = obj.body.parameters.environment == 'DEV' ? 'https://designertest.lappiz.io/Api/api/app/checkPermissions' : obj.body.parameters.environment == 'TEST' ? 'https://designertest.lappiz.io/Api/api/app/checkPermissions' : 'https://designer.lappiz.io/Api/api/app/checkPermissions';

        var axios = require('axios');

        var data = {};

        if (obj.body.parameters.userId != undefined) { data.userId = obj.body.parameters.userId; }
        if (obj.body.parameters.tablaId != undefined) { data.tablaId = obj.body.parameters.tablaId; }
        if (obj.body.parameters.appViewId != undefined) { data.appViewId = obj.body.parameters.appViewId; }
        if (obj.body.parameters.actionId != undefined) { data.actionId = obj.body.parameters.actionId; }
        if (obj.body.parameters.pType != undefined) { data.pType = obj.body.parameters.pType; }
        if (obj.body.parameters.aType != undefined) { data.aType = obj.body.parameters.aType; }
        if (obj.body.parameters.lappizFunctionId != undefined) { data.lappizFunctionId = obj.body.parameters.lappizFunctionId; }

        var config = {
            method: 'post',
            url: urlPermissions,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.includes('True')) {
                    var id = obj.body.IdServicio;
                    var token = obj.body.token;
                    var xml;
                    var jsonResult = '';
                    if (id === undefined || token === undefined) {
                        return res.status(400).json("Parametros erroneos");
                    } else {

                        var data = JSON.stringify({
                            "query": "exec Pactia_Lappiz_InfoAvisoIntegrador '" + id + "'",
                            "tenantId": "null",
                            "parameters": {
                                "aType": "execTx",
                                "environment": 'TEST'
                            }
                        });

                        var config = {
                            method: 'post',
                            url: 'https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/lappiz/sp/query',
                            headers: {
                                'Authorization': 'Bearer ' + token + '',
                                'Content-Type': 'application/json'
                            },
                            data: data
                        };

                        axios(config)
                            .then(function (response) {

                                xml = response.data[0][0].xml;

                                var config = {
                                    method: 'post',
                                    url: 'http://CONSAPVQAS.conconcreto.com:8000/sap/bc/srt/rfc/sap/zws_bapi_alm_notif_creat/300/zws_bapi_alm_notif_creat/zws_notif_binding',
                                    headers: {
                                        'Content-Type': 'text/xml;charset=UTF-8',
                                        'Authorization': 'Basic V1NMQVBQSVo6UGFjdGlhMjAyMC0tKiA='
                                    },
                                    data: xml
                                };

                                axios(config)
                                    .then(function (response) {

                                        jsonResult = parser.toJson(response.data);
                                        jsonResult = JSON.parse(jsonResult);
                                        var NotifNo = jsonResult["soap-env:Envelope"]["soap-env:Body"]["n0:ZbapiAlmNotifCreateResponse"].NotifheaderExport.NotifNo;
                                        if (JSON.stringify(NotifNo) === '{}') {
                                            var jsonError = jsonResult["soap-env:Envelope"]["soap-env:Body"]["n0:ZbapiAlmNotifCreateResponse"].Return.item;
                                            var data = JSON.stringify({
                                                "query": "exec Pactia_Lappiz_InsertarLogIntegraciones '" + xml + "', '" + JSON.stringify(jsonError) + "', '" + id + "', '', 0",
                                                "tenantId": "null",
                                                "parameters": {
                                                    "aType": "execTx",
                                                    "environment": 'TEST'
                                                }
                                            });

                                            var config = {
                                                method: 'post',
                                                url: 'https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/lappiz/sp/query',
                                                headers: {
                                                    'Authorization': 'Bearer ' + token + '',
                                                    'Content-Type': 'application/json'
                                                },
                                                data: data
                                            };

                                            axios(config)
                                                .then(function (response) {
                                                    return res.status(200).json(jsonError);
                                                }).catch(function (error) {
                                                    return res.status(400).json({ Message: "Error al insertar en log de transacciones" });
                                                });
                                        } else {
                                            var data = JSON.stringify({
                                                "to": "simon.sanchez@lappiz.io",
                                                "subject": `Creación exitosa de solicitud de servicio ${NotifNo}`,
                                                "text": "Texto",
                                                "parameters": {
                                                    "aType": "sendMail",
                                                    "environment": "TEST"
                                                },
                                                "html": `<table><tbody><tr style="height:100%;"><td style="width:50%;"><p>Se ha creado una nueva solicitud de servicio.</p>
                                                <p>Número de aviso SAP: ${NotifNo}</p>
                                                <p>Cualquier inquietud, por favor comunicarse al número de contacto (+574) 4025700ext: 5802 - 5862 - 6020.</p>
                                                <p>Cordialmente.</p>
                                                <p>Mesa de ayuda.</p>
                                                <p>Pactia S.A.S</p>
                                                <p>Gerencia de servicios operacionales.</p>
                                                </td>
                                                <td style="width:50%;"><img src="https://runtimetest.lappiz.io/assets/img/PactiaMasLogo.png" alt="" width="200" height="200" style="display:block;margin-left:auto;margin-right:auto;" /></td>
                                                </tr>
                                                </tbody></table>`
                                            });

                                            var config = {
                                                method: 'post',
                                                url: 'https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/utiles/sendEmail',
                                                headers: {
                                                    'Authorization': `Bearer ${token}`,
                                                    'Content-Type': 'application/json'
                                                },
                                                data: data
                                            };

                                            axios(config)
                                                .then(function (response) {
                                                    var data = JSON.stringify({
                                                        "query": "exec Pactia_Lappiz_InsertarLogIntegraciones '" + xml + "', '" + JSON.stringify(jsonResult) + "', '" + id + "', '" + NotifNo + "', 1",
                                                        "tenantId": "null",
                                                        "parameters": {
                                                            "aType": "execTx",
                                                            "environment": 'TEST'
                                                        }
                                                    });

                                                    var config = {
                                                        method: 'post',
                                                        url: 'https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/lappiz/sp/query',
                                                        headers: {
                                                            'Authorization': 'Bearer ' + token + '',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        data: data
                                                    };

                                                    axios(config)
                                                        .then(function (response) {
                                                            return res.status(200).json({ Notif: NotifNo });
                                                        }).catch(function (error) {
                                                            return res.status(400).json({ Message: "Error al insertar en log de transacciones" });
                                                        });
                                                })
                                                .catch(function (error) {
                                                    return res.status(400).json({ Message: "Error al enviar la notificacion al correo electronico" });
                                                });
                                        }
                                    })
                                    .catch(function (error) {
                                        return res.status(400).json({ Message: "Error al tratar los metodos BAPI" });
                                    });
                            })
                            .catch(function (error) {
                                return res.status(400).json({ Message: "Error al consultar la informacion del aviso" });
                            });
                    }
                } else {
                    return res.status(400).json("No cuenta con los permisos");
                }
            })
            .catch(function (error) {
                return res.status(400).json(error);
            });

    } else {
        return res.status(401).json('No cuenta con los permisos.');
    }
}