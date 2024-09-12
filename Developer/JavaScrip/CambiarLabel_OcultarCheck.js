

$('label:contains(CheckEjecutanteAutori)')[1].innerHTML=$('label:contains(CheckEjecutanteAutori)')[1].innerHTML.replace('CheckEjecutanteAutori','El Ejecutante declara que ha revisado todos los aspectos y parámetros operacionales, y estos se cumplen a cabalidad acorde a la ley, los procedimientos emitidos por la compañía para la autorización.')

$('label:contains(CheckSupervisorAutori)')[1].innerHTML=$('label:contains(CheckSupervisorAutori)')[1].innerHTML.replace('CheckSupervisorAutori','El supervisor declara que ha revisado todos los aspectos y parámetros operacionales, y estos se cumplen a cabalidad acorde a la ley, los procedimientos emitidos por la compañía para la autorización.')

$('label:contains(CheckAutoridadAutori)')[1].innerHTML=$('label:contains(CheckAutoridadAutori)')[1].innerHTML.replace('CheckAutoridadAutori','Autoridad de área declara que ha revisado todos los aspectos y parámetros operacionales, y estos se cumplen a cabalidad acorde a la ley, los procedimientos emitidos por la compañía para la autorización.')

$('label:contains(CheckProfesionAutori)')[1].innerHTML=$('label:contains(CheckProfesionAutori)')[1].innerHTML.replace('CheckProfesionAutori','El profesional declara que ha revisado todos los aspectos y parámetros operacionales, y estos se cumplen a cabalidad acorde a la ley, los procedimientos emitidos por la compañía para la autorización.')



$('label:contains(CheckEjecutanteCierre)')[1].innerHTML=$('label:contains(CheckEjecutanteCierre)')[1].innerHTML.replace('CheckEjecutanteCierre','El Ejecutante declara que ha revisado todos los aspectos y parámetros operacionales, y estos se cumplen a cabalidad acorde a la ley, los procedimientos emitidos por la compañía para el cierre.')

$('label:contains(CheckSupervisorCierre)')[1].innerHTML=$('label:contains(CheckSupervisorCierre)')[1].innerHTML.replace('CheckSupervisorCierre','El supervisor declara que ha revisado todos los aspectos y parámetros operacionales, y estos se cumplen a cabalidad acorde a la ley, los procedimientos emitidos por la compañía para el cierre.')

$('label:contains(CheckAutoridadCierre)')[1].innerHTML=$('label:contains(CheckAutoridadCierre)')[1].innerHTML.replace('CheckAutoridadCierre','Autoridad de área declara que ha revisado todos los aspectos y parámetros operacionales, y estos se cumplen a cabalidad acorde a la ley, los procedimientos emitidos por la compañía para el cierre.')

$('label:contains(CheckProfesionCierre)')[1].innerHTML=$('label:contains(CheckProfesionCierre)')[1].innerHTML.replace('CheckProfesionCierre','El profesional declara que ha revisado todos los aspectos y parámetros operacionales, y estos se cumplen a cabalidad acorde a la ley, los procedimientos emitidos por la compañía para el cierre.')



$('label:contains(CheckEjecutanteAutori)').parent().hide() 
$('label:contains(CheckSupervisorAutori)').parent().hide() 
$('label:contains(CheckAutoridadAutori)').parent().hide() 
$('label:contains(CheckProfesionAutori)').parent().hide() 

$('label:contains(CheckEjecutanteCierre)').parent().hide() 
$('label:contains(CheckSupervisorCierre)').parent().hide() 
$('label:contains(CheckAutoridadCierre)').parent().hide() 
$('label:contains(CheckProfesionCierre)').parent().hide() 



$('label:contains(CheckEjecutanteCierre)')[1].children[0].disabled=true
$('label:contains(CheckSupervisorCierre)')[1].children[0].disabled=true
$('label:contains(CheckAutoridadCierre)')[1].children[0].disabled=true
$('label:contains(CheckProfesionCierre)')[1].children[0].disabled=true

$('label:contains(CheckEjecutanteAutori)')[1].children[0].disabled=true
$('label:contains(CheckSupervisorAutor)')[1].children[0].disabled=true
$('label:contains(CheckAutoridadAutori)')[1].children[0].disabled=true
$('label:contains(CheckProfesionAutori)')[1].children[0].disabled=true