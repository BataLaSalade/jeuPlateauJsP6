var $weapon = $("<div />", {
    class : "weapon"
});

var Weapon = {
    init : function (position, name, damage) {
        this.name = name;
        this.position = position;
        this.damage = damage;
    }
};

var weaponNames = ["Pelle", "Pioche", "Hache", "Rateau"];

function genListWeapon(nbWeapons, colMaxIndex, rowMaxIndex) {
    var listWeapons = [];
    var damage = 10;
    for (var j = 0; j < nbWeapons; j++) {
        var tmpPosition = checkPosition(colMaxIndex, rowMaxIndex);
        var currentWeapon = Object.create(Weapon);
        damage += 5;
        currentWeapon.init(tmpPosition, weaponNames[j], damage);
        listWeapons.push(currentWeapon);
    }
    return listWeapons;
 }