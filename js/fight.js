function fight () {
    Game.clickCount = 0;
    //Attaquer
    attack();
    //Defendre
    //GameUI.buttonDefence.on('click', defend());

    
        
    
    
}

function switchTarget() {
    var target = (Game.currentPlayer == Game.player1) ? Game.player2 : Game.player1;
    Game.target = target;
}

function switchCurrentPlayer() {
    var currentPlayer = (Game.currentPlayer == Game.player1) ? Game.player2 : Game.player1;
    Game.currentPlayer = currentPlayer;
}

function attack () {
    var damage = Game.currentPlayer.weapon.damage * Game.currentPlayer.defence;  
    if (Game.target.sante > 0) {
        GameUI.buttonAttack.on('click', function() {
            Game.target.sante -= damage;
            console.log("Joueur actuel : ", Game.currentPlayer.characterName);
            console.log("santé de la cible ", Game.target.characterName, " = " , Game.target.sante);
            Game.clickCount++
            if (Game.clickCount > 0) {
                GameUI.textCurrentPlayer.text(Game.currentPlayer.characterName + GameMessages.yourTurn)
                console.log("attack changement joueur")
                switchCurrentPlayer();
                switchTarget();
                Game.clickCount = 0;
            }
            if (Game.target.sante <= 0) {
                var message = Game.currentPlayer.characterName + " a gagné !"
                GameUI.buttonAttack.hide()
                GameUI.buttonDefence.hide()
                console.log(message);
            }
            

        });
    }
    
}

function defend () {
    var currentPlayer = Game.currentPlayer;
    var target = getTarget();
}

