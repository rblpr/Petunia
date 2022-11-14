let jumping = false;
let crouching = false;

let score = 0;

let groundW;
let groundH;
let groundsCount = 1;
let leftPadding = 30;

let playerSpeed = 2.5;
let playerH = 64;
let playerW = 64;
let jumpSpeed = 0.02

let player;
let backgroundImg;

let obstacles = [];
let bodies = [];

const ATKBUFFERTIME = 300;
let atkBuffer = ATKBUFFERTIME;

let mati1;
let mati2;
function preload() {
  /* lucasF1 = loadImage("lucas1.jpeg");
  lucasF2 = loadImage("lucas2.jpeg"); */
  mati1 = loadImage("src/assests/mati-cam-1.png");
  mati2 = loadImage("src/assests/mati-cam-2.png");

  backgroundImg = loadImage("src/assests/sfondo1.png");

}

function setup() {
  createCanvas(innerWidth, 400);
  groundW = 600;
  groundH = 30;
  let ground = new Body(0, 0, groundW, groundH);
  //ground.invisible = true;

  let options = {
    texture: mati1,
    runAnimation: [mati1, mati2]
  }
  player = new Body(0, ground.h, playerW, playerH, options);
  bodies.push(ground, player);


  setInterval(changeSprite, 200);

}

function draw() {
  background(255);

  //image(backgroundImg, 0, 0, width, height)

  player.pos.x += playerSpeed;
  score += playerSpeed;

  if (atkBuffer > 0)
    atkBuffer -= 1;

  fill(0)
  text("Punteggio: " + nf(round(score), 10, 0), 30, 30)

  push();
  rectMode(CENTER)
  textAlign(CENTER, CENTER);
  textSize(32);
  text(location.search.split("=")[1].replace("%20", " "), width / 2, 50);
  pop();

  fill(255, atkBuffer == 0 ? 255 : 0, 0);
  rect(width - 150, 20, map(atkBuffer, 0, ATKBUFFERTIME, 100, 0), 20);

  translate(-player.pos.x + leftPadding, height);
  scale(1, -1);

  if (frameCount % 100 == 0 && playerSpeed <= 10)
    playerSpeed += 0.2;


  // check collisions
  let flag = false;
  obstacles.forEach((o) => {
    if (player.collide(o)) {
      //alert("Hai perso");
      //noLoop();
      flag = true;
    }
  });
  if (flag) player.color = color(0, 255, 0);
  else player.color = color(220);
  // //////////////

  if (player.pos.x >= groundW * groundsCount - groundW * 0.99) {
    expandWorld();
  }

  bodies.forEach((b) => b.show());
}

function keyPressed() {
  if (key == " " && !jumping) {
    handleJump();
  }

  if (key == "s") {
    handleCrouch();
  }

  if (key == "e") {
    handleAttack();
  }
}

function keyReleased() {
  if (key == "s") {
    handleEndCrouch();
  }
}


function expandWorld() {
  let newGround = new Body(groundW * groundsCount, 0, groundW, 30)
  //newGround.invisible = true;
  bodies.push(newGround);
  let o = getRandomObstacles();
  bodies.push(o[0], o[1], o[2]);
  obstacles.push(o[0], o[1], o[2]);

  groundsCount++;
}

function getRandomObstacles() {
  let x1 = groundW * 0.2,
    x2 = groundW * 0.5,
    x3 = groundW * 0.8;
  let obsW = 30;
  let obs1 = [
    new Body(x1 + groundW * groundsCount, groundH, obsW, 40),
    new Body(x1 + groundW * groundsCount, groundH + 40, obsW, 40),
    new Body(x1 + groundW * groundsCount, groundH + 90, obsW, 40),
  ];
  let obs2 = [
    new Body(x2 + groundW * groundsCount, groundH, obsW, 40),
    new Body(x2 + groundW * groundsCount, groundH + 40, obsW, 40),
    new Body(x2 + groundW * groundsCount, groundH + 90, obsW, 40),
  ];
  let obs3 = [
    new Body(x3 + groundW * groundsCount, groundH, obsW, 40),
    new Body(x3 + groundW * groundsCount, groundH + 40, obsW, 40),
    new Body(x3 + groundW * groundsCount, groundH + 90, obsW, 40),
  ];
  return [random(obs1), random(obs2), random(obs3)];
}

function changeSprite() {
  player.step++;
  player.texture = player.runAnimation[player.step % player.runAnimation.length]
}