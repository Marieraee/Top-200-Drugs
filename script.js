let selectedSet = "";
let direction = "brandToGeneric";

let currentDrugs = [];
let currentDrug = null;

let options = [];

let score = 0;
let questionNumber = 0;





// SELECT DRUG SET

function selectSet(setName, button){

    selectedSet = setName;


    document.querySelectorAll(".setButton")
    .forEach(btn=>{
        btn.classList.remove("selected");
    });


    button.classList.add("selected");

}





// SELECT DIRECTION

function selectDirection(choice, button){

    direction = choice;


    document.querySelectorAll(".directionButton")
    .forEach(btn=>{
        btn.classList.remove("selected");
    });


    button.classList.add("selected");

}





// START GAME

function startGame(){


    if(!selectedSet){

        alert("Please select a drug set!");

        return;

    }



    currentDrugs = [...drugSets[selectedSet]];


    shuffle(currentDrugs);



    score = 0;

    questionNumber = 0;



    document.getElementById("menu")
    .style.display="none";


    document.getElementById("game")
    .style.display="flex";



    document.getElementById("score")
    .innerText="Score: 0";



    nextQuestion();

}







// NEXT QUESTION

function nextQuestion(){


    if(questionNumber >= currentDrugs.length){

        endGame();

        return;

    }



    currentDrug =
    currentDrugs[questionNumber];


    questionNumber++;



    if(direction==="brandToGeneric"){

        document.getElementById("question")
        .innerText=currentDrug.brand;

    }


    else{


        document.getElementById("question")
        .innerText=currentDrug.generic;


    }



    createOptions();


}









// CREATE ANSWERS

function createOptions(){


    options=[];



    let correctAnswer =
    direction==="brandToGeneric"
    ?
    currentDrug.generic
    :
    currentDrug.brand;



    options.push(correctAnswer);




    while(options.length < 20){


        let randomDrug =
        currentDrugs[
        Math.floor(Math.random()*currentDrugs.length)
        ];



        let choice =
        direction==="brandToGeneric"
        ?
        randomDrug.generic
        :
        randomDrug.brand;




        if(!options.includes(choice)){

            options.push(choice);

        }

    }





    shuffle(options);



    let container =
    document.getElementById("answers");



    container.innerHTML="";





    options.forEach(option=>{


        let button =
        document.createElement("button");



        button.className="answerButton";



        button.innerText=option;



        button.onclick=function(){

            checkAnswer(button,option);

        };



        container.appendChild(button);



    });


}









// CHECK ANSWER

function checkAnswer(button,answer){



    let correctAnswer =
    direction==="brandToGeneric"
    ?
    currentDrug.generic
    :
    currentDrug.brand;




    if(answer===correctAnswer){



        button.classList.add("correct");



        score++;



        document.getElementById("score")
        .innerText="Score: "+score;




        showCorrectPopup();


    }



    else{


        button.classList.add("wrong");


        button.disabled=true;


    }


}









// SHOW POPUP

function showCorrectPopup(){

    document.getElementById("correctPopup")
    .style.display="flex";


    let answer;
    let alsoKnown;


    if(direction==="brandToGeneric"){

        answer = currentDrug.generic;

        alsoKnown = currentDrug.brand;

    }


    else{

        answer = currentDrug.brand;

        alsoKnown = currentDrug.generic;

    }



    document.getElementById("correctAnswer")
    .innerText = answer;



    document.getElementById("genericAnswer")
    .innerText = alsoKnown;


}







// CONTINUE BUTTON

function continueGame(){


    document.getElementById("correctPopup")
    .style.display="none";



    nextQuestion();


}









// END GAME

function endGame(){


    alert(
    "Finished! Score: "
    +
    score
    +
    "/"
    +
    currentDrugs.length
    );


    location.reload();


}









// SHUFFLE

function shuffle(array){


    for(let i=array.length-1;i>0;i--){


        let j=Math.floor(Math.random()*(i+1));


        [array[i],array[j]]
        =
        [array[j],array[i]];


    }


}