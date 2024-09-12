var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];
console.log(idVista);
if (idVista == "65366d53-0294-4bf3-a6ac-c1d818c963d5") {
    debugger;
    setTimeout(() => {

        var nombre = JSON.parse(sessionStorage.LappizUser).FullName;

        document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul").style.display = "none"
        document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.title-section > h3").style.display = "none"
        document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > hr").style.border = "none"
        document.querySelector("body > app-root > app-base > div > app-sidebar > nav > div.sidebar-header.sidebar-header-horizontal > a").style.width = "50%"
        document.querySelector("#SectionsFields > div > div > div > app-html-content > section").style.display = "flex"

        let emailEmpresa = JSON.parse(sessionStorage.LappizUser).Email; 
        
        if (emailEmpresa === "admin@apuntuador.com") {

         document.querySelector("#sidebar-menu > li:nth-child(1) > ul > li:nth-child(2) > a > i").className = 'fa fa-address-book link-icon';
         /*Cambiar icono a roles*/
         document.querySelector("#sidebar-menu > li:nth-child(1) > ul > li:nth-child(3) > a > i").className = 'fa fa-wrench link-icon'; 
         /*Cambiar icono a asignar rol*/ 
        
        }
        document.querySelector("#Datos\\ básicos").innerHTML = `<h3 class="title-nombre" style="color:#b3273e; text-align: center;">Hola ${nombre}, ¿Qué planes tienes para hoy?</h3>`;
        document.querySelector("#Datos\\ básicos").style.marginTop='-6%';

        $("#card1").click(() => {
            debugger;
            if (location.host == 'runtimetest.lappiz.io') {
                var goLocation = myService.goLocation;
                var url = '#/grids?viewName=Apuntador_Lappiz_DiarioLabores&workspaceId=aa557a11-43eb-46e2-b41d-dc1a3948bb4b&entityId=eb8d72d4-1ca9-4f72-8a44-f91689225e54&dato=Diario%20labores&appViewId=112413c5-746e-4be9-bc2c-9620308e0901';
                goLocation(url);

            }

        })
        //$("#btnBD2").on("ready click", function(e) {
        $("#card2").click(() => {
            debugger;
            if (location.host == 'runtimetest.lappiz.io') {
                var goLocation = myService.goLocation;
                var url = '#/grids?viewName=Apuntador_Lappiz_Empresa&workspaceId=aa557a11-43eb-46e2-b41d-dc1a3948bb4b&entityId=502fa28f-5c1d-4ce5-bde7-01c261ec2c2a&dato=Finca%20o%20empresa&appViewId=8fb9cdf4-394a-4290-8eb3-dece694d6b1f';
                goLocation(url);

            }

        })

        $("#card3").click(() => {
            debugger;
            if (location.host == 'runtimetest.lappiz.io') {
                var goLocation = myService.goLocation;
                var url = '#/grids?viewName=Apuntador_Lappiz_Producto&workspaceId=aa557a11-43eb-46e2-b41d-dc1a3948bb4b&entityId=a68a56fb-e2a1-4a9c-9cd4-132a24f0f962&dato=Inventario%20de%20insumos&appViewId=0c5e329b-2676-4748-91e1-b4a7e2224569';
                goLocation(url);

            }

        })

    }, 1000);
} else {
    // Si el idVista no es igual al valor especificado, se ejecuta este bloque de código
    console.log("La página actual no es la página que estás buscando.");
}