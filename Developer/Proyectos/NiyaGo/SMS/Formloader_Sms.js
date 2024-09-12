var myHeaders = new Headers();
myHeaders.append("Authorization",localStorage.Authorization);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "numbers": [
    "573016848726",
    "573053501725"
  ],
  "message": "Prueba2",
  "parameters": {
    "userId": sessionStorage.userId,
    "aType": "lappizFunction",
    "pType": "Execute",
    "environment": backandGlobal.environment,
    "lappizFunctionId": "8feb7cda-2781-4b54-ac12-df6447beafea"
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
var urlLappizfunction = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/functions/EnvioSMS`
fetch(urlLappizfunction, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


