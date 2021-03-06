var Player = require("./Player.js");

function Game(){
  this.player1 = new Player();
  this.player2 = new Player();
  this.ended = false;
  this.order = 1;
}
Game.prototype.hit = function(row, col){
  this.order = (this.order % 2) + 1;
  var result;
  if(this.order == 1){
    result = this.player2.hit(col, row);
  } else {
    result = this.player1.hit(col, row);
  }
  if(result == -1)
    return "Already Taken. It is Player " + this.order + "'s turn.";
  if(this.player1.lost || this.player2.lost){
    this.ended = true;
    return "All Ships are destroyed. You win the Game!";
  }
  if(result == 0)
    return "Miss! It is Player " + this.order + "'s turn.";
  else if(result == 1)
    return "Hit! It is Player " + this.order + "'s turn.";
  else if(result == 2)
    return "Ship Sunk! It is Player " + this.order + "'s turn.";  
}

module.exports = Game;