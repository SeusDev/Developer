setTimeout(function () {
  debugger;
  var url = location.href;
  var urlSplit = url.split("appViewId=");
  var idVista = urlSplit[1];
  if (idVista == "acfea474-95e6-4657-b9e3-e922b4136c3a") {
    debugger;
    toastr.options = {
      positionClass: "toast-top-center",
      closeButton: true,
      timeOut: "10000",
    };
    var query = `SELECT C.Id, C.CEConcursos FROM Kontest_Lappiz_Concurso C   JOIN Kontest_Lappiz_Pago P ON P.Id = C.PagoFk                  
    JOIN Kontest_Lappiz_Organizador O ON O.Id = P.OrganizadorFk
    WHERE O.Id = '${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}'`;

    var dataConcurso = ajaxQuery(query);
    $("#contain-ddlConcurso").empty();
    $("#contain-ddlConcurso").html(
      '<div id="ddlConcurso" class="dropDown"></div>'
    );
    $("#ddlConcurso").kendoDropDownList({
      autoBind: false,
      dataTextField: "CEConcursos",
      dataValueField: "Id",
      template: `<span class="k-state-default"style="width:80% !important ;font-size: x-small; margin-left:5px"><p>#:CEConcursos #</p></span>`,
      headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px; margin-left:5px"><span class="k-widget k-header" style="width:80% ; font-size: x-small">Concurso</span>`,
      valueTemplate: `<span><p style="margin-top:8px">#: CEConcursos #</p></span>`,
      dataSource: {
        data: dataConcurso,
      },
      optionLabel: {
        CEConcursos: "Seleccione un registro...",
        Id: "",
      },

      filter: "startswith",
      filtering: function (ev) {
        delete sessionStorage.dataGrid;
        var filterValue = ev.filter != undefined ? ev.filter.value : "";
        ev.preventDefault();
        this.dataSource.filter({
          logic: "or",
          filters: [
            {
              field: "CEConcursos",
              operator: "startswith",
              value: filterValue,
            },
          ],
        });
      },
      change: function (e) {
        debugger;
        //Tipo Ronda Simple
        var Id = this.dataItem().Id;
        if (Id != "") {
          var data = ajaxQuery(`create table #Simple
        (Nombre nvarchar(max),Tipo nvarchar(100),Entrada int, Concurso nvarchar(max), Categoria nvarchar
        (max), Tema nvarchar (max),Aceptadas int, Rechazadas int,
        Pendiente int, OrganizadorFk nvarchar (max))
        INSERT INTO #Simple      SELECT  J.Nombre,R.Tipo,Count(distinct CP.IdEntrada)'Entrada',C.CEConcursos,CT.Nombre,T.Nombre,count (distinct  CP.IdEntrada)'Aceptadas',Rechazadas = 0,pendiente = 0,P.OrganizadorFk         
        FROM  Kontest_Lappiz_AsignacionJurado AJ                                     
        join Kontest_Lappiz_CargasPorTemaPorParticipante CP ON CP.CategoriaFk = Aj.CategoriaFk                              
        join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id                              
        join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk                              
        join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id                              
        join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id                              
        join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id                              
        left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id                              
        join Kontest_Lappiz_Pago P on C.PagoFk = P.Id          
        LEFT JOIN Kontest_Lappiz_Votacion V ON V.AsignacionFk = Aj.Id AND J.Id = V.JuradoFk        
        WHERE  R.Tipo = 'Simple' and CP.Estado = 'Aceptado'                                
        and CP.ConcursoFk = '${Id}'                          
        group by J.Nombre,R.Tipo,C.CEConcursos,CT.Nombre,T.Nombre,P.OrganizadorFk,CP.Estado                      
        UNION ALL                      
        SELECT  J.Nombre,R.Tipo,count(distinct CP.IdEntrada)'Entrada',C.CEConcursos,CT.Nombre,T.Nombre,Aceptadas = 0,count (distinct  CP.IdEntrada)'Rechazadas',Pendiente = 0,P.OrganizadorFk                         
        FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP                              
        join Kontest_Lappiz_AsignacionJurado AJ on CP.ConcursoFk = AJ.ConcursoFk and CP.CategoriaFk = AJ.CategoriaFk                              
        join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id                              
        join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk                              
        join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id                              
        join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id                              
        join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id                              
        left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id                              
        join Kontest_Lappiz_Pago P on C.PagoFk = P.Id                          
        WHERE  R.Tipo = 'Simple' and  CP.Estado = 'Rechazado'                          
        and CP.ConcursoFk = '${Id}'                          
        group by J.Nombre,R.Tipo,C.CEConcursos,CT.Nombre,T.Nombre,P.OrganizadorFk,CP.Estado                      
        UNION ALL                      
        SELECT  J.Nombre,R.Tipo,count(distinct CP.IdEntrada)'Entrada',C.CEConcursos,CT.Nombre,T.Nombre,Aceptadas = 0,Rechazadas= 0 ,count (distinct  CP.IdEntrada)'Pendiente',P.OrganizadorFk                          
        FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP                              
        join Kontest_Lappiz_AsignacionJurado AJ on CP.ConcursoFk = AJ.ConcursoFk and CP.CategoriaFk = AJ.CategoriaFk                              
        join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id                              
        join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk                              
        join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id                              
        join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id                              
        join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id                              
        left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id                              
        join Kontest_Lappiz_Pago P on C.PagoFk = P.Id                          
        WHERE  R.Tipo = 'Simple' and  CP.Estado = 'Pendiente'                          
        and CP.ConcursoFk = '${Id}'                          
        group by J.Nombre,R.Tipo,C.CEConcursos,CT.Nombre,T.Nombre,P.OrganizadorFk,CP.Estado             
        select                          
        Nombre 'NombreJurado',                          
        Tipo 'Tipoderonda',                           
        sum(Entrada) 'Entradassubidas',                         
        sum(Aceptadas)+sum(Rechazadas)'Entradascalificadas',                       
        sum(Pendiente) 'Entradaspendientesporcalificar',        
        Concurso,
        Categoria 'Categoría',
        Tema,                          
        OrganizadorFk
        from #Simple                          
        where OrganizadorFk = '${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}'                          
        group by Nombre,Tipo,Concurso,Categoria,Tema,OrganizadorFk        
        order by Nombre                          
        drop table #Simple`);

          if (data.length > 0) {
            
            $("#grid-juzgamientoSimple").kendoGrid({
              toolbar: ["excel"],
              excel: {
                fileName: "Juzgamiento ronda simple.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true,
              },
              dataSource: {
                data: data,
                pageSize: 10,
              },
              batch: true,
              editable: false,
              persistSelection: false,
              scrollable: true,
              sortable: true,
              filterable: false,
              resizable: true,
              pageable: {
                buttonCount: 5,
                pageSizes: true,
                refresh: true,
              },
              dataBound: function () {
                debugger;
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
              columns: [
                { field: "NombreJurado", title: "Nombre Jurado" },
                { field: "Tipoderonda", title: "Tipo de ronda" },
                {
                  field: "Entradassubidas",
                  title: "Entradas subidas al concurso",
                },
                { field: "Entradascalificadas", title: "Entradas calificadas" },
                {
                  field: "Entradaspendientesporcalificar",
                  title: "Entradas pendientes por calificar",
                },
                { field: "Categoría", title: "Categoría" },
                { field: "Tema", title: "Tema" },
                /*{   
                  command: {
                  ext: "habilitar",
                  click: habilitar,
                  template: "<a class='k-grid-habilitar btn'><i class='fa fa-edit'></i> Habilitar</a>",
                },*/,
              ],
              //Tipo Ronda Votación
            });
            var data = ajaxQuery(`SELECT  J.Nombre,COUNT( V.IdEntrada) EntradasAvotar ,R.Tipo,C.CEConcursos,CT.Nombre AS Categoria,T.Nombre AS Tema,count(V.NotaVotacion)'Votadas', Pendiente = 0                          
            FROM Kontest_Lappiz_AsignacionJurado Aj                          
            JOIN Kontest_Lappiz_DetalleAsignacionJurado Daj ON Daj.AsignacionJuradoFk = Aj.Id                          
            JOIN Kontest_Lappiz_Jurados J ON J.Id = Daj.JuradoFk                          
            LEFT JOIN Kontest_Lappiz_Votacion V ON V.AsignacionFk = Aj.Id AND J.Id = V.JuradoFk                          
            join Kontest_Lappiz_Concurso C on Aj.ConcursoFk = C.Id                          
            join Kontest_Lappiz_Categoria CT on Aj.CategoriaFk = CT.Id                          
            left join Kontest_Lappiz_Tema T on Aj.TemaFk = T.Id                          
            join Kontest_Lappiz_Ronda R on Aj.RondaConcursoFk = R.Id                          
            join Kontest_Lappiz_Pago P on C.PagoFk = P.Id                          
            where R.Tipo = 'Votación'  AND V.NotaVotacion is not null 
            and P.OrganizadorFk = '${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}'
            and C.Id = '${Id}'            
            GROUP BY C.CEConcursos,CT.Nombre,T.Nombre,J.Nombre,R.Tipo, Aj.Estado                          
            UNION ALL
            SELECT J.Nombre, COUNT(V.IdEntrada) EntradasAvotar ,R.Tipo,C.CEConcursos,CT.Nombre,T.Nombre,Terminada=0,                          
            Count(V.NotaVotacion)'Pendiente' 
            FROM Kontest_Lappiz_AsignacionJurado Aj                          
            JOIN Kontest_Lappiz_DetalleAsignacionJurado Daj ON Daj.AsignacionJuradoFk = Aj.Id                          
            JOIN Kontest_Lappiz_Jurados J ON J.Id = Daj.JuradoFk                          
            LEFT JOIN Kontest_Lappiz_Votacion V ON V.AsignacionFk = Aj.Id AND J.Id = V.JuradoFk                          
            join Kontest_Lappiz_Concurso C on Aj.ConcursoFk = C.Id                          
            join Kontest_Lappiz_Categoria CT on Aj.CategoriaFk = CT.Id                          
            left join Kontest_Lappiz_Tema T on Aj.TemaFk = T.Id                          
            join Kontest_Lappiz_Ronda R on Aj.RondaConcursoFk = R.Id                          
            join Kontest_Lappiz_Pago P on C.PagoFk = P.Id                          
            where R.Tipo = 'Votación' AND V.NotaVotacion < 0                          
            and P.OrganizadorFk ='${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}'                          
            and C.Id = '${Id}'                          
            GROUP BY C.CEConcursos,CT.Nombre,T.Nombre,J.Nombre,R.Tipo, Aj.Estado                          
            order by CT.Nombre`);

            $("#grid-juzgamientoVotacion").kendoGrid({
              toolbar: ["excel"],
              excel: {
                fileName: "Juzgamiento ronda de votación.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true,
              },
              dataSource: {
                data: data,
                schema: {
                  model: {
                    fields: {
                      Nombre: {
                        type: "string",
                        editable: false,
                      },
                      Tipo: {
                        type: "string",
                        editable: false,
                      },
                      EntradasAvotar: {
                        type: "string",
                        editable: false,
                      },
                      Votadas: {
                        type: "string",
                        editable: false,
                      },
                      Pendiente: {
                        type: "string",
                        editable: false,
                      },
                      Categoria: {
                        type: "string",
                        editable: false,
                      },
                      Tema: {
                        type: "string",
                        editable: false,
                      },
                    },
                  },
                },
                pageSize: 10,
              },
              scrollable: true,
              sortable: true,
              resizable: true,
              pageable: {
                buttonCount: 1,
                refresh: true,
                pageSizes: true,
              },

              dataBound: function () {
                debugger;
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
              columns: [
                {
                  field: "Nombre",
                  title: "Jurados",
                },
                {
                  field: "Tipo",
                  title: "Tipo de Ronda",
                },
                {
                  field: "EntradasAvotar",
                  title: "Entradas a votar",
                },
                {
                  field: "Votadas",
                  title: "Entradas votadas",
                },
                {
                  field: "Pendiente",
                  title: "Entradas pendientes por votación",
                },
                {
                  field: "Categoria",
                  title: "Categoría",
                },
                {
                  field: "Tema",
                  title: "Tema",
                },
                /*{
                  command: {
                  text: "habilitar",
                  click: habilitar,
                  template: "<a class='k-grid-habilitar btn'><i class='fa fa-edit'></i> Habilitar</a>",},
                },*/
              ],
              
            //Tipo Ronda Calificación
            });
            var data = ajaxQuery(`create table #RondaCalificacion(Nombre nvarchar(max),EntradasAcalificar int,Tipo nvarchar(max),CEConcursos nvarchar(max),Temas nvarchar(max),Categoria nvarchar(max),Calificadas int,Pendiente int,)
            INSERT INTO #RondaCalificacion                                     
            SELECT J.Nombre,COUNT(DISTINCT CA.IdEntrada) EntradasAcalificar,R.Tipo,C.CEConcursos,T.Nombre AS Temas,CT.Nombre AS Categoria, COUNT(DISTINCT Dc.CalificacionFk) Calificadas, Pendiente = 0                            
            FROM Kontest_Lappiz_Calificacion CA
            JOIN Kontest_Lappiz_AsignacionJurado Aj ON Aj.Id = CA.AsignacionFk
            JOIN Kontest_Lappiz_DetalleAsignacionJurado Da ON Da.AsignacionJuradoFk = Aj.Id                            
            JOIN Kontest_Lappiz_Jurados J ON J.Id = Da.JuradoFk                      
            join Kontest_Lappiz_Concurso C on Aj.ConcursoFk = C.Id                            
            LEFT JOIN Kontest_Lappiz_DetalleCalificacion Dc ON Dc.CalificacionFk = CA.Id AND Dc.JuradoFk = Da.JuradoFk                      
            join Kontest_Lappiz_Ronda R on Aj.RondaConcursoFk = R.Id                      
            left join Kontest_Lappiz_Tema T on Aj.TemaFk = T.Id                      
            join Kontest_Lappiz_Categoria CT on Aj.CategoriaFk = CT.Id                             
            WHERE C.Id =  '${Id}'                      
            AND R.Tipo = 'Calificación'                            
            GROUP BY CT.Nombre, C.CEConcursos, J.Id,J.Nombre,R.Tipo,T.Nombre                            
            ORDER BY J.Nombre,CT.Nombre                                        
            select 
            Nombre 'Nombre', 
            EntradasAcalificar 'EntradasAcalificar', 
            Tipo 'Tipo', 
            CEConcursos'CEConcursos',
            Categoria 'Categoria', 
            Temas 'Temas', 
            Calificadas 'Calificadas', 
            Pendiente = (EntradasAcalificar - Calificadas)                                                                         
            from #RondaCalificacion 
            order by Categoria, Nombre drop table #RondaCalificacion`);

            $("#grid-juzgamientoCalificacion").kendoGrid({
              toolbar: ["excel"],
              excel: {
                fileName: "Juzgamiento ronda de calificación.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true,
              },
              dataSource: {
                data: data,
                schema: {
                  model: {
                    fields: {
                      Nombre: {
                        type: "string",
                        editable: false,
                      },
                      Tipo: {
                        type: "string",
                        editable: false,
                      },
                      EntradasAcalificar: {
                        type: "string",
                        editable: false,
                      },
                      Calificadas: {
                        type: "string",
                        editable: false,
                      },
                      Pendiente: {
                        type: "string",
                        editable: false,
                      },
                      Categoria: {
                        type: "string",
                        editable: false,
                      },
                      Temas: {
                        type: "string",
                        editable: false,
                      },
                    },
                  },
                },
                pageSize: 10,
              },
              scrollable: true,
              sortable: true,
              resizable: true,
              pageable: {
                buttonCount: 1,
                refresh: true,
                pageSizes: true,
              },
              dataBound: function () {
                debugger;
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
              columns: [
                {
                  field: "Nombre",
                  title: "Jurados",
                },
                {
                  field: "Tipo",
                  title: "Tipo de Ronda",
                },
                {
                  field: "EntradasAcalificar",
                  title: "Entradas a calificar",
                },
                {
                  field: "Calificadas",
                  title: "Entradas calificadas",
                },
                {
                  field: "Pendiente",
                  title: "Entradas pendientes por calificar",
                },
                {
                  field: "Categoria",
                  title: "Categoría",
                },
                {
                  field: "Temas",
                  title: "Tema",
                },
                /*{                                      
                command: {               
                text: "habilitar",
                click: habilitar,
                template: "<a class='k-grid-habilitar btn'><i class='fa fa-edit'></i> Habilitar<a>",},
                },*/
              ],
             
              //Reporte de fotos ronda Simple
            });
        
var data = ajaxQuery(`SELECT  CP.Titulo, NombreFoto = (
SELECT STUFF((
SELECT ',   ' + NombreFoto from Kontest_Lappiz_CargasPorTemaPorParticipante CPP where CPP.IdEntrada = CP.IdEntrada 
FOR XML PATH ('')
)
,1,2, '')
)
,CT.Nombre AS Categoria, 
T.Nombre AS Tema, 
CP.TipoEntra, 
Pt.Nombre, 
Pt.Apellido, 
CP.Estado,
CP.IdEntrada 
FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP 
JOIN Kontest_Lappiz_AsignacionJurado Aj on CP.ConcursoFk = Aj.ConcursoFk and CP.CategoriaFk = Aj.CategoriaFk                                      
JOIN Kontest_Lappiz_DetalleAsignacionJurado Daj ON Daj.AsignacionJuradoFk = Aj.Id
jOIN Kontest_Lappiz_Categoria CT ON Aj.CategoriaFk = CT.Id 
LEFT JOIN Kontest_Lappiz_Tema T ON CP.TemaFk = T.Id                                      
JOIN Kontest_Lappiz_Participante Pt ON Pt.Id = CP.ParticipanteFk                              
join Kontest_Lappiz_Concurso C on Aj.ConcursoFk = C.Id                                     
join Kontest_Lappiz_Pago P on C.PagoFk = P.Id
WHERE CP.Estado = 'Aceptado' 
and P.OrganizadorFk = '${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}'                                      
and C.Id = '${Id}' 
GROUP BY CP.Titulo,CT.Nombre,T.Nombre,CP.TipoEntra,Pt.Nombre, Pt.Apellido,CP.Estado,CP.IdEntrada
UNION ALL 
SELECT  CP.Titulo, 
NombreFoto = (
  SELECT STUFF(
    (SELECT ',   ' + NombreFoto
     from Kontest_Lappiz_CargasPorTemaPorParticipante CPP 
    where CPP.IdEntrada = CP.IdEntrada 
    FOR XML PATH ('')), 
    1,2, '')
    ),
    CT.Nombre AS Categoria, 
    T.Nombre AS Tema,
    CP.TipoEntra, 
    Pt.Nombre, 
    Pt.Apellido, 
    CP.Estado, 
    CP.IdEntrada                                  
FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP                                  
JOIN Kontest_Lappiz_AsignacionJurado Aj on CP.ConcursoFk = Aj.ConcursoFk and CP.CategoriaFk = Aj.CategoriaFk                                  
JOIN Kontest_Lappiz_DetalleAsignacionJurado Daj ON Daj.AsignacionJuradoFk = Aj.Id                                  
jOIN Kontest_Lappiz_Categoria CT ON Aj.CategoriaFk = CT.Id                                  
LEFT JOIN Kontest_Lappiz_Tema T ON CP.TemaFk = T.Id                                  
JOIN Kontest_Lappiz_Participante Pt ON Pt.Id = CP.ParticipanteFk                                  
join Kontest_Lappiz_Concurso C on Aj.ConcursoFk = C.Id                                  
join Kontest_Lappiz_Pago P on C.PagoFk = P.Id                                  
WHERE CP.Estado = 'Rechazado'                                   
and P.OrganizadorFk = '${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}' 
and C.Id = '${Id}'
GROUP BY CP.Titulo,CT.Nombre,T.Nombre,CP.TipoEntra,Pt.Nombre, Pt.Apellido,CP.Estado,CP.IdEntrada   
                   `);
            $("#grid-AceptadasRechazadas").kendoGrid({
              toolbar: ["excel"],
              excel: {
                fileName: "Reporte de Fotos Aceptadas/Rechazadas.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
              },
              dataSource: {
                data: data,
                schema: {
                  model: {
                    fields: {
                      Titulo: {
                        type: "string",
                        editable: false,
                      },
                      NombreFoto: {
                        type: "string",
                        editable: false,
                      },
                      Categoria: {
                        type: "string",
                        editable: false,
                      },
                      Tema: {
                        type: "string",
                        editable: false,
                      },
                      TipoEntra: {
                        type: "string",
                        editable: false,
                      },
                      Nombre: {
                        type: "string",
                        editable: false,
                      },
                      Apellido: {
                        type: "string",
                        editable: false,
                      },
                      Estado: {
                        type: "string",
                        editable: false,
                      },
                    },
                  },
                },
                pageSize: 10,
              },
              scrollable: true,
              sortable: true,
              resizable: true,
              pageable: {
                buttonCount: 1,
                refresh: true,
                pageSizes: true,
              },

              dataBound: function () {
                debugger;
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
              columns: [
                {
                  field: "Titulo",
                  title: "Título",
                },
                {
                  field: "NombreFoto",
                  title: "Nombre del archivo",
                },
                {
                  field: "Categoria",
                  title: "Categoría",
                },
                {
                  field: "Tema",
                  title: "Tema",
                },
                {
                  field: "TipoEntra",
                  title: "Tipo de entrada",
                },
                {
                  field: "Nombre",
                  title: "Nombre",
                },
                {
                  field: "Apellido",
                  title: "Apellidos",
                },
                {
                  field: "Estado",
                  title: "Estado",
                },
                /*{                                      
command: {
text: "habilitar",
click: habilitar,
template: "<a class='k-grid-habilitar btn'><i class='fa fa-edit'></i> Habilitar</a>",
},
},*/
              ],
              //Resultados todos los Jurados ronda de Votación
            });
            var data = ajaxQuery(`SELECT CP.IdEntrada,CP.Titulo,CT.Nombre AS Categoria,T.Nombre AS Tema,CP.TipoEntra,
                  CONVERT(numeric(12,2), CONVERT(FLOAT,sum(NotaVotacion))/COUNT(CP.IdEntrada)) 
                  AS Promedio, 
                  Pt.Nombre,
                   Pt.Apellido ,
                   Archivos = 
                   (SELECT STUFF(
                  ( SELECT ',   ' + NombreFoto  
                  from Kontest_Lappiz_CargasPorTemaPorParticipante CPP
                  where CPP.IdEntrada = (select distinct IdEntrada 
                  from Kontest_Lappiz_Votacion where IdEntrada = CP.IdEntrada)                                  
                  FOR XML PATH (''))
                  , 1,2, '')
                  ) 
                  from Kontest_Lappiz_Votacion V 
                  JOIN Kontest_Lappiz_CargasPorTemaPorParticipante CP ON V.IdEntrada = CP.IdEntrada 
                  JOIN Kontest_Lappiz_AsignacionJurado Aj on CP.ConcursoFk = Aj.ConcursoFk and CP.CategoriaFk = Aj.CategoriaFk                               
                  JOIN Kontest_Lappiz_Categoria CT ON Aj.CategoriaFk = CT.Id                          
                  LEFT JOIN Kontest_Lappiz_Tema T ON CP.TemaFk = T.Id                                             
                  JOIN Kontest_Lappiz_Participante Pt ON Pt.Id = CP.ParticipanteFk                          
                  JOIN Kontest_Lappiz_Concurso C on Aj.ConcursoFk = C.Id                          
                  JOIN Kontest_Lappiz_Pago P on C.PagoFk = P.Id                          
                  JOIN Kontest_Lappiz_Ronda R ON R.ConcursoFk = C.Id                          
                  WHERE R.Tipo = 'Votación'
                  AND P.OrganizadorFk = '${
                    JSON.parse(sessionStorage.LappizUser).OrganizadorFk
                  }'                         
                  and C.Id = '${Id}' 
                  GROUP BY CP.IdEntrada,CP.Titulo,CT.Nombre,T.Nombre,CP.TipoEntra,Pt.Nombre,Pt.Apellido                          
                  order by CT.Nombre`);

            $("#grid-ResultadosJurado2").kendoGrid({
              toolbar: ["excel"],
              excel: {
                fileName: "Reporte resultados todos los jurados.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true,
              },
              dataSource: {
                data: data,
                schema: {
                  model: {
                    fields: {
                      Titulo: {
                        type: "string",
                        editable: false,
                      },
                      Categoria: {
                        type: "string",
                        editable: false,
                      },
                      Tema: {
                        type: "string",
                        editable: false,
                      },
                      TipoEntra: {
                        type: "string",
                        editable: false,
                      },
                      Promedio: {
                        type: "number",
                        editable: false,
                      },
                      Nombre: {
                        type: "string",
                        editable: false,
                      },
                      Apellido: {
                        type: "string",
                        editable: false,
                      },
                      Archivos: {
                        type: "string",
                        editable: false,
                      },
                    },
                  },
                },
                pageSize: 10,
              },
              scrollable: true,
              sortable: true,
              resizable: true,
              pageable: {
                buttonCount: 1,
                refresh: true,
                pageSizes: true,
              },

              dataBound: function () {
                debugger;
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
              columns: [
                {
                  field: "Titulo",
                  title: "Título",
                },
                {
                  field: "Categoria",
                  title: "Categoría",
                },
                {
                  field: "Tema",
                  title: "Tema",
                },
                {
                  field: "TipoEntra",
                  title: "Tipo de entrada",
                },
                {
                  field: "Promedio",
                  title: "Promedio Total",
                  format: "{0:n1}",
                },
                {
                  field: "Nombre",
                  title: "Nombre",
                },
                {
                  field: "Apellido",
                  title: "Apellidos",
                },
                {
                  field: "Archivos",
                  title: "Nombre del archivo",
                },
                /*{       
command: {                                          
  text: "habilitar",                                          
  click: habilitar,                                          
  template: "<a class='k-grid-habilitar btn'><i class='fa fa-edit'></i> Habilitar</a>",                                     
 },                                  
},*/
              ],
              //Resultados todos los Jurados ronda de calificación
            });
            $(
              "#grid-ResultadosJurado2 > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
            );

            var data = ajaxQuery(`
  create table #CalificacionJurados( 
  Titulo nvarchar(100),Concurso nvarchar(max), 
  Categoria nvarchar(max),
  Tema nvarchar(max), 
  TipoEntrada nvarchar(max), 
  IdEntrada uniqueidentifier, 
  Criterio varchar(max), 
  Promedio decimal(12,1),  
  Nombre varchar(max), 
  Apellido varchar(max), 
  Archivos varchar(max), 
  JuradoFk uniqueidentifier,
   Enlace varchar(max))

insert into #CalificacionJurados 
SELECT 
CP.Titulo,
C.CEConcursos'Concurso',
 CT.Nombre'Categoria',
  T.Nombre'Tema',CP.TipoEntra,
  CP.IdEntrada,
     Criterio = (
      SELECT STUFF(
        ( SELECT ', ' +(JZ.CEJuzgamientos + ': ' + CONVERT(nvarchar(50),sum(CONVERT(decimal(12,1),DCF.Nota *(JZ.Peso/100))))) 
        from Kontest_Lappiz_Calificacion CF           
join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk           
join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id         
where CF.Id = CLF.Id           
group by JZ.CEJuzgamientos          
order by JZ.CEJuzgamientos  asc          
FOR XML PATH ('')),
 1,2, '')
 ), 
 Promedio = (
  SELECT SUM(CONVERT(decimal(12,2), Nota *CONVERT(decimal(12,2), JZ.Peso / 100))) 
  from Kontest_Lappiz_Calificacion CF           
join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk           
join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id          
where CF.Id = CLF.Id 
),         
Nombre = Part.Nombre, 
Apellidos = Part.Apellido,
CP.NombreFoto 'Archivos', 
DCLF.JuradoFk, 
replace('https://drive.google.com/file/d/URL/view','URL',CP.UrlImagen) as 'URL'         
FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP          
join Kontest_Lappiz_AsignacionJurado AJ on CP.ConcursoFk = AJ.ConcursoFk and CP.CategoriaFk = AJ.CategoriaFk          
join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id          
join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk          
join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id          
join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id          
join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id          
left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id          
join Kontest_Lappiz_Pago P on C.PagoFk = P.Id          
join Kontest_Lappiz_Calificacion CLF on CP.IdEntrada = CLF.IdEntrada          
join Kontest_Lappiz_DetalleCalificacion DCLF on CLF.Id = DCLF.CalificacionFk          
join Kontest_Lappiz_Participante Part on CP.ParticipanteFk = Part.Id         
WHERE  R.Tipo = 'Calificación'                                           
and CP.TipoEntra = 'Individual' 
and P.OrganizadorFk = '${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}'           
and C.Id = '${Id}'         
group by  CP.Titulo,C.CEConcursos,CT.Nombre,T.Nombre,CP.TipoEntra,CP.IdEntrada,Part.Nombre,Part.Apellido,CP.NombreFoto,CP.NombreFoto,DCLF.JuradoFk,CLF.Id,CP.UrlImagen
UNION ALL
SELECT CP.Titulo,
 C.CEConcursos'Concurso',
  CT.Nombre'Categoria', 
  T.Nombre'Tema', 
  CP.TipoEntra,
  CP.IdEntrada, 
  Criterio = (
    SELECT STUFF(
      ( SELECT ', ' +(JZ.CEJuzgamientos + ': ' + CONVERT(nvarchar(50),sum(CONVERT(decimal(12,1),DCF.Nota *(JZ.Peso/100)))))           
from Kontest_Lappiz_Calificacion CF            
join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk            
join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id           
where CF.Id = CLF.Id            
group by JZ.CEJuzgamientos           
order by JZ.CEJuzgamientos  asc           
FOR XML PATH ('')),
 1,2, '')), 
 Promedio = (
  SELECT SUM(CONVERT(decimal(12,2), Nota *CONVERT(decimal(12,2), JZ.Peso / 100)))          
  from Kontest_Lappiz_Calificacion CF           
  join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk           
  join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id          
  where CF.Id = CLF.Id ),Nombre = Part.Nombre, Apellidos = Part.Apellido, 
  Archivos = (
  SELECT STUFF(
    ( SELECT ',   ' + NombreFoto from Kontest_Lappiz_CargasPorTemaPorParticipante CP                                     
     where IdEntrada = (select IdEntrada from Kontest_Lappiz_Calificacion where Id = CLF.Id)                                      
FOR XML PATH ('')), 
1,2, '')
), 
DCLF.JuradoFk,
replace('https://drive.google.com/file/d/URL/view','URL',CP.UrlImagen) as 'URL'                              
FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP                                  
join Kontest_Lappiz_AsignacionJurado AJ on CP.ConcursoFk = AJ.ConcursoFk and CP.CategoriaFk = AJ.CategoriaFk                                  
join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id                                  
join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk                                  
join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id                                  
join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id                                  
join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id                                  
left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id                                  
join Kontest_Lappiz_Pago P on C.PagoFk = P.Id                                  
join Kontest_Lappiz_Calificacion CLF on CP.IdEntrada = CLF.IdEntrada          
join Kontest_Lappiz_DetalleCalificacion DCLF on CLF.Id = DCLF.CalificacionFk                                  
join Kontest_Lappiz_Participante Part on CP.ParticipanteFk = Part.Id                              
WHERE  R.Tipo = 'Calificación' and CP.TipoEntra = 'Serie' and P.OrganizadorFk = '${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}'
 and C.Id ='${Id}'                              
group by  Cp.Titulo,C.CEConcursos,CT.Nombre,T.Nombre,CP.TipoEntra,Cp.IdEntrada,Part.Nombre,Part.Apellido,CLF.Id,DCLF.JuradoFk,CP.UrlImagen                              
order by Categoria,Tema                              
select  Titulo,Categoria,Tema,TipoEntrada,Criterio,CONVERT(decimal(12,2),(Promedio/COUNT(JuradoFk)))as Promedio, Nombre, Apellido, Archivos,Enlace  
from #CalificacionJurados                               
where Criterio is not null             
group by Titulo,Categoria,Tema,TipoEntrada,Promedio, Criterio, Nombre, Apellido, Archivos,Enlace                               
order by Categoria,Tema                              
drop table #CalificacionJurados
`);

            $("#grid-TodosLosJurados").kendoGrid({
              toolbar: ["excel"],
              excel: {
                fileName: "Reporte resultados todos los jurados.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true,
              },
              dataSource: {
                data: data,
                schema: {
                  model: {},
                },
                pageSize: 10,
              },
              scrollable: true,
              sortable: true,
              resizable: true,
              pageable: {
                buttonCount: 1,
                refresh: true,
                pageSizes: true,
              },

              dataBound: function () {
                debugger;
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
              },
              columns: [
                {
                  field: "Titulo",
                  title: "Título",
                },
                {
                  field: "Categoria",
                  title: "Categoría",
                },
                {
                  field: "Tema",
                  title: "Tema",
                },
                {
                  field: "TipoEntrada",
                  title: "Tipo de entrada",
                },
                {
                  field: "Criterio",
                  title: "Promedio Criterio Juzgamiento",
                  format: "{0:n1}",
                },
                {
                  field: "Promedio",
                  title: "Promedio total",
                  format: "{0:n1}",
                },
                {
                  field: "Nombre",
                  title: "Nombre",
                },
                {
                  field: "Apellido",
                  title: "Apellidos",
                },
                {
                  field: "Archivos",
                  title: "Nombre del archivo",
                },
                {
                  field: "Enlace",
                  title: "Enlace url",
                  template: '<a href="#=Enlace#">#= Enlace#</a>',
                },
                /*
{                                      
  command: {                                          
    text: "habilitar",                                          
    click: habilitar,                                          
    template: "<a class='k-grid-habilitar btn'><i class='fa fa-edit'></i> Habilitar</a>",                                      
  },                                  
},*/
              ],
            });

            document.querySelector("#SectionsFieldsListado3").style.display =
              "none";
            document.querySelector("#SectionsFieldsListado4").style.display =
              "none";
            document.querySelector("#SectionsFieldsListado5").style.display =
              "none";
            document.querySelector("#SectionsFieldsListado6").style.display =
              "none";
            document.querySelector("#SectionsFieldsListado8").style.display =
              "none";
            document.querySelector("#SectionsFieldsListado10").style.display =
              "none";

            $(
              "#grid-juzgamientoSimple > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
            );
            $(
              "#grid-juzgamientoVotacion > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
            );
            $(
              "#grid-juzgamientoCalificacion > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
            );
            $(
              "#grid-AceptadasRechazadas > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
            );
            $(
              "#grid-ResultadosJurado2 > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
            );
            $(
              "#grid-grid-TodosLosJurados > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
            );
          }
        }
      },
    });

var query = `SELECT DISTINCT J.Id, J.Nombre FROM  Kontest_Lappiz_Jurados J   
JOIN Kontest_Lappiz_DetalleAsignacionJurado DAJ ON DAJ.JuradoFk= J.Id          
JOIN Kontest_Lappiz_AsignacionJurado Aj ON Aj.Id = DAJ.AsignacionJuradoFk          
JOIN Kontest_Lappiz_Concurso C on Aj.ConcursoFk = C.Id          
JOIN Kontest_Lappiz_Pago P on C.PagoFk = P.Id          
JOIN Kontest_Lappiz_Organizador O ON O.Id = P.OrganizadorFk          
WHERE O.Id =  '${JSON.parse(sessionStorage.LappizUser).OrganizadorFk}'`;

    var dataJurado = ajaxQuery(query);
    $("#contain-ddlJurado").empty();
    $("#contain-ddlJurado").html('<div id="ddlJurado" class="dropDown"></div>');

    $("#ddlJurado").kendoDropDownList({
      autoBind: false,
      dataTextField: "Nombre",
      dataValueField: "Id",
      template: `<span class="k-state-default"  style="width:80% !important ; font-size: x-small; margin-left:5px"><p>#:Nombre #</p></span>`,
      headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px; margin-left:5px"><span class="k-widget k-header" style="width:80% ; font-size: x-small">Jurado</span>`,
      valueTemplate: `<span><p style="margin-top:8px">#:Nombre #</p></span>`,
      dataSource: {
        data: dataJurado,
      },
      optionLabel: {
        Nombre: "Seleccione un registro...",
        Id: "",
      },
      filter: "startswith",

      filtering: function (ev) {
        delete sessionStorage.dataGrid;
        var filterValue = ev.filter != undefined ? ev.filter.value : "";
        ev.preventDefault();

        this.dataSource.filter({
          logic: "or",
          filters: [
            {
              field: "Nombre",
              operator: "startswith",
              value: filterValue,
            },
          ],
        });
      },

      change: function (e) {
        debugger;

        let Id = this.dataItem().Id;

        // Resultados por Jurado ronda votación

        if (Id != "") {
          document.querySelector("#SectionsFieldsListado9").style.display =
            "none";
          document.querySelector("#SectionsFieldsListado7").style.display =
            "none";
          var concursoFk = $("#ddlConcurso").data("kendoDropDownList").value();

          if (concursoFk != "") {
            var TipoReporte = $("#TipoReporte").val();
            if (TipoReporte == "Resultados por Jurado ronda votación") {
              var data = ajaxQuery(`select CP.IdEntrada,J.Nombre AS NombreJurado,CP.Titulo,CT.Nombre AS Categoria,T.Nombre AS Tema,CP.TipoEntra, V.NotaVotacion,Pt.Nombre,Pt.Apellido, 
                Archivos = ( 
                SELECT STUFF(
               (SELECT ',   ' + NombreFoto                                  
                from Kontest_Lappiz_CargasPorTemaPorParticipante CPP                                  
                where CPP.IdEntrada = (select DISTINCT IdEntrada from Kontest_Lappiz_Votacion where IdEntrada = CP.IdEntrada)                                  
                FOR XML PATH ('')),
                 1,2, '')
                 )  
                 from Kontest_Lappiz_Votacion V                          
                join Kontest_Lappiz_CargasPorTemaPorParticipante CP on V.IdEntrada = CP.IdEntrada                          
                JOIN Kontest_Lappiz_AsignacionJurado Aj on CP.ConcursoFk = Aj.ConcursoFk and CP.CategoriaFk = Aj.CategoriaFk                          
                jOIN Kontest_Lappiz_Categoria CT ON Aj.CategoriaFk = CT.Id                          
                join Kontest_Lappiz_Jurados J on V.JuradoFk = J.Id                          
                LEFT JOIN Kontest_Lappiz_Tema T ON CP.TemaFk = T.Id                          
                JOIN Kontest_Lappiz_Participante Pt ON Pt.Id = CP.ParticipanteFk                          
                join Kontest_Lappiz_Concurso C on Aj.ConcursoFk = C.Id                          
                join Kontest_Lappiz_Pago P on C.PagoFk = P.Id                         
                where V.JuradoFk = '${Id}' and CP.ConcursoFk = '${concursoFk}' 
                AND P.OrganizadorFk = '${
                  JSON.parse(sessionStorage.LappizUser).OrganizadorFk
                }'
                group by CP.IdEntrada,CP.Titulo,J.Nombre,CT.Nombre,T.Nombre,CP.TipoEntra, V.NotaVotacion,Pt.Nombre,Pt.Apellido                          
                order by CP.Titulo`);

              $("#grid-ResultadosJurado").kendoGrid({
                toolbar: ["excel"],
                excel: {
                  fileName: "Reporte resultados por jurado.xlsx",
                  proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                  filterable: true,
                },
                dataSource: {
                  data: data,
                  schema: {
                    model: {
                      fields: {
                        NombreJurado: {
                          type: "string",
                          editable: false,
                        },
                        Titulo: {
                          type: "string",
                          editable: false,
                        },
                        Categoria: {
                          type: "string",
                          editable: false,
                        },
                        Tema: { type: "string", editable: false },
                        TipoEntra: {
                          type: "string",
                          editable: false,
                        },
                        NotaVotacion: {
                          type: "string",
                          editable: false,
                        },
                        Nombre: {
                          type: "string",
                          editable: false,
                        },
                        Apellido: {
                          type: "string",
                          editable: false,
                        },
                        Archivos: { type: "string", editable: false },
                      },
                    },
                  },
                  pageSize: 10,
                },
                scrollable: true,
                sortable: true,
                resizable: true,
                pageable: {
                  buttonCount: 1,
                  refresh: true,
                  pageSizes: true,
                },

                dataBound: function () {
                  debugger;
                  for (var i = 0; i < this.columns.length; i++) {
                    this.autoFitColumn(i);
                  }
                },
                columns: [
                  {
                    field: "NombreJurado",
                    title: "Nombre Jurado",
                  },
                  {
                    field: "Titulo",
                    title: "Título",
                  },
                  {
                    field: "Categoria",
                    title: "Categoría",
                  },
                  {
                    field: "Tema",
                    title: "Tema",
                  },
                  {
                    field: "TipoEntra",
                    title: "Tipo de entrada",
                  },
                  {
                    field: "NotaVotacion",
                    title: "Votación (1 a 10)",
                  },
                  {
                    field: "Nombre",
                    title: "Nombre",
                  },
                  {
                    field: "Apellido",
                    title: "Apellidos",
                  },
                  {
                    field: "Archivos",
                    title: "Nombre del archivo",
                  },

                  /*{
      command: {
          text: "habilitar",
          click: habilitar,
          template: "<a class='k-grid-habilitar btn'><i class='fa fa-edit'></i> Habilitar</a>",
      },
  },*/
                ],
                //Resultados por Jurado ronda calificación
              });
              document.querySelector("#SectionsFieldsListado7").style.display =
                "";
              $(
                "#grid-ResultadosJurado > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
              );
            } else if (
              TipoReporte == "Resultados por Jurado ronda calificación"
            ) {
              debugger;
              var data = ajaxQuery(`create table #CalificacionXJurado(Jurado nvarchar(max),
              Titulo nvarchar(100),
              Concurso nvarchar(max),
              Categoria nvarchar(max),
              Tema nvarchar(max),
              IdEntrada uniqueidentifier,
              Criterio varchar(max),
              Promedio decimal(12,1),
              Nombre varchar(max),
              Apellido varchar(max),
              Archivos varchar(max)
              )

              insert into #CalificacionXJurado
              SELECT distinct
              J.Nombre 'Jurado',
              CP.Titulo,
              C.CEConcursos'Concurso',
              CT.Nombre'Categoria',
              T.Nombre'Tema',
              CP.IdEntrada,
              Criterio = (
                SELECT STUFF(
                (	SELECT ', ' +(JZ.CEJuzgamientos + ': ' + CONVERT(varchar(10),DCF.Nota)) 
                from Kontest_Lappiz_Calificacion CF
                    join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk
                    join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id
                where CF.Id = CLF.Id and DCF.JuradoFk = '${Id}'
                order by JZ.CEJuzgamientos asc
                FOR XML PATH ('')),
              1,2, '')
              ),
              Promedio = (
                SELECT prom = SUM(CONVERT(decimal(12,2), Nota *CONVERT(decimal(12,2), JZ.Peso / 100)))
                from Kontest_Lappiz_Calificacion CF
                    join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk
                    join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id
                where CF.Id = CLF.Id and DCF.JuradoFk = '${Id}'
              ),
              Nombre = Part.Nombre,
              Apellidos = Part.Apellido,
              CP.NombreFoto 'Archivos'
              FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP
                join Kontest_Lappiz_AsignacionJurado AJ on CP.ConcursoFk = AJ.ConcursoFk and CP.CategoriaFk = AJ.CategoriaFk
                join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id
                join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk
                join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id
                join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id
                join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id
                left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id
                join Kontest_Lappiz_Pago P on C.PagoFk = P.Id
                join Kontest_Lappiz_Calificacion CLF on CP.IdEntrada = CLF.IdEntrada
                join Kontest_Lappiz_Participante Part on CP.ParticipanteFk = Part.Id
              WHERE  R.Tipo = 'Calificación' 
                    and J.Id = '${Id}' 
                    AND C.Id = '${concursoFk}'
                    and CP.TipoEntra = 'Individual' 
                    and P.OrganizadorFk = '${
                      JSON.parse(sessionStorage.LappizUser).OrganizadorFk
                    }'
              UNION ALL	

              SELECT 
              J.Nombre 'Jurado',    
              CP.Titulo,
              C.CEConcursos'Concurso',
              CT.Nombre'Categoria',
              T.Nombre'Tema',
              CP.IdEntrada,
              Criterio = ( 
                SELECT STUFF(
                (	SELECT ', ' +(JZ.CEJuzgamientos + ': ' + CONVERT(varchar(10),DCF.Nota)) 
                from Kontest_Lappiz_Calificacion CF
                    join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk
                    join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id
                where CF.Id = CLF.Id and DCF.JuradoFk = '${Id}'
                order by JZ.CEJuzgamientos asc
                FOR XML PATH ('')),
              1,2, '')
              ),
              Promedio = (
                SELECT prom = SUM(CONVERT(decimal(12,2), Nota *CONVERT(decimal(12,2), JZ.Peso / 100)))
                from Kontest_Lappiz_Calificacion CF
                    join  Kontest_Lappiz_DetalleCalificacion DCF on CF.Id = DCF.CalificacionFk
                    join Kontest_Lappiz_Juzgamiento JZ on DCF.CriterioJuzgamientoFk = JZ.Id
                where CF.Id = CLF.Id and DCF.JuradoFk = '${Id}'
              ),
              Nombre = Part.Nombre,
              Apellidos = Part.Apellido,
              Archivos = (
                SELECT STUFF(
                    (	SELECT ',   ' + NombreFoto
                    from Kontest_Lappiz_CargasPorTemaPorParticipante CP
                    where IdEntrada = (select IdEntrada from Kontest_Lappiz_Calificacion where Id = CLF.Id)
                    FOR XML PATH ('')),
                1,2, '')
              )
              FROM Kontest_Lappiz_CargasPorTemaPorParticipante CP
                join Kontest_Lappiz_AsignacionJurado AJ on CP.ConcursoFk = AJ.ConcursoFk and CP.CategoriaFk = AJ.CategoriaFk
                join Kontest_Lappiz_Ronda R on AJ.RondaConcursoFk = R.Id
                join Kontest_Lappiz_DetalleAsignacionJurado DAJ on AJ.Id = DAJ.AsignacionJuradoFk
                join Kontest_Lappiz_Jurados J on DAJ.JuradoFk = J.Id
                join Kontest_Lappiz_Concurso C on CP.ConcursoFk = C.Id
                join Kontest_Lappiz_Categoria CT on CP.CategoriaFk = CT.Id
                left join Kontest_Lappiz_Tema T on CP.TemaFk = T.Id
                join Kontest_Lappiz_Pago P on C.PagoFk = P.Id
                join Kontest_Lappiz_Calificacion CLF on CP.IdEntrada = CLF.IdEntrada
                join Kontest_Lappiz_Participante Part on CP.ParticipanteFk = Part.Id
              WHERE  R.Tipo = 'Calificación' 
                    and J.Id = '${Id}'
                    AND C.Id = '${concursoFk}'
                    and CP.TipoEntra = 'Serie' 
                    and P.OrganizadorFk = '${
                      JSON.parse(sessionStorage.LappizUser).OrganizadorFk
                    }'
              group by J.Nombre,Cp.Titulo,C.CEConcursos,CT.Nombre,T.Nombre,Cp.IdEntrada,Part.Nombre,Part.Apellido,CLF.Id

              select Jurado,Titulo,Categoria,Tema, Criterio, Promedio, Nombre, Apellido, Archivos from #CalificacionXJurado 
              where Criterio is not null 

              drop table #CalificacionXJurado
`);
              if (data.length > 0) {
                $("#grid-ResultadosxJurado").kendoGrid({
                  toolbar: ["excel"],
                  excel: {
                    fileName: "Reporte resultados por jurado.xlsx",
                    proxyURL:
                      "https://demos.telerik.com/kendo-ui/service/export",
                    filterable: true,
                  },
                  dataSource: {
                    data: data,
                    schema: {
                      model: {},
                    },
                    pageSize: 10,
                  },

                  scrollable: true,
                  sortable: true,
                  resizable: true,
                  pageable: {
                    buttonCount: 1,
                    refresh: true,
                    pageSizes: true,
                  },

                  dataBound: function () {
                    debugger;
                    for (var i = 0; i < this.columns.length; i++) {
                      this.autoFitColumn(i);
                    }
                  },
                  columns: [
                    {
                      field: "Jurado",
                      title: "Nombre Jurado",
                    },
                    {
                      field: "Titulo",
                      title: "Título",
                    },
                    {
                      field: "Categoria",
                      title: "Categoría",
                    },
                    {
                      field: "Tema",
                      title: "Tema",
                    },
                    {
                      field: "Criterio",
                      title: "Criterios de juzgamiento",
                    },
                    {
                      field: "Promedio",
                      title: "Promedio",
                      format: "{0:n1}",
                    },
                    {
                      field: "Nombre",
                      title: "Nombre",
                    },
                    {
                      field: "Apellido",
                      title: "Apellidos",
                    },
                    {
                      field: "Archivos",
                      title: "Nombre del archivo",
                    },

                    /*{
             command: {
              text: "habilitar",
              click: habilitar,
              template: "<a class='k-grid-habilitar btn'><i class='fa fa-edit'></i> Habilitar</a>",
                  },
                   },*/
                  ],
                });
              }

              document.querySelector("#SectionsFieldsListado9").style.display =
                "";
              $(
                "#grid-ResultadosxJurado > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-sm > a.k-pager-refresh.k-link"
              );
            }
          }
        }
      },
    });

    $(".dropDown").css("width", "100%");

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
        url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
        type: "POST",
        data: JSON.stringify(newquery),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", localStorage.Authorization);
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

    $("#TipoReporte").change(function () {
      var reporte = this.value;
      $(`${sessionStorage.ocultar}`).hide();
      if (reporte == "Tipo Ronda Simple") {
        $("#SectionsFieldsListado3").show();
        sessionStorage.ocultar = "#SectionsFieldsListado3";
      } else if (reporte == "Tipo Ronda Votación") {
        $("#SectionsFieldsListado4").show();
        sessionStorage.ocultar = "#SectionsFieldsListado4";
      } else if (reporte == "Tipo Ronda Calificación") {
        $("#SectionsFieldsListado5").show();
        sessionStorage.ocultar = "#SectionsFieldsListado5";
      } else if (reporte == "Reporte de fotos ronda Simple") {
        $("#SectionsFieldsListado6").show();
        sessionStorage.ocultar = "#SectionsFieldsListado6";
      } else if (reporte == "Resultados todos los Jurados ronda de Votación") {
        $("#SectionsFieldsListado8").show();
        sessionStorage.ocultar = "#SectionsFieldsListado8";
      } else if (
        reporte == "Resultados todos los Jurados ronda de calificación"
      ) {
        $("#SectionsFieldsListado10").show();
        sessionStorage.ocultar = "#SectionsFieldsListado10";
      } else if (reporte == "Resultados por Jurado ronda votación") {
        $("#SectionsFields9").show();
        sessionStorage.ocultar = "#SectionsFields9";
        sessionStorage.ocultar = "#SectionsFieldsListado7";
      } else if (reporte == "Resultados por Jurado ronda calificación") {
        $("#SectionsFields9").show();
        sessionStorage.ocultar = "#SectionsFields9";
        sessionStorage.ocultar = "#SectionsFieldsListado9";
      }
    });
  }
}, 2500);