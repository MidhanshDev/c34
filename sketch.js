//Create variables here
var dog,Happydog,database,foods,foodStock
var dogImage;
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  Happydog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(200,260);
  dog.scale = 0.3;
  dog.addImage(dogImage);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(Happydog)
  }

  drawSprites();
  //add styles here
  text("food remaining; "+foods,120,150);
  text("NOTE:Press UP_ARROW key to feed bruno milk!",120,50);

}
function readStock(data){
  foods=data.val();
}

function writeStock(x){
  if(x>0){
    x = x-1;
  }
  else{
    x = 0;
  }
  database.ref('/').update({
    Food:x
  })
}



