if (  window.location.href.includes("appViewId=750051c8-90c0-453a-b28d-31cf85c5154d")) {

    debugger;
  setTimeout(() => {

    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.actions-form-header > div > div > button").style.display='none'

    $("#Nuevopaciente").click(function () {

        var url = '#/grids?viewName=MA_Lappiz_Paciente&workspaceId=f43507d1-b77e-4cce-acf5-6c2d20b798d0&entityId=0b5709b7-a1eb-4055-a7d7-99f6325d18f5&dato=Pacientes&appViewId=7294d341-03d2-48bf-b456-0334ae148064';
        goLocation(url)

    });

    $("#Historiaclinica").click(function () {

        var url = '#/grids?viewName=MA_Lappiz_HC&workspaceId=f43507d1-b77e-4cce-acf5-6c2d20b798d0&entityId=e118bdad-ddcf-4a58-89cd-480563cf9245&dato=Historias%20clínicas&appViewId=cd7f483b-0ebc-4ebb-a281-2243f092e314';
        goLocation(url)

    });

    $("#Estetica").click(function () {

        var url = '#/grids?viewName=MA_Lappiz_Estetica&workspaceId=f43507d1-b77e-4cce-acf5-6c2d20b798d0&entityId=a9120ba2-5ba1-423e-8c96-52f8d892b208&dato=Estéticas%20&appViewId=84b119de-27c0-4764-af77-c8101fbc5031';
        goLocation(url) 

    });

    $("#Productos").click(function () {

        var url = '#/grids?viewName=MA_Lappiz_ProductosServicios&workspaceId=f43507d1-b77e-4cce-acf5-6c2d20b798d0&entityId=5266b64b-01ec-4108-81d8-a5f9ec3776a7&dato=Productos&appViewId=1ae8ee87-c54e-4b68-970d-2a86b39f4542';
        goLocation(url)
        
    });

  }, 1000);
}