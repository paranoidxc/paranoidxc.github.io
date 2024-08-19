let w = 5;
let states = [];

function setup() {
  createCanvas(800, 400);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height - 100);
    states[i] = -1;
  }

  quickSort(values, 0, values.length - 1);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  states[end] = 2;
  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }

  await swap(arr, pivotIndex, end);
  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }
  states[end] = -1;
  return pivotIndex;
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  //await sleep(1000000);
  states[index] = -1;
  await quickSort(arr, start, index - 1);
  await quickSort(arr, index + 1, end);
  /*
  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end),
  ]);
  */
}

async function swap(arr, a, b) {
  await sleep(100);
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function draw() {
  background(51);
  for (let i = 0; i < values.length; i++) {
    stroke(0);
    if (states[i] == 0) {
      fill("#E0777D");
    } else if (states[i] == 1) {
      fill(111);
    } else if (states[i] == 2) {
      fill("#D6FFB7");
    } else {
      fill(255);
    }
    /*
    strokeWeight(w);
    let linewidth = i * Math.floor(w / arrsize);
    let offsetw = Math.floor(w / arrsize / 2);
    let offseth = Math.floor(values[i] / arrsize);
    line(i * w, height, i * w, values[i]);
    */
    rect(i * w, height - values[i], w, values[i]);
  }

  push();
  textSize(32);
  fill(255);
  stroke(0);
  textAlign(CENTER, CENTER);
  text("QUICK SORT", width / 2, 32);
  pop();
}
