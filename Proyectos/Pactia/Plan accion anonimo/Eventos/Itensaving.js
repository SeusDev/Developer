debugger;
e.dataItem.CriticidadFk = document.getElementById('criticidad').value;

let grid= kendo.jQuery('#Grid').data('kendoGrid').dataSource.data();
    let grid1= kendo.jQuery('#Grid1').data('kendoGrid').dataSource.data();
    let Query=`INSERT INTO Lappiz_AllDocuments 
            ( id, name, encoding, MimeType, size, Buffer ) 
            VALUES`;
    let Ids = [];
    let Ids2 = [];
    let val = [];

    // Recorrer data evidencia inicial
    for (let index = 0; index < grid.length; index++) {
        const element = grid[index];
        let Id= generarID();
        val.push( ` ('${Id}', '${element.Name.split(".")[0]}', '7bit', '${element.Type}', '${element.Size}', convert(varbinary,'${element.Buffer}'))` )
        Id += `/${element.Name}`
        Ids.push(Id) 
     }
       // Recorrer data evidencia final
      for (let index = 0; index < grid1.length; index++) {
      const element = grid1[index];
      let Id= generarID();
      val.push( ` ('${Id}', '${element.Name.split(".")[0]}', '7bit', '${element.Type}', '${element.Size}', convert(varbinary,'${element.Buffer}'))` )
        Id += `/${element.Name}`
        Ids2.push(Id)
    }

    e.dataItem.EvidenciaInicial=Ids.join()
    e.dataItem.EvidenciaFinal=Ids2.join()

    ajaxQuery(Query + val.join())

    function generarID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }

    function ajaxQuery(query) {
        let data;
        let newquery = {
            query: query,
            parameters: {
            aType: "execTx",
            environment: `${backandGlobal.environment}`,
            },
        };
        $.ajax({
            async: false,
            url: `${backandGlobal.api2}/PactiaTest_lappiz.api/api/lappiz/sp/query`,
            type: "POST",
            data: JSON.stringify(newquery),
            beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", `bearer ${sessionStorage.token}`);
            },
            success: function (result) {
            data = result[0];
            },
            error: function (error) {
            console.log(error);
            },
        });
        return data;
}