var $player = $("<div />", {
    class : "player"
});

var characterNames = ["Chevalier Bleu", "Chevalier Rouge"];
var playerListUrl = [
    ["./img/png/BlueCharacter_epeeBois.png", "./img/png/BlueCharacter_arc.png", "./img/png/BlueCharacter_baton.png", "./img/png/BlueCharacter_epee.png", "./img/png/BlueCharacter_lance.png"],
    ["./img/png/RedCharacter_epeeBois.png", "./img/png/RedCharacter_arc.png", "./img/png/RedCharacter_baton.png", "./img/png/RedCharacter_epee.png",  "./img/png/RedCharacter_lance.png"]
];

var playerEnum = {
    blue : 0,
    red : 1
}

var bluePlayerImageWeapon = {
    woodenSword : "./img/png/BlueCharacter_epeeBois.png",
    staff : "./img/png/BlueCharacter_baton.png",
    bow : "./img/png/BlueCharacter_arc.png",
    sword : "./img/png/BlueCharacter_epee.png",
    spear : "./img/png/BlueCharacter_lance.png"
}

var redPlayerImageWeapon = {
    woodenSword : "./img/png/RedCharacter_epeeBois.png",
    staff : "./img/png/RedCharacter_baton.png",
    bow : "./img/png/RedCharacter_arc.png",
    sword : "./img/png/RedCharacter_epee.png",
    spear : "./img/png/RedCharacter_lance.png"
}
    
var weaponIdEnum = {
    woodenSword : 0,
    staff : 1,
    bow : 2,
    sword : 3,
    spear : 4
}

var weaponUrlEnum = {
    woodenSword : "./img/png/weapon_epeeBois.png",
    staff : "./img/png/weapon_baton.png",
    bow : "./img/png/weapon_arc.png",
    sword : "./img/png/weapon_epee.png",
    spear : "./img/png/weapon_lance.png"
}

var GameUI = {
    modalRunDice : $('#runGame'),
    buttonOpenModalRunDice : $('#runDiceModal'),
    buttonRunBlueDice : $('#runBlueDice'),
    buttonRunRedDice : $('#runRedDice'),
    buttonReady : $('#ready'),
    textModalRunDiceInstructions : $('#instructions'),
    textScoreBlueDice : $('#scoreBlueDice'),
    textScoreRedDice : $('#scoreRedDice')
}

var GameMessages = {
    bluePlayerScoreAdvert : "Score Joueur Bleu : ",
    redPlayerScoreAdvert : "Score Joueur Rouge : ",
    playersScoreEquals : "EGALITE ! Joueur Rouge : Relance le dé",
    bluePlayerBegin : "Le joueur Bleu commence, Bravo !",
    redPlayerBegin : "Le joueur Rouge commence, Bravo !"
}

var Scores = {
    bluePlayerDice : 0,
    redPlayerDice : 0
}
