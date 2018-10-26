
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

var gameActionConstants = {
    blueButton = $('#runBlueDice'),
    redButton = $('#runRedDice'),
    instructionsParagraph = $('#instructions'),
    scoreBlueDiceParagraph = $('#scoreBlueDice'),
    scoreRedDiceParagraph = $('#scoreRedDice'),
    clickCount = 0,
    scoreDiceBluePlayer = 0,
    scoreDiceRedPlayerRed = 0
}