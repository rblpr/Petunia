
function handleCrouch() {
  player.h = playerH / 2;
  jumpSpeed = 0.05;
  player.crouching = true;
}
function handleEndCrouch() {
  player.h = playerH;
  jumpSpeed = 0.02;
  player.crouching = false;
}

function handleJump() {
  if (!player.jumping) {
    player.jumping = true;
    setTimeout(jumpUp, 1, 0.05);
  }
}

function handleAttack() {
  if (atkBuffer > 0) return;
  player.attacking = true;
  setTimeout(() => player.attacking = false, 200)
  atkBuffer = ATKBUFFERTIME;
  let atk = new Body(player.pos.x + player.w, player.pos.y, player.w * 2, player.h);
  atk.color = color(255, 255, 255, 30);

  // check collisions
  obstacles.forEach((o) => {
    if (o.collide(atk)) {
      obstacles = obstacles.filter(obs => obs != o);
      bodies = bodies.filter(obs => obs != o);
      score += 1000;
    }
  });
  // //////////////
}

function jumpUp(time) {
  let prevy = player.pos.y;
  player.pos.y = groundH + abs(sin(time)) * 150;

  if (player.crouching) {
    let starty = player.pos.y;
    while (player.pos.y >= starty) {
      time += jumpSpeed;
      prevy = player.pos.y;
      player.pos.y = groundH + abs(sin(time)) * 150;
    }
  }

  if (player.pos.y > prevy) {
    setTimeout(jumpUp, 1, time + jumpSpeed);
  } else {
    setTimeout(jumpDown, 1, time + jumpSpeed);
  }
}

function jumpDown(time) {
  let prevy = player.pos.y;
  player.pos.y = groundH + abs(sin(time)) * 150;
  if (player.pos.y < prevy) {
    setTimeout(jumpDown, 1, time + jumpSpeed);
  } else {
    player.jumping = false;
    player.pos.y = prevy;
  }
}



function changeSprite() {
  player.step++;
  if(player.attacking){
    player.texture = player.attackAnimation[0];
  }else if (player.jumping) {
    player.texture = player.jumpTexture;
  } else if(player.crouching) {
    player.texture = player.crouchTexture;
  } else {
    player.texture = player.runAnimation[player.step % player.runAnimation.length]
  }
}