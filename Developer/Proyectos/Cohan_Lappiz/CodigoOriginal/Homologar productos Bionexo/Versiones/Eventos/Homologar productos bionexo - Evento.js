/*homologar productos bionexo*/
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1]

if (idVista == 'd45d8f11-55d5-47bf-9d4e-dede94537dba') {
    debugger;
    setTimeout(function () {

        var idBio = "";
        LlenarInmputs();

        function LlenarInmputs() {
            debugger
            var stringQuery = `select bi.Id,bi.CodigoCliente,bi.NombreCliente,bi.NumeroCotizacion,bi.Origen,bi.NumeroItems,bi.FechaVencimiento,p.CodigoProducto,p.NombreProducto
                                from Cohan_Lappiz_DetalleBionexo dbi
                                join Cohan_Lappiz_Producto p on dbi.ProductoFK=p.Id
                                join Cohan_Lappiz_Bionexo bi on dbi.BionexoFK=bi.Id
                                join Lappiz_Users u on bi.UsuarioAsignadoFK=u.Id
                                where bi.FechaVencimiento > GETDATE()`


            execQuery(stringQuery).then(success => {
                debugger;

                var data = success.data[0]


                $("#nitcliente").kendoDropDownList({
                    dataTextField: "CodigoCliente",
                    dataValueField: "Id",
                    // template: `<span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: NombreProducto #</p></span><span class="k-state-default"  style="width:50% !important ; font-size: x-small;"><p>#: CodigoProducto #</p></span>`,
                    headerTemplate: `<div class="dropdown-header" style="width:98.5%; padding:0px "><span class="k-widget k-header"  style="width:50% ; font-size: x-small">Nit cliente</span>`,
                    dataSource: data,
                    filter: "startswith",
                    optionLabel: "Seleccione un nit",
                    change: function () {
                        debugger

                        var index = $('#nitcliente').data('kendoDropDownList').select();
                        var getSelected = $('#nitcliente').data('kendoDropDownList').dataSource.options.data[index - 1]

                        $('#cliente').val(getSelected.NombreCliente)
                        $('#NumCot').val(getSelected.NumeroCotizacion)
                        $('#idcliente').val(getSelected.CodigoCliente)
                        $('#NomCleinte').val(getSelected.NombreCliente)
                        $('#codPro').val(getSelected.CodigoProducto)
                        $('#NomPro').val(getSelected.NombreProducto)
                        $('#origen').val(getSelected.Origen)
                        idBio = getSelected.Id;

                    }
                })

            })

        }

        $('#cargar').click(function () {
            debugger
            toastr.info("Pendiente integración Bionexo")
        });

        $('#guardar').click(function () {
            debugger
            toastr.info("Pendiente integración Bionexo")
        });

    }, 800)
}