var sheep, sheepGIF, sheepGraze;
var game, form, player;
var bg, bg2, bg3, bg4;
var database
var gameState, playerCount=0, buttonPress = 0;
var wolf, wolfGIF; 
var questions = [];
var question1, question2, question3, question4, question5, question6, question7, question8, question9, question10;
var sphinxCave;
var allPlayers;
var isMoving;
var sphinx, sphinxAnimation;

function preload() {
    sheepGIF = loadAnimation("./assets/sheep.gif");
    bg = loadImage("./assets/refugeCave.jpg");
    wolfGIF = loadImage("./assets/wolf.gif");
    sheepGraze = loadAnimation("./assets/sheepGraze.gif");
    question1 = loadSound("./Sounds/Question 1.m4a");
    question2 = loadSound("./Sounds/Question 2.m4a");
    bg2 = loadImage("./assets/runBg.jpg");
    sphinxAnimation = loadImage("./assets/sphinx.jpg");
    bg3 = loadImage("./assets/bg3.jpg");
    sphinxCave = loadSound("./Sounds/Sphinx cave.mp3");
    bg4 = loadImage("./assets/bg4.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();

    sheep = createSprite(width/4, height/1.3);
    sheep.addAnimation('sheepRun', sheepGIF);
    sheep.addAnimation('eatSheep', sheepGraze);
    sheep.visible  = false;

    wolf = createSprite(-120, height/2);
    wolf.addImage(wolfGIF);
    wolf.scale = 0.7;
    wolf.x += 50;
    wolf.visible = false;
    
    game = new Game();
    game.start();

    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", function(data) {
        playerCount = data.val();
        console.log(playerCount);
    })

    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
        gameState = data.val();
        console.log(gameState);
    })
}

function draw() {
    background(bg);
    drawSprites();
    if(gameState === 0) {
        sheep.changeAnimation('eatSheep');
        sheep.scale = 1;
    }
    if(playerCount === 2) {
        game.update(1);
    }
    if(gameState === 1) {
        background(bg2);
        game.play(); 
        if(isMoving) {
            moveIt(sheep);
            moveIt(wolf);
        }   
    } 
    if(buttonPress === 2) {
        game.update(2);
        gameState = 2;
    }
    if(gameState === 2) {
        game.quizInvite();
    }
}

// question = [ {question: "What gets wetter and wetter the more it dries?",
//               timer: 30,
//               score: 2,
//               audio: question1,
//               hint1: {text: "W O E L B",
//                       posX: width/4,
//                       posY: height/3,                      
//                      }, 
//               hint2: {text: "W T O L E",
//                       posX: width*3/4,
//                       posY: height3,
//                      },
//               hint3: {text: ""
//                      }
//              },
//              {question: "I have a tail, and I have a head, but I have no body. PS: **I am NOT a snake**. What am I?",
//               timer: 30,
//               score: 2,
//               audio: question2
//              },
//              {question: "What has thirteen hearts, but no other organs?",
//               timer: 30,
//               score: 3,
//               audio: question3
//              },
//              {question: "The more there is, the less you see. What is it?",
//               timer: 30,
//               score: 3,
//               audio: question4
//              }
// ]

function moveIt(sprite) {
    sprite.position.x += 20;
    sprite.velocityX = 1.5;
}