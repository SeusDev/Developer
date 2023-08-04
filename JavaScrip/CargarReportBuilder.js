if (window.location.href.includes("appViewId=cd23fe0d-4b48-47ad-bb00-131079965808")) {
	setTimeout(function () {
		consolidado();
		function consolidado() {
			var para = document.getElementsByClassName("resp-container");
			var img = document.createElement("iframe");
			img.className = "resp-iframe";
			img.src = `https://bi.lappiz.io/reports/report/Report%20Parts/Logius_Lappiz/Consolidado_General?rs:embed=true`;
			para[0].appendChild(img);
		}
	}, 800);
}