let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }, // No gravity for this game
            debug: false // Set to true to see physics bodies
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let lives = 10; // Initialize lives to 10
let livesText;
let endGameText; // Variable to store the "End Game" sign
let resetButton; // Variable for the reset button

function preload() {
    this.load.image("ball", "assets/ball.png"); // Ensure the file path is correct
    this.load.image("button", "assets/reset-button.png"); // Add a reset button image
}

function create() {
    // Add physics-enabled ball sprite
    ball = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, "ball").setCollideWorldBounds(true);
    ball.setDisplaySize(ballSize, ballSize); // Set the display size of the ball
    ball.body.setBounce(1, 1); // Make the ball bounce when it hits boundaries

    // Enable ball to detect mouse interactions
    ball.setInteractive();
    ball.on('pointerdown', handleBallClick); // Add a click event listener

    // Display lives on the screen
    livesText = this.add.text(20, 20, `Lives: ${lives}`, { font: "24px Arial", fill: "#ffffff" });

    // Initialize "End Game" sign but keep it invisible
    endGameText = this.add.text(WIDTH / 2, HEIGHT / 2, 'Game Over', { 
        font: "48px Arial", 
        fill: "#ff0000" 
    }).setOrigin(0.5).setVisible(false);

    // Add a reset button
    resetButton = this.add.sprite(WIDTH / 2, HEIGHT / 2 + 100, "button").setInteractive();
    resetButton.on('pointerdown', resetGame); // Add click event listener for reset
    resetButton.setVisible(false); // Make it invisible initially
}

function update() {
    // Add logic for other features (e.g., lives system or end game)
}

function handleBallClick(pointer) {
    // Calculate direction away from the mouse click
    const angle = Phaser.Math.Angle.Between(pointer.x, pointer.y, ball.x, ball.y);
    const speed = 300; // Adjust speed value to control the bounce

    // Set velocity in the direction away from the pointer
    ball.body.setVelocity(
        Math.cos(angle) * speed, // x velocity
        Math.sin(angle) * speed  // y velocity
    );

    // Add one life
    lives++;
    livesText.setText(`Lives: ${lives}`);
}

function resetGame() {
    // Reset all game variables to their initial values
    ballSize = 80;
    lives = 10;

    // Reset ball position and size
    ball.setPosition(WIDTH / 2, HEIGHT / 2);
    ball.setDisplaySize(ballSize, ballSize);
    ball.body.setVelocity(0, 0); // Stop ball movement

    // Update lives text
    livesText.setText(`Lives: ${lives}`);

    // Hide "Game Over" sign and reset button
    endGameText.setVisible(false);
    resetButton.setVisible(false);

    // Resume the game scene
    this.scene.resume();
}
