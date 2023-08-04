// detalle  FormLoaded
// setTimeout(function () {
//     debugger;
//     if (e.isNew) {
//         var cantidad = parseInt(sessionStorage.Cantidad3)
//         var valor = `INC-0000${cantidad}`
//         var cantidad = valor.split("-")
//         var x = parseInt(cantidad[1])
//         if (x >= 10) {
//             valor = `INC-000${x}`
//         } else {
//             valor = `INC-0000${x}`
//         }
//         console.log(valor)
//         cantidad = parseInt(sessionStorage.Cantidad3)+1
//     }
// }, 800)
setTimeout(function () {
    var dataMultiSelect =  [{Tipo:"Trabajo en Caliente"},{Tipo:"Trabajo en Frío"},{Tipo:"Trabajo en espacio confinado"},{Tipo:"Trabajo en alturas"},{Tipo:"Trabajo eléctrico"}];
    $('#Tipo').kendoMultiSelect({
        placeholder: "Seleccione un tipo",
        dataTextField: "Tipo",
        dataValueField: "Tipo",
        autoBind: false,
        dataSource: dataMultiSelect
    });
    var dataEstados =[{Estado:'En proceso de aprobación'},{Estado:'Aprobado'},{Estado:'Suspendido'},{Estado:'Cerrado'},{Estado:'En proceso de cierre'}]
    $('#Estado').kendoMultiSelect({
        placeholder: "Seleccione un estado",
        dataTextField: "Estado",
        dataValueField: "Estado",
        dataSource:dataEstados
    });
    var query =`select E.Id,E.CEEmpresa from SafeWork_Lappiz_EmpresaContratista E`
    execQuery(query).then(function(response){
     var data =response.data[0];
     if(data.length>0){
        $('#Empresa').kendoMultiSelect({
            placeholder: "Seleccione una empresa",
                dataTextField: "CEEmpresa",
                dataValueField: "Id",
                dataSource:data,
                change: function(e) {
                    debugger;
                    var value = this.value(); 
                     value=value.join("','")
                    $('#contenedorSede').empty()
                    $('#contenedorSede').append('<div id="sedeEmpresa"></div>')
                    var Empresa=`select s.Id, S.CENombreSede  from SafeWork_Lappiz_SedesEmpresa S WHERE S.EmpresaContratistaFk in ('${value}')`
                    execQuery(Empresa).then(function(respuesta1){
                        var dataE=respuesta1.data[0];
                        if(dataE.length>0){
                            $('#sedeEmpresa').kendoMultiSelect({
                                placeholder: "Seleccione una empresa",
                                dataTextField: "CENombreSede",
                                dataValueField: "Id",
                                dataSource:dataE,
                                change: function(e) {
                                    debugger;   
                                    var value = this.value();
                                   value = value.join("','")
                                    $('#contenedorArea').empty()
                                    $('#contenedorArea').append('<div id="areaSede"></div>')
                                    var Area=`select a.Id,a.CEArea from SafeWork_Lappiz_AreaSede a where SedeFK in ('${value}')`
                                    execQuery(Area).then(function(respuesta){
                                        var dataA=respuesta.data[0];
                                        if(dataA.length>0){
                                            $('#areaSede').kendoMultiSelect({
                                                placeholder: "Seleccione una sede",
                                                dataTextField: "CEArea",
                                                dataValueField: "Id",
                                                dataSource:dataA,
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                    
                }
        });
     }
    });
    $('#Generalbtn')[0].onclick=function(){
        debugger;
        $('.resp-iframe').remove()
        var txtEmpresas =''
        if(sessionStorage.rolesId =='d243cb1f-3e4f-4854-92cd-6921be89db58'){
            var queryEmpresa = 'select Id from SafeWork_Lappiz_EmpresaContratista'
            execQuery(queryEmpresa).then(function(response3){
                if(response3.data[0].length>0){
                    for(var i=0; i<response3.data[0].length;i++){
                         txtEmpresas+='&Empresa='+  response3.data[0][i].Id
                    }
                    var ReportUrl = `https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fLappiz_HSEQ%2fReporteGeneral&rs:embed=true${txtEmpresas}`
                    var para = document.getElementsByClassName("card-container")
                    var img = document.createElement("iframe");
                    img.className = "resp-iframe";
                    img.src = ReportUrl;
                    console.log(img.src);
                    para[0].appendChild(img);
                }
            })
        }else{
            txtEmpresas='&Empresa='+JSON.parse(sessionStorage.LappizUser).EmpresaContratistaFK
            var ReportUrl = `https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fLappiz_HSEQ%2fReporteGeneral&rs:embed=true${txtEmpresas}`
            var para = document.getElementsByClassName("card-container")
            var img = document.createElement("iframe");
            img.className = "resp-iframe";
            img.src = ReportUrl;
            console.log(img.src);
            para[0].appendChild(img);
        }
    }
    
    $('#Filtrar')[0].onclick=function(){
        debugger;
        if($('#Tipo').val()!=null && $('#Estado').val() !=null && $('#fechainicial').val() !='' && $('#fechafinal').val()!='' ){
            var Tipos = $('#Tipo').val()
            var txtTipos ='';
            var query= `select * from SafeWork_Lappiz_PermisosDeOcensa where `
            var queryTipo=`select distinct TipoPermiso from SafeWork_Lappiz_PermisosDeOcensa where `
            for(var i=0; i<Tipos.length;i++){
                txtTipos +='&Tipos='+Tipos[i];
                if(i==Tipos.length-1)
                    queryTipo+= `TipoPermiso like'%${Tipos[i]}%'`
                else
                    queryTipo+= `TipoPermiso like'%${Tipos[i]}%' or  `
            }
            var Estados=$('#Estado').val()
            var txtEstado=''
            for(var i=0; i<Estados.length;i++){
                txtEstado+='&Estados='+Estados[i];
                if(i==Estados.length-1)
                    query+= `EstadoPermisoTrabajo like'%${Estados[i]}%'`
                else
                    query+= `EstadoPermisoTrabajo like'%${Estados[i]}%' or  `
            }
            var Empresa=$('#Empresa').val()
            var txtEmpresas=''
            for(var i=0; i<Empresa.length;i++){
                txtEmpresas+='&Empresa='+Empresa[i];
            }
            var Sede=$('#sedeEmpresa').data('kendoMultiSelect').value()
            var txtSede=''
            for(var i=0; i<Sede.length;i++){
                txtSede+='&Sede='+Sede[i];
            }
            var Area=$('#areaSede').data('kendoMultiSelect').value()
            var txtArea=''
            for(var i=0; i<Area.length;i++){
                txtArea+='&Area='+Area[i];
            }


            // var txtEmpresas =''
            // if(sessionStorage.rolesId =='d243cb1f-3e4f-4854-92cd-6921be89db58'){
            //     var queryEmpresa = 'select Id from SafeWork_Lappiz_EmpresaContratista'
            //     execQuery(queryEmpresa).then(function(response3){
            //         if(response3.data[0].length>0){
            //             for(var i=0; i<response3.data[0].length;i++){
            //                  txtEmpresas+='&Empresa='+  response3.data[0][i].Id
            //             }
            //         }
            //     })
                
            // }else{
            //     txtEmpresas='&Empresa='+JSON.parse(sessionStorage.LappizUser).EmpresaContratistaFK
            // }

            $('.resp-iframe').remove()
            execQuery(query).then(function(response){
                if(response.data[0].length>1){
                    execQuery(queryTipo).then(function(response2){
                        if(response2.data[0].length>0){
                            var ReportUrl = `https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fLappiz_HSEQ%2fReporteGeneral2&rs:embed=true${txtTipos}${txtEstado}&Inicio=${$('#fechainicial').val()}&Final=${$('#fechafinal').val()}${txtEmpresas}${txtSede}${txtArea}`
                            var para = document.getElementsByClassName("card-container")
                            var img = document.createElement("iframe");
                            img.className = "resp-iframe";
                            img.src = ReportUrl;
                            console.log(img.src);
                            para[0].appendChild(img);
                        }else{
                            toastr.warning('No hay datos con esos tipos de permiso')
                        }
                    });
                }else{
                    toastr.warning('No hay datos con ese estado')
                }
            });
        }else{
            toastr.warning('Seleccione todos los filtros');
        }
    }
}, 1000)