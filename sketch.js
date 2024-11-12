// Initial Concept
// ChatGPT helps review and translate comments.

let bg;
let size = 20; // Size of each rectangle block

function preload() {
    // Preload the background image
    bg = loadImage('assets/bg.jpg');
}

function setup() {
    // Set up canvas size and basic drawing parameters
    createCanvas(640, 454);
    noFill(); // Disable shape fill by default
    textAlign(CENTER, CENTER); // Center text alignment
    angleMode(DEGREES); // Use degrees for angle calculations
    rectMode(CENTER); // Draw rectangles from their center

    // Resize the background image to fit the canvas
    bg.resize(width, height);
    noStroke(); // Disable borders for shapes
    blendMode(DARKEST); // Apply a dark blend mode to enhance visual effects
}

function draw() {
    // Set the background color to white
    background(255);

    // Load pixel data from the background image
    bg.loadPixels();

    // Loop through the canvas with a step size of 4 pixels
    for (let x = 0; x < width; x += 4) {
        for (let y = 0; y < height; y += 4) {
            let index = (y * width + x) * 4; // Calculate the index in the pixel array
            drawRect(
                x,
                y,
                bg.pixels[index],      // Red channel
                bg.pixels[index + 1],  // Green channel
                bg.pixels[index + 2],  // Blue channel
                bg.pixels[index + 3]   // Alpha (transparency) channel
            );
        }
    }
    noLoop(); // Stop the draw loop to render only once
}

// Function to draw a single rectangle
function drawRect(x, y, r, g, b, a) {
    push(); // Save current drawing settings
    fill(r, g, b, a / 5); // Set fill color with reduced transparency for a softer effect
    translate(x, y); // Move to the specified position
    rotate(45); // Rotate rectangle by 45 degrees
    rect(0, 0, size, size); // Draw the rectangle
    pop(); // Restore previous drawing settings
}