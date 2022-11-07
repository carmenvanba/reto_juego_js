//Classes
//Warrior character
function Warrior(name,pronouns){
    //Atributes
    this.job = "warrior";
    this.name = name;
    this.pronouns = pronouns;
    this.life = 150;
    this.maxLife = 100;
    this.attack = 10;
    this.specialAttack = 25;
    this.slots = 2;

    //Methods
    //Getters
    this.getJob = function() {
        return this.job;
    }
    this.getName = function() {
        return this.name;
    }
    this.getLife = function() {
        return this.life;
    }
    this.getAttack = function() {
        return this.attack;
    }
    this.getSpecialAttack = function() {
        return this.specialAttack;
    }
    this.getSlots = function() {
        return this.slots;
    }
    this.getJson = function(){
        var characterJson = {
            name: this.name,
            pronouns: this.pronouns,
            life: this.life,
        }//Fin Json
        return characterJson;
    }

    //Setters
    this.setLife = function(life) {
        this.life = life;
        if(this.life <0){
            this.life =0;
        }//Fin Si
        if(this.life >= this.maxLife){
            this.life = this.maxLife;
        }//Fin Si
    }
    this.setSlots = function(slots) {
        this.slots = slots;
    }
}//Fin Guerrero


//Second classes, inherited from Warrior
//Wizard character
function Wizard(name,pronouns){
    Warrior.call(this,name,pronouns);
    this.job = "wizard";
    this.life = 75;
    this.maxLife = 65;
    this.attack = 5;
    this.specialAttack = 35;
    this.slots = 5;
}//Fin Wizard

//Ranger character
function Ranger(name,pronouns){
    Warrior.call(this,name,pronouns);
    this.job = "ranger";
    this.life = 90;
    this.maxLife = 80;
    this.attack = 7;
    this.specialAttack = 40;
    this.slots = 1;
}//Fin Ranger

//Enemies, inheried from Warrior
function Enemy(name){
    Warrior.call(this,name);
    this.life = 100;
    this.attack = 5;
    this.specialAttack = 15;
    this.slots = 1;
    //Setters
    this.setLife = function(life) {
        this.life = life;
    }
}//Fin Enemy