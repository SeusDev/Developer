var token = localStorage.Authorization.split(' ')[1]
var myDate = new Date()
myDate.setMonth(myDate.getMonth() + 12)
//Obtener Cookie
document.cookie = "LappizToken" + "=" + token + ";exprieres=" + myDate