/* Versionamiento */
setTimeout(() => {
    if (
        window.location.href.includes(
            "appViewId=360be7e9-4132-4f9b-8c42-e49d37182563"
        )
    ) {
        debugger;
        $("#vehiculo").hide();
        $(
            "#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(3)"
        ).remove();
        $(
            "#container > div.main-container > div > section > section > div > div > div > div > br:nth-child(2)"
        ).remove();
        $(".title-section").remove();
        $(".header-section").append(`
        <div style="text-align: center;">
            <h1 style="position: absolute;top: 25%;left: 50%;transform: translate(-50%, -50%);color: black !important;font-weight: bold;font-family: Verdana;">
            Reserva sala de reuniones</h1>
            <img class="Imagen" src="https://runtimetest.lappiz.io/assets/img/Generico.jpg" alt="Sin Imagen">
        </div>
        `);

        let Tiempo = evalQuery(
            `select top 2 * from Skandias_Lappiz_TiempoReuniones order by Tiempo asc`
        );

        $("#9a966a47-1baa-4861-98ad-9285bc6fb8f6")
            .data("kendoDropDownList")
            .setDataSource(Tiempo);
        $("#9a966a47-1baa-4861-98ad-9285bc6fb8f6")
            .data("kendoDropDownList")
            .value(Tiempo[0].Id);

        let Sede = evalQuery(
            `SELECT Id,CESede[Sede] FROM Skandias_Lappiz_Sedes WHERE CESede LIKE '${sessionStorage.Sede}'`
        );

        /*$("#41b41d5f-cd7d-419c-a367-10ddc6ce0bab").data('kendoDropDownList').setDataSource(Sede)
            $("#41b41d5f-cd7d-419c-a367-10ddc6ce0bab").data('kendoDropDownList').value(Sede[0].Id)*/

        var Persona = sessionStorage.Persona.trim();

        var IdSede = Sede[0].Id;
        sessionStorage.SedeId = IdSede;

        var Salas = evalQuery(
            `select Id,NombreSala,CantidadPersonas,TipoSala from Skandias_Lappiz_Salas where TipoSala like '%${sessionStorage.TipoSala}%' and FkSede = '${IdSede}' ORDER BY NombreSala`
        );

        /*  funcion ocultar campo vehiculo */

        $("#TomarParqueaderoNo").click(function() {
            $("#vehiculo").hide();
            $("#vAutomòvil")[0].checked = false;
            $("#vMotocicleta")[0].checked = false;
            /* $("#vAutomòvil")[0].disabled = true;            
            $("#vMotocicleta")[0].disabled = true; */


        });

        $("#TomarParqueaderoSi").click(function() {

            if (($("#vMotocicleta")[0].checked == false) && ($("#vAutomòvil")[0].checked == false)) {

                $("#vehiculo").show();
            }


        });

        $("#vAutomòvil").click(function() {
            debugger;

            var fecha = $(
                "#66967770-3e50-4a60-bc31-3b0412237f66 > div.dx-dropdowneditor-input-wrapper > div > input"
            ).val();
            var query = `select count (DISTINCT NumeroReserva) [ReservasDia] from Skandias_Lappiz_ReservaSaladeReuniones rsr
        INNER JOIN Skandias_Lappiz_Sedes sd on sd.Id=rsr.Sede
        INNER JOIN Skandias_Lappiz_Salas sl on sl.Id=rsr.Sala
        where Parqueadero ='Si' and TipoTransporte ='Automòvil' and Format (rsr.DiaReunion,'dd/MM/yyyy')= '${fecha}' and sd.CESede='${sessionStorage.Sede}'`;

            var result = evalQuery(query);

            if (result[0].ReservasDia < 22) {
                toastr.info("Se puede asignar puesto en el parqueadero");
            } else {
                toastr.warning("Se ha alcanzado la cantidad maxima en el parquedero");

                $("#vAutomòvil")[0].checked = false;
                $("#vAutomòvil")[0].disabled = true;
                $("#TomarParqueaderoSi")[0].checked = true;
                /* $("#TomarParqueaderoNo")[0].checked = true; */

            }
            if (($("#vMotocicleta")[0].disabled == true) && ($("#vAutomòvil")[0].disabled == true)) {
                $("#TomarParqueaderoSi")[0].checked = false;
                $("#TomarParqueaderoSi")[0].disabled = true;
                $("#TomarParqueaderoNo")[0].checked = true;
                $("#vehiculo").hide();
            }
        });
        $("#vMotocicleta").click(function() {
            debugger;

            var fecha = $(
                "#66967770-3e50-4a60-bc31-3b0412237f66 > div.dx-dropdowneditor-input-wrapper > div > input"
            ).val();

            var query = `select count (DISTINCT NumeroReserva) [ReservasDia] from Skandias_Lappiz_ReservaSaladeReuniones rsr
        INNER JOIN Skandias_Lappiz_Sedes sd on sd.Id=rsr.Sede
        INNER JOIN Skandias_Lappiz_Salas sl on sl.Id=rsr.Sala
        where Parqueadero ='Si' and TipoTransporte ='Motocicleta' and Format (rsr.DiaReunion,'dd/MM/yyyy')= '${fecha}' and sd.CESede='${sessionStorage.Sede}'`;

            var result = evalQuery(query);

            if (result[0].ReservasDia < 8) {
                toastr.info("Se puede asignar puesto en el parqueadero");
            } else {
                toastr.warning("Se ha alcanzado la cantidad maxima en el parquedero");

                $("#vMotocicleta")[0].checked = false;
                $("#vMotocicleta")[0].disabled = true;
                $("#TomarParqueaderoSi")[0].checked = true;
                /* $("#TomarParqueaderoNo")[0].checked = true; */

            }
            if (($("#vMotocicleta")[0].disabled == true) && ($("#vAutomòvil")[0].disabled == true)) {
                $("#TomarParqueaderoSi")[0].checked = false;
                $("#TomarParqueaderoSi")[0].disabled = true;
                $("#TomarParqueaderoNo")[0].checked = true;
                $("#vehiculo").hide();
            }
        });

        if (Salas.length === 0) {
            toastr.info(
                `No hay salas para este tipo de uso en la sede de ${sessionStorage.Sede}`,
                "Atención"
            );
        } else {
            $("#76e7d7bf-3adf-4028-ba27-31655f5130d1")
                .data("kendoDropDownList")
                .setDataSource(Salas);
        }

        $("#Back").kendoButton({ click: Back });

        function Back(e) {
            e.preventDefault();
            console.clear();
            history.back();
        }

        $("#Save").kendoButton({ click: Save });

        function Save(e) {
            debugger;
            console.clear();
            e.preventDefault();

            if (
                window.location.href.includes(
                    "appViewId=360be7e9-4132-4f9b-8c42-e49d37182563"
                )
            ) {
                if (
                    $(
                        "#66967770-3e50-4a60-bc31-3b0412237f66 > div.dx-dropdowneditor-input-wrapper > div > input"
                    ).val() == ""
                ) {
                    toastr.error("La fecha es obligatoria", "Recuerde");
                    return;
                }

                if (
                    $("#76e7d7bf-3adf-4028-ba27-31655f5130d1").val() == "" ||
                    $("#76e7d7bf-3adf-4028-ba27-31655f5130d1").val() == null
                ) {
                    toastr.error("Debe seleccionar una sala", "Recuerde");
                    return;
                }
            }
            if ($("#SectionsFields > div > div > ng-form > textarea").val() == "") {
                toastr.error(
                    "¿Nombre de la(s) persona(s) con quien(es) te vas a reunir? obligatorio"
                );
                return;
            }

            if ($("#start").data("kendoTimePicker")._oldText == "") {
                toastr.error("El horario de reunión es obligatorio", "Recuerde");
                return;
            }

            /* Validacion tipo transporte */

            if (($("#TomarParqueaderoSi")[0].checked == true) && ($("#vAutomòvil")[0].checked == false) && ($("#vMotocicleta")[0].checked == false)) {

                toastr.error("Recuerde seleccionar el tipo de vehiculo");

                return;

            }

            var Hora = $("#start").data("kendoTimePicker")._oldText;
            var Tiempo = $("#9a966a47-1baa-4861-98ad-9285bc6fb8f6").val();

            var Final = $("#9a966a47-1baa-4861-98ad-9285bc6fb8f6")
                .data("kendoDropDownList")
                .dataItem().Tiempo;

            /*if (Hora.split(' ')[1].includes('PM')) {
                      Hora = `${parseInt(Hora.split(':')[0]) + 12}:${Hora.split(':')[1]}`
                  } */
            var HoraFin = horas(Hora.split(" ")[0], Final.split(" ")[0], Hora);

            var Fecha = $(
                "#66967770-3e50-4a60-bc31-3b0412237f66 > div.dx-dropdowneditor-input-wrapper > div > input"
            ).val();
            //new Date($("#66967770-3e50-4a60-bc31-3b0412237f66 > div.dx-dropdowneditor-input-wrapper > div > input").val()).toString('dd/MM/yyyy')
            Fecha = Fecha.replaceAll("-", "/");
            var Dia = Fecha.split("/")[0];
            var Mes = Fecha.split("/")[1];
            var Anio = Fecha.split("/")[2];
            Fecha = new Date(`${Mes}/${Dia}/${Anio}`).format("Y-m-d");

            //if ($('#76e7d7bf-3adf-4028-ba27-31655f5130d1').val()) {
            var Salafk = $("#76e7d7bf-3adf-4028-ba27-31655f5130d1").val();
            //} else {
            //  var Salafk = null
            //}

            var salareservada = "No";

            var horaInicio;
            var horaFin;

            if (Hora.split(":")[1].split(" ")[0] == "30") {
                horaInicio = `${Hora.split(":")[0]}:31 ${
          Hora.split(":")[1].split(" ")[1]
        }`;
            } else if (Hora.split(":")[1].split(" ")[0] == "00") {
                horaInicio = `${Hora.split(":")[0]}:01 ${
          Hora.split(":")[1].split(" ")[1]
        }`;
            }

            if (HoraFin.split(":")[1].split(" ")[0] == "00") {
                if (HoraFin.split(":")[0] == "1") {
                    horaFin = `${parseInt(HoraFin.split(":")[0])}:59 ${
            HoraFin.split(":")[1].split(" ")[1]
          }`;
                } else {
                    horaFin = `${parseInt(HoraFin.split(":")[0]) - 1}:59 ${
            HoraFin.split(":")[1].split(" ")[1]
          }`;
                }
            } else if (HoraFin.split(":")[1].split(" ")[0] == "30") {
                horaFin = `${HoraFin.split(":")[0]}:29 ${
          HoraFin.split(":")[1].split(" ")[1]
        }`;
            }

            var Reserva =
                evalQuery(`SELECT Re.DiaReunion,Sala,Re.CEDescripcion'Inicio',
            Ti.Tiempo,HoraFin FROM Skandias_Lappiz_ReservaSaladeReuniones Re
            JOIN Skandias_Lappiz_TiempoReuniones Ti on Re.TiempoReunionFk = Ti.Id
            WHERE Re.Sala='${Salafk}' 
            AND Re.DiaReunion= '${Fecha}' AND (CAST('${horaInicio}' AS time) BETWEEN CAST(Re.CEDescripcion AS time) AND CAST(Re.HoraFin AS time) 
            OR CAST('${horaFin}' AS time) BETWEEN  CAST(Re.CEDescripcion AS time) AND CAST(Re.HoraFin AS time))`);

            if (Reserva.length > 0) {
                var Dia = Reserva[0].DiaReunion.split(" ")[0];
                // var HoraI = Reserva[0].Inicio
                // var HoraF = Reserva[0].HoraFin

                // HoraI = HoraI.split(' ')[0]
                // HoraF = HoraF.split(' ')[0]

                salareservada = "Si";
            } else {
                salareservada = "No";
            }

            var dataItem = {
                Sede: sessionStorage.SedeId,
                DiaReunion: Fecha,
                Sala: Salafk,
                TiempoReunionFk: Tiempo,
                CEDescripcion: Hora,
                HoraFin: HoraFin,
                UsuarioFk: sessionStorage.userId,
                tiempo: Final,
                Personas: document
                    .querySelector("#\\35 b4dab98-d5f0-4513-8ec8-67a4b837273e")
                    .value.trim(),
                Parqueadero: $("input:radio[name=TomarParqueadero]:checked").val(),
                TipoTransporte: $("input:radio[name=vehiculo]:checked").val(),
                Observaciones: document
                    .querySelector("#Observacionesreserva")
                    .value.trim(),
                tenantId: "null",
                parameters: {
                    userId: sessionStorage.userId,
                    tablaId: "",
                    appViewId: window.location.href.split("appViewId=")[1],
                    actionId: "00000000-0000-0000-0000-000000000000",
                    pType: "Guardar",
                    aType: "view",
                    environment: backandGlobal.environment,
                    lappizFunctionId: "00000000-0000-0000-0000-000000000000",
                },
            };

            clean(dataItem);
            if (salareservada == "No") {
                $.ajax({
                    async: false,
                    url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Skandias_Lappiz_ReservaSaladeReuniones`,
                    type: "POST",
                    data: JSON.stringify(dataItem),
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Authorization", localStorage.Authorization);
                    },
                    success: function(success) {
                        console.log("guardado");

                        // ejecutar procedimiento almacenado
                        execSP("Skandias_Lappiz_Emailsalareuniones", [
                            "'" + success.Id + "'",
                        ]).then(
                            function(responseSp) {
                                debugger;
                                var asunto;
                                var cuerpo;
                                var correo;
                                //Hacer sendEmail
                                cuerpo = responseSp.data[0][0].Cuerpo;
                                asunto = `Reserva sala reuniones ${responseSp.data[0][0].NombrePersona}`;
                                var correo = "sbarrios@skandia.com.co";
                                sendEmail(correo, asunto, "", cuerpo).then(function(
                                    respuesta
                                ) {
                                    debugger;
                                    toastr.info(
                                        "Se ha realizado correctamente la reserva de la sala"
                                    );
                                    location.assign(
                                        `#/forms?rowId=${success.Id}&viewName=Skandias_Lappiz_ReservaSaladeReuniones&entityId=e9f31bdc-b18a-4931-85ce-bb0ebc5b7e4c&viewMenu&appViewId=7d8e05c5-d983-406f-956c-4264c1d6b2a2`
                                    ); //Resumen
                                });
                            },
                            function(error) {
                                toastr.warning("No se pudo enviar el correo");
                            }
                        );
                    },
                    error: function(error) {
                        console.log(`Error-->${JSON.stringify(error)}`);
                    },
                });
            } else {
                toastr.warning(
                    `La sala ya se encuentra reservada para la fecha ${
            Dia.split("T")[0]
          }, en la franja horario entre ${Hora} y ${HoraFin}.`
                );
            }
        }

        function evalQuery(Query) {
            var Response = "";
            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                type: "POST",
                data: JSON.stringify({
                    query: Query,
                    parameters: {
                        aType: "execTx",
                        environment: `${backandGlobal.environment}`,
                    },
                }),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", localStorage.Authorization);
                },
                success: function(x) {
                    Response = x[0];
                },
            });
            return Response;
        }

        function horas(campo1, campo2, campo3) {
            debugger;

            var campos = new Array(campo1, campo2);
            var horatotale = new Array(0, 0, 0);
            for (let b = 0; b < campos.length; b++) {
                var horas = campos[b].split(":");
                for (let a = 0; a < 3; a++) {
                    horas[a] = isNaN(parseInt(horas[a])) ? 0 : parseInt(horas[a]);
                    horatotale[a] += horas[a]; // Suma o resta según prefieras en este caso suma
                }
            }

            var horatotal = new Date();
            horatotal.setHours(horatotale[0]);
            horatotal.setMinutes(horatotale[1]);

            horatotal = horatotal.toLocaleTimeString();
            horatotal = horatotal.split(":");

            // if (horatotal[0].length == 1) {
            //     horatotal[0] = "0" + horatotal[0]
            // }

            var validar = horatotal[0];
            var franja;

            if (parseInt(validar) >= 12) {
                franja = "PM";
                if (parseInt(validar) > 12) {
                    horatotal[0] = parseInt(horatotal[0]) - 12;
                }
            } else {
                if (campo3.split(" ")[1] == "PM") {
                    franja = "PM";
                } else {
                    franja = "AM";
                }
            }

            horatotal = `${horatotal[0]}:${horatotal[1]} ${franja}`;

            return horatotal;
        }

        function clean(obj) {
            for (var prop in obj) {
                if (obj[prop] === "" || obj[prop] === undefined || obj[prop] === null) {
                    delete obj[prop];
                }
            }
        }
    }
}, 350);