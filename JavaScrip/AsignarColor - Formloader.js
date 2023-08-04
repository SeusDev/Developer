// Asignar color
setTimeout(function () {
    debugger;
    if (window.location.href.includes('appViewId=1e214ad2-13e7-48f4-9d30-8ed612ed3e41')){
        var cookie2 = document.cookie.split(';')[1].split(' ')[1];
        var query=`select distinct h.Nombrehotel,h.Nit, h.Logo, h.ColorPrimario, h.ColorSecundario from lappizhotels_Lappiz_Hotel h
        join lappizhotels_Lappiz_Users u on u.HotelFk = h.Id
        where u.HotelFk='${cookie2}'` 
        execQuery(query).then(function(respuesta){
        var data = respuesta[0];
        $('body').get(0).style.setProperty("--primary-color", `${respuesta[0][0].ColorPrimario}` );
        //$('body').css('--primary-color',`${respuesta[0][0].ColorPrimario}`)
        $('body').css("--accent-color", `${respuesta[0][0].ColorSecundario}` )
    })
    }
}, 2100);