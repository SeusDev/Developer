/* Creacion de consecutivo  */

try { setTimeout(function() {
    debugger;
        if(e.isNew){
            debugger;
let query = `select count (ID) Reservas from lappizhotels_Lappiz_Reserva`
execQuery(query).then(function (response) {
  let data = response[0][0].Reservas;
  if(data == 0 || data <= 9 ){
    let complemento = '000';
    let codigo = data + 1
    var codigo2 =      new Date().toLocaleDateString("en-GB").replaceAll("/", "") + '-' + complemento + codigo ;
    setFieldValue("78937452-fe5a-4c77-9fd5-6249c2aee625", codigo2);
  } else if (data >= 10 || data <= 99 ){
    let complemento = '00';
    let codigo = data + 1
    var codigo2 =      new Date().toLocaleDateString("en-GB").replaceAll("/", "") + '-' + complemento + codigo ;
    setFieldValue("78937452-fe5a-4c77-9fd5-6249c2aee625", codigo2);
  } else if (data >= 99 || data <= 999 ){
    let complemento = '00';
    let codigo = data + 1
    var codigo2 =      new Date().toLocaleDateString("en-GB").replaceAll("/", "") + '-' + complemento + codigo ;
    setFieldValue("78937452-fe5a-4c77-9fd5-6249c2aee625", codigo2);
  }
   
})
     
}
    
}, 800) } catch (error) { console.error("Error: " + error); isReadyForm(true);}