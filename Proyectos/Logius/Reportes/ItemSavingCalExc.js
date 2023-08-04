debugger; 

var Monto = e.value;

var Empresa = $('#4daee018-99eb-4d6f-9874-b2c9713c88b7').val();

var strinQuery = `select count(Id) as ac  from Logius_Lappiz_Importacion where EmpresaFk='${e.dataItem.EmpresaFk}'`



execQuery(strinQuery).then(function(response) {

if (response[0][0].ac == 0){

    var strinQuery2 = `declare @auxId uniqueidentifier 
    set @auxId = NEWID() 
    insert into Logius_Lappiz_Periodo (Id,FechaInicio,FechaFin,NumeroPeriodo) values(NEWID(),'${e.dataItem.Flevante}','select DATEADD(MONTH,18,'${e.dataItem.Flevante}'),1')
    select @auxId [Id]    
    `

    execQuery(strinQuery2).then(function(response){
        sessionStorage.PeriodoId= response[0][0].Id

    }) 

} else{

    


    }
    
})
