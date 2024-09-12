/*Formulario Comfirmar devolución de fórmula grid y acordeón*/
let url = location.href;
let urlSplit = url.split('appViewId=')
let idVista = urlSplit[1]

if (idVista == 'be0d6863-03b8-43de-9c5a-513bd2231cad') {
    debugger;
    setTimeout(function () {

        var idTrasncrip = "";
        numsoli()

        function numsoli() {
            debugger;
            var query = `select distinct t.Id,t.ConsecutivoFormula
                        from Cohan_Lappiz_HistorialDetalleDispensacion hd
                        inner join Cohan_Lappiz_DetallesDispensaciones dd on hd.DetalleDispensacionFK=dd.Id
                        join Cohan_Lappiz_Dispensacion d on dd.DispensacionFk=d.Id
                        join Cohan_Lappiz_Transcripcionformulas t on d.TranscripcionFromulasFK=t.Id
                        where hd.Tipo='Devolución'  
                        order by ConsecutivoFormula `;

            execQuery(query).then(success => {

                $('#NumeroSolicitud').kendoDropDownList({
                    autoBind: false,
                    dataTextField: "ConsecutivoFormula",
                    dataValueField: "Id",
                    dataSource: success.data[0],
                    optionLabel: "Seleccione una solicitud",
                    change: function () {
                        debugger
                        $("#accordionDevolMedi").empty();
                        var index = $('#NumeroSolicitud').data('kendoDropDownList').select();
                        var getSelected = $('#NumeroSolicitud').data('kendoDropDownList').dataSource.options.data[index - 1]
                        idTrasncrip = getSelected.Id;
                    }
                });
            });
        }

        $('#asignar').click(function () {
            debugger
            var query = `  select distinct d.Id,d.Codigo,d.FechaDeCreacion,u.Usuarios
                            from Cohan_Lappiz_HistorialDetalleDispensacion hd
                            inner join Cohan_Lappiz_DetallesDispensaciones dd on hd.DetalleDispensacionFK=dd.Id
                            join Cohan_Lappiz_Dispensacion d on dd.DispensacionFk=d.Id
                            join Cohan_Lappiz_Transcripcionformulas t on d.TranscripcionFromulasFK=t.Id
                            join Lappiz_Users u on d.UsuarioDeCreacion=u.Id
                            where d.TranscripcionFromulasFK='${idTrasncrip}' and dd.CantidadDevuelta is not null `
            execQuery(query).then(success => {
                var infonumsoli = success.data[0];

                $("#devoluciones").kendoGrid({
                    dataSource: {
                        data: infonumsoli,
                        schema: {
                            model: {
                                fields: {
                                    Id: { type: "string", editable: false },
                                    Codigo: { type: "number", editable: false },
                                    FechaDeCreacion: { type: "date", editable: false },
                                    Usuarios: { type: "string", editable: false }
                                } // fields
                            } // models
                        }, // schema
                        pageSize: 10
                    },
                    batch: true,
                    editable: true,
                    persistSelection: true,
                    scrollable: true,
                    sortable: true,
                    filterable: true,
                    resizable: true,
                    pageable: {
                        input: true,
                        numeric: true,
                        refresh: true
                    },
                    dataBound: function () {
                        for (var i = 0; i < this.columns.length; i++) {
                            this.autoFitColumn(i);
                        }
                    },
                    columns: [

                        // Columnas de la grid
                        { field: "Codigo", title: "Código de dispensación" },
                        { field: "FechaDeCreacion", title: "Fecha de creación", template: "#= kendo.toString(kendo.parseDate(FechaDeCreacion, 'yyyy-MM-dd'), 'yyyy/MM/dd') #" },
                        { field: "Usuarios", title: "Usuario de creación" },
                        { command: { text: "devoluciones", click: devoluciones, template: "<a class='k-grid-devoluciones btn'><i class='fa fa-undo'></i> Ver devoluciones</a>" } }
                    ]
                });
            });
        });

        function devoluciones(e) {
            debugger
            e.preventDefault()
            var grid = $("#devoluciones").data("kendoGrid");

            var data = grid.dataItem($(e.target).closest("tr"));
            $("#accordionDevolMedi").empty();
            $("#verdevol").modal('show');

            var stringQuery = ` select hd.Id,dtf.ProductoPorUbicacion[IdProdUbi], p.NombreProducto, p.CodigoProducto,hd.Cantidad'CantidadDevuelta'
                                from Cohan_Lappiz_HistorialDetalleDispensacion hd
                                inner join Cohan_Lappiz_DetallesDispensaciones dd on hd.DetalleDispensacionFK=dd.Id
                                join Cohan_Lappiz_DetalleTranscripcionFormulas dtf on dd.DetalleTranscripcionFormulasFK=dtf.Id
                                join  Cohan_Lappiz_TripleA ta on dtf.TripleAFK=ta.Id
                                join Cohan_Lappiz_Producto p on ta.ProductoFk=p.Id
                                join Cohan_Lappiz_Dispensacion d on dd.DispensacionFk=d.Id
                                join Cohan_Lappiz_Transcripcionformulas t on d.TranscripcionFromulasFK=t.Id
                                where  dd.DispensacionFk='${data.Id}' and hd.Tipo='Devolución'`
            execQuery(stringQuery).then(success => {
                debugger;

                var data = success.data[0]

                let html = "";
                if (data.length > 0) {
                    let Query = "";


                    let usubode = JSON.parse(sessionStorage.LappizUser).BodegasFK;
                    for (let i = 0; i < data.length; i++) {

                        Query += `select  u.Id, u.Descripcion,pu.TripleA,pu.Id[IdproUbi]
                                    from  Cohan_Lappiz_ProductosPorUbicacion pu
                                    inner join Cohan_Lappiz_TripleA t on pu.TripleA=t.Id  
                                    join Cohan_Lappiz_Ubicacion u on pu.UbicacionesFK=u.Id
                                    where pu.Id= '${data[i].IdProdUbi}' `


                        html +=
                            `<div class="card" id="${data[i].Id}">
                        <div class="card-header" id="heading_${data[i].Id}">
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapse_${data[i].Id}"
                                    aria-expanded="true" aria-controls="collapse_${data[i].Id}"
                                    style="width: 100%; text-align: center; justify-content: space-around;">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion">
                                        <span class="glyphicon glyphicon-bed" style="justify-content: space-around; padding-right: 5px;">
                                        </span>
                                        ${data[i].CodigoProducto} - ${data[i].NombreProducto}
                                    </a>
                                </button>
                                <input type="text" id="Id_${data[i].Id}" style="display: none" value="${data[i].Id}">
                            </h5>
                        </div>
                        <div id="collapse_${data[i].Id}" class="collapse" aria-labelledby="heading_${data[i].Id}"
                            data-parent="#accordionDevolMedi">
                            <div class="card-body">
                                <div class="row col-12">
                                    <div class="col-sm-12 col-md-6">
                                        <div>
                                            <label class="labelInput"> Código producto:</label><br>
                                            <input type="number" class="input-basic input-expand" placeholder="Código producto"
                                                id="CodigoProducto_${data[i].Id}" value="${data[i].CodigoProducto}" readonly>
                                        </div>
                                        <div>
                                            <label class="labelInput">Ubicación <span class="isrequired"
                                                    style="color: red;">*</span></label><br>
                                            <input type="text" class="dropDown" id="Ubicacion_${data[i].Id}">
                                        </div>
                                        <div>
                                            <label class="labelInput">Vencimiento</label><br>
                                            <input type="date" class="input-basic input-expand" id="FechaVencimientoLote_${data[i].Id}" readonly>
                                        </div>
                                        <div>
                                            <label class="labelInput">Devolver</label><br>
                                            <input type="number" class="input-basic input-expand" id="CantidadDevuelta_${data[i].Id}" readonly
                                                value="${data[i].CantidadDevuelta}">
                                        </div>
                                    </div>
                    
                                    <div class="col-sm-12 col-md-6">
                                        <div>
                                            <label class="labelInput">Nombre producto</label><br>
                                            <input type="text" class="input-basic input-expand" id="NombreProducto_${data[i].Id}" readonly
                                                value="${data[i].NombreProducto}">
                                        </div>
                                        <div>
                                            <label class="labelInput">Lote</label><br>
                                            <input type="text" class="dropDown" id="NumeroLote_${data[i].Id}" >
                                        </div>
                                        <div>
                                            <label class="labelInput">Cantidad lote</label><br>
                                            <input type="number" class="input-basic input-expand" id="CantidadLote_${data[i].Id}" readonly>
                                        </div>
                                        <div>
                                            <label class="labelInput">Cantidad a ubicar<span class="isrequired"
                                                    style="color: red;">*</span></label><br>
                                            <input type="number" class="input-basic input-expand" id="CantUbicar_${data[i].Id}"
                                            onkeypress='return validaNumericos(event)' >
                                        </div>
                                    </div>
                                </div>
                                <hr class="k-card-separator" style="margin: 8px 0;">
                                <div class="k-card-actions k-card-actions-stretched" style="padding-top: 6px;">
                                    <div class="add-btn-container">
                                        <button id="ubicar_${data[i].Id}" class="addBtn" style="padding: 2px 15px; font-size: 12px;"><i class="fa fa-map-pin" aria-hidden="true"></i> Ubicar medicamentos</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <script>
                        function validaNumericos(event) {
                            if(event.charCode >= 48 && event.charCode <= 57){
                            return true;
                            }
                            return false;        
                        }
                    </script> `


                        execQuery(Query).then(success => {

                            let respuesta = success.data[0];
 
                            $(`#Ubicacion_${data[i].Id}`).kendoDropDownList({
                                dataTextField: "Descripcion",
                                dataValueField: "Id",
                                headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px "><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Ubicación</span>`,
                                dataSource: respuesta,
                                filter: "startswith",
                                optionLabel: "Seleccione una ubicación",
                                change: function () {
                                    debugger
                                    var id = $(this);
                                    id = id[0].element[0].id
                                    var index = $(`#${id}`).data('kendoDropDownList').select();
                                    var getSelected = $(`#${id}`).data('kendoDropDownList').dataSource.options.data[index - 1]
                                    var getIndexInput = id.split('_')
                                    getIndexInput = getIndexInput[1]

                                    var Triple = getSelected.TripleA
                                    var IdproUbi = getSelected.IdproUbi
                                    var Query1 = `  
                                    
                                    select	pu.Id,t.NumeroLote, t.FechaVencimientoLote, pu.Cantidad[CantidadLote],pu.BodegaFK,pu.TripleA 
                                    from  Cohan_Lappiz_ProductosPorUbicacion pu
                                    inner join Cohan_Lappiz_TripleA t on pu.TripleA=t.Id  
                                    join Cohan_Lappiz_Ubicacion u on pu.UbicacionesFK=u.Id
                                    where pu.Id=  '${IdproUbi}' order by t.FechaVencimientoLote asc`
                                    execQuery(Query1).then(success => {

                                        let respuesta1 = success.data[0];
                                        respuesta1.forEach(element => {
                                            let fecha = element.FechaVencimientoLote;
                                            fecha = fecha.split('T');
                                            fecha = fecha[0];
                                            element.FechaVencimientoLote = fecha;
                                        });

                                        $(`#NumeroLote_${data[i].Id}`).kendoDropDownList({
                                            dataTextField: "NumeroLote",
                                            dataValueField: "Id",
                                            headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px "><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Lote</span>`,
                                            dataSource: respuesta1,
                                            filter: "startswith",
                                            optionLabel: "Seleccione un lote",
                                            change: function () {
                                                debugger
                                                var id = $(this);
                                                id = id[0].element[0].id
                                                var index = $(`#${id}`).data('kendoDropDownList').select();
                                                var getSelected = $(`#${id}`).data('kendoDropDownList').dataSource.options.data[index - 1]
                                                var getIndexInput = id.split('_')
                                                getIndexInput = getIndexInput[1]
                                                var IdPU = getSelected.Id;
                                                var Query3 = `select isnull(SUM(Cantidad),0)'CantidadEntrada' from Cohan_Lappiz_ProductosPorUbicacion where Id = '${IdPU}' and Estado = 'Entrada'`;
                                                var Query4 = `select isnull(SUM(Cantidad),0)'CantidadSalida' from Cohan_Lappiz_ProductosPorUbicacion where TripleA = '${Triple}' and Estado = 'Salida'`;
                                                var sumaE
                                                var sumaS

                                                var Query = {
                                                    "query": Query3,
                                                    "tenantId": "null",
                                                    "parameters": {
                                                        "aType": "execTx",
                                                        "environment": `${backandGlobal.environment}`
                                                    }

                                                };
                                                $.ajax({
                                                    async: false,
                                                    url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                                                    type: 'POST',
                                                    data: JSON.stringify(Query),
                                                    beforeSend: function (xhr) {
                                                        xhr.setRequestHeader('Content-Type', 'application/json');
                                                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                                                    },
                                                    success: function (Success) {
                                                        sumaE = parseInt(Success[0][0].CantidadEntrada);
                                                    },
                                                    error: function (error) { console.log(`Error-->${error}`); }
                                                });
                                                Query = {
                                                    "query": Query4,
                                                    "tenantId": "null",
                                                    "parameters": {
                                                        "aType": "execTx",
                                                        "environment": `${backandGlobal.environment}`
                                                    }

                                                };
                                                $.ajax({
                                                    async: false,
                                                    url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                                                    type: 'POST',
                                                    data: JSON.stringify(Query),
                                                    beforeSend: function (xhr) {
                                                        xhr.setRequestHeader('Content-Type', 'application/json');
                                                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                                                    },
                                                    success: function (Success) {
                                                        sumaS = parseInt(Success[0][0].CantidadSalida);
                                                    },
                                                    error: function (error) { console.log(`Error-->${error}`); }
                                                });
                                                $(`#FechaVencimientoLote_${getIndexInput}`).val(getSelected.FechaVencimientoLote)
                                                $(`#CantidadLote_${getIndexInput}`).val(sumaE - sumaS)
                                                $(`#BodegaFK_${getIndexInput}`).val(getSelected.BodegaFK)
                                                $(`#TripleA_${getIndexInput}`).val(getSelected.TripleA)
                                            }
                                        })
                                    });// termina Query1
                                }
                            })
                        });// termina Query

                    }//termina for acordeon

                }//termina if

                $("#accordionDevolMedi").append(html)

                $(".addBtn").click((e) => {
                    debugger
                    ubicar(e.target.id)
                })
            })// termina execQuery2

        }

        function ubicar(Id) {
            debugger
            var id = Id.split('_')
            let CantidadDevuelta = $(`#CantidadDevuelta_${id[1]}`).val();
            let CantUbicar = $(`#CantUbicar_${id[1]}`).val();
            if (confirm('¿Desea guardar los registros de recibir?')) {

                if (parseInt(CantUbicar) <= 0) {
                    toastr.warning('Ingrese una cantidad a ubicar mayor a 0')
                    return
                } else if (parseInt(CantUbicar) > parseInt(CantidadDevuelta)) {
                    toastr.warning('La cantidad a ubicar es mayor a la cantidad a devolver')
                    return
                } else if (parseInt(CantUbicar) < parseInt(CantidadDevuelta)) {
                    toastr.warning('La cantidad a ubicar es menor a la cantidad a devolver')
                    return
                }
               
                let usubode = JSON.parse(sessionStorage.LappizUser).BodegasFK;

                
                   var Query = `
                        update Cohan_Lappiz_DetallesDispensaciones
						set FechaDeDevolucion = GETDATE(), CantidadDevuelta = ${parseInt($(`#CantUbicar_${id[1]}`).val())},Estado='Devolucion'
						WHERE FechaDeDispensacion = (SELECT FechaMaxima = MAX (FechaDeDispensacion) FROM Cohan_Lappiz_DetallesDispensaciones) 
                        and DetalleTranscripcionFormulasFK ='${$('#NumeroSolicitud').data('kendoDropDownList').value()}'
                        
                        update Cohan_Lappiz_DetalleTranscripcionFormulas
                        set CantidadRecepcionada = ${parseInt($(`#CantUbicar_${id[1]}`).val())}
                        where Id='${$('#NumeroSolicitud').data('kendoDropDownList').value()}'
                        
                        
                        declare @TripleAID UNIQUEIDENTIFIER

                        set @TripleAID = (select TripleAFK from Cohan_Lappiz_DetalleTranscripcionFormulas where Id = '${$('#NumeroSolicitud').data('kendoDropDownList').value()}')

                        insert into Cohan_Lappiz_ProductosPorUbicacion Values (NEWID(), null, null, ${parseInt($(`#CantUbicar_${id[1]}`).val())}, GETDATE(),'${$(`#Ubicacion_${id[1]}`).val()}', '${usubode}', 'Entrada', @TripleAID,null,null,null,null,null)
                       
                        update Cohan_Lappiz_ProductosPorBodega
                        set UnidadComprometida =  isnull(UnidadComprometida,0) -  ${parseInt($(`#CantUbicar_${id[1]}`).val())},UnidadDisponible= isnull(UnidadDisponible,0) +  ${parseInt($(`#CantUbicar_${id[1]}`).val())}
                        where BodegaFK ='${usubode}' and TripleAFK= @TripleAID
                        
                        update Cohan_Lappiz_HistorialDetalleDispensacion
						        set Tipo ='Devuelto'
								where Id='${id[1]}'
                        
                        `
                
                var query = {
                    "query": Query,
                    "tenantId": "null",
                    "parameters": {
                        "aType": "execTx",
                        "environment": `${backandGlobal.environment}`
                    }

                };
                $.ajax({
                    async: false,
                    url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`,
                    type: 'POST',
                    data: JSON.stringify(query),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('Authorization', localStorage.Authorization);
                    },
                    success: function (Success) {
                        debugger
                        $(`#${Id}`).remove();
                        $("#accordionDevolMedi").empty();
                        $("#verdevol").modal('hide');
                        numsoli()
                        toastr.success("La confirmación de devoluciones fue guardada correctamente")
                    }
                });
               
               
            }
        }

    }, 800);
}
