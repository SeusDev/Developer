/*Evento report builder*/

var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == "cd23fe0d-4b48-47ad-bb00-131079965808") {
    setTimeout(() => {

        var id= sessionStorage.IdSolicitud;
        debugger;        
            var para = document.getElementsByClassName("resp-container");
            var img = document.createElement("iframe");
            img.className = "resp-iframe";
            img.src =`https://apps-dev-suiruntime.azurewebsites.net/#/viewItem?rowId=${id}&viewName=PGN_Lappiz_Solicitud&entityId=3b36e1a0-3620-4fe5-92a1-e9ceabd9bc76&viewMenu=true&appViewId=${idVista}&rs:embed=true`;
            para[0].appendChild(img);
        
    }, 1300);
}

