function drawPlayer () {
    led.plot(playerX, 4)
}
// Move left
input.onButtonPressed(Button.A, function () {
    if (playerX > 0) {
        playerX += 0 - 1
    }
})
function moveEnemy () {
    led.unplot(enemyX, enemyY)
    enemyY += 1
}
function shoot () {
    if (bulletY == -1) {
        bulletX = playerX
        bulletY = 3
        music.playTone(784, music.beat(BeatFraction.Sixteenth))
    }
}
// Shoot
input.onButtonPressed(Button.AB, function () {
    shoot()
})
// Move right
input.onButtonPressed(Button.B, function () {
    if (playerX < 4) {
        playerX += 1
    }
})
function moveBullet () {
    if (bulletY >= 0) {
        led.unplot(bulletX, bulletY)
        bulletY += 0 - 1
        if (bulletY < 0) {
            bulletY = -1
        }
    }
}
function spawnEnemy () {
    enemyX = randint(0, 4)
    enemyY = 0
}
let score = 0
let enemyY = 0
let enemyX = 0
let bulletY = 0
let bulletX = 0
let playerX = 0
playerX = 2
bulletX = -1
bulletY = -1
basic.clearScreen()
// Start game
spawnEnemy()
basic.forever(function () {
    basic.clearScreen()
    // Draw enemy
    led.plot(enemyX, enemyY)
    // Draw bullet
    if (bulletY >= 0) {
        led.plot(bulletX, bulletY)
    }
    // Draw player
    drawPlayer()
    // Move enemy (slow fall)
    if (input.runningTime() % 600 < 50) {
        moveEnemy()
    }
    // Move bullet (faster)
    if (input.runningTime() % 200 < 50) {
        moveBullet()
    }
    // Bullet hits enemy
    if (bulletX == enemyX && bulletY == enemyY) {
        score += 1
        game.addScore(1)
        bulletY = -1
        spawnEnemy()
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
    }
    // Enemy hits player
    if (enemyY == 4 && enemyX == playerX) {
        music.playTone(131, music.beat(BeatFraction.Whole))
        game.gameOver()
    }
    // Enemy reaches bottom (missed)
    if (enemyY > 4) {
        spawnEnemy()
    }
    basic.pause(50)
})
