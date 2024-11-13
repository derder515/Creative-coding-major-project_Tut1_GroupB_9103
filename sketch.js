// Iteration 1
// ChatGPT helps review and translate comments.

let sky, sea, reflection, main; // Image variables for different sections
let size = 10; // Size of each rectangle
let skyRects = []; // Array to store rectangles for the sky section
let seaRects = []; // Array to store rectangles for the sea section
let mainRects = []; // Array to store rectangles for the main section
let reflectionRects = []; // Array to store rectangles for the reflection section

function preload() {
    // Preload images for each section
    sky = loadImage('assets/sky.jpg');
    sea = loadImage('assets/sea.jpg');
    reflection = loadImage('assets/reflection.jpg');
    main = loadImage('assets/main.jpg');
}

function windowResized() {
    // Adjust canvas size and reinitialize rectangles when the window is resized
    resizeCanvas(windowWidth, windowHeight);
    rectInit();
}

function setup() {
    // Set up the canvas and drawing parameters
    createCanvas(600, 500);
    noFill(); // Disable default fill
    textAlign(CENTER, CENTER); // Center align text
    angleMode(DEGREES); // Use degrees for angle calculations
    rectMode(CENTER); // Draw rectangles from their center
    noStroke(); // Disable stroke (borders)
    rectInit(); // Initialize rectangles based on the image data
}

function rectInit() {
    // Resize images to fit the canvas and load their pixel data
    sky.resize(width, height);
    sea.resize(width, height);
    reflection.resize(width, height);
    main.resize(width, height);
    
    sky.loadPixels();
    sea.loadPixels();
    reflection.loadPixels();
    main.loadPixels();
    
    // Clear previous rectangles
    skyRects = [];
    seaRects = [];
    mainRects = [];
    reflectionRects = [];

    // Loop through the canvas with step size half the rectangle size
    for (let x = 0; x < width; x += size / 2 ) {
        for (let y = 0; y < height; y += size / 2) {
            let index = (x + y * width) * 4; // Calculate pixel array index

            // Create rectangles for the sky section if the pixel is not transparent
            if (sky.pixels[index + 3] > 0) {
                skyRects.push(new Rect(
                    x, y,
                    sky.pixels[index],        // Red channel
                    sky.pixels[index + 1],    // Green channel
                    sky.pixels[index + 2],    // Blue channel
                    sky.pixels[index + 3],    // Alpha channel
                    "sky"                     // Section name
                ));
            }

            // Create rectangles for the sea section if the pixel is not transparent
            if (sea.pixels[index + 3] > 0) {
                seaRects.push(new Rect(
                    x, y,
                    sea.pixels[index],
                    sea.pixels[index + 1],
                    sea.pixels[index + 2],
                    sea.pixels[index + 3],
                    "sea"
                ));
            }

            // Create rectangles for the reflection section if the pixel is not transparent
            if (reflection.pixels[index + 3] > 0) {
                reflectionRects.push(new Rect(
                    x, y,
                    reflection.pixels[index],
                    reflection.pixels[index + 1],
                    reflection.pixels[index + 2],
                    reflection.pixels[index + 3],
                    "reflection"
                ));
            }

            // Create rectangles for the main section if the pixel is not transparent
            if (main.pixels[index + 3] > 0) {
                mainRects.push(new Rect(
                    x, y,
                    main.pixels[index],
                    main.pixels[index + 1],
                    main.pixels[index + 2],
                    main.pixels[index + 3],
                    "main"
                ));
            }
        }
    }
}

function draw() {
    background(255); // Set background color to white

    // Draw all rectangles for the sky section
    for (let i = 0; i < skyRects.length; i++) {
        skyRects[i].move(); // Optional movement logic
        skyRects[i].drawRect(); // Draw rectangle
    }

    // Draw all rectangles for the sea section
    for (let i = 0; i < seaRects.length; i++) {
        seaRects[i].move();
        seaRects[i].drawRect();
    }

    // Draw all rectangles for the reflection section
    for (let i = 0; i < reflectionRects.length; i++) {
        reflectionRects[i].move();
        reflectionRects[i].drawRect();
    }

    // Draw all rectangles for the main section
    for (let i = 0; i < mainRects.length; i++) {
        mainRects[i].move();
        mainRects[i].drawRect();
    }

    // Print the total number of rectangles in all sections
    print(skyRects.length + seaRects.length + reflectionRects.length + mainRects.length);
}

// Class representing a rectangle
class Rect {
    constructor(x, y, r, g, b, a, part) {
        this.x = x; // X-coordinate
        this.y = y; // Y-coordinate
        this.r = r; // Red value
        this.g = g; // Green value
        this.b = b; // Blue value
        this.a = a; // Alpha (transparency) value
        this.part = part; // Section the rectangle belongs to (sky, sea, etc.)
    }

    move() {
        // Movement logic for the rectangle (can be customized)
    }

    drawRect() {
        push(); // Save current drawing settings
        noStroke(); // Disable stroke for this rectangle
        translate(this.x, this.y); // Move to the rectangle's position

        // Apply a rotation based on the section type
        if (this.part == "sky" || this.part == "sea") {
            rotate(45); // Rotate by 45 degrees for sky and sea
        } else {
            rotate(0); // No rotation for other sections
        }

        fill(this.r, this.g, this.b, this.a / 2); // Set fill color and transparency
        rect(0, 0, size, size); // Draw the rectangle
        pop(); // Restore previous drawing settings
    }
}
