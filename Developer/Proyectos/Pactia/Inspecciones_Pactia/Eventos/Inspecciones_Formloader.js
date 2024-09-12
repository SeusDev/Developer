setTimeout(() => {
    //Logica para guardado parcial
    // Carga botón guardado temporal
    $("#guardarParcial").click(function () {
        debugger;

        var activo = document.getElementById('8fd02a11-6e21-4048-aab8-60ba32d604bf').value

        if (activo == '') {
            toastr.warning('El campo activo es obligatorio')
        } else if (activo != '') {

            var elements = document.getElementById("inspeccion").elements;
            var obj = {};

            for (var i = 0; i < elements.length; i++) {
                if (elements.item(i).checked) {
                    var item = elements.item(i);
                    obj[item.name] = item.value;
                }
            }


            var myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.Authorization);
            myHeaders.append("Content-Type", "application/json");
            let usuario = document.getElementById('be1af72e-1718-418b-bb0c-c6c01e7ea21e').value
            let TipoInspeccion = sessionStorage.modulo
            let inspeccion = sessionStorage.IdTest
            let Modulo = sessionStorage.IdModulo
            let submodulo = sessionStorage.Idsubmodulo


            let json = [];
            let kgrid = kendo.jQuery('#80846178-893c-407f-b9d4-c6ce49bcedd6').data('kendoGrid').dataSource.data();

            if (kgrid.length > 0) {

                for (let i = 0; i < kgrid.length; i++) {
                    const element = kgrid[i];

                    json.push({
                        "isNewItem": true,
                        "CEDescripcionHallazgo": element.CEDescripcionHallazgo,
                        "AccionPropuesta": element.AccionPropuesta,
                        "CriticidadFk": element.CriticidadFk,
                        "InpeccionesFK": element.InpeccionesFK,
                        "SeSubsanoenSitio": element.SeSubsanoenSitio,
                        "EstadoPlanAccion": element.EstadoPlanAccion,
                        "ActivoFk": activo
                    });
                }
            }

            var raw =
            {
                "Estado": "Sin finalizar",
                "Sedeshabilita": "No",
                "Respuesta": JSON.stringify(obj),
                "ActivoFk": activo,
                "Testfk": inspeccion,
                "ModuloFk": Modulo,
                "SubmoduloFk": submodulo,
                "Usuario": usuario,
                "TipoInspeccion": TipoInspeccion,
                "tenantId": "null",
                "parameters":
                {
                    "aType": "event",
                    "pType": "Guardar",
                    "environment": "TEST"
                }
            };

            raw.PactiaTest_Lappiz_PlanAccionInspecciones = json;

            var url = '';
            var metodo = '';
            if (sessionStorage.rowid === '0') {

                url = "https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/lappiz/PactiaTest_Lappiz_Inspeccion_Pactia"
                metodo = 'POST'

            } else {
                url = `https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/lappiz/PactiaTest_Lappiz_Inspeccion_Pactia/${sessionStorage.rowid}`
                metodo = 'PATCH'
            }

            var requestOptions = {
                method: metodo,
                headers: myHeaders,
                body: JSON.stringify(raw),
                redirect: 'follow'
            };
            fetch(url, requestOptions)
                .then(response => response.text())
                .then(response => {
                    if (response !== "") {
                        let data = JSON.parse(response);
                        toastr.success('Ha guardado parcialmente la inspección, recuerde completarla en su debido momento')
                        execSP("Pactia_lappiz_CalcularIndicador", ["'" + data.Id + "'"]).then(function (response) {
                            let indicador = response[0][0].avance;
                            toastr.info(`Indicador de cumplimiento es ${indicador}%`);
                            for (let index = 0; index < data.PactiaTest_Lappiz_PlanAccionInspecciones.length; index++) {
                                let idPlan = data.PactiaTest_Lappiz_PlanAccionInspecciones[index].Id;
                                sendEmailPlan(idPlan);
                            }
                        });
                    } else {
                        toastr.info('Ha actualizado parcialmente la inspección, recuerde completarla en su debido momento')
                    }
                })
                .catch(error => {
                    toastr.warning('Error al guardar la inspección.')
                });       
        }

        setTimeout(() => {
            redireccionar() 
        }, 4000);

    });

    // Redireccionar vista de diligenciar. 
    function redireccionar() {
          var goLocation = myService.goLocation;
          var url ="https://runtimetest.lappiz.io/#/forms?viewName=PactiaTest_Lappiz_Inspeccion_Pactia&entityId=2c4e4c51-7714-4d52-a0ab-4b57b82a456c&viewMenu=true&appViewId=753d09a1-368f-44c5-a6f6-f6cb903e912a";
          goLocation(url);
    }

    //logica Para enviar correo de plan de accion
    function sendEmailPlan(idPlan) {
        debugger;

        let planAccion = idPlan;

        let StringQuery = `
            SELECT NumeroPlanAccion AS NumeroPA, CEDescripcionHallazgo AS Hallazgo, c.CEPotencial AS Potencial, 
            c.TiempoReporte AS Reporte ,c.TiempoCorrecion AS Correcion, i.CENombre AS Activo
            FROM PactiaTest_Lappiz_PlanAccionInspecciones as p
            JOIN PactiaTest_Lappiz_Inspeccion_Pactia [Inspeccion]   on p.InpeccionesFk = Inspeccion.Id     
            JOIN PactiaTest_Lappiz_CriticidadHallazgos AS c ON p.CriticidadFk = c.Id
            JOIN PactiaTest_Lappiz_Inmueble as i ON Inspeccion.ActivoFk = i.Id
            WHERE p.Id = '${planAccion}'`;

        execQuery(StringQuery).then(function (response) {
            var numeroPlan = response[0][0].NumeroPA;
            var hallazgo = response[0][0].Hallazgo;
            var potencial = response[0][0].Potencial;
            var TiempoCorrecion = response[0][0].Correcion;
            var tiempoReporte = response[0][0].Reporte;
            var activo = response[0][0].Activo;
            var Email = 'david.banol@lappiz.io'

            var Asunto = `Plan de acción SST`;
            var cuerpo = `<p>
      Se le informa de la apertura del plan de accion numero <b> ${numeroPlan} </b>, con el hallazgo: <b> ${hallazgo} </b>, con una criticidad  con potencial <b> ${potencial} </b>,  corrección: <b> ${TiempoCorrecion} </b> y tiempo de reporte : <b> ${tiempoReporte} </b>
      <br>
      En el activo <b> ${activo} </b>
          <p>Cualquier inquietud comunicarse con la administración</p>
          <a href="https://www.pactia.com/"><img src="https://i.ibb.co/2kPW7QZ/Pactia-1.png" alt="Pactia-1" border="0" /></a><br />
          <a target="_blank" href="https://www.pactia.com/">www.pactia.com</a><br/>
          `;

            sendEmail(Email, Asunto, "Notificación Inspecciones SST", cuerpo);

        });
    }

    // Logica boton de cerrar inspección
    $("#guardarFinal").click(function () {
        debugger;
        let confirmPrompt = confirm('¿Desea guardar y finalizar? Recuerde que si guarda y finaliza, no podrá editar la inspección nuevamente');
        if (confirmPrompt) {

            var activo = document.getElementById('8fd02a11-6e21-4048-aab8-60ba32d604bf').value
            if (activo == '') {
                toastr.warning('El campo activo es obligatorio')
            } else if (activo != '') {

                var elements = document.getElementById("inspeccion").elements;
                var obj = {};
                for (var i = 0; i < elements.length; i++) {
                    if (elements.item(i).checked) {
                        var item = elements.item(i);
                        obj[item.name] = item.value;
                    }
                }

                var myHeaders = new Headers();
                myHeaders.append("Authorization", localStorage.Authorization);
                myHeaders.append("Content-Type", "application/json");

                let usuario = document.getElementById('be1af72e-1718-418b-bb0c-c6c01e7ea21e').value
                let TipoInspeccion = sessionStorage.modulo
                let inspeccion = sessionStorage.IdTest
                let Modulo = sessionStorage.IdModulo
                let submodulo = sessionStorage.Idsubmodulo

                let json = [];
                let kgrid = kendo.jQuery('#80846178-893c-407f-b9d4-c6ce49bcedd6').data('kendoGrid').dataSource.data();

                if (kgrid.length > 0) {

                    for (let i = 0; i < kgrid.length; i++) {
                        const element = kgrid[i];

                        json.push({
                            "isNewItem": true,
                            "CEDescripcionHallazgo": element.CEDescripcionHallazgo,
                            "AccionPropuesta": element.AccionPropuesta,
                            "CriticidadFk": element.CriticidadFk,
                            "InpeccionesFK": element.InpeccionesFK,
                            "SeSubsanoenSitio": element.SeSubsanoenSitio,
                            "EstadoPlanAccion": element.EstadoPlanAccion,
                            "ActivoFk": activo
                        });
                    }
                }

                var raw =
                {
                    "Estado": "Finalizada",
                    "Respuesta": JSON.stringify(obj),
                    "ActivoFk": activo,
                    "Testfk": inspeccion,
                    "ModuloFk": Modulo,
                    "SubmoduloFk": submodulo,
                    "Usuario": usuario,
                    "TipoInspeccion": TipoInspeccion,
                    "FechaFinalizacion": new Date(),
                    "tenantId": "null",
                    "parameters":
                    {
                        "aType": "event",
                        "pType": "Guardar",
                        "environment": "TEST"
                    }
                };

                raw.PactiaTest_Lappiz_PlanAccionInspecciones = json;

                var url = '';
                var metodo = '';
                if (sessionStorage.rowid === '0') {

                    url = "https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/lappiz/PactiaTest_Lappiz_Inspeccion_Pactia"
                    metodo = 'POST'

                } else {
                    url = `https://txtest.lappiz.io/PactiaTest_Lappiz.api/api/lappiz/PactiaTest_Lappiz_Inspeccion_Pactia/${sessionStorage.rowid}`
                    metodo = 'PATCH'
                }

                var requestOptions = {
                    method: metodo,
                    headers: myHeaders,
                    body: JSON.stringify(raw),
                    redirect: 'follow'
                };
                fetch(url, requestOptions)
                    .then(response => response.text())
                    .then(response => {
                        if (response !== "") {
                            console.log(result);
                            let data = JSON.parse(result)
                            toastr.success('Ha guardado y finalizado la inspeccion')
                            execSP("Pactia_lappiz_CalcularIndicador", ["'" + data.Id + "'"]).then(function (responseDos) {
                                let indicador = responseDos[0][0].indicadorCumplimiento;
                                let avance = responseDos[0][0].avance;
                                toastr.info(`Indicador de cumplimiento es ${indicador}%  y corrección del riesgo ${avance}%`);
                                for (let index = 0; index < data.PactiaTest_Lappiz_PlanAccionInspecciones.length; index++) {
                                    let idPlan = data.PactiaTest_Lappiz_PlanAccionInspecciones[index].Id;
                                    sendEmailPlan(idPlan);
                                }
                            });
                        }else{
                            toastr.success('Ha guardado y finalizado la inspeccion')
                            execSP("Pactia_lappiz_CalcularIndicador", ["'" + sessionStorage.rowid + "'"]).then(function (responseDos) {
                                let indicador = responseDos[0][0].indicadorCumplimiento;
                                let avance = responseDos[0][0].avance;
                                toastr.info(`Indicador de cumplimiento es ${indicador}%  y corrección del riesgo ${avance}%`);
                                for (let index = 0; index < data.PactiaTest_Lappiz_PlanAccionInspecciones.length; index++) {
                                    let idPlan = data.PactiaTest_Lappiz_PlanAccionInspecciones[index].Id;
                                    sendEmailPlan(idPlan);
                                }
                            });
                        }
                    })
                    .catch(error => {
                        toastr.warning('Error al guardar la inspección.')
                    });

            }
        }
        setTimeout(() => {
            redireccionar1()
        }, 4000);
    });

    // Redireccionar vista de diligenciar. 
    function redireccionar1() {
        var goLocation = myService.goLocation;
        var url ="https://runtimetest.lappiz.io/#/grids?viewName=PactiaTest_Lappiz_Inspeccion_Pactia&workspaceId=7e77378b-d518-46bc-b08b-6bf96e378190&entityId=2c4e4c51-7714-4d52-a0ab-4b57b82a456c&dato=Seguimiento%20Inspecciones&appViewId=2093be7c-7c48-4a06-a3e1-e65112b42e6b";
        goLocation(url);
    }


    //Crear acordeon modulo
    function createAcordionModule(modulo, idItemAcordeon, idItemDiv, IndicadorModulo) {

        return `
    <div class="accordion-item">
        <h2 class="accordion-header" id="${idItemAcordeon}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${idItemDiv}"
                aria-expanded="true" aria-controls="${idItemDiv}">
                ${modulo} - ${IndicadorModulo}%
            </button>
        </h2>
        <div id="${idItemDiv}" class="accordion-collapse collapse show" aria-labelledby="${idItemAcordeon}"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
    `
    }
    // Agregar 3 div's en submodulo
    //Crear acordeon subnmodulo
    function createAcordionSubmodule(submodulo, idItemAcordeonSubmodulo, idItemDivSubmodulo, IndicadorSubmodulo) {

        return `
    
        <div class="accordion-item" id="accordionSub">
        <h2 class="accordion-header" id="${idItemAcordeonSubmodulo}">
            <button class="accordion-button collapsed" id="Submodulo" type="button" data-bs-toggle="collapse"
                data-bs-target="#${idItemDivSubmodulo}" aria-expanded="false" aria-controls="${idItemDivSubmodulo}">
                ${submodulo} - ${IndicadorSubmodulo}%
            </button>
        </h2>
        <div id="${idItemDivSubmodulo}" class="accordion-collapse collapse" aria-labelledby="${idItemAcordeonSubmodulo}"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
        `
    }

    // Cerrar 3 div's en subdmodulo
    //Crear acordeon de inspecciones
    function createAcordionInsp(nombremodulo, inspeccion, Id) {
        return `
    
        <div class="accordion-item">
            <h6 class="card-header" id="inspeccion">
            ${inspeccion}
            <button data-id="${Id}" data-modulo="${nombremodulo}" id="diligenciarInspeccion" style="float: right; width: 15%; height: 2em; text-align: center;line-height: 7px;" 
            type="button" class="btn btn-primary btn-sm">Diligenciar
            </button>
            </h6>
        </div>
        `
    }

    //logica para pintar las preguntas
    function pintarPreguntas() {
        var test = sessionStorage.Id

        document.removeAllListeners()
        document.addEventListener('click', (e) => {
            /*  e.preventDefault(); */
            e.stopPropagation();
            if (e.target.className.includes('radio') && e.target.type == "radio") {
                debugger;
                
                let idpregunta = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.id;
                let preguntarespondidas = sessionStorage.arregloPreguntaRespondidas.split(',');
                let existe = preguntarespondidas.find(element => element == idpregunta);
                if(existe === undefined){
                    sessionStorage.arregloPreguntaRespondidas += idpregunta+",";
                }

                let preguntarespuesta =  (sessionStorage.arregloPreguntaRespondidas.split(',')[0]=== '')? 0: sessionStorage.arregloPreguntaRespondidas.split(',').length-1;
                document.getElementById('avance').textContent= preguntarespuesta + "/" + sessionStorage.cantidadpreguntas  
                e.target.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.display = 'block';
            }
        })

        var query = `
        SELECT Id, CENombre AS Pregunta
        FROM PactiaTest_Lappiz_TestPregunta
        WHERE TestFk='${test}'
        order by orden `
        var editPre = ajaxQuery(query);

        var html = '';

        var Correcta
        var a = 0
        var x = 0
        var h = 0
        
        sessionStorage.cantidadpreguntas = editPre.length;
        sessionStorage.arregloPreguntaRespondidas='';

        for (x = 0; x < editPre.length; x++) {

            $(`#titleQuestion_${editPre[x].Id}`).val(`${editPre[x].Pregunta}`)
            var query1 = "";
            var editDetPre = "";

            html += ` 
            <div class="Pregunta" ${x != 0 && !location.href.includes('rowId=') ? 'style="display: none"' : ''}> 
                <div class="input-group" id="question"> 
                    <div class="input-group-prepend" style="width: 100%;"> 
                        <input id="titleQuestion_${editPre[x].Id}" style=" width: 100vw; padding: 5px 10px; height: 2.5vw; margin-top: .79vw;" type="text" value="${editPre[x].Pregunta}" placeholder="${editPre[x].Pregunta}" readonly>
                    </div>
                </div>
                <hr>`;

            query1 += `  SELECT Id, CEDescripcion'Preguntas', CorrectaIncorrecta
                        FROM PactiaTest_Lappiz_TestPreguntaDetalle
                        WHERE TestPreguntaFk = '${editPre[x].Id}'
                        order by Orden`

            editDetPre = ajaxQuery(query1);
            h = undefined
            for (h = 0; h < editDetPre.length; h++) {

                Correcta = editDetPre[h].CorrectaIncorrecta
                var html1 = `
                <div class="contaier">
                    <div id="divForOptions" class="input-group" style="width: 50vw;">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input id="${editDetPre[h].Id}" ${Correcta == 1 ? 'onchange="window.openPlanAction()"' : ''} name="${editPre[x].Id}" value="${editDetPre[h].Id}" style="display: block;" class="radioo" type="radio"
                                aria-label="Radio button for following text input" readonly>
                            </div>
                        </div>
                        <input id="Pregu_${h}" style="padding: 5px 10px;" type="text" class="form-control" value="${editDetPre[h].Preguntas}"
                        aria-label="Text input with radio button" placeholder="${editDetPre[h].Preguntas}" readonly>
                        <br>
                    </div>
                </div>
                <br>`
                html += html1;
            }
            html += "</div>";
            a++;
            h = undefined
        }

        $("#inspeccion").append(html);
    }

    //logica para abrir plan de accion
    window.openPlanAction = () => {
        let section = document.getElementById('88a461b2-79bd-4626-8a13-79ca0b992c45')
        section.querySelector('button > i.fa-plus').click()
        toastr.info("Recuerde diligenciar el plan de acción para poder continuar");
    }

    //ajaxQuery
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
                console.log(error, "Fallo en consulta");
            },
        });

        return data;
    }

    //validamos la vista si es para crear el acordeon de diligenciar o si es para
    // mapear el formulario de la inspeccion
    var url = location.href.split("appViewId=")[1];

    var user = sessionStorage.userId;

    if (url === "753d09a1-368f-44c5-a6f6-f6cb903e912a") {
        //logica para el acordeon
        // Ocultar sesiones por defecto
        document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul").hidden = true;
        document.querySelector("#\\. > div").hidden = true;



        setTimeout(() => {

            document.addEventListener('click', (e) => {
                debugger;

                if (e.target.id == 'diligenciarInspeccion') {
                    console.log('He ingresado')
                    var goLocation = myService.goLocation;
                    sessionStorage.Id = e.target.dataset.id;
                    sessionStorage.IdTest = e.target.dataset.id;
                    sessionStorage.modulo = e.target.dataset.modulo;
                    var url =
                        `#/forms?viewName=PactiaTest_Lappiz_Inspeccion_Pactia&entityId=2c4e4c51-7714-4d52-a0ab-4b57b82a456c&viewMenu=true&appViewId=cf01af71-3695-4eed-89d2-ef400284bb97`;
                    goLocation(url);
                }
            })
        }, 3000);


        let consulta = `SELECT 
        t.Id,
        t.Id as IdTest,
        m.Id as IdModulo,
        s.Id as Idsubmodulo,
        dbo.Pactia_Lappiz_CalcularIndicadorModulo(m.Id) as IndicadorModulo,
        dbo.Pactia_Lappiz_CalcularIndicadorSubModulo(s.Id) as IndicadorSubmodulo,
        m.CENombre AS ModuloAsignado, 
        s.CENombre AS Submodulo, 
        t.CENombre AS Inspeccion
        FROM PactiaTest_Lappiz_AsignacionesInspeccionesSST AS a
        JOIN PactiaTest_Lappiz_Modulo_Pactia_inspecciones AS m ON a.ModuloFk = m.Id
		JOIN PactiaTest_Lappiz_Submodulo_inspecciones AS s ON s.ModuloFk = m.Id
		JOIN PactiaTest_Lappiz_test AS t ON t.SubmoduloFk = s.Id
        WHERE a.UsuarioFk =  '${user}'
        ORDER BY m.CENombre, s.CENombre, t.CENombre
        `
        execQuery(consulta).then(function (res) {

            let Id = '';
            let IdTest = '';
            let IdModulo = '';
            let Idsubmodulo = '';
            let result = res[0];
            let htmlAcordeon = ''

            let moduloAux = '';
            let submoduloAux = '';
            let insAux = '';
            let IndicadorModulo = '';
            let IndicadorSubmodulo = '';

            let idItemAcordeon = "Acordeon0"
            let idItemDiv = "Collapse0"

            let idItemAcordeonSubmodulo = "AcordeonSub0"
            let idItemDivSubmodulo = "CollapseSub0"

            if (result.length > 0) {

                Id = result[0].Id
                IdTest = result[0].IdTest
                IdModulo = result[0].IdModulo
                Idsubmodulo = result[0].Idsubmodulo
                moduloAux = result[0].ModuloAsignado
                submoduloAux = result[0].Submodulo
                insAux = result[0].Inspeccion
                IndicadorModulo = result[0].IndicadorModulo
                IndicadorSubmodulo = result[0].IndicadorSubmodulo

                sessionStorage.Modulo = moduloAux;
                sessionStorage.Submodulo = submoduloAux;
                sessionStorage.inspeccion = insAux;
                sessionStorage.IdModulo = IdModulo;
                sessionStorage.Idsubmodulo = Idsubmodulo;
                sessionStorage.Id = Id;


                htmlAcordeon = createAcordionModule(moduloAux, idItemAcordeon, idItemDiv, IndicadorModulo) +
                    createAcordionSubmodule(submoduloAux, idItemAcordeonSubmodulo, idItemDivSubmodulo, IndicadorSubmodulo) + createAcordionInsp(moduloAux, insAux, Id)

            }

            for (let index = 1; index < result.length; index++) {
                const element = result[index];

                idItemAcordeon = "Acordeon" + index
                idItemDiv = "Collapse" + index

                let idItemAcordeonSubmodulo = "AcordeonSub0" + index
                let idItemDivSubmodulo = "CollapseSub0" + index


                if (element.ModuloAsignado == moduloAux && element.Submodulo == submoduloAux) {
                    htmlAcordeon += createAcordionInsp(element.ModuloAsignado, element.Inspeccion, element.Id)
                    insAux = element.Inspeccion

                } else if (element.ModuloAsignado == moduloAux) {
                    htmlAcordeon += `
                    </div>
                    </div>
                    </div>
                    `+ createAcordionSubmodule(element.Submodulo, idItemAcordeonSubmodulo, idItemDivSubmodulo) +
                        createAcordionInsp(element.ModuloAsignado, element.Inspeccion, element.Id)
                    submoduloAux = element.Submodulo
                    insAux = element.Inspeccion

                } else {
                    htmlAcordeon += `
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    `+ createAcordionModule(element.ModuloAsignado, idItemAcordeon, idItemDiv) +
                        createAcordionSubmodule(element.Submodulo, idItemAcordeonSubmodulo, idItemDivSubmodulo) + createAcordionInsp(element.ModuloAsignado, element.Inspeccion, element.Id)
                    moduloAux = element.ModuloAsignado
                    submoduloAux = element.Submodulo
                    insAux = element.Inspeccion
                }
            }

            htmlAcordeon += `
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            `

            $("#vistaAcordeon").append(htmlAcordeon);

        });
    } else if (url === "cf01af71-3695-4eed-89d2-ef400284bb97") {
        sessionStorage.rowid = (e.isNew) ? 0 : e.dataItem.Id;
        // ocultar detalle plan de accion
        document.querySelector("#\\38 8a461b2-79bd-4626-8a13-79ca0b992c45").style.display='none'
        //logica para la inspeccion
        if (!e.isNew) {
            if (e.dataItem.Estado == 'Finalizada') {
                toastr.warning('Esta inspección ya ha sido cerrada')
                var goLocation = myService.goLocation;
                var url =
                    "#/grids?viewName=PactiaTest_Lappiz_Inspeccion_Pactia&workspaceId=7e77378b-d518-46bc-b08b-6bf96e378190&entityId=2c4e4c51-7714-4d52-a0ab-4b57b82a456c&dato=Seguimiento%20Inspecciones&appViewId=2093be7c-7c48-4a06-a3e1-e65112b42e6b";
                goLocation(url);
            } else {
                sessionStorage.Id = e.dataItem.Testfk
                pintarPreguntas();
                // Carga de datos al editar 
                debugger;
                let inspeccion = e.dataItem.Id
                let avance = e.dataItem.Avance;
                delete sessionStorage.Respuestas;
                sessionStorage.Respuestas = e.dataItem.Respuesta;
                //const myNode = document.getElementById("inspeccion");
                //myNode.innerHTML = '';

                if (sessionStorage.Respuestas !== undefined || sessionStorage.Respuestas !== null) {
                    let respuestas = JSON.parse(sessionStorage.Respuestas);
                    Object.entries(respuestas).forEach(([key, value]) => {
                        document.getElementById(value).checked = true;
                    });
                }

                ocultarSeccion('88a461b2-79bd-4626-8a13-79ca0b992c45');
                let fieldId = "be1af72e-1718-418b-bb0c-c6c01e7ea21e";
                let nombre = JSON.parse(sessionStorage.LappizUser).FullName
                setFieldValue(fieldId, nombre);

                // Filtro modulo en base a las asignaciones

                let consulta = `SELECT m.* FROM PactiaTest_Lappiz_AsignacionesInspeccionesSST AS a
                INNER JOIN  PactiaTest_Lappiz_Modulo_Pactia_inspecciones AS m ON a.ModuloFk = m.Id
                WHERE a.UsuarioFk =  '${user}'`

                execQuery(consulta).then(function (res) {
                    var result = res[0];

                    kendo.jQuery("#e7b6e3e8-de88-429c-9375-e91011bcc55c").data("kendoDropDownList").setDataSource(result);
                });
            }
        } else {
            pintarPreguntas();
            delete sessionStorage.Respuestas
        }
    }

}, 1000);