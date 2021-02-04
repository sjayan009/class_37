class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
   // textSize(30);
  //  text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var px = 175;
      var py;
      for(var plr in allPlayers){
        index = index + 1;
        px = px + 200;
        py = displayHeight-allPlayers[plr].distance;
        cars[index-1].px=px;
        cars[index-1].py=py;
        if(index === player.index){
          cars[index-1].shapeColor = red;
          camera.position.x = (displayWidth/2);
          camera.position.y = (cars[index-1].py)
        }
    }

   }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 10
      player.update();
    }
    drawSprites();
  }
}
