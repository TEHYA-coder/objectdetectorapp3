status ="";
img = "";
objects = [];

function preload() {
    img = loadImage("globe.jpeg");
}

function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if(error)
    {
        console.log(error);
    } 

    console.log(results);

    objects = results;

    
}

function draw() {
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for( var i = 0; i < objects.length; i++)
        {
          document.getElementById("status").innerHTML = "status: object detected";
          document.getElementById("no.objects").innerHTML = "No. of Objects Detected: " + objects.length;
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          fill(255, 0, 0);
          noFill();
          stroke(255, 0, 0);

          rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}