if (  window.location.href.includes("21300b4c-ad8e-4b83-bbd4-431942150b0d")) {
  // Ocultar barra de acciones botones guardar
  document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.actions-form-header").style.display='none'
  setTimeout(() => {

  $("#EnviarPrueba").click(function () {
  
  debugger;
  var myHeaders = new Headers();
  myHeaders.append("Authorization",localStorage.Authorization);
  myHeaders.append("Content-Type", "application/json");
  var message = $('#9da65af6-1f31-4444-9055-44a0f803be90').val();
  if ($('#87b31681-9bd7-4527-b8c7-0f63b764357c').val() == '2: Importar destinatarios')  {
    var numbers =  []
    let data = JSON.parse(JSON.stringify (kendo.jQuery('#grid').data('kendoGrid').dataSource.data()))
     data.forEach(element => {
          numbers.push(element.Teléfono)
     });
  }else {
    var numbers = $('#5d75f15f-a644-47aa-a1b7-7426f82da9eb').val().split(',');
  }

  numbers = numbers.map((number) =>  {number= sessionStorage.Codigotelefono + number;return number.replaceAll(' ', '').replaceAll('+', '')});
  var raw = JSON.stringify({
    "numbers": numbers,
    "message": message, 
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
    .then((response) => {
        if (response.ok) {
              toastr.success('Mensaje enviado de forma correcta');
          }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
   delete sessionStorage.SMSPrueba;
   sessionStorage.SMSPrueba = 'Si'; 
   
   let btnGuardar = $("#21300b4c-ad8e-4b83-bbd4-431942150b0d_save")[0];
   $(btnGuardar).click();
  });
  $("#Guardar").click(function () {
      
      debugger;
      $("#21300b4c-ad8e-4b83-bbd4-431942150b0d_save").click();
      toastr.success('El registro se guardo de forma correcta');

   var numbers =  []
    let data = JSON.parse(JSON.stringify (kendo.jQuery('#grid').data('kendoGrid').dataSource.data()))
     data.forEach(element => {
          numbers.push(element.Teléfono)
     });
  });


  $("#Enviar").click(function () {
      
  debugger;
  var myHeaders = new Headers();
  myHeaders.append("Authorization",localStorage.Authorization);
  myHeaders.append("Content-Type", "application/json");
  var message = $('#9da65af6-1f31-4444-9055-44a0f803be90').val();
  if ($('#87b31681-9bd7-4527-b8c7-0f63b764357c').val() == '2: Importar destinatarios')  {
    var numbers =  []
    let data = JSON.parse(JSON.stringify (kendo.jQuery('#grid').data('kendoGrid').dataSource.data()))
     data.forEach(element => {
          numbers.push(element.Teléfono)
     });
  }else {
    var numbers = $('#5d75f15f-a644-47aa-a1b7-7426f82da9eb').val().split(',');
  }

  numbers = numbers.map((number) =>  {number= sessionStorage.Codigotelefono + number;return number.replaceAll(' ', '').replaceAll('+', '')});
  var raw = JSON.stringify({
    "numbers": numbers,
    "message": message, 
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
  
   toastr.success('Mensaje enviado de forma correcta');

   delete sessionStorage.SMSPrueba;
   sessionStorage.SMSPrueba = 'No'; 
   let btnGuardar = $("#21300b4c-ad8e-4b83-bbd4-431942150b0d_save")[0];
   $(btnGuardar).click();

  /* $("#21300b4c-ad8e-4b83-bbd4-431942150b0d_save").click(); */

  });
  
},1500);
}