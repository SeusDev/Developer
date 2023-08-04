Consumir JSON 

jsonRegi["soap:Envelope"]["soap:Body"].ActualizarNombresResponse.ActualizarNombresResult.DatosConsultado.Nombre

jsonRegi["soap:Envelope"]["soap:Body"].ActualizarNombresResponse.ActualizarNombresResult.DatosConsultado.Identificacion


var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer BtZ9SLM8paGlwB6FJIMEHu_4iAndkfSdwYxL7XkXwrYj9_zdFtBhmJPswgrtKxy57Xo_lfIAv4Zs1Vs0TWqMtlXnH9OQtj4TJB7MwKKNclS6TdStgrfzNEoh_ZpH-1WKHH1SwRwmN3MP91RXnYLkDCIu1V3vUUMCIcTQcq0GiIQk9CTN1-vUx0Ya0CsxYuGddasef-gwyOf3dsgZnZjDRtcv21KqQ7CZ0PzP8wLP0iQbMHTEz-k-XN0UuXPJ5xbz7KdFXuqWNHW8QMCkat7YsbNAuS9_OHMVXZbuEfRBSs8nmwMJpYSKTynMQGSYwwqyMqRaHte39jLHy8fgQRx5fA4C5O2XS-r1bzqEZIrhhokFN-nOfsX9kwcvkbRd4IBxFNo1lKdFrLCIKPrIhyEniVuss_paBa9o0Oucy4M1A2vAVFd3a-UvsNL8PJ92cuGjBpbiP37xODSmSsK2SPBUSWyj8Hk-hidd-RZSxSCsSJXT3Da8o5RwyyzVewsrRDCDs2R8HfAKsn_Z8Z19mDjP0NhwS1k0G4txTa34Pt8rHVM");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Cedula": "1000634345",
  "tipoId": "1",
  "parameters": {
    "userId": "6394355d-809d-49fa-8f3c-4f49f6dbf7ce",
    "aType": "lappizFunction",
    "pType": "Execute",
    "lappizFunctionId": "e1f4b60a-6bf7-4698-8b14-a990035cfd8b",
    "environment": "TEST"
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://app-test-tx.azurewebsites.net/PGN_Lappiz.api/api/functions/Registraduria", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  