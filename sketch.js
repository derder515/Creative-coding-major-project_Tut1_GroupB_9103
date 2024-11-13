// Initial Concept2
// ChatGPT helps review and translate comments.

let bg;
let main;
let size = 20;
let rects = [];
let mainRects = [];

function preload() {
    // Preload images for background and main content
    bg = loadImage('bg.jpg');
    main = loadImage('main.png');
}

function windowResized() {
    // Resize the canvas when the window size changes and reinitialize rectangles
    resizeCanvas(windowWidth, windowHeight);
    initializeRects();
}

function setup() {
    // Set up the canvas and drawing parameters
    createCanvas(600, 500);
    angleMode(DEGREES); // Use degrees for rotations
    rectMode(CENTER); // Set rectangle mode to center
    noStroke(); // Disable stroke for shapes
    initializeRects();
}

function initializeRects() {
    // Resize images to fit canvas dimensions and load pixel data
    bg.resize(width, height);
    main.resize(width, height);
    bg.loadPixels();
    main.loadPixels();

    // Get the pixel indices of a specific RGB value of a image, and draw rectangles
    // We got the code reference this website:
    // https://editor.p5js.org/iscodd/sketches/7-_pQbU9G 
    for (let x = 0; x < width; x += 4) {
        for (let y = 0; y < height; y += 4) {
            let index = (y * width + x) * 4
            let part
            // Divided
            if (y < height * 0.574) {
                part = "sky"
            } else {
                part = "sea"

            }
            rects.push(new Rect(x,
                y,
                bg.pixels[index],
                bg.pixels[index + 1],
                bg.pixels[index + 2],
                bg.pixels[index + 3],
                part
            ))

            if (main.pixels[index + 3] > 0) {
                mainRects.push(new Rect(x,
                    y,
                    main.pixels[index],
                    main.pixels[index + 1],
                    main.pixels[index + 2],
                    main.pixels[index + 3],
                    "main"
                ))
            }

        }
    }
}

function draw() {
    // Set the background to white for each frame
    background(255);

    // Draw all background rectangles
    for (let rect of rects) {
        rect.move(); // Update the position if applicable
        rect.draw(); // Draw the rectangle
    }

    // Draw all main image rectangles
    for (let rect of mainRects) {
        rect.move(); // Update the position if applicable
        rect.draw(); // Draw the rectangle
    }
}

class Rect {

    constructor(x, y, r, g, b, a, part) {
        this.x = x; // X-coordinate of the rectangle
        this.y = y; // Y-coordinate of the rectangle
        this.r = r; // Red color value
        this.g = g; // Green color value
        this.b = b; // Blue color value
        this.a = a; // Alpha (transparency) value
        this.part = part; // Part of the image ('sky', 'sea', or 'main'）
    }

    draw() {
        push();
        noStroke();
        translate(this.x, this.y); // Move to the rectangle's position
        rotate(45);
        fill(this.r, this.g, this.b, this.a / 5); // Set fill color with reduced alpha for transparency
        rect(0, 0, size, size); // Draw the rectangle
        pop();
    }

    move() {
    }
}