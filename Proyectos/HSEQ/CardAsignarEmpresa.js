
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == 'a44296af-e446-4155-9424-22f53c6a451a') {
    setTimeout(function () {
        debugger;
        
        var query = `
        select E.Id as Id,E.CogEmpresa as nombre,E.Color1 as color1,E.Color2 as color2,E.Logos from Lappiz_Users U inner join PortalProcesos_Lappiz_Colaborador C 
        on u.UsuarioFK=C.Id inner join PortalProcesos_Lappiz_DetalleEmpresas DE 
        on C.Id=DE.ColaboradorFk inner join PortalProcesos_Lappiz_CoEmpresa E 
        on DE.EmpresaFk=E.Id
        where u.Id='${sessionStorage.userId}' order by (E.IdCodigo) DESC`
        execQuery(query).then(function (response) {
            var data = response.data[0];
            if (data.length > 0) {
               
                for (var i = 0; i < data.length; i++) {
                    var logo="https://designer.lappiz.io/Api/api/Upload/UploadImages/" + data[i].Logos.split('[')[1].split(']')[0]
                   document.querySelectorAll('#insertar')[0].insertAdjacentHTML("afterbegin", ` <style>#f${i}:hover{background-color:${data[i].color2} !important;}</style><div class="course"><div class="course-preview" style=" background-color:${data[i].color1}"></div><div class="course-info"><h6>Empresa</h6><h2>${data[i].nombre}</h2><p style="display: none">${data[i].color2}</p><button id="${data[i].Id}" class="btn" style="background-color: ${data[i].color1} !important;border-color: ${data[i].color1} !important;"onclick="muestraMensaje(this)">Ingresar</button></div ></div >`)
                   //fin


                }
               
            }
        });
        
    },1200);
}
