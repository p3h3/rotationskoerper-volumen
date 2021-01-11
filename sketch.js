//Ein Projekt von Annika Kerning und Peter Heynmöller zur Visualisierung von Rotationskörpern von Graphen

var gleichung = "2*pow(x,2)";

var untergrenze;
var obergrenze;

var normalX;
var normalY;

var zoom;
var schritte; // je größer der zoom ist, desto genauer müssen die Schritte sein

function setup() {
  createCanvas(displayWidth, displayHeight);

  normalX = width/2;
  normalY = height/2;

  zoom = 4;
  schritte = 0.1;

  let inputElem = createInput('2*pow(x,2)').attribute('placeholder', 'Gleichung');
  inputElem.input(onInput);
  inputElem.position(20, 40);

  let inputElem2 = createInput('').attribute('placeholder', 'Untergrenze Intervall');
  inputElem2.input(onInput2);
  inputElem2.position(20, 70);

  let inputElem3 = createInput('').attribute('placeholder', 'Obergrenze Intervall');
  inputElem3.input(onInput3);
  inputElem3.position(20, 100);
}

function draw() {
  background(0);
  translate(normalX, normalY);

  textFont("Arial", 14);
  textAlign(CENTER);
  fill(255);
  stroke(255);

  line(-width, 0, width, 0);
  line(0, -height, 0, height);

  for (var j = 0; j < width; j = j + 40) {
    line(j, 5, j, -5);
    if(j%80 == 0 && j != 0){
      text(j/40, j, 20);
    }
  }
  for (var a = 0; a > -width; a = a - 40) {
    line(a, 5, a, -5);
    if(a%-80 == 0 && a != 0){
      text(a/40, a, 20);
    }
  }
  for (var k = 0; k < height; k = k + 40) {
    line(-5, k, 5, k);
    if(k%80 == 0 && k != 0){
      text(-k/40, 20, k+3);
    }
  }
  for (var b = 0; b > -height; b = b - 40) {
    line(-5, b, 5, b);
    if(b%-80 == 0 && b != 0){
      text(-b/40, 20, b+3);
    }
  }

  textAlign(LEFT);

  try {
    var func = new Function("x", "return " + gleichung + ";");

    noFill();
    stroke(255, 0, 0);
    beginShape();
    var n = zoom;
    for (var l = schritte; l > -width; l = l - schritte) { //linke Seite
      curveVertex(n, -func(l)*40);
      n = n - zoom;
    }
    endShape();
    beginShape();
    var m = -zoom;
    for (var i = -schritte; i < width; i = i + schritte) { //rechte Seite
      curveVertex(m, -func(i)*40);
      m = m + zoom;
    }
    endShape();
    beginShape();
    fill(255, 0, 0, 50);

    vertex(untergrenze*40,0);
    var p = untergrenze*40;
    for (var o = untergrenze; o <= obergrenze+schritte; o=o+schritte) {
      vertex(p,-func(o)*40);
      p = p+zoom;
    }
    vertex(obergrenze*40,0);
    endShape();

    beginShape();
    vertex(untergrenze*40,0);
    var p = untergrenze*40;
    for (var q = untergrenze; q <= obergrenze+schritte; q=q+schritte) {
      vertex(p,func(q)*40);
      p = p+zoom;
    }
    vertex(obergrenze*40,0);
    endShape();

    translate(-normalX, -normalY);

    var integral_value = integrate(untergrenze, obergrenze, func, 0.00001);
    if (integral_value != 0) {
      var rounded_integral_value = round(integral_value, 2);
      stroke(255);
      text("orientierter Flächeninhalt im Intervall: " + rounded_integral_value, 20, 150);
    }
    var func2 = (x) => {return Math.pow(func(x), 2);}
    var rotation_value = integrate(untergrenze, obergrenze, func2, 0.00001)
    if (rotation_value != 0) {
      var rounded_rotation_value = round(rotation_value*PI, 2);
      stroke(255);
      text("Rotationsvolumen im Intervall: " + rounded_rotation_value, 20, 180);
    }

  } catch (err) {}
}

function trapezoid(length, h1, h2) {
  return ((h1 + h2) / 2) * length;
}

function integrate(a, b, f, h) {
  var area = 0;
  for (var i = a * 1.0; i < b; i += h) {
    var h1 = f(i);
    var h2 = f(i + h);
    area = area + trapezoid(h, h1, h2);
  }
  return area;
}

function doubleClicked() {

  normalX = mouseX;
  normalY = mouseY;
}

function onInput() {
  clear();
  gleichung = this.value();
}

function onInput2() {
  clear();
  untergrenze = float(this.value());
}

function onInput3() {
  clear();
  obergrenze = float(this.value());
}
