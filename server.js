var express = require("express"),
    app     = express(),
    Game    = require("./Game.js"),
    port    = 8080;

var game;

app.get('/start', function(req, res, next){
  if(game != null)
    return res.send("There is a game still continuing.");
  game = new Game();
  return res.send("Game initiated.");
});

app.get('/hit/:row/:col', function(req, res, next){
  if(game == null)
    return res.send("You did not start the game yet.");
  var result = game.hit(parseInt(req.params.row), parseInt(req.params.col));
  if(game.ended)
    game = null;
  return res.send(result);
});

app.listen(port, function(){
  console.log("Listening on " + port);
});