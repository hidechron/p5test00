function setup() {
  createCanvas(480, 270);
  stroke(0);
  fill(150);

  carrier = new p5.Oscillator(); // connects to master output by default
  carrier.start();
  carrier.freq(340);
  carrier.amp(0.2);
  // carrier's amp is 0 by default, giving our modulator total control


  modulator = new p5.Oscillator('triangle');
  modulator.disconnect();  // disconnect the modulator from master output
  modulator.start();
  modulator.freq(5);
  modulator.amp(1);

  // Modulate the carrier's amplitude with the modulator
  carrier.amp(modulator);

  // create an fft to analyze the audio
  fft = new p5.FFT();
}

function draw() {
  background(255);
  rect(50,50,75,100);

  // // map mouseY to moodulator freq between 0 and 20hz
  var modFreq = map(mouseY, 0, height, 4, 0);
  modulator.freq(modFreq);

  var modAmp = map(mouseX, 0, width, 0, 0.5);
  modulator.amp(modAmp, 0.01); // fade time of 0.1 for smooth fading

  // analyze the waveform
  waveform = fft.waveform();

  // draw the shape of the waveform
  stroke(240);
  strokeWeight(4);
  beginShape();
  for (var i = 0; i<waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, -height/2, height/2);
    vertex(x, y + height/2);
  }
  endShape();
}
