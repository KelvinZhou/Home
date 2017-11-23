let angle;
let slider1, slider2, slider3;
let length;
let canvas;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('myContainer');
  createP("Try some different angle!").parent('myContainer');
  slider1 = createSlider(0, PI/2, PI/4, 0.01).parent('myContainer');
  createP("Try some different length!").parent('myContainer');
  slider2 = createSlider(50, 150, 100, 1).parent('myContainer');
  createP("Try some different factor!").parent('myContainer');
  slider3 = createSlider(0.3, 0.8, 0.67, 0.01).parent('myContainer');
}

function draw() {
  background(0);
  stroke(255);
  angle = slider1.value();
  length = slider2.value();
  factor = slider3.value();
  translate(width/2, height);
  branch(length);
}

function branch(len) {
  line(0, 0, 0, -len);
  if (len > 4) {
    translate(0, -len);
    push();
    rotate(angle);
    branch(len*factor);
    pop();
    rotate(-angle);
    branch(len*factor);
  }
}