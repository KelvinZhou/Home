let data;
let plotX1, plotX2, plotY1, plotY2;

function preload(){
  data = loadTable("data/file.csv", "csv", "header");
}

function setup() {
  createCanvas(770,400);
  plotX1 = 120;
  plotY1 = 50;
  plotX2 = width - 50;
  plotY2 = height - 50;
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
    fill(0);
    let y1 = data.getNum(i,1);
    let x = data.getNum(i,0);
    rectMode(CENTER);
    rect(plotX1+600*x-15, height/2-150*y1/2, 12, 150*y1/2);
    fill(100);
    let y2 = data.getNum(i,2);
    rect(plotX1+600*x-15, height/2+150*y2/2, 12, 150*y2/2);
  }
}
