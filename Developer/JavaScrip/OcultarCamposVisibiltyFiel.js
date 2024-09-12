debugger;

if (e.value == "Juridica") {
	/*   $('label:contains(Nombre y apellidos)').parent().hide()
            $('label:contains(Nit)').parent().show()
            $('label:contains(CV)').parent().show()
            $('label:contains(Nombre o razon social)').parent().show()
 */

	visibilityField("8c33c1fd-1e0c-4f1d-963a-e42d64a19b19", false); // Nombre y apellidos
	visibilityField("aab7b3ee-ba5f-468e-a255-6521f6178aea", true); // Nit
	visibilityField("bf451f1d-0226-4947-9abf-a258d1ba4fa3", true); // CV
	visibilityField("b4034076-4d78-437f-bac4-5a401d03d273", true); // Nombre o razon social
}

if (e.value == "Natural") {
	/* 	$("label:contains(Nombre y apellidos)").parent().show();
	$("label:contains(Nit)").parent().hide();
	$("label:contains(CV)").parent().hide();
	$("label:contains(Nombre o razon social)").parent().hide(); */

	visibilityField("8c33c1fd-1e0c-4f1d-963a-e42d64a19b19", true); // Nombre y apellidos
	visibilityField("aab7b3ee-ba5f-468e-a255-6521f6178aea", false); // Nit
	visibilityField("bf451f1d-0226-4947-9abf-a258d1ba4fa3", false); // CV
	visibilityField("b4034076-4d78-437f-bac4-5a401d03d273", false); // Nombre o razon social
}
