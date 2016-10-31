var Ship = require("./Ship");

var SHIP_TYPES = {
  1: 1, 
  2: 2,
  3: 3,
  4: 4
};

function Player(){
  this.board = [];
  this.shipNumber = 0;
  this.lost = false;
  this.totalShips = 10;
  this.moves = {};
  // Inititate the board
  this.initBoard(this.totalShips);
}
var randomNumber = function(min, max){
  if(max == undefined){
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * max) + min;
}
Player.prototype.checkPlaces = function(x, y, move, direction){
  var startX = x, startY = y, type = move;
  while(move > 0){
    if(y < 0 || y >= this.board.length || x < 0 || x >= this.board[y].length)
      return false;
    if(this.board[x][y] != null)
      return false;
    if(direction == 0){
      y--;
    } else if(direction == 1){
      x++;
    } else if(direction == 2){
      y++;
    } else {
      x--;
    }
    move--;
  }
  var ship = new Ship(type);
  this.shipNumber++;
  while(startX != x || startY != y){
    this.board[startX][startY] = ship;
    if(direction == 0){
      startY--;
    } else if(direction == 1){
      startX++;
    } else if(direction == 2){
      startY++;
    } else {
      startX--;
    }
  }
  return true;
}
Player.prototype.placeShip = function(type, number){
  while(number > 0){
    var yPos = randomNumber(this.board.length);
    var xPos = randomNumber(this.board[yPos].length);
    var direction = randomNumber(4);
    if(this.checkPlaces(xPos, yPos, type, direction))
      number--;
  }
}
Player.prototype.initBoard = function(size) {
  for(var i=0; i<size; i++){
    this.board[i] = [];
    for(var j=0; j<size; j++){
      this.board[i][j] = null;
    }
  }
  this.placeShip(4, 1); // Battleship * 1
  this.placeShip(3, 2); // Cruiser * 2
  this.placeShip(2, 3); // Destroyer * 3
  this.placeShip(1, 4); // Submarine * 4
  for(var i=0; i<size; i++){
    for(var j=0; j<size; j++){
      if(this.board[i][j] != null){
        console.log(j + ", " + i);
      }
    }
  }
  console.log("\n");
};
// Result, 0: MISS, 1: HIT, 2: SUNK
Player.prototype.hit = function(x, y){
  if(x < 0 || y < 0 || x >= this.board.length || y >= this.board[x].length || this.board[x][y] === null)
    return 0;
  var ship = this.board[x][y];
  ship.getHit();
  if(ship.sunk){
    this.totalShips--;
    if(this.totalShips == 0)
      this.lost = true;
    return 2;
  }
  return 1;
}

module.exports = Player;