/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 4;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];
// // copied from face_code.js
// this.darkGery = [38, 37, 37];
// this.yellow = [250, 198, 65];
// this.darkYellow = [201, 157, 44];
// this.brightYellow = [247, 233, 136];
// //let creamy = [240, backgroundColour, 217];
// this.red = [235, 75, 131];
// this.blue = [75, 181, 235];
// this.green = [76, 207, 168];
// this.redNose = [240, 53, 29];




// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face(eyes, mouths) {
  // these are state variables for a face
  // (your variables should be different!)
  this.darkGery = color("#262525");
    let yellow = color("#fac641");
    let darkYellow = color("#c99d2c");
    let brightYellow = color("#f7e988");
    //let creamy = [240, backgroundColour, 217];
    let red = color("#eb4b83");
    let blue = color("#4bb5eb");
    let green = color("#4ccfa8");
    let redNose = color("#f0351d");

    this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]
  // copied from face_code.js
  this.centerX = 0;
  this.eyeSizeY = 4;
  this.eyeSizeX = 3;
  this.eyeRadiX = 3/2;
  this.frogEyeX = -1;
  this.photoSizeX = 18;
  this.eyeDistance = 2;
  this.photoSizeY = 15;
  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    //********Draw the frog********
    // torso
    noStroke();
    fill(this.darkGery);
    rectMode(CENTER);
    rect(this.centerX, 4, 4, 4);

    // head
    noStroke();
    fill(this.darkGery);
    ellipse(this.frogEyeX, 1, this.eyeSizeX, this.eyeSizeY); // space for eyes
    ellipse(this.frogEyeX + this.eyeDistance, 1, this.eyeSizeX, this.eyeSizeY);
    ellipse(this.centerX, 2.5, this.eyeSizeX * 2, this.eyeSizeY * 0.75); // space for mouth

    fill(255); // eyes
    ellipse(this.frogEyeX / 0.9, 0.8, this.eyeSizeX * 0.6, this.eyeSizeY * 0.7); // left
    ellipse(this.frogEyeX * 0.9 + this.eyeDistance, 0.8, this.eyeSizeX * 0.6, this.eyeSizeY * 0.7);

    //*****eye expressions*****//
    if (eyes == 0) {
        // looking right
        push();
        noStroke(); // looking right
        fill(this.darkGery);
        ellipse(this.frogEyeX / 1.2, 0.8, this.eyeSizeX * 0.2, this.eyeSizeY * 0.4);
        ellipse(
          this.frogEyeX / 1.2 + this.eyeDistance * 1.1,
          0.8,
          this.eyeSizeX * 0.2,
          this.eyeSizeY * 0.4
      );
      pop();

  } else if (eyes == 1) {
      // wink eyes
      push();
      stroke(this.darkGery);
      strokeWeight(0.3);
      line(this.frogEyeX / 1.2, 0.8, (this.frogEyeX - this.eyeRadiX) * 0.5, 1); // left
      line(this.frogEyeX / 1.2, 0.8, (this.frogEyeX - this.eyeRadiX) * 0.5, 0.6);
      line(
          this.frogEyeX / 1.2 + this.eyeDistance * 1.1,
          0.7,
          this.frogEyeX / 1.2 + this.eyeDistance * 1.1,
          0.9
      ); // right
      pop();

  } else if (eyes == 2) {
      // smiley eyes
      push();
      noFill();
      stroke(this.darkGery);
      strokeWeight(0.3);
      angleMode(DEGREES);
      arc(this.frogEyeX / 0.9, 1, 0.5, 0.8, 180, 0);
      arc(this.frogEyeX * 0.9 + this.eyeDistance, 1, 0.5, 0.8, 180, 0);
      pop();

  }
      //*****mouth expressions*****//
      if (mouths == 0) {
        // smile
        noFill();
        stroke(255);
        strokeWeight(0.3);
        angleMode(DEGREES);
        arc(this.centerX, 2.8, 2, 1, 2, 110);
    } else if (mouths == 1) {
        // circle mouth
        noFill();
        stroke(255);
        strokeWeight(0.3);
        ellipse(this.centerX, 3, 0.8, 1);
    } else if (mouths == 2) {
        // laughing mouth
        fill(255);
        noStroke();
        angleMode(DEGREES);
        arc(this.centerX, 2.5, 1.5, 2, 0, 180, CHORD);
    }

    // console.log()
    // // head
    // ellipseMode(CENTER);
    // stroke(stroke_color);
    // fill(this.mainColour);
    // ellipse(segment_average(positions.chin)[0], 0, 3, 4);
    // noStroke();


    // // mouth
    // fill(this.detailColour);
    // ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

    // // eyebrows
    // fill( this.eyebrowColour);
    // stroke( this.eyebrowColour);
    // strokeWeight(0.08);
    // this.draw_segment(positions.left_eyebrow);
    // this.draw_segment(positions.right_eyebrow);

    // // draw the chin segment using points
    // fill(this.chinColour);
    // stroke(this.chinColour);
    // this.draw_segment(positions.chin);

    // fill(100, 0, 100);
    // stroke(100, 0, 100);
    // this.draw_segment(positions.nose_bridge);
    // this.draw_segment(positions.nose_tip);

    // strokeWeight(0.03);

    // fill(this.lipColour);
    // stroke(this.lipColour);
    // this.draw_segment(positions.top_lip);
    // this.draw_segment(positions.bottom_lip);

    // let left_eye_pos = segment_average(positions.left_eye);
    // let right_eye_pos = segment_average(positions.right_eye);

    // // eyes
    // noStroke();
    // let curEyeShift = 0.04 * this.eye_shift;
    // if(this.num_eyes == 2) {
    //   fill(this.detailColour);
    //   ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
    //   ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);

    //   // fill(this.mainColour);
    //   // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
    //   // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
    // }
    // else {
    //   let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
    //   let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

    //   fill(this.detailColour);
    //   ellipse(eyePosX, eyePosY, 0.45, 0.27);

    //   fill(this.mainColour);
    //   ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
    // }
   // fill(0)
   //ellipse(0,0, 0.5,0.5) center point
   //rect(-2,-2,4.5,4) sizing debug 
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
    this.eyes = map(settings[3], 0, 100, 0, 2);
    this.mouths = map(settings[4], 0, 100, 0, 2);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(4);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    settings[3] = map(this.eyes, 0, 2, 0, 100);
    settings[4] = map(this.mouths, 0, 2, 0, 100);
    return settings;
  }
}
