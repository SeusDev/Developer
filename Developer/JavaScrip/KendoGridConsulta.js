var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];
console.log(idVista);
if (idVista == "2773465e-d2e6-473e-b2c1-04816fcab9d4") {
    debugger;
    setTimeout(() => {
     
        $(document).ready(function () {

            let query = `select
            g.NumGiro [Consecutivo],
            pv.CodigoCav [CodOfiAdmision],
            pc.Codigopostal [CodPostalAdm],
            pv.Nombre [oficinaAdmision],
            g.MedioElegido [Canalimposición],
            FORMAT(CAST(g.FechaCreacionComputada AS DATETIME), 'dd/MM/yyyy hh:mm:ss') [fechaAdmision],
            g.Remitente [emisor],
            g.Destinatario [receptor],
            COALESCE(CAST(g.TotalApagar  AS VARCHAR(255)), '')[monto],
            g.GiroFlete [flete],
            CASE
            WHEN g.Estado='Sin validacion biometrica' THEN 'CRE'
            WHEN g.Estado='Disponible' THEN 'CRE'
            WHEN g.Estado='Anulado' THEN 'DEV'
            WHEN g.Estado='Devolución' THEN 'DEV'
            WHEN g.Estado='Rezagado' THEN 'INAC'
            WHEN g.Estado='Rechazado' THEN 'DEV'
            WHEN g.Estado='Pagado' THEN 'PAG'
            END AS [evento],
            pv.CodigoCav[CodOfiPago],
            pc.Codigopostal [CodPostalPago],
            pv.Nombre [oficinaPago],
            g.MedioElegido [CanalPago],
            c.Nombre [divciuOrigen],
            g.CiuDes[CiuDes],
            g.NITEmpresaClaro [nitPrestador],
            COALESCE (FORMAT(CAST(g.FechaPagoComputada AS DATETIME), 'dd/MM/yyyy hh:mm:ss'),'') [fechaPago],
            COALESCE(CAST(g.Observaciones  AS VARCHAR(255)), '') [Observaciones]
            from TuGiroApp_Lappiz_Giro g
            inner join TuGiroApp_Lappiz_PuntosDeVenta  pv on g.PuntoDeVentaDestino =pv.Id
            inner join TuGiroApp_Lappiz_postalcav pc on pv.CodigopostalcavFk = pc.Id
            inner join TuGiroApp_Lappiz_Ciudades c on g.CiudadOrigen = c.Id`
        
            execQuery(query).then(function (Result) {

                // Configuración del KendoGrid
                kendo.jQuery("#grid").kendoGrid({
                    dataSource: {
                        data: Result[0],
                        schema: {
                            model: {
                                fields: {
                                    Consecutivo: { type: "string" },
                                    CodOfiAdmision: { type: "string" },
                                    CodPostalAdm: { type: "string" },
                                    oficinaAdmision: { type: "string" },
                                    Canalimposición: { type: "string" },
                                    fechaAdmision: { type: "string" },
                                    emisor: { type: "string" },
                                    receptor: { type: "string" },
                                    monto: { type: "string" },
                                    flete: { type: "string" },
                                    evento: { type: "string" },
                                    CodOfiPago: { type: "string" },
                                    CodPostalPago: { type: "string" },
                                    oficinaPago: { type: "string" },
                                    CanalPago: { type: "string" },
                                    divciuOrigen: { type: "string" },
                                    CiuDes: { type: "string" },
                                    nitPrestador: { type: "string" },
                                    fechaPago: { type: "string" },
                                    Observaciones: { type: "string" },
                             
                                }
                            }
                        },
                        pageSize: 10,
                    },
                    height: 450,
                    scrollable: true,
                    sortable: true,
                    filterable: true,
                    resizable: true,
                    pageable: {
                        pageable: true,
                        previousNext: false,
                        pageSize: 10,
                        alwaysVisible: true,
                        numeric: true,
                        buttonCount: 5
                    },
                    dataBound: function () {
                        for (var i = 0; i < this.columns.length; i++) {
                            this.autoFitColumn(i);
                        }
                    },
                    columns: [
                        { field: "Consecutivo", title: "Consecutivo" },
                        { field: "CodOfiAdmision", title: "CodOfiAdmision" },
                        { field: "CodPostalAdm", title: "CodPostalAdm" },
                        { field: "oficinaAdmision", title: "oficinaAdmision" },
                        { field: "Canalimposición", title: "Canalimposición" },
                        { field: "fechaAdmision", title: "fechaAdmision" },
                        { field: "emisor", title: "emisor" },
                        { field: "receptor", title: "receptor" },
                        { field: "monto", title: "monto" },
                        { field: "flete", title: "flete" },
                        { field: "evento", title: "evento" },
                        { field: "CodOfiPago", title: "CodOfiPago"},
                        { field: "CodPostalPago", title: "CodPostalPago" },
                        { field: "oficinaPago", title: "oficinaPago" },
                        { field: "CanalPago", title: "CanalPago" },
                        { field: "divciuOrigen", title: "divciuOrigen" },
                        { field: "CiuDes", title: "CiuDes" },
                        { field: "nitPrestador", title: "nitPrestador" },
                        { field: "fechaPago", title: "fechaPago" },
                        { field: "Observaciones", title: "Observaciones" },
                        
                    ]
                });

                kendo.jQuery("#exportButton").click(function() {
                    // Obtener la instancia del KendoGrid
                    var grid = $("#grid").data("kendoGrid");

                    // Exportar los datos a Excel
                    grid.saveAsExcel();

                });
              
            })
        
        });
        
    }, 1000);
} else {
    // Si el idVista no es igual al valor especificado, se ejecuta este bloque de código
    console.log("La página actual no es la página que estás buscando.");
}