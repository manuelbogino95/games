

function paint(ctx) {
  var i,
      l;

  //Clean canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Draw player
  //ctx.fillStyle = '#0f0';
  for(i = 0, l = body.length; i < l; i += 1) {
    //body[i].fill(ctx);
    body[i].drawImage(ctx, iBody);
  }

  //Draw Walls
  /*ctx.fillStyle = '#999';
  for(i = 0, l = wall.length; i < l; i += 1) {
    wall[i].fill(ctx);
  }*/

  //Draw food
  //ctx.fillStyle = '#f00';
  //food.fill(ctx);
  food.drawImage(ctx, iFood);

  //Draw score
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ' + score, 0, 10);

  //Draw pause
  if(pause) {
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    if(gameover) {
      ctx.fillText('GAME OVER', 150, 75);
    } else {
      ctx.fillText('PAUSE', 150, 75);
    }
    ctx.textAlign = 'left';
  }
}

function repaint() {
  window.requestAnimationFrame(repaint);
  paint(ctx);
}

function run() {
  setTimeout(run, 50);
  act();
}

function act() {
  var i,
      l;

  if(!pause) {

    //Game over reset
    if(gameover) {
      reset();
    }

    // Move Body
    for (i = body.length - 1; i > 0; i -= 1) {
      body[i].x = body[i - 1].x;
      body[i].y = body[i - 1].y;
    }

    //Change direction
    if(lastPress === KEY_UP) {
      dir = 0;
    }
    if(lastPress === KEY_RIGHT) {
      dir = 1;
    }
    if(lastPress === KEY_DOWN) {
      dir = 2;
    }
    if(lastPress === KEY_LEFT) {
      dir = 3;
    }

    //Move head
    if(dir === 0) {
      body[0].y -= 10;
    }
    if(dir === 1) {
      body[0].x += 10;
    }
    if(dir === 2) {
      body[0].y += 10;
    }
    if(dir === 3) {
      body[0].x -= 10;
    }

    //Out screen
    if(body[0].x > canvas.width) {
      body[0].x = 0;
    }
    if(body[0].y > canvas.height) {
      body[0].y = 0;
    }
    if(body[0].x < 0) {
      body[0].x = canvas.width;
    }
    if(body[0].y < 0) {
      body[0].y = canvas.height;
    }

    // Wall intersects
    /*for(i = 0, l = wall.length; i < l; i += 1) {
      if(food.intersects(wall[i])) {
        food.x = random(canvas.width / 10 - 1) * 10;
        food.y = random(canvas.height / 10 - 1) * 10;
      }

      if(player.intersects(wall[i])) {
        gameover = true;
        pause = true;
      }
    }*/

    //Body intersects
    for (i = 2, l = body.length; i < l; i += 1) {
      if (body[0].intersects(body[i])) {
        gameover = true;
        pause = true;
        aDie.play();
      }
    }

    // Food Intersects
    if (body[0].intersects(food)) {
      body.push(new Rectangle(food.x, food.y, 10, 10));
      score += 1;
      food.x = random(canvas.width / 10 - 1) * 10;
      food.y = random(canvas.height / 10 - 1) * 10;
      aEat.play();
    }
  }

  //Pause
  if(lastPress === KEY_ENTER) {
    pause = !pause;
    lastPress = null;
  }
}

function random(max) {
  return ~~(Math.random() * max);
}

function reset() {
  score = 0;
  dir = 1;
  body.length = 0;
  body.push(new Rectangle(40, 40, 10, 10));
  body.push(new Rectangle(0, 0, 10, 10));
  body.push(new Rectangle(0, 0, 10, 10));
  food.x = random(canvas.width / 10 - 1) * 10;
  food.y = random(canvas.height / 10 - 1) * 10;
  gameover = false;
}

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  body[0] = new Rectangle(40, 40, 10, 10);
  food = new Rectangle(80, 80, 10, 10);

  iBody.src = 'assets/body.png';
  iFood.src = 'assets/fruit.png';
  aEat.src = 'assets/chomp.oga';
  aDie.src = 'assets/dies.oga';

  /*wall.push(new Rectangle(100, 50, 10, 10));
  wall.push(new Rectangle(100, 100, 10, 10));
  wall.push(new Rectangle(200, 50, 10, 10));
  wall.push(new Rectangle(200, 100, 10, 10));*/

  run();
  repaint();
}
