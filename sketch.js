 //var de estados   
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
// pontuação
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //imprimindo uma string concatenada
  console.log("ola " + " Mundo");
  score=0;
}

function draw() {
  background(180);
  // exibindo o texto da pontuação e concatenando
  text("Pontuação: "+ score, 500,50);
  //dividindo o score entre os quadros
 
  //a função Math.round() para arredondar.
  //
 // condição de estado
  if(gameState===PLAY){
  //mover o solo
  ground.velocityX= -4;
  
//1 mudar o score  Math pra dentro do PLAY

score = score + Math.round(frameCount/60);



//2 Redefina a posição do solo: colocar dentro do estado play
   if(ground.x < 0){
    ground.x = ground.width /2;
   }



//3 Mova o código “pular e gravidade” dentro do estado PLAY

if(keyDown("space")&& trex.y >= 100) {
  trex.velocityY = -13;
}
  

//5 Mova spawnClouds() e spawnObstacles() para dentro do condicional PLAY.

spawnClouds();
  

spawnObstacles();

}
   //6 Mova o código de solo invisível para fora do bloco play e dentro do draw, pois ele é necessário para apoiar o T-Rex o tempo todo.
  else if(gameState===END){
  //mover o solo
  ground.velocityX= 0;



  }  
  
  
  
  trex.velocityY = trex.velocityY + 0.8
  
  //6
  trex.collide(invisibleGround);
  

 
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribua dimensão e tempo de vida aos obstáculos         
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
 }
}




function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //atribua tempo de vida à variável
    cloud.lifetime = 200;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
