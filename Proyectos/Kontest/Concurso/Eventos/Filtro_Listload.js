if (window.location.href.includes('appViewId=489af56f-c18c-4ba0-8ddb-8d99de4cb64d')) {
    debugger;
    
    if (sessionStorage.rolesId == '87ba053b-e81c-4730-b845-b3c652d10c87') {
        debugger;
        // Ocutart Boton Exporta
        document.querySelector("#grid1 > div.k-header.k-grid-toolbar").style.display='none'
        // Ocultar campo filtro
        document.querySelector("#filter").style.display='none'
        //ocultar icono filtro
        document.querySelector("#add > div:nth-child(1) > div > i").style.display='none'
    }
 
    $("#grid1 > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-lg > a.k-pager-refresh.k-link").hide()
    $("#grid1 > div.k-header.k-grid-toolbar.ng-scope > a.k-button.k-button-icontext.k-grid-excel").hide();
    $("#grid1 > div.k-header.k-grid-toolbar.ng-scope > a.k-button.k-button-icontext.k-grid-pdf").hide();
    $("#add > div.ng-scope > div").hide();
    
    evalQuery(`exec Kontest_UPDATE_EstadoParticipante`);
    var query = evalQuery(`create table #Concurso(
  Id uniqueidentifier,
  CEConcursos nvarchar(1000),
  PagoFk uniqueidentifier,
  OrganizadorFk uniqueidentifier,
  Organizador nvarchar(100),
  FechaIni datetime,
  FechaCierrePartici datetime,
  CierreConcurso datetime,
  Estado nvarchar(100),
  [Plan] nvarchar(max)
);
insert into #Concurso
select C.Id,C.CEConcursos,P.Id'PagoFk',O.Id'OrganizadorFk',O.Nombre'Organizador',FechaIni,C.FechaCierrePartici,CierreConcurso,Estado,C.[Plan] 
from Kontest_Lappiz_Concurso  C
join Kontest_Lappiz_Pago P on C.PagoFk = P.Id
join Kontest_Lappiz_Organizador O on P.OrganizadorFk = O.Id
where c.Estado ='Activo'
delete from #Concurso where Id in(select ConcursoFk from Kontest_Lappiz_Inscripcion where ParticipanteFk = '${JSON.parse(sessionStorage.LappizUser).ParticipanteFk}')
select * from #Concurso
drop table #Concurso`)
    var data = []
    query.forEach(element => {
        element.FechaCierrePartici = new Date(element.FechaCierrePartici).addHours(+5).toString('d/M/yyyy h:mm tt');
        element.FechaIni = new Date(element.FechaIni).addHours(+5).toString('d/M/yyyy h:mm tt');
        element.CierreConcurso = new Date(element.CierreConcurso).addHours(+5).toString('d/M/yyyy h:mm:ss tt');
        element.Kontest_Lappiz_Pago = {
            "Id": element.PagoFk,
            "OrganizadorFk": element.OrganizadorFk,
            Kontest_Lappiz_Organizador: {
                "Id": element.OrganizadorFk,
                "Nombre": element.Organizador
            }
        }
    });

    kendo.jQuery('#grid1').data('kendoGrid').dataSource.data([])
    kendo.jQuery('#grid1').data('kendoGrid').dataSource.data(query)

    function evalQuery(Query) {
        var Response = ''
        $.ajax({
            async: false,
            url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
            type: 'POST',
            data: JSON.stringify({
                query: Query,
                parameters: {
                    aType: "execTx",
                    environment: `${backandGlobal.environment}`
                }
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', localStorage.Authorization);
            },
            success: function (x) {
                Response = x[0]
            }
        });
        return Response;
    }
    
        setTimeout(function() {
        $('#grid1 > div.k-grid-header > div > table > colgroup > col:nth-child(1)').css('width','150px')
        $('#grid1 > div.k-grid-content.k-auto-scrollable > table > colgroup > col:nth-child(1)').css('width','150px')
        
        $('a[title="Participar."]').css('margin-bottom', '20px')
        $('a[title="Participar."]').css('width', 'fit-content')
        $('a[title="Participar."]').html(`<button type="button" class="btn btn-info"style="font-size: 14px;width: 96%;margin-left: -9px;">Participar</button>`)
        
        $('a[title="Detalle del concurso"]').css('margin-bottom', '20px')
        $('a[title="Detalle del concurso"]').css('width', 'fit-content')
        $('a[title="Detalle del concurso"]').html(`<button type="button" class="btn btn-info"style="font-size: 12px;width: auto;margin-left: -9px;">Detalles del concurso</button>`)
    }, 100);
    
} else if (window.location.href.includes('appViewId=b5304abc-7e3c-49c7-967a-c4e255d9ef05')) {
     ;
    


    var settings = {
        "url": `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/get/Kontest_Lappiz_Concurso`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": `${localStorage.Authorization}`,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "take": 10,
            "skip": 0,
            "page": 1,
            "pageSize": 10,
            "filter": {
                "logic": "and",
                "filters": [
                    {
                        "logic": "or",
                        "filters": [
                            {
                                "field": "Kontest_Lappiz_ParticipantePorConcurso.UsuarioFk",
                                "operator": "eq",
                                "value": sessionStorage.userId
                            }
                        ]
                    },
                    {
                        "logic": "or",
                        "filters": []
                    }
                ]
            },
            "includeEntities": "[{\"model\":modelo.Kontest_Lappiz_ParticipantePorConcurso, \"as\": \"Kontest_Lappiz_ParticipantePorConcurso\"},{\"model\":modelo.Kontest_Lappiz_Pago, \"as\": \"Kontest_Lappiz_Pago\", include: [{\"model\":modelo.Kontest_Lappiz_Organizador, \"as\": \"Kontest_Lappiz_Organizador\"}]}]",
            "tenantId": "null",
            "parameters": {
                "userId": sessionStorage.userId,
                "tablaId": "",
                "appViewId": "b5304abc-7e3c-49c7-967a-c4e255d9ef05",
                "actionId": "00000000-0000-0000-0000-000000000000",
                "pType": "showinmenu",
                "aType": "view",
                "environment": `${backandGlobal.environment}`,
                "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
            }
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        kendo.jQuery('#grid1').data('kendoGrid').dataSource.data([])
        var dataGrid = response.data.rows
        dataGrid.forEach(element => {
            element.FechaCierrePartici = new Date(element.FechaCierrePartici).addHours(+5).toString('M/d/yyyy h:mm tt');
            element.FechaIni = new Date(element.FechaIni).addHours(+5).toString('M/d/yyyy h:mm tt');
            element.CierreConcurso = new Date(element.CierreConcurso).addHours(+5).toString('M/d/yyyy h:mm tt');
        });
        kendo.jQuery('#grid1').data('kendoGrid').dataSource.data(dataGrid)
        sessionStorage.Grid = JSON.stringify(dataGrid)
    });
    
    $("#participar").hide();
    
   //formulario del detalle de mis concursos 
   

    /*if (window.location.href.includes('appViewId=b5304abc-7e3c-49c7-967a-c4e255d9ef05')) {
        //var myVar = setInterval(Grid, 3000);
        function Grid() {
            var Grid = JSON.parse(sessionStorage.Grid)
            kendo.jQuery('#grid1').data('kendoGrid').dataSource.data([])
            kendo.jQuery('#grid1').data('kendoGrid').dataSource.data(Grid)
        }
    }else{
        clearInterval(myVar);
    }*/
}