document.addEventListener('DOMContentLoaded', () => {
    let gamePattern = [];
    let userClickedPattern = [];
    let level = {};
    let levelPlus = 2;
    let start = false;

    const buttonColours = ["red", "blue", "green", "yellow"];

    //анімація рандомної кнопки
    function animate(element){
        $(element).fadeOut(250).fadeIn(250);  
    }

    function startOver(){
        gamePattern = [];
        userClickedPattern = [];
        level.value = 1;
        levelPlus = 2;
    }

    function gameOver(){
        gamePattern = [];
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Кінець Гри, Натисніть будь-яку клавішу ");
        level.value = 1;
        setTimeout( () => {
          $("body").removeClass("game-over");
        }, 200);
        startOver();
        start = false;
        document.querySelector('.start-btn').style.display = 'inline-block'; 
    }

    //відігравання звуку кнопки
    function playSound(element){
        const sound = new Audio(`sounds/${element}.mp3`);
        sound.play();
    }
    
    //анімація клікнутої кнопки
    function animatePress(currentButtonElement){
        currentButtonElement.classList.add("pressed");

        setTimeout(() =>{
            currentButtonElement.classList.remove("pressed");
        }, 100);
    }

    function startingGame() {
        level.value = 1;
        $('h1').text(`Рівень ${level.value}`);
        currentColor = getRandomColor();
        animate(`#${currentColor}`);
        playSound(currentColor);
        if(gamePattern.length === 0) {
            gamePattern.push(currentColor);
        }
        start = true;
    }

    //рандомний колір
    function getRandomColor(){
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNumber];
        return randomChosenColour;
    }
    
    //todo complete checkAnswer
    function checkAnswer(currentLevel) {
        if( isPatternsEquals(userClickedPattern, gamePattern)){
                currentLevel.value += 1;
                $('h1').text(`Рівень ${currentLevel.value}`);
            
        }
        else{
            gameOver();
        }
    }
    

    function isPatternsEquals(userPattern, randomPattern){
        for (let index = 0; index < randomPattern.length; index++){
            if(userPattern[index] !== randomPattern[index]) {
                gameOver();
                return false;
            }
        }
        return true;
    }

    //коли клавішу натиснуто
    $(document).keypress(() => {   
        if(start === false)  {
            startingGame();
            document.querySelector('.start-btn').style.display = 'none';
        }
    });

    $(".start-btn").click(() => {
        if(start === false)  {
            document.querySelector('.start-btn').style.display = 'none';
            startingGame();
        }

    });
    
    //коли натиснуто кнопку мишкою
    $(".btn").click((event) => {
        if(gamePattern.length === 0){
            gameOver();
            nextSequence();
        }
        playSound(event.target.classList[1]);
        animatePress(event.target);
        
        
        if (event.target.id !== gamePattern[userClickedPattern.length]) {
            gameOver();
        } else {
            userClickedPattern.push(event.target.id);
        }
        if (start === true){
            if(userClickedPattern.length === gamePattern.length) {
                checkAnswer(level);
                nextSequence();
            }
        }

        console.log(`user pattern ${userClickedPattern}`);
        console.log(`game pattern ${gamePattern}`);
    });

    function nextSequence(){
        if( levelPlus === level.value){
            levelPlus +=1;
            userClickedPattern = [];
        if (level.value === 2) {
            currentColorFor2 = getRandomColor()
            gamePattern.push(currentColorFor2)
            setTimeout(() => {
                $('h1').text(`Рівень ${level.value}`);
                animate(`#${currentColorFor2}`);
                playSound(currentColorFor2);
            }, 1000);
        }
            
        if (level.value > 2) {
            setTimeout(() => {
                currentColor = getRandomColor();
                gamePattern.push(currentColor);
                $('h1').text(`Рівень ${level.value}`);
                animate(`#${currentColor}`);
                playSound(currentColor);
            }, 1000);
        }
        }


    }
});