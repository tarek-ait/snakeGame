var blockSize = 27;
var rows = 20;
var columns =20;
var board;
var context;
var body=1;

// buttons


const repeatButton=document.querySelector("#btn");

// snake head 
var snakeX=blockSize*5;
var snakeY=blockSize*5;

var velocityX=0;
var velocityY=0;

var snakeBody = []
// draw the food
var foodX;
var foodY;

var gameOver = false;




window.onload= function() {
    board = document.getElementById("board");
    board.height=rows*blockSize;
    board.width=columns*blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update,100);
}



repeatButton.onclick= repeat;




function repeat(){
    snakeBody=[];
    snakeBody[0]=[snakeX,snakeY];
}

function update() {
    if (gameOver){
        return ;
    }
  context.fillStyle="black";
  context.fillRect(0,0,board.width,board.height);

  context.fillStyle="red";
  context.fillRect(foodX,foodY,blockSize,blockSize);
  

  if ( snakeX==foodX && snakeY==foodY){
    snakeBody.push([foodX,foodY]);
     placeFood();
}


for( let i= snakeBody.length-1;i>0;i--){
    snakeBody[i]=snakeBody[i-1];
}


if (snakeBody.length){
    snakeBody[0]=[snakeX,snakeY];
}
  context.fillStyle="lime";
  snakeX+=velocityX*blockSize;
  snakeY+=velocityY*blockSize;
  context.fillRect(snakeX,snakeY,blockSize,blockSize);

  for ( var i=0; i<snakeBody.length; i++){
    context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
}




if (snakeX<0 || snakeY <0 || snakeX>columns*blockSize || snakeY>rows*blockSize){
    gameOver =true;
    alert("GAME OVER!");
    repeatButton.style.display="flex";
}

for (let i=0;i<snakeBody.length;i++){
    if (snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
        gameOver=true;
        alert("GAME OVER!");
    }
}

}

   

function placeFood(){
   foodX = (Math.floor(Math.random()*rows))*blockSize;
    foodY = (Math.floor(Math.random()*columns))*blockSize;
}

function changeDirection(event){
    if (event.code=="ArrowUp" && velocityY != 1){
        velocityX = 0;  
        velocityY=-1;
    }else if (event.code=="ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY=1;
    }else if (event.code=="ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY=0;
    }else if (event.code=="ArrowRight" && velocityX !=-1 ){
        velocityX = 1;
        velocityY=0;
    }
}