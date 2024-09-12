debugger;
var Nombre = $("#a4f7281a-6a3c-484c-9822-666e405111ba").data("kendoDropDownList").dataItem()
	.NombreCp;
var to = $("#a4f7281a-6a3c-484c-9822-666e405111ba").data("kendoDropDownList").dataItem().CorreoE;
var Asunto = `Creación de proyecto No. ${e.dataItem.CodProyecto}`;
var Texto = "texto plano";
var Html = `<h2>Creacion de proyecto</h2> <br>
<h4>Se ha creado un proyecto de nombre ${e.dataItem.Nproyecto}, cuyo responsable es ${Nombre} </h4>
Gracias por la atención. Zeus Company`;

toastr.success("se ha enviado correo al responsable");

sendEmail(to, Asunto, Texto, Html);
