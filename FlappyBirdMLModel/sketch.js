let birds = [];
let pipes = [];
let maxTimePass = 0;
let maxTimePassSec = 0;
let timePass = 0;
let reproductionCnt = 0;

let gameState = 0;
let gameStateInit = 0;
let gameStateReady = 1;
let gameStateRunning = 2;
let gameStatePause = 3;
let classifier;
let myFont;

function preload() {
  myFont = loadFont("./font/flappy.TTF");
}

function setup() {
  createCanvas(640, 240);
  ml5.tf.setBackend("cpu");
  frameRate(60);
  classifier = ml5.neuralNetwork({
    inputs: 4,
    outputs: ["flap", "no flap"],
    task: "classification",
    neuroEvolution: true,
  });

  const modelInfo = {
    model: "model.json",
    metadata: "model_meta.json",
    weights: "model.weights.bin",
  };
  classifier.load(modelInfo, modelLoadedCallback);
}

function modelLoadedCallback() {
  for (let i = 0; i < 10; i++) {
    birds[i] = new Bird(classifier);
  }
  pipes.push(new Pipe());
  gameState = gameStateReady;
}

function draw() {
  background(255);
  if (isGame([gameStateRunning, gameStateReady, gameStatePause])) {
    for (let i = pipes.length - 1; i >= 0; i--) {
      if (isGame([gameStateRunning])) {
        pipes[i].update();
      }

      if (isGame([gameStateRunning, gameStatePause])) {
        pipes[i].show();
      }

      if (isGame([gameStateRunning])) {
        if (pipes[i].offscreen()) {
          pipes.splice(i, 1);
        }
      }
    }

    for (let bird of birds) {
      if (bird.alive) {
        if (isGame([gameStateRunning])) {
          for (let pipe of pipes) {
            if (pipe.collides(bird)) {
              //noLoop();
              bird.alive = false;
            }
          }
          bird.think(pipes);
          bird.update();
        }
        if (isGame([gameStateRunning, gameStatePause])) {
          bird.show();
        }
      }
    }

    if (isGame([gameStateRunning])) {
      if (frameCount % 100 == 0) {
        pipes.push(new Pipe());
      }
    }

    if (!isGame([gameStateReady])) {
      if (allBirdsDead()) {
        normalizeFitness();
        reproduction();
        resetPipes();
        if (timePass > maxTimePass) {
          maxTimePass = timePass;
          maxTimePassSec = floor(timePass / 60);
        }

        timePass = 0;
        reproductionCnt += 1;
      } else {
        timePass += 1;
      }
      let timePassSec = floor(timePass / 60);

      push();
      noFill();
      stroke(0);
      textSize(16);
      textFont(myFont);
      text(
        `Round : ${reproductionCnt} Max : ${maxTimePassSec} Time : ${timePassSec}`,
        width - 250,
        20
      );
      pop();
    }
  }

  if (isGame([gameStateReady])) {
    push();
    textFont(myFont);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("FLAPPY BIRD", width / 2, height / 4);
    text("Machine Learning", width / 2, height / 2);
    textSize(20);
    text("press Space to Watch", width / 2, height / 1.2);
    pop();
  } else if (isGame([gameStatePause])) {
    push();
    textFont(myFont);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Pause", width / 2, height / 3);
    textSize(20);
    text("press P to Resume", width / 2, height / 1.6);
    pop();
  }
}

function allBirdsDead() {
  for (let bird of birds) {
    if (bird.alive) {
      return false;
    }
  }
  return true;
}

function reproduction() {
  let nextBirds = [];
  for (let i = 0; i < birds.length; i++) {
    let parentA = weightedSelection();
    let parentB = weightedSelection();
    let child = parentA.crossover(parentB);
    child.mutate(0.01);
    nextBirds[i] = new Bird(child);
  }
  birds = nextBirds;
}

function normalizeFitness() {
  let sum = 0;
  for (let bird of birds) {
    sum += bird.fitness;
  }
  for (let bird of birds) {
    bird.fitness = bird.fitness / sum;
  }
}

function weightedSelection() {
  let index = 0;
  let start = random(1);
  while (start > 0) {
    start = start - birds[index].fitness;
    index++;
  }
  index--;
  return birds[index].brain;
}

function resetPipes() {
  pipes.splice(0, pipes.length - 1);
}

function isGame(gameStates) {
  for (let state of gameStates) {
    if (state == gameState) {
      return true;
    }
  }
  return false;
}

function keyPressed() {
  console.log("keyPressed:", key);

  if (isGame([gameStateReady])) {
    if (key == " ") {
      gameState = gameStateRunning;
    }
  } else if (isGame([gameStateRunning, gameStatePause])) {
    if (key == "p") {
      if (isGame([gameStateRunning])) {
        gameState = gameStatePause;
      } else {
        gameState = gameStateRunning;
      }
    }
  }
}
