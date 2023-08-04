function ajaxQuerySendEmail(email, asunto, text, body) {
    let data
    let newquery = {
        "to": email,
        "subject": asunto,
        "text": text,
        "parameters": {
            "aType": "sendMail",
            "environment": backandGlobal.environment
        },
        "html": body
    }
    $.ajax({
        async: false,
        url: `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/utiles/SendEmail`,
        type: 'POST',
        data: JSON.stringify(newquery),
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', localStorage.Authorization);
        },
        success: function(result) {
            data = result
        },
        error: function(error) {
            console.log(error)
        }
    })
    return data
}