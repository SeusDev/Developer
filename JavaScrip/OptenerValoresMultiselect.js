var producto = $(`#data`).data("kendoMultiSelect").value()
producto= JSON.stringify(producto)
producto= producto.replace('[', '');
producto = producto.replace(']', '');
producto= producto.replaceAll('"', "'");
$(`#data`).data("kendoMultiSelect").value()