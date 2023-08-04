var url = location.href.split("appViewId=")[1];

if (url === "ecd98196-9814-4e4d-934b-986e333eec4b") {
  setTimeout(() => {
    debugger;
    document.querySelector("#Datos\\ básicos > div").textContent = "";
    /* OCULTA EL TAB GENERAL */
    $(
      "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul"
    )[0].style.display = "none";

    var StringQuery = `select Id,CENombre, DescripcionModulo from PactiaTest_Lappiz_Modulo_Pactia_inspecciones`;

    execQuery(StringQuery).then(function (response) {
    
     document.removeAllListeners();
      var data = response[0];
      let htmlCard = ''
      data.forEach((element) => {
        let nombreModulo = element.CENombre;
        let descripcionModulo = element.DescripcionModulo;

        htmlCard += `<div>
        <div class="col-md-3" style="margin: 3%; margin-right: 15%;">
            <div class="card" style="width: 350px;height: 100%;">
                <div class="card-body" style=" border-style: double; border-color: #d6ccc2;">
                    <img src="https://i.ibb.co/2kPW7QZ/Pactia-1.png" style="width: 100%;" />
                    <h3 class="card-title text-center mb-2 p-2"
                        style="background-color: #001d3d; color: white; width: 50%;text-align: center; margin-left: 24%;margin-top: 4%;">${nombreModulo}</h3>
                    <br>
                    <h6 style="border-radius: 2%; border-color: #d6ccc2;">${descripcionModulo}</h6>
                    <button data-Nombre="${element.Id}" style= "background-color:#001d3d;border-color:darkblue; color: white; margin-left: 34%;margin-top: 5%; " type="button" class="btn btn-outline-primary"id="enlace" >Acceder</button>
                    </button>
                </div>
            </div>
        </div>`;       
      });
      $("#ListReportes").append(htmlCard);
      document.addEventListener("click", (e) => {
        e.stopPropagation();
          if (e.target.id == 'enlace'){
            debugger;
              sessionStorage.modulo = e.target.dataset.nombre;
              var goLocation = myService.goLocation;
              var url = 
                "#/grids?viewName=PactiaTest_Lappiz_Reporte_inspecciones&workspaceId=7e77378b-d518-46bc-b08b-6bf96e378190&entityId=6f4c1951-32d7-4636-9a5e-e32d62aec980&dato=Cronograma%20y%20alertas&appViewId=617582be-b5cd-482d-be92-8c88bf792364";
              goLocation(url);
      
          }
      });
    });
  }, 700);
}