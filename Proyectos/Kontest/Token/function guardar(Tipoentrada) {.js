function guardar(Tipoentrada) {
    sessionStorage.count = 0
    debugger;
    //document.querySelector("#loaderDiv").style.display = ''
    var row = JSON.parse(sessionStorage.dataItem)
    var tip = row.Tipo
    var TipoEntrada = Tipoentrada
    row.TipoEntrada = TipoEntrada
    var Fotos = JSON.parse(sessionStorage.Fotos)
    var query = `SELECT NEWID() AS Id`
    var IdEntrada = ajaxQuery(query)[0].Id

    var minimoS = parseInt($("#txtMinFotosSeries").val());

    var endDate = new Date();
    var startdate = new Date(endDate);
    var durationInMinutes = 5;
    startdate.setHours(endDate.getHours() - durationInMinutes);
    var fechareal = new Date(startdate)

    toastr.options = {
        "positionClass": "toast-top-center",
        "closeButton": true,
        "timeOut": "10000",
    }

    if (row.TipoEntrada == 'Serie') {
        if (Fotos.length < minimoS) {
            toastr.warning(`Debe subir el minimo de fotos (${minimoS}) para poder guardar`, "Atención");
        } else {
            var IdFotosDrive = saveDrive()
            var t = []
            if (tip == 'Tema') {

                Fotos.forEach(element => {
                    if (element.NroCarga >= 0) {
                        var body = temaT(row, element)
                        t.push(body)
                        //var url = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Kontest_Lappiz_CargasPorTemaPorParticipante`;
                        //insert(body, url,IdFotosDrive)
                    }
                });
                var url = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Kontest_Lappiz_CargasPorTemaPorParticipante`;
                insert(t, url, IdFotosDrive)

            }
            if (tip == 'Categoria') {

                for (var j = 0; j < Fotos.length; j++) {

                    if (Fotos[j].NroCarga >= 0) {
                        var body = categoriaT(row, Fotos[j])
                        t.push(body)
                        //var url = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Kontest_Lappiz_CategoriaPorParticipantePorConcurso`;
                        //insert(body, url,IdFotosDrive)
                    }
                }
                var url = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Kontest_Lappiz_CargasPorTemaPorParticipante`
                insert(t, url, IdFotosDrive)

            }
        }
    } else {

        var IdFotosDrive = saveDrive()
        console.log(IdFotosDrive);
        var t = []
        if (tip == 'Tema') {

            Fotos.forEach(element => {
                if (element.NroCarga >= 0) {
                    var body = temaT(row, element)
                    t.push(body)
                    //var url = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Kontest_Lappiz_CargasPorTemaPorParticipante`;
                    //insert(body, url,IdFotosDrive)
                }
            });
            var url = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Kontest_Lappiz_CargasPorTemaPorParticipante`;
            insert(t, url, IdFotosDrive)

        }
        if (tip == 'Categoria') {

            for (var j = 0; j < Fotos.length; j++) {

                if (Fotos[j].NroCarga >= 0) {
                    var body = categoriaT(row, Fotos[j])
                    t.push(body)
                    //var url = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Kontest_Lappiz_CategoriaPorParticipantePorConcurso`;
                    //insert(body, url,IdFotosDrive)
                }
            }
            var url = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/Kontest_Lappiz_CargasPorTemaPorParticipante`
            insert(t, url, IdFotosDrive)

        }
    }

    function temaT(row, Foto) {

        var data = ajaxQuery(`SELECT C.Id Concurso,CAT.Id Categoria FROM Kontest_Lappiz_Concurso C
    INNER JOIN Kontest_Lappiz_Categoria CAT ON C.Id = CAT.CodConcurso
    INNER JOIN Kontest_Lappiz_Tema T ON CAT.Id = T.CategoriaFk  
    where T.Id = '${row.Id}'`)[0]
        var TemaFk = row.Id
        var CategoriaFk = data.Categoria
        var ConcursoFk = data.Concurso
        var TipoEntra = row.TipoEntrada
        var FechaCarga = fechareal
        var Titulo = '',
            Descripcion = '',
            FotosSubidas = '',
            MaximoSerie = '',
            SeriesSubidas = ''
        if (row.TipoEntrada == 'Individual') {
            Titulo = $('#txtTituloIndividual').val()
            Descripcion = $("#desI").val();
            FotosSubidas = $('#txtFotosIndividual').val()
        } else if (row.TipoEntrada == 'Serie') {
            Titulo = $('#txtTituloSerie').val()
            Descripcion = $("#desS").val();
            MaximoSerie = $('#txtMaximoSeries').val()
            SeriesSubidas = $('#txtFotosSeries').val()
        }

        var body = {
            "TemaFk": TemaFk,
            "CategoriaFk": CategoriaFk,
            "ConcursoFk": ConcursoFk,
            "TipoEntra": TipoEntra,
            "FechaCarga": FechaCarga,
            "ParticipanteFk": JSON.parse(sessionStorage.LappizUser).ParticipanteFk,
            "Titulo": Titulo,
            "Descripcion": Descripcion,
            "FotosSubidas": FotosSubidas,
            "MaximoSerie": MaximoSerie,
            "SeriesSubidas": SeriesSubidas,
            "NroCarga": Foto.NroCarga,
            "TamanoFoto": Foto.TamanoFoto,
            "LadoFoto": Foto.LadoFoto,
            "NombreFoto": Foto.Nombre,
            "AltoFoto": Foto.AltoFoto,
            "Estado": "Pendiente",
            "IdEntrada": IdEntrada,
            "parameters": {
                "userId": `${sessionStorage.userId}`,
                "tablaId": "",
                "actionId": "00000000-0000-0000-0000-000000000000",
                "pType": "Guardar",
                "aType": "ffija",
                "environment": `${backandGlobal.environment}`,
                "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
            }
        }
        return body
    }

    function categoriaT(row, Foto) {

        var CategoriaFk = row.Id
        var ConcursoFk = row.IdConcurso
        var TipoEntra = row.TipoEntrada
        var FechaCarga = fechareal
        var Titulo = '',
            Descripcion = '',
            FotosSubidas = '',
            MaximoSerie = '',
            SeriesSubidas = ''
        if (row.TipoEntrada == 'Individual') {
            Titulo = $('#txtTituloIndividual').val()
            Descripcion = $("#desI").val();
            FotosSubidas = $('#txtFotosIndividual').val()
        } else if (row.TipoEntrada == 'Serie') {
            Titulo = $('#txtTituloSerie').val()
            Descripcion = $("#desS").val();
            MaximoSerie = $('#txtMaximoSeries').val()
            SeriesSubidas = $('#txtFotosSeries').val()
        }
        var body = {
            "CategoriaFk": CategoriaFk,
            "ConcursoFk": ConcursoFk,
            "TipoEntra": TipoEntra,
            "FechaCarga": FechaCarga,
            "ParticipanteFk": JSON.parse(sessionStorage.LappizUser).ParticipanteFk,
            "FotosSubidas": FotosSubidas,
            "Titulo": Titulo,
            "MaximoSerie": MaximoSerie,
            "SeriesSubidas": SeriesSubidas,
            "Descripcion": Descripcion,
            "NroCarga": Foto.NroCarga,
            "TamanoFoto": Foto.TamanoFoto,
            "LadoFoto": Foto.LadoFoto,
            "NombreFoto": Foto.Nombre,
            "AltoFoto": Foto.AltoFoto,
            "Estado": "Pendiente",
            "IdEntrada": IdEntrada,
            "parameters": {
                "userId": `${sessionStorage.userId}`,
                "tablaId": "",
                "actionId": "00000000-0000-0000-0000-000000000000",
                "pType": "Guardar",
                "aType": "ffija",
                "environment": `${backandGlobal.environment}`,
                "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
            }
        }
        return body
    }

    function insert(Body, url, IdFotosDrive) {

        for (let j = 0; j < Body.length; j++) {
            const element = Body[j];
            var coun = 1
            sessionStorage.count = parseInt(sessionStorage.count) + coun
            var foto = element.NombreFoto
            var urlFoto = ''
            for (let i = 0; i < IdFotosDrive.length; i++) {
                const element = IdFotosDrive[i];
                if (foto == element.file) {
                    urlFoto = element.id
                }
            }
            if (urlFoto) {
                element.UrlImagen = urlFoto
//------------------------------------------Guarda en Bd----------------------------------------------------------//
                $.ajax({
                    async: false,
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(element),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                    },
                    success: function (result) {
                        debugger;
                        if (parseInt(sessionStorage.count) == 1) {
                            //toastr.success("Fotos guardadas correctamente,para visualizarlas dirígete al modulo de  historial de fotos");
                        }
                        //document.querySelector("#loaderDiv").style.display = 'none'
                        $('.serie').removeClass("serie");
                        $("#modalIndividual").modal('hide');
                        $("#modalSerie").modal('hide');
                    },
                    error: function (error) {
                        debugger;
                        console.log(error)
                        //  toastr.warning('No se pudo registrar el usuario');
                        //toastr.warning('No se pudo guardar la foto, por favor intente cargarla nuevamente')
                    }
                })
            }
            else{
                toastr.warning('No se pudo guardar la foto, por favor intente cargarla nuevamente')
            }
        }
        
        // ocultar msj 
        /* toastr.success("Fotos guardadas correctamente,para visualizarlas dirígete al modulo de  historial de fotos");  */ 
        document.querySelector("#loaderDiv").style.display = 'none'

    }

    function ajaxQuery(query) {
        let data
        let newquery = {
            "query": query,
            "parameters": {
                "aType": "execTx",
                "environment": `${backandGlobal.environment}`
            }
        }
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
                data = result[0]
            },
            error: function (error) {
                console.log(error)
            }
        })

        return data
    }



    function saveDrive() {
        debugger
        document.querySelector("#loaderDiv").style.display = ''
        var formData = new FormData();

        var totalfiles = document.getElementsByClassName('serie').length;
        var files = document.getElementsByClassName('serie')
        for (var index = 0; index < totalfiles; index++) {
            formData.append("file", files[index].files[0]);
        }

        var oAuth2Client = {
            CLIENT_ID: '610964803362-6rljaaf0o4hc08bgb3ee2l5jajum7v0j.apps.googleusercontent.com',
            CLINET_SECRET: 'DuZGgzK0vWKnsLWMw7R01RUi',
            REFRESH_TOKEN: '1//040KzHTbFPCssCgYIARAAGAQSNwF-L9IrDWHaHZnIdoph7eglzJzcXbOEeHRCHPHotfrMvWQ69TeHtVgAKO__iqTn-GI8eu9091A',
            parents: '1bV3jLUuDqPNFW14uyhp5UDrbOKPre-sY'
        }

        formData.append('head', JSON.stringify(oAuth2Client))

        var dato = []
        $.ajax({
            async: false,
            type: "POST",
            enctype: 'multipart/form-data',
            url: "https://tx.lappiz.io/UploadDrive/upload",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 900000,
            success: function (data) {
                debugger;
                if (data.length > 0) {
                    dato = data
                } else {
                    toastr.warning('No se pudo guardar la foto, por favor intente cargarla nuevamente')
                }

            },
            error: function (error) {
                console.log(error)
                toastr.warning('No se pudo guardar la foto, por favor intente cargarla nuevamente')
            }
        });
        return dato
    }
}