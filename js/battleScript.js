//Author: Carmen van-Baumberghen Rodríguez
//Date: 4/11/2022
//Videojuego

//Create Music
//Battle music 
if(document.getElementById("finalBattle") == null){
    let audioBattle = new Audio('../other/knights-of-camelot-8038.mp3');
    audioBattle.play();
}else{
    let audioFinalBattle = new Audio('../other/a-song-of-wolves-and-dragons-8034.mp3');
    audioFinalBattle.play();
}//Fin Si



//Character Import from Storage
var characterImport = JSON.parse(sessionStorage.getItem('characterSaved'));
var characterJob;
var character;
if(sessionStorage.getItem('job')=="warrior"){
    character = new Warrior(characterImport.name,characterImport.pronouns);
    characterJob = "warrior";
}else if(sessionStorage.getItem('job')=="wizard"){
    character = new Wizard(characterImport.name,characterImport.pronouns);
    characterJob = "wizard";
}else{
    character = new Ranger(characterImport.name,characterImport.pronouns);
    characterJob = "ranger";
}//Fin Si
//Set the life just in case is has been changed in a battle before 
//Plus healing number that will change according to the character's life at the finished battle
character.setLife(characterImport.life+50);

//Create the Enemy
var enemy;
if(document.getElementById("enemyExamns") != null){
    enemy = new Enemy("Exámenes Finales");
} else if (document.getElementById("enemyTfg") != null){
    enemy = new Enemy("Trabajo Fin de Grado");
    enemy.setLife(100);
} else if (document.getElementById("enemyTfm") != null){
    enemy = new Enemy("Síndrome del Impostor");
    enemy.setLife(90);
} else {
    enemy = new Enemy("El Malvado Mago del JavaScript");
    enemy.setLife(110);
}//Fin Si




//Hide Final Messages 
document.getElementById("battleVictory").style.display = "none";
document.getElementById("battleLost").style.display = "none";


//Show stats and character images
document.getElementById("characterName").textContent = character.getName();
document.getElementById("characterLife").textContent = "Vida: "+character.getLife();
//Images
var img = document.createElement("img");
img.src = "../images/"+characterJob+".png";
var src = document.getElementById("characterImage");
src.appendChild(img);


document.getElementById("enemyName").textContent = enemy.getName();
document.getElementById("enemyLife").textContent = "Vida: "+enemy.getLife();

//Buttons
document.getElementById("specialAttack").disabled = true;
document.getElementById("attack").disabled = true;

//Hide battlemessage
document.getElementById("messageContainer").style.display = "none";


//FUNCTIONS
function rollDice(){
    characterDice = Math.floor(Math.random() * 6+1);
    //Save the dice
    var diceSaved = characterDice ;
    sessionStorage.setItem('diceSaved',diceSaved);
    //Show dice roll
    document.getElementById("dice").src = getDiceImg(characterDice);
    document.getElementById("dice").className = "dice";
    if (enemy.getLife() > 0){
        if (characterDice >=2 && characterDice <= 4){
            //Make attack button visible          
            document.getElementById("attack").disabled = false;
        }else if (characterDice == 1){
            //Fail message
            document.getElementById("battleMessage").style.display = "block";
            battleMessage("¡PIFIA! El ataque hará 1 punto de daño");
            //Make attack button visible          
            document.getElementById("attack").disabled = false; 
        }else if (characterDice == 5){
            if(character.getSlots()>0){
                //Quit 1 slot
                character.setSlots(character.getSlots()-1);
                //SpecialAttack message
                document.getElementById("battleMessage").style.display = "block";
                battleMessage("¡Has sacado un 5 en el dado! El ataque especial estará disponible");
                //Make specialAttack button visible 
                document.getElementById("specialAttack").disabled = false;
            }//Fin Si
            //If there are no more specialAttack Slots
            if(character.getSlots()<=0){
                document.getElementById("battleMessage").style.display = "block";
                battleMessage("Último uso del ataque especial");
            }//Fin Si
            //Make attack button visible          
            document.getElementById("attack").disabled = false; 
        }else{
            //Critical Hit
            document.getElementById("battleMessage").style.display = "block";
            battleMessage("¡Daño crítico!");
            //Make attack button visible          
            document.getElementById("attack").disabled = false; 
        }//Fin Si
    }//Fin Si
}//Fin rollDice




function attack(){
        //Import roll from Storage
        var diceSaved = sessionStorage.getItem('diceSaved');

        //Disable attack buttons again
        document.getElementById("attack").disabled = true;
        document.getElementById("specialAttack").disabled = true; 

        //Character Attack
        if (enemy.getLife() > 0){
            
            if (characterDice >=2 && characterDice <= 4){
                enemy.setLife(enemy.getLife()-character.getAttack());
            }else if (characterDice == 1){
                //Fail hit
                enemy.setLife(enemy.getLife()-1);      
            }else if (characterDice == 5){
                //SpecialAttack
                enemy.setLife(enemy.getLife()-character.getSpecialAttack());
            }else{
                //Critical Hit
                enemy.setLife(enemy.getLife()-character.getAttack()*2);        
            }//Fin Si

            //If player wins
            if(enemy.getLife() <= 0){
                //Mostrar mensaje SU vida ha llegado a 0
                document.getElementById("battleMessage").style.display = "block";
                battleMessage("LA VIDA DEL ENEMIGO HA LLEGADO A 0");
                //Save character in Storage
                sessionStorage.setItem('characterSaved',JSON.stringify(character.getJson()));
                //Next chapter
                battleVictory();
            }else{
                //Show new enemyLife
                document.getElementById("enemyLife").innerHTML = "Vida: "+enemy.getLife();
            }//Fin Si
        }//Fin Si

        //Enemy attack-reaction
        if(character.getLife() > 0){
            var enemyDps;
            var criticalHit = "";
            var failHit = "";
            //Enemy dice
            var enemyDice = Math.floor(Math.random() * 6+1);
            //Enemy attacks
            if (enemyDice >=2 && enemyDice <= 4){
                character.setLife(character.getLife()-enemy.getAttack());
                enemyDps=enemy.getAttack();
            }else if (enemyDice == 1){
                //Fail hit
                failHit = "¡Fallo crítico! "
                character.setLife(character.getLife()-1); 
                enemyDps=1; 
            }else if (enemyDice == 5){
                //Ataque Especial
                //mensaje ataque especial
                character.setLife(character.getLife()-enemy.getSpecialAttack());
                enemyDps=enemy.getSpecialAttack();
            }else{
                //Critical hit
                criticalHit = "¡Daño crítico! ";
                character.setLife(character.getLife()-enemy.getAttack()*2);
                enemyDps=enemy.getAttack()*2;
            }//Fin Si

            //Damage message
            battleHistory(failHit+criticalHit+"El enemigo te hace: "+enemyDps+" de daño");

            //If character dies
            if(character.getLife() <= 0){
                //Mostrar mensaje tu vida ha llegado a 0
                document.getElementById("battleMessage").style.display = "block";
                battleMessage("TUS PUNTOS DE VIDA HAN LLEGADO A 0");
                battleLost();
            }else{
                //Show new characterLife
                document.getElementById("characterLife").innerHTML = "Vida: "+character.getLife();
            }//Fin Si
        }//Fin Si
    }//Fin attack



function battleMessage(message){
    document.getElementById("messageContainer").style.display = "block";
    document.getElementById("battleMessage").innerHTML = message;
}
function closeBattleMessage(){
    //Hide battlemessage
    document.getElementById("messageContainer").style.display = "none";
}
function battleHistory(message){
    document.getElementById("battleHistory").innerHTML = message;
}

//Final Messages
function battleVictory(){
    //Hide Battle
    document.getElementById("showBattle").style.display = "none";
    //Show final message
    document.getElementById("battleVictory").style.display = "block";
}
function battleLost(){
    //Hide Battle
    document.getElementById("showBattle").style.display = "none";
    //Show final message
    document.getElementById("battleLost").style.display = "block";
}
function getDiceImg(diceValue){
    var nameImg;
    switch(diceValue){
        case 1:
            nameImg="../images/dice1.png";
            break;
        case 2:
            nameImg="../images/dice2.png";
            break;
        case 3:
            nameImg="../images/dice3.png";
            break;
        case 4:
            nameImg="../images/dice4.png";
            break;
        case 5:
            nameImg="../images/dice5.png";
            break;
        case 6:
            nameImg="../images/dice6.png";
        break;    
    }
    return nameImg;
}