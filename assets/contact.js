//Get data
var send = document.querySelector(".btn");
var appContainerSection = document.querySelector("#app-container");


send.addEventListener("click", function(){
    appContainerSection.textContent= "Thank you for your message. Our Customer Success Team will get back to you as soon as possible.";
});


