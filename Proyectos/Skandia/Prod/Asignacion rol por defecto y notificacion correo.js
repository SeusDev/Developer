debugger;
var Id = e.dataItem.Id;
var obj = [];
obj.push({ IdRol: "c3ca039e-9368-4a28-af2b-8f7ae2fefa4d", Action: "Save" });

$.ajax({
	async: false,
	url: backandGlobal.url + "/api/Roles/SaveChanges?idUser=" + Id,
	type: "POST",
	data: JSON.stringify(obj),
	beforeSend: function (xhr) {
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Authorization", localStorage.Authorization);
	},
	success: function (data) {
		var Query = `UPDATE LappizV2Prod.dbo.AspNetUsers SET EmailConfirmed = 1 WHERE Id = '${Id}'`;
		execQuery(Query).then(
			function () {
				var query1 = `select*from Lappiz_Users where Id='${Id}'`;
				execQuery(query1).then(function (response1) {
					var colaborador = response1.data[0][0].FullName;
					var Email = response1.data[0][0].Email;
					var Contrasena = response1.data[0][0].Contrasena;

					debugger;

					var query = `select*from Skandias_Lappiz_TemplateCorreo
                    where Id='308910DD-A3B4-4D7C-9354-BA0F19CC64CC'`;

					execQuery(query).then(function (response) {
						var Destinatarios = response.data[0][0].Destinatarios +','+ Email;
						var template = `<span style="font-size: small"
                ><span style="font-family: Verdana, Geneva, sans-serif"
                    ><span style="font-size: medium"
                        ><strong>!Hola </strong><strong style="color: #00ff00"></strong></span
                    ></span
                ></span
            ><span style="color: #00ff00; font-size: medium; font-family: Verdana, Geneva, sans-serif"
                ><strong>${colaborador}</strong></span
            ><span style="font-size: medium; font-family: Verdana, Geneva, sans-serif">!</span><br /><br /><span
                style="font-size: medium; font-family: Verdana, Geneva, sans-serif"
                >Te informamos que tu usuario de Skandia Anywhere ya ha sido activado automaticamente.</span
            ><br /><br /><span style="font-size: medium; font-family: Verdana, Geneva, sans-serif"
                >Ya puedes ingresar mediante el enlace que encontrar&aacute;s mas abajo; Recuerda tener presente
                tus credenciales:</span
            ><br /><br /><span style="font-size: medium; font-family: Verdana, Geneva, sans-serif"
                ><strong>Usuario:</strong> </span
            ><span style="color: #00ff00; font-size: medium; font-family: Verdana, Geneva, sans-serif"
                ><strong>${Email}</strong></span
            ><br /><span style="font-size: small"
                ><span style="font-family: Verdana, Geneva, sans-serif"
                    ><span style="font-size: medium"
                        ><strong>Contrase&ntilde;a:&nbsp;</strong
                        ><strong style="color: #00ff00">${Contrasena}</strong></span
                    ></span
                ></span
            ><br /><br /><br /><span style="font-size: medium; font-family: Verdana, Geneva, sans-serif"
                > <button tabindex="0" aria-disabled="false" role="button" data-role="button"
                style="background-color: #4CD964 !important;/* width: 80%; */max-width: 160px;display: block;width: 100px;height: 50px;"
                id="Back" type="button" class="MenuOptn k-button" onClick="window.open('https://runtime.lappiz.io/#/Skandias_Lappiz')">
               Ingresa Aqui  
            </button></span>`;

						sendEmail(Destinatarios, "Notificacion usuario activado", "", template).then(function (response1) {
							toastr.info("Se asigno el rol y se confirmo el correo");
						});
					});
				});
			},
			function (error) {
				console.log(error);
			}
		);
	},
});
