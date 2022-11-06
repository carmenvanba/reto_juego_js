//Author: Carmen van-Baumberghen Rodríguez
//Date: 4/11/2022
//Videojuego


//Character Import from Storage
var characterImport = JSON.parse(sessionStorage.getItem('characterSaved'));
var characterJob;
if(sessionStorage.getItem('job')=="warrior"){
    var character = new Warrior(characterImport.name,characterImport.pronouns);
    characterJob = "warrior";
}else if(sessionStorage.getItem('job')=="wizard"){
    var character = new Wizard(characterImport.name,characterImport.pronouns);
    characterJob = "wizard";
}else{
    var character = new Ranger(characterImport.name,characterImport.pronouns);
    characterJob = "ranger";
}//Fin Si
var character = new Warrior(characterImport.name,characterImport.pronouns);
//Set the life just in case is has been changed in a battle before 
//Plus healing number that will change according to the character's life at the finished battle
character.setLife(characterImport.life+50);

//Create the Enemy
var enemy = new Enemy("Exámenes Finales");

//Show stats and character images
document.getElementById("characterName").textContent = character.getName();
document.getElementById("characterLife").textContent = "Vida: "+character.getLife();
var img = document.createElement("img");
img.src = "/images/"+characterJob+".png";
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
    document.getElementById("dado").textContent=characterDice;
    if (enemy.getLife() > 0){
        if (characterDice >=2 && characterDice <= 4){
            //Make attack button visible          
            document.getElementById("attack").disabled = false;
        }else if (characterDice == 1){
            //MENSAJE DE PIFIA el ataque solo hará 1 de daño
            document.getElementById("battleMessage").style.display = "block";
            battleMessage("¡PIFIA!");
            //Make attack button visible          
            document.getElementById("attack").disabled = false; 
        }else if (characterDice == 5){
            //MENSAJE DE ATAQUE ESPECIAL
            //Make specialAttack button visible 
            document.getElementById("specialAttack").disabled = false;
            //Make attack button visible          
            document.getElementById("attack").disabled = false; 
        }else{
            //MENSAJE DE ATAQUE CRITICO
            //Critical Hit
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
                //Save character in Storage
                sessionStorage.setItem('characterSaved',JSON.stringify(character.getJson()));
                //Next chapter
                //window.location.replace("/html/SIGUIENTE NIVEL.html");
            }else{
                //Show new enemyLife
                document.getElementById("enemyLife").innerHTML = "Vida: "+enemy.getLife();
            }//Fin Si
        }//Fin Si

        //Enemy attack-reaction
        if(character.getLife() > 0){
            //Enemy dice
            var enemyDice = Math.floor(Math.random() * 6+1);
            //Enemy attacks
            if (enemyDice >=2 && enemyDice <= 4){
                character.setLife(character.getLife()-enemy.getAttack());
            }else if (enemyDice == 1){
                //Fail hit
                //mensaje fallo
                character.setLife(character.getLife()-1);  
            }else if (enemyDice == 5){
                //Ataque Especial
                //mensaje ataque especial
                character.setLife(character.getLife()-enemy.getSpecialAttack());
            }else{
                //Critical hit  
                //mensaje critico
                character.setLife(character.getLife()-enemy.getAttack()*2);
            }//Fin Si

            //If character dies
            if(character.getLife <= 0){
                //Mostrar mensaje tu vida ha llegado a 0
                //window.location.replace("/html/PANTALLA DE PERDER.html");
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