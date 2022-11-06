//Author: Carmen van-Baumberghen Rodríguez
//Date: 4/11/2022
//Videojuego

//Index Code
document.getElementById("formulary").style.display = "none";
document.getElementById("intro").style.display = "none";
document.getElementById("story01").style.display = "none";

//Create music
/*
let audioIntro = new Audio('other/i-am-dreaming-or-final-fantasy-menu-kinda-thing-29173.mp3');
audioIntro.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

let audioStory = new Audio('other/rpg-city-8381.mp3');
audioIntro.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);


audioIntro.play();*/
//Play the game
function play(){
    //audioIntro.pause();
    //audioStory.play();
    document.getElementById("title").style.display = "none";
    document.getElementById("intro").style.display = "block";
}//Fin play

//Show the formulary
function showForm(){
    document.getElementById("intro").style.display = "none";
    document.getElementById("formulary").style.display = "block";
}//Fin showform


//Next html options
function examBattle(){
    window.location.replace("html/examenes.html");
}//Fin tfgBattle
function tfgBattle(){
    window.location.replace("html/tfg.html");
}//Fin tfgBattle


//Validation
function validation(){
    var validated = true;
    //Iterate to clean error msgs in inputs
    Array.from(document.getElementsByClassName("error"))
    //Parameters: id error, indice, elementos clase error
    .forEach(function(element, index, array) {
        resetError(element, index, array)
    });
    //Fin ForEach

    //Validate
    if(document.getElementById("characterName").value.length==0){
        document.getElementById("errorName").textContent="El nombre está vacío.";
        validated = false;
    }//Fin Si

    //Validate Pronouns
    if(document.getElementById("ella").checked == false && document.getElementById("el").checked == false && document.getElementById("elle").checked == false){
        document.getElementById("errorPronouns").textContent="Debes seleccionar los pronombres.";
        validated = false;
    }//Fin Si

    //Validate Class
    if(document.getElementById("warrior").checked == false && document.getElementById("wizard").checked == false && document.getElementById("ranger").checked == false){
        document.getElementById("errorCharacterClass").textContent="Debes elegir una clase.";
        validated = false;
    }//Fin Si

    //Delete error msgs
    function resetError(element, index, array) {
        element.textContent="";
    }//Fin Funcion resetError

    if(validated){
        var name = document.getElementById("characterName").value;
        var pronouns;
        if(document.getElementById("ella").checked == true){
            pronouns="ella";
        }else if(document.getElementById("elle").checked == true){
            pronouns="elle";
        }else{
            pronouns="el";
        }//Fin Si

        //Create the character using the class
        var character;
        var job;
        if(document.getElementById("warrior").checked == true){
            character = new Warrior(name, pronouns);
            job = "warrior";
        }else if(document.getElementById("wizard").checked == true){
            character = new Wizard(name, pronouns);
            job = "wizard";
        }else{
            character = new Ranger(name, pronouns);
            job = "ranger";
        }//Fin Si

        //Save the object in Storage
        sessionStorage.setItem('characterSaved',JSON.stringify(character.getJson()));
        sessionStorage.setItem('job',job);
 
        //Hide form and show story part 1
        document.getElementById("formulary").style.display = "none";
        document.getElementById("story01").style.display = "block";
    }//Fin Si
}//Fin validation