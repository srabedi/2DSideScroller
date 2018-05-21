/**
 * main.js
 */

var stage = new PIXI.Container();
var player;
var enemyController;

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
    renderer.backgroundImage =  "../bin/assets/bg-far.png";

    enemyController = new EnemyController();
    player = new Player();

    renderer.render(stage);
    loop();
}

function loop() {

    enemyController.update();
    player.update();

    WebProjectile.list.map((element) => {
        element.update();
    });

    requestAnimationFrame(loop);
    renderer.render(stage);

    // check for any collisions between web and enemy

}