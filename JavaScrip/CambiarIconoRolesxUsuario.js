if (window.location.href.includes('appViewId=65366d53-0294-4bf3-a6ac-c1d818c963d5')) {
    debugger;
    setTimeout(() => {
        $('#ngb-nav-0').hide()
        document.querySelector("#Datos\\ básicos").style.display='none'
        document.querySelector("#\\36 5366d53-0294-4bf3-a6ac-c1d818c963d5_cancel").style.display='none'

        //Cambiar iconos del módulo de seguridad si es usuario administrador
        let emailEmpresa = JSON.parse(sessionStorage.LappizUser).Email;
        if (emailEmpresa === "admin@apuntador.com") {
        document.querySelector("#sidebar-menu > li:nth-child(1) > ul > li:nth-child(2) > a > i").className = 'fa fa-address-book link-icon'; /Cambiar icono a roles/
        document.querySelector("#sidebar-menu > li:nth-child(1) > ul > li:nth-child(3) > a > i").className = 'fa fa-wrench link-icon'; /Cambiar icono a asignar rol/
      }
  }, 500);  
}