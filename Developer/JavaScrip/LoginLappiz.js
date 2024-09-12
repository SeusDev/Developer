debugger;

// ? ocultar logo

document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-4.pr-md-0 > div").style.display="none"

// ? Ajustar logo Superior

document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > a > img").style.width="75%";
document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > a > img").style.height="50%"
document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > a > img").style.marginTop="-10%";
document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > a > img").style.marginLeft="-14%"

// ? Cambiar valor texto correo

document.querySelector(
    "body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div:nth-child(1) > label"
  ).innerText = "Correo electrónico";
  
  // ? Cambiar valor texto contraseña 

  document.querySelector(
    "body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div:nth-child(2) > label"
  ).innerText = "Contraseña";
  
   // ?Cambiar valor texto botón login

  document.querySelector(
    "body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div.mt-3 > input.btn.btn-primary.mr-2.mb-2.mb-md-0.btn-login"
  ).value = "Iniciar sesión";

  // ? ajustar campo de credenciales

  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form").style.marginLeft="-52%"

  // ? ajustar cuadro de login
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div.mt-3 > input.btn.btn-primary.mr-2.mb-2.mb-md-0.btn-login").style.marginLeft="38%";
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div.mt-3 > input.btn.btn-primary.mr-2.mb-2.mb-md-0.btn-login").style.backgroundColor="red";
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div.mt-3 > input.btn.btn-primary.mr-2.mb-2.mb-md-0.btn-login").style.border="black";
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div.mt-3 > input.btn.btn-primary.mr-2.mb-2.mb-md-0.btn-login").style.color="white";
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > div > img").style.marginLeft="-50%";
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > div > div").style.marginLeft="-50%";

  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > a").style.marginLeft="35%";

  //? ajustar boton siguiente
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div.mt-3 > input:nth-child(4)").style.marginLeft='13%'

  //? alinear boton inicio sesion
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div.mt-3 > input:nth-child(2)").style.marginLeft='0'

  //? alinear botones inicio sesion y cancelar
  document.querySelector("body > app-root > app-auth > app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > form > div.mt-3").style.marginLeft='30%'