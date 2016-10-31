// Type of ship                                                                                                         Size  Number per player
// battleship (Russian: линкор)/four-decker (Russian: четырёхпалубник)/four-funnel (Russian: четырёхтрубный)             4     1
// cruiser (Russian: крейсер)/three-decker (Russian: трёхпалубник)/three-funnel (Russian: трёхтрубный)                   3     2
// destroyer (Russian: эсминец)/two-decker (Russian: двухпалубник)/two-funnel (Russian: двухтрубный)                     2     3
// submarine (Russian: подводная лодка)/single-decker (Russian: однопалубник)/single-funnel (Russian: однотрубный)       1     4

var id = 1;
function Ship(type){
  this.id = id;
  id++;
  this.sunk = false;
  this.type = type;
  this.damage = 0;
  this.getName = function(){
    switch(this.type){
      case 1:
        return "Submarine";
      case 2:
        return "Destroyer";
      case 3:
        return "Cruiser";
      case 4:
        return "Battleship";
      default:
        return "Unknown";
    }
  }
  this.getHit = function(){
    this.damage++;
    if(this.damage == this.type)
      this.sunk = true;
  }
}

module.exports = Ship;