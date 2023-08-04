if (window.location.href.includes("appViewId=8d194dc9-8dab-4569-a843-86cce7d53e7b")) {
    debugger;
	setTimeout(() => {
		document.querySelectorAll("[data-bind='click: viewItemClick']").forEach(el => el.title = 'Descripción de la solicitud')
	}, 800);
}





