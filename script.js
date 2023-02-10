let playerState = "dizzy"; // State/row on the sprite sheet
const dropdown = document.getElementById("animations"); // Get the dropdown menu from HTML
dropdown.addEventListener("change", function(event) { // Listen for the user to choose an option from the dropdown menu
    playerState = event.target.value; // When the option is chosen, set playerState to the value of the option from HTML
    
});

const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d"); // Define the context for the canvas (e.g. 2D drawing), contains functions to draw images
const CANVAS_WIDTH = canvas.width = 600; // Set global variables for canvas size (in line with the CSS)
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image(); // Create an image for the player (similar to img HTML tag)
playerImage.src = "resources/shadow_dog.png"; // Sprite source
const spriteWidth = 575; // Image width / colums od sprites
const spriteHeight = 523; // Image height / rows of sprites

let gameFrame = 0; // Register game frames
const slowFrames = 4; // Slow down the animation
const spriteAnimations = []; // Main container for animation data
const animationStates = [ // Maps the sprite sheet to objects with 2 properties: name=row, frame=column
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "gethit",
        frames: 4,
    }
];

// forEach() method calls a function for each element of the array (for each of the above objects)
animationStates.forEach(function(state, index) { // "state" is a placeholder for each element of the array (each object), "index" is the element's index
    let frames = { // A new object
    loc: [], // Storing the exact locations of each sprite position in each row (in px)
    }
    for (let i = 0; i < state.frames; i++) { // A loop that iterates over the number of frames property of objects in the animationStates array
        
        // First go from left to right in each row
        let positionX = i * spriteWidth; // Iterate over positions in each row of the sprite sheet
        
        // Then go to the next row
        let positionY = index * spriteHeight; // Iterate over objects animationStates objects (rows on the sprite sheet)
        frames.loc.push({x: positionX, y: positionY}); // push() method inserts the object with x and y values into the loc[] array
    }
    
    // Create new set of key-value pairs in the previously empty spriteAnimations array
    spriteAnimations[state.name] = frames; // Set key to state.name from animationStates and value to frames object with loc[] in this loop
});
console.log(spriteAnimations);

// The code above creates the following data structure:
// Array(0)
// idle: -> 1st row
//      loc: Array(7) -> 7 positions in the 1st row
//          0: {x: 0, y: 0} -> x=horizontal position, y=vertical position
//          1: {x: 575, y: 0}
//          2: {x: 1150, y: 0}
//          3: {x: 1725, y: 0}
//          4: {x: 2300, y: 0}
//          5: {x: 2875, y: 0}
//          6: {x: 3450, y: 0}
// jump:
//      loc: Array(7)
//          0: {x: 0, y: 523}
//          1: {x: 575, y: 523}
//          2: {x: 1150, y: 523}
//          3: {x: 1725, y: 523}
//          4: {x: 2300, y: 523}
//          5: {x: 2875, y: 523}
//          6: {x: 3450, y: 523}
// etc.

function animate() { // Custom function to animate sprite (animation loop every frame)
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // First clear the entire canvas with the built-in function (pass in coordinates)
    
    // The following formula allows to cycle through the number of positions/animations in each row every 4 frames (slowed down)
    let position = Math.floor(gameFrame/slowFrames) % spriteAnimations[playerState].loc.length; // length=length of the loc[] array
    let frameX = spriteWidth * position; // Get the horizontal position based on the above formula (index of the loc[] array * spritWidth in px)
    let frameY = spriteAnimations[playerState].loc[position].y; // Get the vertical position by accessing the y value in the array

    // context.drawImage(image, sx, sy, sq, sh, dx, dy, dw, dh);
    // Accepts 9 args: image, coordinates to crop the img, coordinates to place the img on canvas
    // Multiplying sx allows to move horizontally on the sprite sheet
    // Multiplying sy allows to move vertically on the sprite sheet
    context.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw a cropped image

    gameFrame++; // Count game frames
    requestAnimationFrame(animate); // Call the parent function recursively, looping the animation
}
animate(); // Call the above function