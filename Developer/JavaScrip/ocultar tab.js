var tabs = $(
	"#container > div.main-container > div > section > section > div > div > div > form > ul > li"
);
var textTabs = [
	"Auditoria",
	"Equipos de medición",
	"Autorización",
	"Incidentes",
	"Cierre Final",
];
for (var i = 0; i < tabs.length; i++) {
	for (let j = 0; j < textTabs.length; j++) {
		if (
			$(
				`#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(${i}) > a`
			).text() == textTabs[j]
		) {
			$(
				`#container > div.main-container > div > section > section > div > div > div > form > ul > li:nth-child(${i}) > a`
			).hide();
		}
	}
}
