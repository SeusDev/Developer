setTimeout(() => {
   
    $('.txtSMS').ready(() => {
    
        let Texto = document.getElementById('9da65af6-1f31-4444-9055-44a0f803be90')
        Texto.addEventListener('input',function (e) {
            debugger;
            let valor= e.target.value;
            let cardtext = document.querySelectorAll('.txtSMS')
                
            cardtext.forEach(element => {
                let card = element
                card.textContent=valor
            });
                
        })
    })
    
}, 60);