//project: frogger game
//author: yash
//render function for player
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//in order to reset the object position to initial one
Object.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
}

// Enemies our player must avoid
var Enemy = function(enemyX,enemyY) {
    // Variables applied to each of our instances go here

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = enemyX;
    this.y = enemyY;
    this.speed = (Math.random() * 250) + 110;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >500) {
        this.x = 0;
    }
    else if(this.x <= 500) {
        this.x = this.x + (this.speed *dt);
    }
    //to reset on colliding with the enemy
    if(player.x >= this.x - 35 && player.x <= this.x + 35 && player.y >= this.y - 25 && player.y <= this.y + 25) {
        this.reset();
        console.log('Lose!');
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Place the player object in a variable called player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}


//update function for player
Player.prototype.update = function() {
    console.log(this.x, this.y);
}

//handleInput function
Player.prototype.handleInput = function(e) {
    this.keyHit = e;
    if(this.keyHit === 'up' && this.y >= 0) {
        this.y = this.y - 50;
    }
    else if(this.keyHit === 'down' && this.y <400) {
        this.y = this.y + 50;
    }
    else if(this.keyHit === 'left' && this.x > 0) {
        this.x = this.x - 50;
    }
    else if(this.keyHit === 'right' && this.x < 400) {
        this.x = this.x + 50;
    }

//resetting the player position on winning i.e. reaching the river
    if(this.y < 0) {
        this.reset();
        //to check whether the player succesfully crossed the path
        console.log('Win!');
        window.alert('You Win!');
    }
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
//for pushing new enemies
allEnemies.push(new Enemy(-10, 50), new Enemy(-5, 105), new Enemy(-5, 160), new Enemy(-10, 200), new Enemy(-5, 250));

// Now instantiate your objects.

//instantiating a new player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});