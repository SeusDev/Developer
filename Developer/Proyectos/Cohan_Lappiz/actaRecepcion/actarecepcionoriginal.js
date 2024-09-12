//acta recepcion original

var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == "f3a5c9ab-1242-45c8-80b0-3813e7034f99") {
	setTimeout(() => {
		debugger;
		let queryProd = `select distinct
        p.Id, p.CodigoProducto
        from Cohan_Lappiz_Recepciones r
        inner join Cohan_Lappiz_Bodega b on b.Id = r.BodegaFK
        inner join Cohan_Lappiz_PuntoVenta pv on pv.Id = b.PuntoVentaFK
        inner join Cohan_Lappiz_PedidosClientes pc on pc.id = r.PedidoFK
        inner join Cohan_Lappiz_DetalleRecepcion dr on dr.RecepcionFk = r.Id
        inner join Cohan_Lappiz_Producto p on dr.ProductoFK = p.Id
        inner join Cohan_Lappiz_FormaFarmaceutica ff on ff.Id = p.FormaFarmaceuticaFK
        inner join Cohan_Lappiz_Laboratorio l on l.id = p.LaboratorioFk
        inner join Cohan_Lappiz_UnidadMedidaProducto ump on ump.ProductoFk = p.Id
        inner join Cohan_Lappiz_TripleA ta on ta.ProductoFk = p.Id
        inner join Cohan_Lappiz_Proveedor provee on ta.ProveedorFk = provee.Id
        inner join Lappiz_Users u on u.id = dr.UsuarioCreacion
		order by p.CodigoProducto asc`;

		execQuery(queryProd).then((success) => {
			let ProdData = success.data[0];

			$("#ddlProducto").kendoMultiSelect({
				dataTextField: "CodigoProducto",
				dataValueField: "Id",
				dataSource: ProdData,
			});
		});

		let queryPuntoVenta = `select distinct
        pv.Id, pv.CodPuntoVenta
        from Cohan_Lappiz_Recepciones r
        inner join Cohan_Lappiz_Bodega b on b.Id = r.BodegaFK
        inner join Cohan_Lappiz_PuntoVenta pv on pv.Id = b.PuntoVentaFK
        inner join Cohan_Lappiz_PedidosClientes pc on pc.id = r.PedidoFK
        inner join Cohan_Lappiz_DetalleRecepcion dr on dr.RecepcionFk = r.Id
        inner join Cohan_Lappiz_Producto p on dr.ProductoFK = p.Id
        inner join Cohan_Lappiz_FormaFarmaceutica ff on ff.Id = p.FormaFarmaceuticaFK
        inner join Cohan_Lappiz_Laboratorio l on l.id = p.LaboratorioFk
        inner join Cohan_Lappiz_UnidadMedidaProducto ump on ump.ProductoFk = p.Id
        inner join Cohan_Lappiz_TripleA ta on ta.ProductoFk = p.Id
        inner join Cohan_Lappiz_Proveedor provee on ta.ProveedorFk = provee.Id
        inner join Lappiz_Users u on u.id = dr.UsuarioCreacion
        order by pv.CodPuntoVenta asc;`;

		execQuery(queryPuntoVenta).then((success) => {
			let dataPuntoVenta = success.data[0];

			$("#ddlPuntoVenta").kendoMultiSelect({
				dataTextField: "CodPuntoVenta",
				dataValueField: "Id",
				dataSource: dataPuntoVenta,
			});
		});

		let queryBodega = `select distinct
        b.Id, b.NombreBodega 
        from Cohan_Lappiz_Recepciones r
        inner join Cohan_Lappiz_Bodega b on b.Id = r.BodegaFK
        inner join Cohan_Lappiz_PuntoVenta pv on pv.Id = b.PuntoVentaFK
        inner join Cohan_Lappiz_PedidosClientes pc on pc.id = r.PedidoFK
        inner join Cohan_Lappiz_DetalleRecepcion dr on dr.RecepcionFk = r.Id
        inner join Cohan_Lappiz_Producto p on dr.ProductoFK = p.Id
        inner join Cohan_Lappiz_FormaFarmaceutica ff on ff.Id = p.FormaFarmaceuticaFK
        inner join Cohan_Lappiz_Laboratorio l on l.id = p.LaboratorioFk
        inner join Cohan_Lappiz_UnidadMedidaProducto ump on ump.ProductoFk = p.Id
        inner join Cohan_Lappiz_TripleA ta on ta.ProductoFk = p.Id
        inner join Cohan_Lappiz_Proveedor provee on ta.ProveedorFk = provee.Id
        inner join Lappiz_Users u on u.id = dr.UsuarioCreacion
        order by b.NombreBodega asc;`;

		execQuery(queryBodega).then((success) => {
			let dataBodega = success.data[0];

			$("#ddlBodega").kendoMultiSelect({
				dataTextField: "NombreBodega",
				dataValueField: "Id",
				dataSource: dataBodega,
			});
		});

		$("#btnGenerarReporte").click(function () {
			debugger;
		    toolbar_click();
		});
		
		function toolbar_click() {
			debugger;
			var fechaInicial = $("#dateFechaInicial").val();
			var fechaFinal = $("#dateFechaFinal").val();

			var multiselect = $("#ddlPuntoVenta").data("kendoMultiSelect");
			var items = multiselect.value();
            var multiselect2 = $("#ddlBodega").data("kendoMultiSelect");
			var items2 = multiselect2.value();

            var multiselect3 = $("#ddlProducto").data("kendoMultiSelect");
			var items3 = multiselect3.value();

			var pv = "PuntoVenta";
            var bod= "Bodega";
            var prod="Producto";

            if(items.length>0){
                pv +="="
			for(i=0;i<items.length;i++)
			{
				if(i+1 == items.length)
				{
					pv+="'"+ items[i]+"'";
				}
				else{
				pv+="'"+ items[i]+"',";
				}

			}
        }
        else
        {
            pv += ":isnull=true"
        }

        if(items2.length>0){
            bod +="="
        for(i=0;i<items2.length;i++)
        {
            if(i+1 == items2.length)
            {
                bod+="'"+ items2[i]+"'";
            }
            else{
            bod+="'"+ items2[i]+"',";
            }

        }
    }
    else
    {
        bod += ":isnull=true"
    }

    if(items3.length>0){
        prod +="="
    for(i=0;i<items3.length;i++)
    {
        if(i+1 == items3.length)
        {
            prod+="'"+ items3[i]+"'";
        }
        else{
        prod+="'"+ items3[i]+"',";
        }

    }
}
else
{
    prod += ":isnull=true"
}
			var url = "https://bi.lappiz.io/ReportServer/Pages/ReportViewer.aspx?%2fReport+Parts%2fCohan_Lappiz%2fCohan_Lappiz_Acta_Recepcion_SF&rs:Command=Render&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal+"&"+pv+"&"+prod+"&"+bod+"&rs:embed=false"
			window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes");
		}
	}, 1000);
}