let data;
let plotX1, plotX2, plotY1, plotY2;
let plotFont;
let select1;
let select2;
let canvas;

function preload(){
  data = loadTable("data/AdultMales_ENPs.csv", "csv", "header");
  plotFont = loadFont("font/LSANS.TTF");
}

function setup() {
  canvas = createCanvas(770,420);
  canvas.parent("propensity");

  plotX1 = 120;
  plotY1 = 50;
  plotX2 = width - 50;
  plotY2 = height - 70;

  textFont(plotFont);

  select1 = createSelect();
  select1.parent("select");
  select1.option("Adult Males");
  select1.option("Male Youth");
  select1.option("Adult Females");
  select1.option("Female Youth");
  select1.changed(selectChanged);

  select2 = createSelect();
  select2.parent("select");
  select2.option("ENPs");
  select2.option("No-shows");
  select2.changed(selectChanged);
}

function draw() {

  // background
  background(224);

  // main graph
  fill(255);
  rectMode(CORNERS);
  noStroke();
  rect(plotX1, plotY1, plotX2, plotY2);

  // histogram
  for (let i = 0; i < data.getRowCount(); i++) {
    fill(200,20,20);
    let y1 = data.getNum(i,1);
    let x = data.getNum(i,0);
    rectMode(CENTER);
    rect(plotX1+600*x, 200-150*y1/2, 24, 150*y1);
    fill(20,20,200);
    let y2 = data.getNum(i,2);
    rect(plotX1+600*x, 200+150*y2/2, 24, 150*y2);
  }

  // stick
  for (let i = 0; i < data.getRowCount(); i += 4) {
    fill(0);
    textSize(15);
    textAlign(CENTER,TOP);
    text(data.getString(i,0), plotX1+600*data.getNum(i,0), 360);
  }

  for (let i = 0; i <= 1; i += 0.2) {
    let y1 = 200 - 150 * i;
    let y2 = 200 + 150 * i;
    
    stroke(0);
    strokeWeight(1);
    line(120, y1, 116, y1);
    line(120, y2, 116, y2);

    fill(0);
    textSize(15);
    textAlign(RIGHT, CENTER);
    strokeWeight(0);    // I find that this will affects text weight
    text(nf(i,1,1), 110, y1);
    text(nf(i,1,1), 110, y2);
  }


  // label
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Density", 48, 200);
  textAlign(CENTER, TOP);
  text("Probability of Programme Participation", 420, 390);
  textAlign(CENTER,CENTER);
  if (select2.value() == "ENPs") {
    text(select1.value() +"Controls and Elig. Non-participants", 420, 25);
  } else {
    text(select1.value() + "Controls and Elig. No-shows", 420, 25);
  }
  

  noStroke();
  fill(200, 20, 20);
  rectMode(CORNER);
  rect(460, 255, 40, 15);
  fill(20, 20, 200);
  rect(460, 270, 40, 15);

  fill(0);
  textAlign(LEFT, BOTTOM);
  textSize(10);
  text("Controls", 510, 270);
  if (select2.value() == "ENPs") {
    text("Non-participants", 510, 285);
  } else {
    text("No-shows", 510, 285);
  }
  

  noFill();
  stroke(0);
  strokeWeight(1);
  rect(440, 250, 200, 40);
}


function selectChanged() {
  let array1 = split(select1.value(), " ");
  let file1 = join(array1, "");
  let file2 = select2.value();
  data = loadTable("data/"+file1 + "_" + file2 + ".csv", "csv", "header");
}