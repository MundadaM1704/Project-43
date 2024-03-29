var backImage, backgr;
var player, player_running;
var ground, ground_img;
var banana, banana_img;
var obstacle, obstacle_img;
var foodGroup, obstacleGroup;
var score;
var gameOver, gameOverImg;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
  backImage = loadImage("jungle.jpg");
  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x = ground.width/2;
  ground.visible = false;  

  gameOver = createSprite(400,200);   
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(0);

  drawSprites();

  stroke("white");
  textSize(20); 
  fill("white"); 
  text("Score: "+ score, 550,50); 

  if(gameState===PLAY){
    if(backgr.x<100){ 
      backgr.x=backgr.width/2;
    } 

    if(FoodGroup.isTouching(player)){ 
      FoodGroup.destroyEach(); 
      score = score + 2; 
    } 
    
    if(keyDown("space") ) {
      player.velocityY = -12; 
    } 
    
    player.velocityY = player.velocityY + 0.8; 
    player.collide(ground); 
    
    spawnFood(); 
    spawnObstacles(); 
    
    if(obstaclesGroup.isTouching(player)){
      gameState = END; 
    } 
  }
    else if(gameState === END){ 
      backgr.velocityX = 0; 
      player.visible = false; 
      FoodGroup.destroyEach(); 
      obstaclesGroup.destroyEach(); 
      textSize(30); fill(255); 
      text("Game Over!", 300,220); 
    } 
} 

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(600,330,20,50);
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}

