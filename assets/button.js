//contact form button
var send = document.querySelector(".btn");
var appContainerSection = document.querySelector("#app-container");


send.addEventListener("click", function(){
    appContainerSection.textContent= "Thank you for your message. Our Customer Success Team will get back to you as soon as possible.";
});

//scrollbutton
const scrollBtn = document.querySelector('.scroll-btn');

    scrollBtn.addEventListener("click", function () {
   //used plain js 
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
});


