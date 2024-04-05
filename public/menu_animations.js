var menu = document.querySelector(".menu")
var bttMenu = document.querySelector(".bttMenu")
var barrasMenu = document.querySelectorAll(".barra-menu")
var navPage = document.querySelector(".NavPage1")


function OpenMenu(){
    var widthScreen = window.innerWidth
    if(widthScreen > 560 ){
        menu.style.boxShadow = "0x 0px 10px 5px white"
        menu.style.width = "400px"
        menu.style.transition = "0.5s"
    }if(widthScreen <= 300){
        menu.style.width = "150px"
        menu.style.transition = "0.5s"
    }else if(widthScreen > 300 && widthScreen <= 560){
        menu.style.width = "250px"
        menu.style.transition = "0.5s"
    }

    barrasMenu[0].style.rotate = "45deg"
    barrasMenu[0].style.marginTop = "5px"
    barrasMenu[0].style.transition = "0.2s"
    barrasMenu[1].style.display = "none"
    barrasMenu[2].style.rotate = "-45deg"
    barrasMenu[2].style.marginTop = "-8px"
    barrasMenu[2].style.transition = "0.2s"

    navPage.classList.toggle("NavPage1")
    navPage.classList.toggle("NavPage2")

    bttMenu.removeEventListener("click", OpenMenu)
    bttMenu.addEventListener("click", CloseMenu)
    function CloseMenu(){
        menu.style.width = "0px"
        menu.style.transition = "0.5s"

        barrasMenu[0].style.rotate = "0deg"
        barrasMenu[0].style.marginTop = "0px"
        barrasMenu[0].style.transition = "0.2s"
        barrasMenu[1].style.display = "block"
        barrasMenu[2].style.rotate = "0deg"
        barrasMenu[2].style.marginTop = "0px"
        barrasMenu[2].style.transition = "0.2s"
        
        navPage.classList.toggle("NavPage1")
        navPage.classList.toggle("NavPage2")

        bttMenu.removeEventListener("click", CloseMenu)
        bttMenu.addEventListener("click", OpenMenu)
    }
    
}
bttMenu.addEventListener("click", OpenMenu)