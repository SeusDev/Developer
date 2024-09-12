
// setTimeout(function () {
//     debugger
//         //con esta linea nos retorna la cantidad de registro de la grid
    
//         sessionStorage.Cantidad3 = $('#dfea5abf-ab5d-48c9-8c8a-2e856edf5a03').data('kendoGrid').dataSource.total()
    
    
    
//     }, 1800);
    if (location.href.includes('497517a2-d20f-47a3-a3a2-9705d7d9c2bf')) {
        debugger;
        toastr.info('Cargando las reglas del negocio')

       // Esto oculta botones y bloquea campos 
        setTimeout(function() {
            if(!e.isNew)
                if(e.dataItem.EstadoPermisoTrabajo=='Cerrado'){
                    $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(3)').hide()
                    $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(1)').hide()
                    $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(2)').hide()
                    BloquearCampos();   
                }
        }, 1000);

        setTimeout(function () {
            debugger;
           
            var rolId = sessionStorage.rolesId;
            var ejecutante = "d292d358-7d71-469d-96f7-3154277b9ea9";
            var supervisor = "c540738c-332c-47da-8c99-f4252c753b12";
            var autoridad = "d5d8a5a8-9342-4cec-8372-e3441c0dd93c";
            var admin = "d243cb1f-3e4f-4854-92cd-6921be89db58";
            var profesional = "dc40c682-bf7b-4360-a3e8-424a19296c24";
            if(e.isNew){
               
                delete sessionStorage.CurrentFicha;
                delete sessionStorage.switch;
                if(rolId != admin){
                    var queryEmpresasdata=`select  E.* from Lappiz_Users U
                    inner join SafeWork_Lappiz_EmpresaContratista E on E.Id = U.EmpresaContratistaFK
                    where U.Id='${sessionStorage.userId}'`
                    queryEmpresasdata = ajaxQuery(queryEmpresasdata);
                    $('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c').data('kendoDropDownList').dataSource.data(queryEmpresasdata)
                }
                $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(6) > a").hide() // Oculta el tab de Equipos de medición
                $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar 
                toastr.info("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                var empresa = JSON.parse(sessionStorage.LappizUser).EmpresaContratistaFK
                //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', empresa)
                $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(1)').hide() //Ocultar boton de guardar
            
               
            }else{
                BloquearCampos();
            }
            var dataMultiSelect =  [{Tipo:"Trabajo en Caliente"},{Tipo:"Trabajo en Frío"},{Tipo:"Trabajo en espacio confinado"},{Tipo:"Trabajo en alturas"},{Tipo:"Trabajo eléctrico"}];
            $('#contenedorTipoPermiso').empty()
            $('#contenedorTipoPermiso').append('<select id="TipoPermiso"></select>')
            $("#TipoPermiso").kendoMultiSelect({
                placeholder: "Seleccione un tipo",
                dataTextField: "Tipo",
                dataValueField: "Tipo",
                autoBind: false,
                dataSource: dataMultiSelect,
                change: function(e){
                    setTimeout(() => {
                        debugger;
                        var dataNone=[7,8,9,10,11,12,13,14,15,16,20,21,22,23,25,26,27,32,28,29,30,35,37,39,40,41,42,43]
                        for(var j=0; j < dataNone.length;j++){
                            $(`#Contenedor${dataNone[j]}`)[0].style.display ='none'
                        }
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(6) > a").hide()
                        var precausionesAlturas=[21,7,8,9,10,11,12,35,37]
                        var precausionesCaliente=[21,16,20,28,29,30,35,37]
                        var precausionesFrio = [35,37]
                        var precausionesElectrico = [21,13,14,15,22,23,25,26,27,32,35,37]
                        var precausionesConfinado = [21,14,15,16,28,29,30,35,37,39,40,41,42,43]
    
                        var data = $("#TipoPermiso").data('kendoMultiSelect').value()
                        for(var i =0; i<data.length;i++){
                            var tipoTrabajo = data[i]
                            var precausionesAplicables=[];
                            switch(tipoTrabajo){
                                case "Trabajo en Caliente":
                                    precausionesAplicables = precausionesCaliente
                                break
                                case "Trabajo en Frío":
                                    precausionesAplicables = precausionesFrio
                                break
                                case "Trabajo en espacio confinado":
                                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(6) > a").show()
                                    precausionesAplicables = precausionesConfinado
                                break
                                case "Trabajo en alturas":
                                    precausionesAplicables = precausionesAlturas
                                break
                                case "Trabajo eléctrico":
                                    precausionesAplicables = precausionesElectrico
                                break
                            }
                            for(var j=0; j < precausionesAplicables.length;j++){
                                $(`#Contenedor${precausionesAplicables[j]}`)[0].style.display ='flex'
                            }
                        }
    
                    }, 500);
                    
                }
            });
            if(!e.isNew){
                
                //  $('#99d9db15-4595-45d5-a380-585148a5cf5c')[0].parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].style.display='none'
                $('#71872c81-b007-4768-94e6-7c21f65d5dec')[0].parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[0].children[0].children[0].children[0].style.display='none'
                 if(!$('h1.ng-binding')[0].innerHTML.includes(e.dataItem.NumeroPermiso))
                    $('h1.ng-binding')[0].innerHTML = $('h1.ng-binding')[0].innerHTML +"#"+ e.dataItem.NumeroPermiso
                var EmpresaContratistaFK = ajaxQuery(`select * from SafeWork_Lappiz_EmpresaContratista where Id='${e.dataItem.EmpresaContratistaFK}'`)
                $('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c').data('kendoDropDownList').dataSource.data(EmpresaContratistaFK)
                setFieldValue('803d0fd7-eba6-4a82-8274-3b3b4bbbe99c',EmpresaContratistaFK[0].Id)
                if(e.dataItem.TipoPermiso != null){
                    if(!e.dataItem.TipoPermiso.includes("Trabajo en espacio confinado")){
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(6) > a").hide()
                    }
                    var arreglo = e.dataItem.TipoPermiso.split(',');
                    var multiselect = $("#TipoPermiso").data("kendoMultiSelect");
                    multiselect.value(arreglo);
                    var precausionesAlturas=[21,7,8,9,10,11,12,35,37]
                    var precausionesCaliente=[21,16,20,28,29,30,35,37]
                    var precausionesFrio = [35,37]
                    var precausionesElectrico = [21,13,14,15,22,23,25,26,27,32,35,37]
                    var precausionesConfinado = [21,14,15,16,28,29,30,35,37,39,40,41,42,43]
                    for(var i =0; i<arreglo.length;i++){
                        var tipoTrabajo = arreglo[i]
                        var precausionesAplicables=[];
                        switch(tipoTrabajo){
                            case "Trabajo en Caliente":
                                precausionesAplicables = precausionesCaliente
                            break
                            case "Trabajo en Frío":
                                precausionesAplicables = precausionesFrio
                            break
                            case "Trabajo en espacio confinado":
                                $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(6) > a").show()
                                precausionesAplicables = precausionesConfinado
                            break
                            case "Trabajo en alturas":
                                precausionesAplicables = precausionesAlturas
                            break
                            case "Trabajo eléctrico":
                                precausionesAplicables = precausionesElectrico
                            break
                        }
                        for(var j=0; j < precausionesAplicables.length;j++){
                            $(`#Contenedor${precausionesAplicables[j]}`)[0].style.display ='flex'
                        }
                    }
                 }
            }
            if(!e.isNew){
                $("#TipoPermiso")[0].parentNode.className =$("#TipoPermiso")[0].parentNode.className +" k-state-disabled" // deshabilita el kendo multiselect
               
            }
            // Elimina la accion del editar
            if (sessionStorage.rolesId == ejecutante) {
                var data = $('#dfea5abf-ab5d-48c9-8c8a-2e856edf5a03').data('kendoGrid').dataSource.data()
                for (var i = 1; i <= data.length; i++) {
                    $(`#dfea5abf-ab5d-48c9-8c8a-2e856edf5a03 > div:nth-child(3) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(${i}) > td:nth-child(1) > a:nth-child(1)`)[0].style.display = 'none'
                }
            }
            disableField('b4979ed1-67a9-4fbc-9a62-0cbec61eb579', true)
            $("#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(2)").hide() //Ocultar boton Guardar y nuevo
    
            if (!e.isNew) {
                sessionStorage.NumeroPermiso = e.dataItem.NumeroPermiso;
                LlenarFirmas();
                SetearCombos();
                sessionStorage.CurrentFicha = e.dataItem.Id;
                sessionStorage.switch = true;
            }
    
            
            $('#Cierre_Final_')[0].children[0].style.display='none'
           
            if (rolId == ejecutante) {
                // oculta la fecha de la firma de autorizacion
                if (e.isNew) {
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(6) > a").hide() // Oculta el tab de Equipos de medición
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar 
                    toastr.info("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                    var empresa = JSON.parse(sessionStorage.LappizUser).EmpresaContratistaFK
                    //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', empresa)
                    $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(1)').hide() //Ocultar boton de guardar
                } else {
                    if (e.dataItem.FirmaEjecutante != null && e.dataItem.FirmaEjecutante != '') {
                        $('#b8c37ada-c99e-4ca7-a302-1fe048e693da')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'block'
                        $('#Autorizaci_n_ > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)')[0].style.display = 'none'
                    }
                    //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                    if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado' ) {
                        
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                        if (!ValidarCumplimiento()) {
                            $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                            toastr.warning("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                        }
                        else {
                            BloquearCampos();
                            //Secciones de pestaña Autorizacion
                            $("#2_Autorización_del_supervisor").hide();
                            $("#3_Autoridad_de_area").hide();
                            $("#Profesional").hide();
    
                            //Secciones de pestaña Cierre
                            $("#4_Autorización_del_supervisor").hide();
                            $("#5_Autoridad_de_area").hide();
                            $("#Profesional_Cierre").hide();
                        }
                    }else{
                        BloquearCampos();
                         $("#2_Autorización_del_supervisor").hide();
                            $("#3_Autoridad_de_area").hide();
                            $("#Profesional").hide();
    
                            //Secciones de pestaña Cierre
                            $("#4_Autorización_del_supervisor").hide();
                            $("#5_Autoridad_de_area").hide();
                            $("#Profesional_Cierre").hide();
                    }
                }
                 if(e.dataItem.FirmaEjecutanteCierre != undefined && e.dataItem.FirmaEjecutanteCierre != null){
                   $('#signaturepadfirmaEjecutorCierre')[0].parentNode.parentNode.style.display='none'
                }
                $('#b8c37ada-c99e-4ca7-a302-1fe048e693da')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none'
                
            } else if (rolId == supervisor) {
               
                $('#Cierre_Final_')[0].children[0].style.display='block'
                if(e.dataItem.FirmaSupervisorCierre != undefined && e.dataItem.FirmaSupervisorCierre != null){
                    $('#signaturepadfirmaSupervisorCierre')[0].parentNode.parentNode.style.display="none"
                }
                $('#e470a4ad-4164-4745-8f4e-4877df4e8dfd')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none' // oculta la fecha de la firma de autorizacion
                if (e.dataItem.FirmaSupervisor != null && e.dataItem.FirmaSupervisor != '') {
                    $('#e470a4ad-4164-4745-8f4e-4877df4e8dfd')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'block' // mostrar la fecha de la firma de autorizacion
                    $('#signaturepadSupervisor')[0].parentNode.parentNode.style.display = 'none'
                }
                BloquearCampos();
                if (e.dataItem.EstadoPermisoTrabajo == 'Suspendido' || e.dataItem.EstadoPermisoTrabajo == 'Cerrado') {
                    disableField('b4979ed1-67a9-4fbc-9a62-0cbec61eb579', false);
                }
                //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado') {
                    
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                    if (!ValidarCumplimiento()) {
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                        toastr.warning("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                    }
                }
                
                
                //Secciones de pestaña Autorizacion
                $("#1_Ejecutante_de_area").hide();
                $("#3_Autoridad_de_area").hide();
                $("#Profesional").hide();
    
                //Secciones de pestaña Cierre
                $("#3_Ejecutante_de_area").hide();
                $("#5_Autoridad_de_area").hide();
                $("#Profesional_Cierre").hide();
    
               // $('#SectionsFields > div')[2].style.display = "none"
    
            } else if (rolId == autoridad) {
                $('#2e7dbadc-cfe7-4d74-b5b0-32891008db82')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none' // oculta la fecha de la firma de autorizacion
                if (e.dataItem.FirmaAutoridad != null && e.dataItem.FirmaAutoridad != '') {
                    $('#2e7dbadc-cfe7-4d74-b5b0-32891008db82')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'block' // mostrar la fecha de la firma de autorizacion
                    $('#signaturepadAutoridad')[0].parentNode.parentNode.style.display = 'none'
                }
                //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                BloquearCampos();
                if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado') {
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                    if (!ValidarCumplimiento()) {
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                        toastr.warning("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                    }
                }
                //Secciones de pestaña Autorizacion
                $("#1_Ejecutante_de_area").hide();
                $("#2_Autorización_del_supervisor").hide();
                $("#Profesional").hide();
    
                //Secciones de pestaña Cierre
                $("#3_Ejecutante_de_area").hide();
                $("#4_Autorización_del_supervisor").hide();
                $("#Profesional_Cierre").hide();
               // $('#SectionsFields > div')[2].style.display = "none"
            } else if (rolId == admin) {
                if(e.dataItem.FirmaEjecutante == undefined || e.dataItem.FirmaEjecutante ==null || e.dataItem.FirmaEjecutante ==''){
                    toastr.info('Administrador - Ejecutante');
                    if (e.isNew) {
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(6) > a").hide() // Oculta el tab de Equipos de medición
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar 
                        toastr.info("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                        var empresa = JSON.parse(sessionStorage.LappizUser).EmpresaContratistaFK
                        //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', empresa)
                        $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(1)').hide() //Ocultar boton de guardar
                    } else {
                        if (e.dataItem.FirmaEjecutante != null && e.dataItem.FirmaEjecutante != '') {
                            $('#b8c37ada-c99e-4ca7-a302-1fe048e693da')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'block'
                            $('#Autorizaci_n_ > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)')[0].style.display = 'none'
                        }
                        //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                        if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado' ) {
                            
                            $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                            $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                            if (!ValidarCumplimiento()) {
                                $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                                toastr.warning("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                            }
                            else {
                                BloquearCampos();
                                //Secciones de pestaña Autorizacion
                                $("#2_Autorización_del_supervisor").hide();
                                $("#3_Autoridad_de_area").hide();
                                $("#Profesional").hide();
        
                                //Secciones de pestaña Cierre
                                $("#4_Autorización_del_supervisor").hide();
                                $("#5_Autoridad_de_area").hide();
                                $("#Profesional_Cierre").hide();
                            }
                        }else{
                            BloquearCampos();
                             $("#2_Autorización_del_supervisor").hide();
                                $("#3_Autoridad_de_area").hide();
                                $("#Profesional").hide();
        
                                //Secciones de pestaña Cierre
                                $("#4_Autorización_del_supervisor").hide();
                                $("#5_Autoridad_de_area").hide();
                                $("#Profesional_Cierre").hide();
                        }
                        if(e.dataItem.TipoPermiso.includes('Trabajo en espacio confinado')){
                            $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(6) > a").show()
                        }
                    }
                     if(e.dataItem.FirmaEjecutanteCierre != undefined && e.dataItem.FirmaEjecutanteCierre != null){
                       $('#signaturepadfirmaEjecutorCierre')[0].parentNode.parentNode.style.display='none'
                    }
                    $('#b8c37ada-c99e-4ca7-a302-1fe048e693da')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none'
                    
                }else 
                if(e.dataItem.FirmaSupervisor  == undefined || e.dataItem.FirmaSupervisor ==null || e.dataItem.FirmaSupervisor ==''){
                    toastr.info('Administrador - Supervisor');
                    $('#Cierre_Final_')[0].children[0].style.display='block'
                    if(e.dataItem.FirmaSupervisorCierre != undefined && e.dataItem.FirmaSupervisorCierre != null){
                        $('#signaturepadfirmaSupervisorCierre')[0].parentNode.parentNode.style.display="none"
                    }
                    $('#e470a4ad-4164-4745-8f4e-4877df4e8dfd')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none' // oculta la fecha de la firma de autorizacion
                    if (e.dataItem.FirmaSupervisor != null && e.dataItem.FirmaSupervisor != '') {
                        $('#e470a4ad-4164-4745-8f4e-4877df4e8dfd')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'block' // mostrar la fecha de la firma de autorizacion
                        $('#signaturepadSupervisor')[0].parentNode.parentNode.style.display = 'none'
                    }
                    BloquearCampos();
                    if (e.dataItem.EstadoPermisoTrabajo == 'Suspendido' || e.dataItem.EstadoPermisoTrabajo == 'Cerrado') {
                        disableField('b4979ed1-67a9-4fbc-9a62-0cbec61eb579', false);
                    }
                    //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                    if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado') {
                        
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                        if (!ValidarCumplimiento()) {
                            $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                            toastr.warning("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                        }
                    }
                    
                    
                    //Secciones de pestaña Autorizacion
                    $("#1_Ejecutante_de_area").hide();
                    $("#3_Autoridad_de_area").hide();
                    $("#Profesional").hide();
        
                    //Secciones de pestaña Cierre
                    $("#3_Ejecutante_de_area").hide();
                    $("#5_Autoridad_de_area").hide();
                    $("#Profesional_Cierre").hide();
        
                   // $('#SectionsFields > div')[2].style.display = "none"
                }
                else if(!e.dataItem.RequiereFirmaProfesional && (e.dataItem.FirmaAutoridad == undefined || e.dataItem.FirmaAutoridad ==null || e.dataItem.FirmaAutoridad =='')){
                    toastr.info('Administrador - Autoridad de área')
                    $('#2e7dbadc-cfe7-4d74-b5b0-32891008db82')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none' // oculta la fecha de la firma de autorizacion
                    if (e.dataItem.FirmaAutoridad != null && e.dataItem.FirmaAutoridad != '') {
                        $('#2e7dbadc-cfe7-4d74-b5b0-32891008db82')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'block' // mostrar la fecha de la firma de autorizacion
                        $('#signaturepadAutoridad')[0].parentNode.parentNode.style.display = 'none'
                    }
                    //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                    BloquearCampos();
                    if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado') {
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                        if (!ValidarCumplimiento()) {
                            $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                            toastr.warning("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                        }
                    }
                    //Secciones de pestaña Autorizacion
                    $("#1_Ejecutante_de_area").hide();
                    $("#2_Autorización_del_supervisor").hide();
                    $("#Profesional").hide();
        
                    //Secciones de pestaña Cierre
                    $("#3_Ejecutante_de_area").hide();
                    $("#4_Autorización_del_supervisor").hide();
                    $("#Profesional_Cierre").hide();
                   // $('#SectionsFields > div')[2].style.display = "none"
    
                }else if(e.dataItem.RequiereFirmaProfesional && (e.dataItem.FirmaProfesional == undefined || e.dataItem.FirmaProfesional ==null || e.dataItem.FirmaProfesional =='')){
                    toastr.info('Administrador - Profesional técnico')
                    $('#bc574d71-57ef-4da6-b136-5402439895ef')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none' // oculta la fecha de la firma de autorizacion
                    //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                    BloquearCampos();
                    if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado') {
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                    }
                    //Secciones de pestaña Autorizacion
                    $("#1_Ejecutante_de_area").hide();
                    $("#2_Autorización_del_supervisor").hide();
                    $("#3_Autoridad_de_area").hide();
        
                    //Secciones de pestaña Cierre
                    $("#3_Ejecutante_de_area").hide();
                    $("#4_Autorización_del_supervisor").hide();
                    $("#5_Autoridad_de_area").hide();
        
                   // $('#SectionsFields > div')[2].style.display = "none"
                }else if(e.dataItem.RequiereFirmaProfesional && (e.dataItem.FirmaAutoridad == undefined || e.dataItem.FirmaAutoridad ==null || e.dataItem.FirmaAutoridad =='')){
                    toastr.info('Administrador - Autoridad de área')
                    $('#2e7dbadc-cfe7-4d74-b5b0-32891008db82')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none' // oculta la fecha de la firma de autorizacion
                    if (e.dataItem.FirmaAutoridad != null && e.dataItem.FirmaAutoridad != '') {
                        $('#2e7dbadc-cfe7-4d74-b5b0-32891008db82')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'block' // mostrar la fecha de la firma de autorizacion
                        $('#signaturepadAutoridad')[0].parentNode.parentNode.style.display = 'none'
                    }
                    //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                    BloquearCampos();
                    if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado') {
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                        $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                        if (!ValidarCumplimiento()) {
                            $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(7) > a").hide() //Ocultar pestaña de Autorizacion
                            toastr.warning("Recuerde que para poder proceder a firmar, debe cumplir con todo lo requerido en la secciones de Equipos y Precauciones")
                        }
                    }
                    //Secciones de pestaña Autorizacion
                    $("#1_Ejecutante_de_area").hide();
                    $("#2_Autorización_del_supervisor").hide();
                    $("#Profesional").hide();
        
                    //Secciones de pestaña Cierre
                    $("#3_Ejecutante_de_area").hide();
                    $("#4_Autorización_del_supervisor").hide();
                    $("#Profesional_Cierre").hide();
                   // $('#SectionsFields > div')[2].style.display = "none"
                }else if(e.dataItem.FirmaAutoridad !=undefined && e.dataItem.FirmaAutoridad !=null && e.dataItem.FirmaAutoridad !='' && 
                (e.dataItem.FirmaEjecutanteCierre == undefined ||  e.dataItem.FirmaEjecutanteCierre == null || e.dataItem.FirmaEjecutanteCierre == '')){
                    BloquearCampos();
                    toastr.info('Cierre','Administrador - Ejecutante')
                    $("#2_Autorización_del_supervisor").hide();
                       $("#3_Autoridad_de_area").hide();
                       $("#Profesional").hide();
    
                       //Secciones de pestaña Cierre
                       $("#4_Autorización_del_supervisor").hide();
                       $("#5_Autoridad_de_area").hide();
                       $("#Profesional_Cierre").hide();
                }else if(e.dataItem.FirmaSupervisorCierre == null || e.dataItem.FirmaSupervisorCierre == '' || e.dataItem.FirmaSupervisorCierre == undefined){
                         //Secciones de pestaña Autorizacion
                         toastr.info('Cierre','Administrador - Supervisor')
                         $('#Cierre_Final_')[0].children[0].style.display='block'
                         $("#1_Ejecutante_de_area").hide();
                         $("#3_Autoridad_de_area").hide();
                         $("#Profesional").hide();
             
                         //Secciones de pestaña Cierre
                         $("#3_Ejecutante_de_area").hide();
                         $("#5_Autoridad_de_area").hide();
                         $("#Profesional_Cierre").hide();
                }else if(e.dataItem.RequiereFirmaProfesional &&(e.dataItem.FirmaProfesionalCierre == null || e.dataItem.FirmaProfesionalCierre == undefined ||e.dataItem.FirmaProfesionalCierre == '')){
                      //Secciones de pestaña Autorizacion
                      toastr.info('Cierre','Administrador - Profesional')
                      $("#1_Ejecutante_de_area").hide();
                      $("#2_Autorización_del_supervisor").hide();
                      $("#3_Autoridad_de_area").hide();
          
                      //Secciones de pestaña Cierre
                      $("#3_Ejecutante_de_area").hide();
                      $("#4_Autorización_del_supervisor").hide();
                      $("#5_Autoridad_de_area").hide();
                }else if(e.dataItem.RequiereFirmaProfesional &&(e.dataItem.FirmaAutoridadCierre == null ||e.dataItem.FirmaAutoridadCierre == undefined ||e.dataItem.FirmaAutoridadCierre == '')){
                    toastr.info('Cierre','Administrador - Autoridad')
                    $("#1_Ejecutante_de_area").hide();
                    $("#2_Autorización_del_supervisor").hide();
                    $("#Profesional").hide();
        
                    //Secciones de pestaña Cierre
                    $("#3_Ejecutante_de_area").hide();
                    $("#4_Autorización_del_supervisor").hide();
                    $("#Profesional_Cierre").hide();
                }else if(!e.dataItem.RequiereFirmaProfesional &&(e.dataItem.FirmaAutoridadCierre == null ||e.dataItem.FirmaAutoridadCierre == undefined ||e.dataItem.FirmaAutoridadCierre == '')){
                    toastr.info('Cierre','Administrador - Autoridad')
                    $("#1_Ejecutante_de_area").hide();
                    $("#2_Autorización_del_supervisor").hide();
                    $("#Profesional").hide();
        
                    //Secciones de pestaña Cierre
                    $("#3_Ejecutante_de_area").hide();
                    $("#4_Autorización_del_supervisor").hide();
                    $("#Profesional_Cierre").hide();
                }
                // //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                // BloquearCampos();
            } else if (rolId == profesional) {
                $('#bc574d71-57ef-4da6-b136-5402439895ef')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none' // oculta la fecha de la firma de autorizacion
                //setFieldValue('#803d0fd7-eba6-4a82-8274-3b3b4bbbe99c', e.dataItem.EmpresaContratistaFK)
                BloquearCampos();
                if (e.dataItem.EstadoPermisoTrabajo != 'Aprobado' && e.dataItem.EstadoPermisoTrabajo !='En proceso de cierre' && e.dataItem.EstadoPermisoTrabajo !='Cerrado') {
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(8) > a").hide() //Ocultar pestaña de Incidentes
                    $("#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(9) > a").hide() //Ocultar pestaña de Cierre Final 
                }
                //Secciones de pestaña Autorizacion
                $("#1_Ejecutante_de_area").hide();
                $("#2_Autorización_del_supervisor").hide();
                $("#3_Autoridad_de_area").hide();
    
                //Secciones de pestaña Cierre
                $("#3_Ejecutante_de_area").hide();
                $("#4_Autorización_del_supervisor").hide();
                $("#5_Autoridad_de_area").hide();
    
               // $('#SectionsFields > div')[2].style.display = "none"
            }
           
            if(e.dataItem.EstadoPermisoTrabajo !='En proceso de aprobación'){
                $('#SectionsFields > div > div > ng-form > div.input-group > div > span > button:nth-child(1)')[3].style.display='none'
                $('#SectionsFields > div > div > ng-form > div.input-group > div > span > button:nth-child(1)')[2].style.display='none'
                $('#SectionsFields > div > div > ng-form > div.input-group > div > span > button:nth-child(1)')[1].style.display='none'
            }
    
            if (getFieldValue('d02d0600-6cfc-4e95-962a-a5bcd4b7d380') == null) {
                console.log('')
                setFieldValue('d02d0600-6cfc-4e95-962a-a5bcd4b7d380', e.dataItem.AreaSedeFK)
            }
            
            if(e.dataItem.EstadoPermisoTrabajo == 'Cerrado'){
               
                BloquearCampos();
                $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(3)').hide()
                $('#container > div.main-container > div > section > section > div > div > div > div > div.actions-form-header > div > ng-switch > button:nth-child(1)').hide()
            }
           
        }, 4000)
        function ajaxQuery(query) {
            var data
            var newquery = { "query": query, "parameters": { "aType": "execTx", "environment": `${backandGlobal.environment}` } }
            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: 'POST',
                data: JSON.stringify(newquery),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', localStorage.Authorization);
                },
                success: function (result) {
                    data = result[0];
                },
                error: function (error) {
                    console.log(error)
                }
            })
        
            return data
        }
    }