// Cambiar icono de la empresa
if (window.location.href.includes('appViewId=1e214ad2-13e7-48f4-9d30-8ed612ed3e41')) {
    debugger;
    setTimeout(function () {
        debugger;
        if (window.location.href.includes('appViewId=1e214ad2-13e7-48f4-9d30-8ed612ed3e41')){
            var cookie = JSON.parse(sessionStorage.LappizUser).HotelFk
            var query = `
            select distinct h.Nombrehotel,h.Nit, h.Logo, h.ColorPrimario, h.ColorSecundario from lappizhotels_Lappiz_Hotel h
            join lappizhotels_Lappiz_Users u on u.HotelFk = h.Id
            where u.HotelFk='${cookie}'`;
            execQuery(query).then(function (response) {
                var data = response[0];
                if (data.length > 0) {
                    var id = data[0].Logo;
                    if (id!= undefined && id!= null && id!= '') {
                        /* id=id.split('[')[1].split(']')[0] */
                        $('body > app-root > app-base > div > app-sidebar > nav.sidebar > div.sidebar-header > a > img')[0].src = `https://designertest.lappiz.io/Api/api/Upload/UploadImages/${id}`;
                    }
                    $('body').get(0).style.setProperty("--primary-color", `${response[0][0].ColorPrimario}` );
                    $('body').css("--accent-color", `${response[0][0].ColorSecundario}` )
                }
            });
        } 
	}, 2000);
}