let _list = new Array();

class WebProjectile {
    static get list() { return _list; }
    static set list(value) { _list = value;}

    constructor(x, y) {
        // instantiate sprite to web.png asset
        this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage("assets/web.png"));

        // set anchor point for png asset,
        // and position to 50 px to the right of player's left edge
        this.sprite.anchor.set(0, 0);
        this.sprite.position.set(x + 50, y);


        // set speed for right movement
        this.speed = 20;

        // push this new web object to list
        WebProjectile.list.push(this);


        // Add to Pixi stage for rendering
        stage.addChild(this.sprite);
    }

    update () {
        this.sprite.position.x += this.speed;

        // if web has reached right edge of screen,
        // delete object and its former space in the list
        if (this.sprite.position.x > renderer.width * 1.1) {
            this.sprite.destroy();
            WebProjectile.list.splice(WebProjectile.list.indexOf(this), 1);

        }
    }

}