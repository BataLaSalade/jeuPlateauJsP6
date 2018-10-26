// lancer de dé



$('#runGame').on('show.bs.modal', function (event) {
    var blueButton = $('#runBlueDice');
    var redButton = $('#runRedDice')
    var recipient = "PROUT";
    var modal = $(this);
    var clickCount = 0;
    var scoreDiceBluePlayer = 0;
    var scoreDiceRedPlayerRed = 0;
    console.log("RUN GAME");

    button.on('click', function(event){
        clickCount++;
        isEqual = false;
        console.log("lancer Dédé !");
        
        console.log("click count = " + clickCount);
        
       
    

        switch (clickCount) {
            case 1:
                scorePlayerBlue =  getRandomIndex (1, 6);
                console.log("scorePlayerBlue = " + scorePlayerBlue);
                break;
            case 2:
                scorePlayerRed = getRandomIndex (1, 6);
                console.log("scorePlayerRed = " + scorePlayerRed);
                button.hide()
                break;
            default:
                break;
        }
        
        console.log("*****");
        console.log("scorePlayerBlue = " + scorePlayerBlue)
        console.log("scorePlayerRed = " + scorePlayerRed);
    });
    
    
    modal.find('.modal-body').text('New message to ' + recipient);
    //modal.find('.modal-body input').val(recipient);
  })