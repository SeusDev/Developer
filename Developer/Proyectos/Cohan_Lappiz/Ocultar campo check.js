var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

if (idVista == "de208efc-9daa-4194-bc28-1e8dccf0e3b9") {
	debugger;

	setTimeout(() => {
		$(document).on("click", $("#SectionsFields > div > div > label > input")[1], function (e) {
			debugger;
			if (e.target.checked === true && e.target.title === "¿Aplica asignación caja?") {
				$("#61a4b5da-f6a2-4a63-b905-c670a847aeb8").parent().parent().parent().parent().show();
			} else if (e.target.checked === false && e.target.title === "¿Aplica asignación caja?") {
				$("#61a4b5da-f6a2-4a63-b905-c670a847aeb8").parent().parent().parent().parent().hide();
			}
		});

		if (e.isNew) {
			$("#61a4b5da-f6a2-4a63-b905-c670a847aeb8").parent().parent().parent().parent().hide();
		} else {
			if (e.dataItem.CajasFk != "") {
			} else {
				$("#61a4b5da-f6a2-4a63-b905-c670a847aeb8").parent().parent().parent().parent().hide();
			}
		}
	}, 2000);
}