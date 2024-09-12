function exporte(){
    debugger;
    let string = `select 
        HC.Id,
        HC.FechaConsulta,
        P.Nombre 'PNombre',
        P.Direccion,
        P.Telefono,
        M.Nombre 'MNombre',
        E.Nombre'Especie',
        M.Edad,
        M.Peso,
        M.Color,
        Rz.Nombre'Raza',
        M.Sexo,
        M.FechaNacimiento,
        HC.Motivo,
        HC.TratamientosConsulta,
        HC.PatronFC,
        HC.PatronFR,
        HC.Temperatura,
        HC.FrecuenciaCardiaca,
        HC.FrecRespiratoria,
        HC.Pulso,
        HC.LlenadoCapilar,
        HC.CTrufa,
        HC.Mucosas,
        HC.Hidratacion,
        HC.ResumenLaboratorio,
        HC.Nervioso,
        HC.Oftamologo,
        HC.PielAnexo,
        HC.Reproductor,
        HC.Digestivo,
        HC.Respiratorio,
        HC.Cardiovascular,
        MusculoEsqueletico,
        GenitoUrinario,
        HC.DiagnosticoPresuntivo,
        HC.DetallesExamen,
        HC.FormulaMedica,
        HC.Observaciones,
        F.Formato,
        V.Icono,
        V.Nombre'Veterinaria',
        HC.Firma,
        from MA_Lappiz_HC HC
        join MA_Lappiz_Propietarios P on P.Id = HC.PropietarioFk
        join MA_Lappiz_Paciente M on M.Id = HC.PacienteFk
        join MA_Lappiz_Raza Rz on Rz.Id = M.RazaFk
        join MA_Lappiz_EspeciePaciente E on E.Id = M.EspecieFk
        left join MA_Lappiz_Formatos F on F.Id = 'C8794D84-AAC1-40A6-AC3B-8D2C01972D00'
        join MA_Lappiz_Veterinaria V on V.Id = P.VeterinariaFk
        where HC.Id = '${e.dataItem.Id}'`
    
    execQuery(string).then(function(response){
        
        let data = response[0][0]
        let html = data.Formato
        
        data.Direccion = JSON.parse(data.Direccion).address
        //data.Direccion = JSON.parse(data.Direccion).address
        
        let icono
        if(data.Icono){
            
            icono = `https://designertest.lappiz.io/Api/api/Upload/UploadImages/${data.Icono.split('[')[1].split(']')[0].split(',')[0]}`
            
        }else{
            icono = 'https://designertest.lappiz.io/Api/api/Upload/UploadImages/WhatsApp%20Image%202022-02-18%20at%2008.20.15.jpeg'
        }
        
        
        var date = new Date();
        const months = ["ene.", "feb.", "mar.","abr.", "may.", "jun.", "jul.", "ago.", "sep", "oct.", "nov.", "dec."];
        
        const formatDate = (date)=>{
            let formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
            return formatted_date;
        }
        
        data.FechaConsulta = formatDate(new Date(data.FechaConsulta))
        data.FechaNacimiento = formatDate(new Date(data.FechaNacimiento))
        
        html = html.replace('[icono]',icono)
        html = html.replace('[Veterinaria]',data.Veterinaria)
        html = html.replace('[Fecha]',data.FechaConsulta)
        html = html.replace('[PRNombre]',data.PNombre)
        html = html.replace('[PRDireccion]',data.Direccion)
        html = html.replace('[PRCElular]',data.Telefono)
        html = html.replace('[MNombre]',data.MNombre)
        html = html.replace('[MEspecie]',data.Especie)
        html = html.replace('[MEdad]',data.Edad)
        html = html.replace('[MPeso]',data.Peso)
        html = html.replace('[MColor]',data.Color)
        html = html.replace('[MRaza]',data.Raza)
        html = html.replace('[MSexo]',data.Sexo)
        html = html.replace('[MFechaNacimiento]',data.FechaNacimiento)
        html = html.replace('[MotivoConsulta]',data.Motivo)
        html = html.replace('[Tratamientos]',data.TratamientosConsulta)
        html = html.replace('[Temperatura]',data.Temperatura)
        html = html.replace('[PatronFC]',data.PatronFC)
        html = html.replace('[PatronFR]',data.PatronFR)
        html = html.replace('[[FrecuenciaC]]',data.FrecuenciaCardiaca)
        html = html.replace('[[FrecuenciaR]]',data.FrecRespiratoria)
        html = html.replace('[Pulso]',data.Pulso)
        html = html.replace('[LlenadoCapilar]',data.LlenadoCapilar)
        html = html.replace('[CTrufa]',data.CTrufa)
        html = html.replace('[Mucosa]',data.Mucosas)
        html = html.replace('[Hidratacion]',data.Hidratacion)
        html = html.replace('[ResumenLaboratorio]',data.ResumenLaboratorio)
        html = html.replace('[[Nervioso]]',data.Nervioso)
        html = html.replace('[[Oftamologo]]',data.Oftamologo)
        html = html.replace('[[PielAnexo]]',data.PielAnexo)
        html = html.replace('[[Reproductor]]',data.Reproductor)
        html = html.replace('[Respiratorio]',data.Respiratorio)
        html = html.replace('[Digestivo]',data.Digestivo)
        html = html.replace('[Cardiovascular]',data.Cardiovascular)
        html = html.replace('[MusuloEsqueletico]',data.MusculoEsqueletico)
        html = html.replace('[Urinario]',data.GenitoUrinario)
        html = html.replace('[Diagnostico]',data.DiagnosticoPresuntivo)
        html = html.replace('[Problemas]',data.DetallesExamen)
        html = html.replace('[FormulaMedica]',data.FormulaMedica)
        html = html.replace('[Observaciones]',data.Observaciones)
        html = html.replace('[ruta]',`data: image / png; base64, ${data.Firma}`)
        
        imprimirElemento(html)
        
        function imprimirElemento(elemento) {
        	var ventana = window.open('', 'PRINT', 'height=400,width=600');
        	ventana.document.write('<html><head><title></title>');
        	ventana.document.write('</head><body >');
        	ventana.document.write(elemento);
        	ventana.document.write('</body></html>');
        	ventana.document.close();
        	ventana.focus();
        	setTimeout(function () {
        		ventana.print();
        		ventana.close();
        	}, 1000)
        
        	return true;
        }
    })

}