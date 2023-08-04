var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];
console.log(idVista);
if (idVista == "936e897d-460b-468f-b28a-84061a4e760f") {
    debugger;
    setTimeout(() => {
        debugger;

        // Token servidor reportes
        var cookieName = 'LappizToken';

        var cookieValue = 'FphKCawftbH3P1arJJOF6JWtGe8FRr3OGR6fp3PpZpGeA9TaEPep4fXhgBoiSj2svMeDDtc1zEkE5W5wIDld9zOeKapfIAha-CYkyYGmdcCnd8OSxUUbnVtqGsUGPgecxfBALPxnrsXFXY6aEpjoWULz6inlRXPDVsnsrnqSbKDXssaUcY0nF_5FE7cnQJFyXbBk15-ETMtlPS71Y1ThEif92Cq7K9eRaDNZyp9UTWOvV9NDxYAuhzlWGQjfxXn9dpV387TEI1XigI4V8lo2pGeyUWKcVZ-767WElxHrai-SUt5fJdZ2VLg1A5ETgG56bHC0gXJFhETtRWmA0K-UuL1epjEYQ77lLHe7ZVInxZYj3Hbxv8S_ZUVgSugM8J1Wm_QLrwGx_nU3Xt054P7ihc9syO1tps1N1uHvQYTpmZYoVkjmeSJTeiLTDoUeB2tu_K92MiKfdrUwXdnM9DatJwj2H6mUdE4ZshZTS_pGrLq0hUxGCroGzBLFVwVMqyYjsdARig1dbTzWxD9MGiKBwg'
    
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() + 12);
        document.cookie = cookieName + "=" + cookieValue + ";expires=" + myDate + ";domain=.lappiz.io;path=/";
    
        
    }, 1000);
} else {
    // Si el idVista no es igual al valor especificado, se ejecuta este bloque de código
    console.log("La página actual no es la página que estás buscando.");
}