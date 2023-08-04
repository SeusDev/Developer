function setColor(availability) {
  debugger
  let color;
  switch (availability) {
    case '1:  Mantenimiento':
      color = '#7f8c8d'
      break;

    case '2: Disponible':
      color = '#2ecc71'
      break;

    case '3: En limpieza':
      color = '#3498db'
      break;

    case '4: Reservado':
      color = '#e74c3c'
      break;

    /* case '5: Mantenimiento':
      color = '#7f8c8d'
      break;

    case '6: Pendiente':
      color = '#e67e22'//Pendiente
      break; */
    case 'undefined' :
      color = 'white'
      break; 
  }
  
  document.querySelector("#\\38 c8b9677-f6f7-498b-9b56-0e71642c222e").style.backgroundColor = color;
}try {   setTimeout(() => {
  debugger;
  const value = document.querySelector("#\\38 c8b9677-f6f7-498b-9b56-0e71642c222e").value
  setColor(value);
}, 100); } 
catch (error) { console.error("Error: " + error); isReadyForm(true);}