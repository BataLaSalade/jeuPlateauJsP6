function fight () {
    var currentPlayer = Game.currentPlayer;
    var target = getTarget();
    
        //Attaquer
        GameUI.buttonAttack.on('click', attack());
        //Defendre
        GameUI.buttonDefence.on('click', defend());

    if (target.sante <=0) {
        var message = currentPlayer.name + " a gagné !"
    }
    
}

function getTarget() {
    var target = (Game.currentPlayer == Game.player1) ? Game.player2 : Game.player1;
    Game.target = target;
    return target;
}

function attack () {
    var currentPlayer = Game.currentPlayer;
    var target = getTarget();
    var damage = currentPlayer.weapon.damage * currentPlayer.defence;
    while (currentPlayer.sante>0 && target.sante>0) {
        
        target.sante = target.sante - damage;
        Game.target.sante = target.sante;
        console.log("Joueur actuel : ", currentPlayer.name);
        console.log("santé de la cible = ", target.sante);
    }
    
}

function defend () {
    var currentPlayer = Game.currentPlayer;
    var target = getTarget();
}