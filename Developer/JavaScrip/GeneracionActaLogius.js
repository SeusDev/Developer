debugger;
if (confirm("¿Deseas descargar el acta y enviarla por correo?")) {
let actaID = e.dataItem.Id;
let consulta1 = `SELECT A.Numeroacta AS NUMERO_ACTA,
    T.CETemas AS TEMA,
    FORMAT(A.Fecha, 'dd/MM/yyyy') AS FECHA,
    FORMAT(CONVERT(datetime, A.Horainicio), 'hh:mm tt') AS HORA_INICIO,
    FORMAT(CONVERT(datetime, A.Horafinalizacion), 'hh:mm tt') AS HORA_FIN,
    E.Nempresa AS EMPRESA,
    A.Desarrollo AS DESARROLLO_REUNION,
    A.Observacion AS OBSERVACIONES,
    REPLACE (A.FirmaAsistentes,'data:image/png;base64,','') AS FIRMA_ASISTENTE,
    REPLACE (A.Firmaresponsable,'data:image/png;base64,','')AS FIRMA_RESPONSABLE
    FROM Logius_Lappiz_Acta AS A
    INNER JOIN Logius_Lappiz_Temasacta AS T
    ON A.Tema = T.Id
    INNER JOIN Logius_Lappiz_Empresas AS E
    ON A.EmpresaFK = E.Id
    WHERE A.Id = '${actaID}'`;
    execQuery(consulta1).then(function (Respuesta) {
    let numActa = Respuesta[0][0].NUMERO_ACTA;
    let tema = Respuesta[0][0].TEMA;
    let fecha = Respuesta[0][0].FECHA;
    let fechaIn = Respuesta[0][0].HORA_INICIO;
    let fechaF = Respuesta[0][0].HORA_FIN;
    let empresa = Respuesta[0][0].EMPRESA;
    let desarrollo = Respuesta[0][0].DESARROLLO_REUNION;
    let observacion = Respuesta[0][0].OBSERVACIONES;
    let firmaAs = e.dataItem.FirmaAsistentes;
    let firmaRe = e.dataItem.Firmaresponsable;

    // Consulta para el subtemas
    let subtema = `select 
    s.CESubtemas [Subtema],
    a.Id [IdActa]
    from Logius_Lappiz_DetalleSubtema dst
    inner join Logius_Lappiz_subtemaacta s on dst.SubtemasFk = s.Id
    inner join Logius_Lappiz_Acta a on dst.ActaFK = a.Id
    where a.Id= '${actaID}'`;

    execQuery(subtema).then(function (Rsubtema) {
      let dataResult1 = Rsubtema[0];
      console.log(dataResult1);

      let tabla1 = '';
      const Datos1 = dataResult1;

      //Recorrer los datos del detalle subtema
      for (let i = 0; i < Datos1.length; i++) {
          let subtema = `<td>${Datos1[i].Subtema}</td>`;
          /* tabla = tabla + `<tr>${resul}</tr>`; */
          tabla1 = tabla1 + `<tr>${subtema}</tr>`;
      }
    

    let consulta2 = `select C.Nombre as NombreCompleto , E.Nempresa as NombreEmpresa,
    C.Email as EMAIL
    from Logius_Lappiz_Acta AS A
    INNER JOIN Logius_Lappiz_DetalleColaborador AS DC
    ON DC.ActaFk = A.Id
    INNER JOIN Logius_Lappiz_colaboradores AS C
    ON DC.ColaboradorFk = C.Id
    INNER JOIN Logius_Lappiz_Empresas AS E
    ON C.EmpresaFK = E.Id    
    WHERE A.Id = '${actaID}'`;
    execQuery(consulta2).then(function (Respuesta2) {
        let dataResult = Respuesta2[0];
        console.log(dataResult);

        let tabla = '';
        const DATOS = dataResult;
        let correo3 = ''
        //Recorrer los datos del detalle: Participante empresas
        for (let i = 0; i < DATOS.length; i++) {
            let nomParticipante = `<td>${DATOS[i].NombreCompleto}</td>`;
            let nomEmpresa = `<td>${DATOS[i].NombreEmpresa}</td>`;
            let emailColaboradores = DATOS[i].EMAIL + ',';
            tabla = tabla + `<tr>${nomParticipante + nomEmpresa}</tr>`;
            correo3 = correo3 + emailColaboradores;
        }

        let consulta3 = `SELECT U.FullName AS NOMBRE_COMPLETO,
            E.Nempresa AS EMPRESA,
            U.Email AS EMAIL
            FROM Logius_Lappiz_Acta AS A
            INNER JOIN Logius_Lappiz_Participanteinterno AS PL
            ON PL.ActaFK = A.Id
            INNER JOIN Logius_Lappiz_Users AS U
            ON PL.UserFk = U.Id
            INNER JOIN Logius_Lappiz_Empresas AS E
            ON U.EmpresaFk = E.Id
            WHERE A.Id = '${actaID}'`;
        execQuery(consulta3).then(function (Respuesta3) {
            let dataResult2 = Respuesta3[0];
            console.log(dataResult2);

            let tabla2 = '';
            const DATOS2 = dataResult2;
            let correos2 = '';

            //Recorrer los datos del detalle: Participante Logius
            for (let i = 0; i < DATOS2.length; i++) {
                let nomParticipante2 = `<td>${DATOS2[i].NOMBRE_COMPLETO}</td>`;
                let nomEmpresa2 = `<td>${DATOS2[i].EMPRESA}</td>`;
                let emailParticipanteLogius = DATOS2[i].EMAIL + ',';

                tabla2 = tabla2 + `<tr>${nomParticipante2 + nomEmpresa2}</tr>`;
                correos2 = correos2 + emailParticipanteLogius;
            }

            let consulta4 = `SELECT C.Compromisos AS COMPROMISOS,
            U.Nombre AS NOMBRE_COMPLETO,
            FORMAT(C.Fechaentrega,'dd/MM/yyyy') AS FECHA_ENTREGA,
            U.Email AS EMAIL
            FROM Logius_Lappiz_Acta AS A
            INNER JOIN Logius_Lappiz_CompromisoDetalle AS C
            ON C.ActaFK = A.Id
            INNER JOIN Logius_Lappiz_colaboradores AS U
            ON C.ColaboradresFK = U.Id
                WHERE A.Id = '${actaID}' order by C.Created_date asc`;
            execQuery(consulta4).then(function (Respuesta4) {
                let dataResult3 = Respuesta4[0];
                console.log(dataResult3);

                let tabla3 = '';
                const DATOS3 = dataResult3;
                let correos = '';

                //Recorrer los datos del detalle: Compromisos
                for (let i = 0; i < DATOS3.length; i++) {
                    let numCompromiso = `<td>${i+1}</td>`;
                    let compromiso = `<td>${DATOS3[i].COMPROMISOS}</td>`;
                    let nomParticipante3 = `<td>${DATOS3[i].NOMBRE_COMPLETO}</td>`;
                    let fechaEntrega = `<td>${DATOS3[i].FECHA_ENTREGA}</td>`;
                    let emailParticipante = DATOS3[i].EMAIL + ',';

                    tabla3 = tabla3 + `<tr>${numCompromiso + compromiso + nomParticipante3 + fechaEntrega}</tr>`;
                    correos = correos + emailParticipante;
                }


                var html = `<style>
                .default{
                
                    border: #0c0c0c 2px solid;
                    width: 100%;
                    border-radius: 10px;
                  
                }
                .Subtemas{
                
                  border: #0c0c0c 2px solid;
                  border-radius: 10px;
                  width: 100%;
                  margin-top: -10px;
                  }
                
                .Participantes{
                
                border: #0c0c0c 2px solid;
                border-radius: 10px;
                width: 100%;
                margin-top: -10px;
                }
                
                .Logius{
                
                border: #0c0c0c 2px solid;
                border-radius: 10px;
                width: 70%;
                margin-top: -10px;
                }
                
                .Temastratados{
                
                border: #0c0c0c 2px solid;
                border-radius: 10px;
                width: 100%;
                margin-top: -10px;
                text-align: justify;
                }
                
                .Compromisos{
                
                border: #0c0c0c 2px solid;
                border-radius: 10px;
                width: 100%;
                margin-top: -10px;
                }
                
                .Observaciones{
                
                border: #0c0c0c 2px solid;
                border-radius: 10px;
                width: 100%;
                height: 7%;
                margin-top: -2px;
                text-align: justify;
                }

                .td-observaciones{
                  text-overflow: clip;
                  white-space: pre-line;
                  overflow: hidden;
                  padding-right: 25px;
                }
                
                .Firma{
                
                border: #0c0c0c 2px solid;
                border-radius: 10px;
                width: 100%;
                margin: 20px 0px;
                display: flex;
                }
                
                .Firma div, .Firma img{
                    display: flex;
                    justify-content: center center;
                    align-items: center;
                    text-align: center;
                    padding: 10px 10px;
                }
                
                .Firma img{
                    margin-left: 80px;
                }
                
                .Logo{
                  margin-left: 61%;
                    width: 18%;
                    margin-top: 70px;
                    margin-bottom: -70px;
                }
                
                .Body{
                  margin-top: -8%;
                  width: auto;
                  margin-left: 5%;
                  margin-right: auto;
                }
                
                h4{
                font-size: 16px;
                font-weight: normal;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                margin-bottom: 14px;
                margin-left: 2px;
                }
                
                td, th {
                 /*  border: black 1px solid; */
                 text-align: justify;
                 padding-left: 25px;
                }
            
                .principal {
                    margin-left: 20%;
                    align-content: center;
            
                }
            
                .FirmaInt{
                    margin-left: 22.5%;
                    margin-top: -4%;
                }
                </style>
            
            <div class="Body">
            <div class="Logo">
                <a href="https://imgbb.com/"><img src="https://i.ibb.co/58vWhmh/Logius.png" alt="Logius" border="0"></a>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            
            <div class="Principal">
                <h1 style="font-size: 15px ;">ACTA DE REUNIONES SEGUIMIENTO Y CONTROL DE PROCESOS</h1>
            
            <table class="default">
                <tr class="tabla1">
                  <td><b>Acta N°: </b> ${numActa} </td>
                  <td><b>Tema: </b> ${tema} </td>
                </tr>
              
                <tr>
                  <td><b>Fecha: </b>${fecha}</td>
                  <td><b>Hora Inicio: </b>${fechaIn}</td>
                </tr>
                <tr>
                    <td><b>Empresa: </b>${empresa}</td>
                    <td><b>Hora Finalización: </b>${fechaF}</td>
                </tr>
              </table>
            
              <br>
              <table class="Subtemas">
              <H4><b>Subtemas</b></H4>
              <tr class="tabla2">

            
              </tr>
            
              ${tabla1}
              
            </table>


              <br>
            <table class="Participantes">
              <H4><b>Participante Empresa</b></H4>
              <tr class="tabla2">
                <td colspan="1" ><b>Participantes</b> </td>
                <td colspan="1" ><b>Empresa</b> </td>
            
              </tr>
            
              ${tabla}
              
            </table>
            <br>
            <table class="Participantes">
              <H4><b>Participante Logius S.A.S</b></H4>
              <tr class="tabla2">
                <td colspan="1" ><b>Participantes</b> </td>
                <td colspan="1" ><b>Empresa</b> </td>
            
              </tr>
            
              ${tabla2}
              
            </table>
            <br>
            <table class="Temastratados">
              <H4><b>Desarrollo de la reunión - temas tratados</b></H4>
              <tr class="tabla2">
                <td colspan="2" ><b></b> </td>
              </tr>
            
              <tr>
                <td class="td-observaciones">${desarrollo}</td>
              </tr>
              <tr>
                <td> </td>
              </tr>
              <tr>
                <td> </td>
              </tr>
            
            </table>
            <br>
            <table class="Compromisos">
              <H4><b>Compromisos</b></H4>
              <tr class="tabla1">
                <td colspan="1" ><b>N°</b></td>
                <td colspan="1" ><b>Compromisos</b></td>
                <td colspan="1" ><b>Responsable</b></td>
                <td colspan="1" ><b>Fecha Entrega</b></td>
              </tr>
            
              ${tabla3}
            
            </table>
            <br>
            <table class="Observaciones">
              <H4><b>Observaciones</b></H4>
              <tr class="tabla2">
                <td colspan="2" ><b></b> </td>
              </tr>
            
              <tr>
                <td class="td-observaciones">${observacion}</td>
              </tr>
              <tr>
                <td> </td>
              </tr>
              <tr>
                <td> </td>
              </tr>
            
            </table>
            <br>
            <div class="Firma">
                <div class="FirmaInt">
                    <div class="col-4" style="width: 250px">
                        <label style="margin-top: 55%;margin-right: -73%;"><b>Firma asistentes</b></label>
                        <img src="${firmaAs}" style="width: 250px; height: 80px;margin-left: 15px;"/>
                    </div>
                    <div class="col-4" style="width: 250px;margin-left: 80px;">
                        <label style="margin-top: 55%;margin-right: -73%;"><b>Firma responsables</b></label>
                        <img src="${firmaRe}" style="width: 250px; height: 80px;margin-left: 15px;"/>
                    </div>
                </div>
            </div>
            </div>
            </div>
`
                const rootNode = html
                const opt = {
                    margin: 5,
                    filename: `Acta#${numActa}-Logius.pdf`, 
                    html2canvas: {
                        scale: 5, // 
                        useCORS: true,
                        height: 'auto',
                        width: 800
                    }
                }
                const element = rootNode;
                // 匯出 PDF
                html2pdf()
                    .set(opt)
                    .from(element)
                    .save()
                    .outputPdf()
                    .then((pdf) => {
                        // This logs the right base64
                        console.log(btoa(pdf));
                        setTimeout(() => {
                            sendEmail("lappiz",correos + correos2 + correo3 + 'lappizt@gmail.com',
                                'Acta de reuniones seguimiento y control de procesos',
                                '', '',
                                [
                                    {
                                        filename: `Acta#${numActa}-Logius.pdf`,
                                        content: btoa(pdf),
                                        encoding: "base64"
                                    }
                                ]).then(function (respuesta) {
                                    toastr.info('Se ha enviado el correo');
                                }, function (error) {
                                    toastr.warning('Ha ocurrido un error al enviar el correo');
                                });
                        }, 800);
                    });

            })
        });
    });
 });
});
}