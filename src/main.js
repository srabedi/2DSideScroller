/**
 * main.js
 */

var stage = new PIXI.Container();
var player;
var enemyController;
bump = new Bump(PIXI);

// add assets into PIXI
PIXI.loader.add([
    "assets/vulture.png",
    "assets/sandman.png",
    "assets/lizard.png",
    "assets/electro.png",
    "assets/mysterio.png",
    "assets/venom.png",
    "assets/carnage.png",
    "assets/octavius.png",
    "assets/greenGoblin.png",
    "assets/spiderVenomized.png",
    "assets/spidergirl.png"
]).load(init);

function init() {
    var farTexture = PIXI.Texture.fromImage("assets/bg-far.png");
    far = new PIXI.Sprite(farTexture);
    far.position.x = 0;
    far.position.y = 0;
    stage.addChild(far);

    enemyController = new EnemyController();
    player = new Player();

    renderer.render(stage);
    loop();
}

function loop() {

    player.update();
    enemyController.update();

    WebProjectile.list.map((element) => {
        element.update();


        // check for collision between any web and enemy
        enemyController.enemyList.forEach(function (enemyInList, index, array) {
            if (bump.hit(element.sprite, enemyInList)) {
                element.sprite.destroy();
                WebProjectile.list.splice(WebProjectile.list.indexOf(this), 1);

                enemyInList.destroy();
                array.splice(0, 1);
            }
        });



    });



    // check for any collisions between web and enemy

    requestAnimationFrame(loop);
    renderer.render(stage);


}