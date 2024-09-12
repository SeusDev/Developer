// Asignar color
setTimeout(function () {
    debugger;
    if (window.location.href.includes('appViewId=1e214ad2-13e7-48f4-9d30-8ed612ed3e41')){
        var cookie1 = document.cookie;
        var query=`select distinct h.Nombrehotel,h.Nit, h.Logo, h.ColorPrimario, h.ColorSecundario from lappizhotels_Lappiz_Hotel h
        join lappizhotels_Lappiz_Users u on u.HotelFk = h.Id
        where u.HotelFk='${cookie1}'` 
        execQuery(query).then(function(respuesta){
        var data = respuesta[0];
        $('body').get(0).style.setProperty("--primary-color", `${respuesta[0][0].ColorPrimario}` );
        //$('body').css('--primary-color',`${respuesta[0][0].ColorPrimario}`)
        $('body').css("--accent-color", `${respuesta[0][0].ColorSecundario}` )
    })
    }
}, 2100);



if (window.location.href.includes('appViewId=f2c64c88-8214-4c43-b66e-1c49707805ef')){
    debugger
    setTimeout(() => {
    document.querySelectorAll('#exampleColorInput')[0].value=e.dataItem.ColorPrimario
      document.querySelectorAll('#exampleColorInput2')[0].value=e.dataItem.ColorSecundario
  }, 2000);
  }