/*Evento report builder*/

var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == "cd23fe0d-4b48-47ad-bb00-131079965808") {
    setTimeout(() => {
        debugger;
        let queryEmp = `        
        select e.Id, e.Nempresa from Logius_Lappiz_Importacion  im
        join Logius_Lappiz_Empresas e on im.EmpresaFk = e.Id
        group by e.Id,e.Nempresa order by e.Nempresa asc`;

        execQuery(queryEmp).then((success) => {
            let ProdData = success[0];

            $("#ddlEmpresa").kendoMultiSelect({
                dataTextField: "Nempresa",
                dataValueField: "Id",
                dataSource: ProdData,
            });
        });

        $("#btnGenerarReporte").click(function () {
            debugger;
            toolbar_click();
        });
       
        function toolbar_click() {
            debugger;                      
            var Fecha_Levante = $("#datePeriodo").val();            

            var multiselect = $("#ddlEmpresa").data("kendoMultiSelect");
            var items = multiselect.value();    


            let multi = $("#ddlEmpresa").getKendoMultiSelect();
            let multiDataItems = multi.dataItems();
            let SelectedEmp = [];
            
            multiDataItems.forEach(currentEmp => {
                SelectedEmp.push({ 
                    EmpId: currentEmp.Id, 
                    EmpName: currentEmp.Nempresa
                })
            });
            let empresas = SelectedEmp.map(e => e.EmpName).join(",");
                     
            var para = document.getElementsByClassName("resp-container");
            var img = document.createElement("iframe");
            img.className = "resp-iframe";
            img.src = `https://bi.lappiz.io/reports/report/Report%20Parts/Logius_Lappiz/Consolidado_General?rs:Command=Render&Fecha_Levante=${Fecha_Levante}&Emp=${empresas}&rs:embed=true`;
            para[0].appendChild(img);
        }
    }, 1300);
}