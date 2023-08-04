var formdata = new FormData();
formdata.append("", fileInput.files[0], "FinticLogo.png");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/documents", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));