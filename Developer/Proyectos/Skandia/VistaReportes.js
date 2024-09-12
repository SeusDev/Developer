/* VistaReportes */
setInterval(() => {
    if (window.location.href.includes('e34ee7bb-1142-4350-bc6e-13a81280b653')) {
        $('#ngb-nav-1').hide()
        $('body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul').hide()
        var width = $(window).width();
        if(width <= 500){
            toastr.warning(`${width}`, 'Atención')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-7%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-14%','margin-left':'-1%','height':'110px','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-25% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 600){
            $('.img-fluid').removeAttr('style')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-7%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-13%','margin-left':'-1%','height':'130px','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".img-fluid").css('max-width','100%');
            $(".container-main").css ('margin','-20% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 700){
            toastr.warning(`${width}`, 'Atención')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-7%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-11%','margin-left':'-8%','height':'130px','max-width':'115%','margin-top':'18%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-19% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 800){
            toastr.warning(`${width}`, 'Atención')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-6%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-9%','margin-left':'0%','height':'135px','max-width':'100%','margin-top':'18%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-17% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 900){
            toastr.warning(`${width}`, 'Atención')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-9%','margin-left':'-6%','height':'auto','max-width':'110%','margin-top':'18%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }
        else if(width <= 1000){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '20%', "display": 'flex', "margin-left": '40%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 1000){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '20%', "display": 'flex', "margin-left": '40%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 1100){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '13%', "display": 'flex', "margin-left": '43%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 1200){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '10%', "display": 'flex', "margin-left": '44%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 1300){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-14% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".container-main").css ('margin-top','30%');
            $(".card").css ('width','85%');
        }else{
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','-2%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','0%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','30% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','80%');
        }
        $(window).resize(function () {
        debugger; 
        var width = $(window).width();
        if(width <= 500){
            toastr.warning(`${width}`, 'Atención')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-7%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-14%','margin-left':'-1%','height':'110px','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-25% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 600){
            $('.img-fluid').removeAttr('style')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-7%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-13%','margin-left':'-1%','height':'130px','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".img-fluid").css('max-width','100%');
            $(".container-main").css ('margin','-20% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 700){
            toastr.warning(`${width}`, 'Atención')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-7%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-11%','margin-left':'-8%','height':'130px','max-width':'115%','margin-top':'18%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-19% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 800){
            toastr.warning(`${width}`, 'Atención')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-6%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-9%','margin-left':'0%','height':'135px','max-width':'100%','margin-top':'18%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-17% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 900){
            toastr.warning(`${width}`, 'Atención')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'-9%','margin-left':'-6%','height':'auto','max-width':'110%','margin-top':'18%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }
        else if(width <= 1000){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '20%', "display": 'flex', "margin-left": '40%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 1000){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '20%', "display": 'flex', "margin-left": '40%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 1100){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '13%', "display": 'flex', "margin-left": '43%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 1200){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '10%', "display": 'flex', "margin-left": '44%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-16% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','100%');
        }else if(width <= 1300){
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','5%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','-3%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','-14% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".container-main").css ('margin-top','30%');
            $(".card").css ('width','85%');
        }else{
            toastr.warning(`${width}`, 'Atención')
            $("#ngb-nav-0-panel").css('margin-top','-2%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form").css('margin-top','0%')
            $("#SectionsFields > div > div > div > app-html-content > div.container-main").css('margin-top','-29%')
            $("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div > div.container > img").css({'margin-top':'18%','margin-left':'0%','height':'auto','max-width':'100%'})
            $("#SectionsFields > div > div > div > app-html-content > div.container-main > div > div:nth-child(1)").css('margin-top','-65%')
            var nuevoCSS = { "vertical-align": 'middle', "border-style": 'none', "max-width": '30%', "display": 'flex', "margin-left": '35%' };
            $(".1").css(nuevoCSS);
            $(".2").css(nuevoCSS);
            $(".3").css(nuevoCSS);
            $(".4").css(nuevoCSS);
            $(".container-main").css ('margin','30% auto 0px');
            $(".container-main").css ('padding','6%');
            $(".card").css ('width','80%');
        }
     })
    }    
},1500);