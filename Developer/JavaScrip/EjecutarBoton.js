var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];
console.log(idVista);
if (idVista == "bca5462a-fc4d-4b47-9d16-76214bee1cad") {
    debugger;
    setTimeout(() => {
        debugger;

        $("#hclient").click(() => {
            hclient()
        });
        
    }, 1000);
} else {
    // Si el idVista no es igual al valor especificado, se ejecuta este bloque de código
    console.log("La página actual no es la página que estás buscando.");
}