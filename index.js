'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let h1Content = '';
    const randomColor = ["purple", "green", "white", "blue", "orange", "red", "black", "yellow"];
    $('button').click(() => {
        $('h1').css("color", "yellow");
        console.log('color changed');
    });
    
    $('input').keypress((event) => {
        let randomNumber = Math.floor(Math.random() * randomColor.length);
        h1Content += `<em style="color: ${randomColor[randomNumber]};">${event.key}</em>`;
        $('h1').html(h1Content);

    });
    $('input').keydown((event) => {
        if (event.key === "Backspace") {
            h1Content = h1Content.slice(0, -1);
            $('h1').html(h1Content); 
        }
    })
    $("button").on("click", () => {
        $("h1").slideUp().slideDown().animate({opacity: 0.5});
    })

    console.log('Hello, papko!');

});