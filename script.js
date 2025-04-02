let WIDTH = 800;
let HEIGHT = 600;

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

    // Enable ball to detect mouse interactions
    ball.setInteractive();
    ball.on('pointerdown', increaseSpeedAndLives); // Add a click event listener

    // Display lives on the screen
    livesText = this.add.text(20, 20, `Lives: ${lives}`, { font: "24px Arial", fill: "#ffffff" });
}

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed *= -1;
        adjustBall(); // Increase speed and reduce ball size
        decreaseLives();
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1;
        adjustBall();// Increase speed and reduce ball size
        decreaseLives();
    }
}

function adjustBall() {
    // Increase the speed slightly
    yspeed *= 1.1;
    xspeed *= 1.1;

    // Decrease ball size with a minimum limit to avoid disappearing
    ballSize = Math.max(20, ballSize - 5);
    ball.setDisplaySize(ballSize, ballSize); // Update size of the ball
}

function increaseSpeedAndLives() {
    // Increase the ball's speed
    yspeed *= 1.2;
    xspeed *= 1.2;

    // Add one life
    lives++;
    livesText.setText(`Lives: ${lives}`);
}

function decreaseLives() {
    if (lives > 0) {
        lives--;
        livesText.setText(`Lives: ${lives}`);
    } else {
        console.log("Game Over");
        this.scene.pause();
    }
}
