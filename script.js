let WIDTH = 800;
let HEIGHT = 600;

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed *= -1; // Reverse direction
        enhanceBall(); // Call function to increase speed and decrease size
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1; // Reverse direction
        enhanceBall(); // Call function to increase speed and decrease size
    }
}

function enhanceBall() {
    // Increase the speed slightly
    yspeed *= 1.1; // Increase vertical speed by 10%
    xspeed *= 1.1; // Increase horizontal speed by 10%

    // Decrease the size of the ball
    ballSize = Math.max(20, ballSize - 5); // Ensure the size doesn't go below 20
    ball.setDisplaySize(ballSize, ballSize); // Update the display size of the ball
}


const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 0.5;
let xspeed = 1.0;
let lives = 10; // Initialize lives to 10
let livesText;

function preload() {
    this.load.image("ball", "assets/ball.png"); // Ensure the file path is correct
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // Create ball sprite
    ball.setDisplaySize(ballSize, ballSize); // Set the display size of the ball

    // Display lives on the screen
    livesText = this.add.text(20, 20, `Lives: ${lives}`, { font: "24px Arial", fill: "#ffffff" });
}

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed *= -1;
        decreaseLives(); // Call function to decrease lives
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1;
        decreaseLives(); // Call function to decrease lives
    }
}

function decreaseLives() {
    if (lives > 0) {
        lives--; // Decrease lives by 1
        livesText.setText(`Lives: ${lives}`); // Update the display
    } else {
        // Game over logic
        console.log("Game Over");
        this.scene.pause(); // Pause the game (optional)
    }
}
