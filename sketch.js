var backImage,backgr;
var bgimage;
var player, player_running;
var ground,ground_img;


var bananaGroup, bananaImage;
var obstaclesGroup, obstacle_img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bgimage = loadImage("bgimage.jpg");
  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);

  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;


  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  

  
  player.setCollider("rectangle",0,0,player.width,player.height);
  player.debug = true;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(0);


    if(gameState === PLAY){

  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  
    if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach();
    score = score + 2;
    player.score += + 0.1
      }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if (keyDown("space") && player.y >=250 )  {
    player.velocityY = -20;
  }
      player.velocityY = player.velocityY + 0.7

  
     player.collide(ground);
 ground.x = ground.width /9;
    spawnbanana();
    spawnObstacles();
    
  if(obstaclesGroup.isTouching(player)){
      gameState = END;
  }
} else if(gameState === END){
bg = createSprite(400,200);
bg.addImage(bgimage);
    backgr.velocityX = 0;
    player.visible = false;

    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();




    


  }
  
  
  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnbanana() {
  //write code here to spawn the banana
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.2;
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
