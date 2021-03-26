//created variables
var player, playerImg, jump;
var ground;
var bushes, bush1, bush2, bush3, bush4, bush5, damage;
var coins, coinImg, coinSound;
var score = 0;
var lives = 3;
var coinGroup, bushGroup;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var backGround, backgroundImg;
function preload() {
    //loaded Images
    playerImg = loadAnimation("Images/sprite_1.png", "Images/sprite_2.png", "Images/sprite_3.png", "Images/sprite_4.png", "Images/sprite_5.png");
    backgroundImg = loadImage("Images/background.png");
    coinImg = loadImage("Images/coin.png");
    coinSound = loadSound("Sounds/coin.mp3");
    jump = loadSound("Sounds/jump.mp3");
    damage = loadSound("Sounds/hurt.wav");

    bush1 = loadImage("Images/bush1.png");
    bush2 = loadImage("Images/bush2.png");
    bush3 = loadImage("Images/bush3.png");
    bush4 = loadImage("Images/bush4.png");
    bush5 = loadImage("Images/bush5.png");
}
function setup() {
    createCanvas(600, 700);

    //created sprites
    backGround = createSprite(300, 350, 10, 10);
    backGround.addImage(backgroundImg);
    player = createSprite(100, 500, 10, 10);
    player.addAnimation("running", playerImg);
    player.scale = 0.5;
    player.setCollider("rectangle", 0, 0, 150, 150);
    ground = createSprite(300, 600, 1000, 10);

    //created groups
    coinGroup = new Group();
    bushGroup = new Group();
    
}
function draw() {
    background(0);

    if(gameState === PLAY) {
    player.y = player.y+10;
    player.collide(ground);
    backGround.velocityX = -10;

    //reseting the background and ground
    if(backGround.x <= 0) {
        backGround.x = backGround.width/2;
    }
    if(ground.x <= 0) {
        ground.x = ground.width/2;
    }

    //giving function to make player jump
    if(keyDown("space")) {
        player.y = player.y-20;
        jump.play();
    }

    //giving scores
    if(player.isTouching(coinGroup)) {
        coinGroup.destroyEach();
        coinSound.play();
        score = score+1;
    }

    //increasing speed
    if(frameCount %100 === 0) {
        ground.velocityX = ground.velocityX -5;
        bushes.velocityX = bushes.velocity -5;
        coins.velocityX = coins.velocityX -5;
    }

    //decreasing lives
    if(player.isTouching(bushGroup)) {
        bushGroup.destroyEach();
        damage.play();
        lives -= 1;
    }

    //changind gameState
    if(lives <= 0) {
        gameState = END;
    }

    //calling functions
    bush();
    coin();

    drawSprites();
    } else if(gameState === END) {

        //writting text gameOver
        textSize(20);
        fill("white");
        text("Game Over", 300, 350);

        //making sprites visibility false
        player.visible = false;
        ground.visible = false;

        //destroying bushes and coins
        bushGroup.destroyEach();
        coinGroup.destroyEach();
    }

    // displaying scores and lives
    textSize(20);
    fill("black");
    text("Score : "+ score, 500, 100);
    text("Lives : "+ lives, 50, 650);
}
function bush() {
    if(frameCount %60 === 0){
        bushes = createSprite(710, 570, 10, 10);
        bushes.velocityX = -10;
        bushes.scale = 0.3;
        bushes.setCollider("rectangle", 0, 0, 200, 200);

        // giving random images
        var rand = Math.round(random(1, 5));
        switch(rand){
            case 1: bushes.addImage(bush1);
            break;
            case 2: bushes.addImage(bush2);
            break;
            case 3: bushes.addImage(bush3);
            break;
            case 4: bushes.addImage(bush4);
            break;
            case 5: bushes.addImage(bush5);
            break;
            default: break;
        }

        //giving lifetime
        bushes.lifetime = 120;
        //adding bushes to the group
        bushGroup.add(bushes);
    }
}
function coin() {
    if(frameCount %60 === 0){
        coins = createSprite(700, random(200, 600), 10, 10);
        coins.addImage(coinImg);
        coins.setCollider("circle", 0, 0, 50);
        coins.scale = 0.3;
        coins.velocityX = -10;
        //giving lifetime
        coins.lifetime = 100;
        //adding coins to the group
        coinGroup.add(coins);
    }
}