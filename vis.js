var palette = ["rgba(100,0,120,0.3)", "rgba(0,120, 120,0.3)", "rgba(0, 140, 0, 0.2)"];
var param1 = 0;
var ascending1 = true;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    background("#111111");
    microphone = new p5.AudioIn();
    microphone.start();
    fft = new p5.FFT();
    fft.setInput(microphone);

}

function draw(){

    param1 += 0.1;
    if(param1>100000) param1 = 0;

    let sin1 = sin(param1);
    let cos1 = cos(param1);
    //let sinSquared1 = sin1*sin1;
    //let cosSquared1 = cos1*cos1; 
    
    let spectrum = fft.analyze();

    let bass = fft.getEnergy("bass");
    let mids = fft.getEnergy("mid");
    let treb = fft.getEnergy("treble");

    translate(width/2,height/2);
    let segments = 33;
    let radius = 500;

    let bassMap = map(bass, 0, 255, -500, 500);
    let midsMap = map(mids, 0, 255, -500, 500);
    let trebMap = map(treb, 0, 255, -490, 490);

    
    
    for(q = 0; q < segments; q++){
	rotate(TWO_PI/segments);
	push();
	strokeWeight(4);
	stroke(palette[0]);
	line(midsMap*radius/5*sin1, bassMap, 0, radius*cos1);
	pop();
	push();
	strokeWeight(3);
	stroke(palette[1]);
	line(radius/5*cos1, midsMap, 0, radius*sin1);
	line(trebMap*radius/5*cos1, midsMap, 0, radius*sin1);
	pop();
	push();
	strokeWeight(2);
	stroke(palette[2]);
	line(radius/5*sin1, trebMap, 0, radius*cos1);
	pop();
    }

    /*beginShape();
    for(q = 0; q < spectrum.length; q++){
	vertex(q, map(spectrum[q], 0, 255, height, 0));
    }
    endShape();*/
}
