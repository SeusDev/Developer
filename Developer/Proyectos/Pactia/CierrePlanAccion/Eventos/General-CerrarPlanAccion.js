function CerrarPlanAccion() {
    debugger;
    if(e.dataItem.EstadoPlanAccion != 'Cerrado'){
        var Planaccion = e.dataItem.Id;
        var inspeccion = e.dataItem.InpeccionesFK
    
        if (window.confirm("¿Esta seguro que desea cerrar el plan de acción?")) {
          var StringQuery = `UPDATE PactiaTest_Lappiz_PlanAccionInspecciones SET EstadoPlanAccion = 'Cerrado'  WHERE Id = '${Planaccion}'
            DECLARE @Abiertas INT, @Inspeccion INT , @Correor varchar(max), @correosst varchar(max), @correoa varchar (max)
            SELECT @Abiertas = COUNT(p.Id),
            @Correor =r.Email,
            @correosst= rs.Email,
            @correoa= a.Email 
            FROM PactiaTest_Lappiz_PlanAccionInspecciones p
            JOIN PactiaTest_Lappiz_Inspeccion_Pactia [Inspeccion] on p.InpeccionesFk = Inspeccion.Id     
            JOIN PactiaTest_Lappiz_CriticidadHallazgos AS c ON p.CriticidadFk = c.Id
            JOIN PactiaTest_Lappiz_Inmueble as i ON Inspeccion.ActivoFk = i.Id
            JOIN PactiaTest_Lappiz_responsableactivo r on i.ResposableactivoFk = r.Id
            JOIN PactiaTest_Lappiz_ResponsableSSTEnSitio rs on i.ResponsablesSST = rs.Id
            JOIN PactiaTest_Lappiz_Analista a on i.AnalistaFk = a.Id
            WHERE p.InpeccionesFK = '${ inspeccion }' or p.EstadoPlanAccion = 'Abierto'
            GROUP BY r.Email,rs.Email,a.Email
            SELECT @Inspeccion = NumeroInspeccion FROM PactiaTest_Lappiz_Inspeccion_Pactia WHERE Id = '${ inspeccion }'
            SELECT 
            @Abiertas AS Abiertas, 
            @Inspeccion AS NumeroInspeccion,
            @Correor  as Correor,
            @correosst as Correosst,
            @correoa as Correoa
          `;
      
          execQuery(StringQuery).then(function (response) {
            var planesRestantes = response[0][0].Abiertas
            var numero = response[0][0].NumeroInspeccion
            var Email =  response[0][0].Correor;
            var Email2 = response[0][0].Correosst;
            var Email3 = response[0][0].Correoa;
    
            if ( planesRestantes == 0 ){
    
                let Asunto = 'Finalización planes de acción'
                let cuerpo =  `<p>
                Se informa que los planes de acción asociados a la inspección número <b> ${numero} </b> fueron cerrados de manera satisfactoria, posterior a su revisión.
                <br>
                <p>Cualquier inquietud por favor comunicarse con la administración</p>
                <a href="https://www.pactia.com/"><img src="https://runtime.lappiz.io/assets/images/Pactia/Pactia.png" alt="Pactia-1" border="0" /></a><br />
                <a target="_blank" href="https://www.pactia.com/">www.pactia.com</a><br/>
                `;
      
                sendEmail(Email + ';' + Email2 + ';' + Email3, Asunto, "Notificación Inspecciones SST", cuerpo);
      
                toastr.info("Correo de notificación enviado correctamente");
                toastr.success("Planes de acción cerrados satisfactoriamente");
            }
            toastr.info("Plan de acción cerrado correctamente");
            document.querySelector("#grid1 > div.k-pager-wrap.k-grid-pager.k-widget.k-floatwrap.k-pager-lg > a.k-pager-refresh.k-link").click();
          });
        }

    } else {
        toastr.info('El plan de acción ya se encuentra cerrado')
    }
  }