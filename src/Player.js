/**
 * Player class
 */
class Player {
    /**
     * Player constructor. Instantiates sprite, sets keyboard state and codes,
     * has class variables for direction, speed, and cooldown.
     */
    constructor() {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/spidergirl.png"].texture);

        this.sprite.anchor.set(0, 0);
        this.sprite.position.set(renderer.width * 0.2, renderer.height * 0.4);
        // this.sprite.scale.set(0.4, 0.4);


        // setting keyboard state and code for keyboard input
        // initially, keyStates are set to false because no keys pressed at initialzation.
        this.keyState = {32: false, 37: false, 38: false, 39: false, 40: false};
        // keyCodes are mapping keyboard buttons to the direction:
        //  37 is left arrow, 38 is up arrow, 39 is right arrow, 40 is down arrow
        //  -1 value used to move to left or up, +1 value for right or down
        this.keyCodes = {37: -1, 38: -1, 39: 1, 40: 1};

        // horizontal direction:
        // set to 1 if right button pressed, -1 if left pressed, 0 otherwise
        this.directionX = 0;

        // vertical direction:
        // set to 1 if up button pressed, -1 if down pressed, 0 otherwise
        this.directionY = 0;

        // player speed
        this.speed = 10;

        // projectile firing speed
        this.fireSpeed = 10;
        // incrementing counter that limits firing speed
        this.fireCooldown = 0;

        stage.addChild(this.sprite);

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    /**
     * update method called in main.js loop.
     *  increments player position as needed, and keeps in screen bounds
     *  also checks fire logic through updateFIre method.
     */
    update() {
        let nextX = this.sprite.position.x + this.directionX * this.speed;
        let nextY = this.sprite.position.y + this.directionY * this.speed;

        // Keeps player in screen bounds
        if (nextX > 0 && nextX < renderer.width) {
            this.sprite.position.x = nextX;
        }
        if (nextY > 0 && nextY < renderer.height) {
            this.sprite.position.y = nextY;
        }

        this.updateFire();
    }

    /**
     * Instantiates web object if cooldown time met and spacebar pressed
     */
    updateFire() {
        // increment cooldown when player is not firing
        if (this.fireCooldown < this.fireSpeed) {
            this.fireCooldown++;
        }

        // Checks if spacebar hit, and cooldown met - then creates web and resets cooldown
        // keystate[32] represents spacebar key
        if (this.keyState[32] && this.fireCooldown >= this.fireSpeed) {
            let web = new WebProjectile(this.sprite.position.x + 70, this.sprite.position.y + 25);
            this.fireCooldown = 0;
        }
    }

    /**
     * Checks if directional keys pressed and sets direction var accordingly
     * @param key that user pressed
     */
    onKeyDown(key) {
        // set keyCode to true for pressed key
        this.keyState[key.keyCode] = true;
        // if else that first checks x direction keys - left and right,
        // then y direction keys - up and right.
        // triple equals comparison for type safety - JS specific
        if (key.keyCode === 37 || key.keyCode === 39) {
            this.directionX = this.keyCodes[key.keyCode];
        } else if (key.keyCode === 38 || key.keyCode === 40) {
            this.directionY = this.keyCodes[key.keyCode];
        }

    }

    /**
     * Checks if directional keys released and sets direction var accordingly
     * @param key that user released
     */
    onKeyUp(key) {
        this.keyState[key.keyCode] = false;

        // logic for left and right buttons -
        // if left and not right, else if right and not left, else no button being pressed
        if (!this.keyState[37] && this.keyState[39]) {
            this.directionX = this.keyCodes[39];
        } else if (this.keyState[37] && !this.keyState[39]) {
            this.directionX = this.keyCodes[37];
        } else {
            this.directionX = 0;
        }

        // logic for up and down buttons -
        // if up and not right, else if down and not up, else no button being pressed
        if (!this.keyState[38] && this.keyState[40]) {
            this.directionY = this.keyCodes[40];
        } else if (this.keyState[38] && !this.keyState[40]) {
            this.directionY = this.keyCodes[38];
        } else {
            this.directionY = 0;
        }

    }


}