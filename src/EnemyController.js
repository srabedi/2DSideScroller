/**
 * EnemyController for defining array of enemy objects, and adds to Pixi stage
 */

class EnemyController {
    /**
     * constructor set to a timed interval; creates enemy objects and sets to array
     */
    constructor() {
        // create list of enemies
        // should have different sprites

        this.enemyList = []; // define enemies

        this.enemySpriteNameList = [
            "assets/vulture.png",
            "assets/sandman.png",
            "assets/lizard.png",
            "assets/electro.png",
            "assets/mysterio.png",
            "assets/venom.png",
            "assets/carnage.png",
            "assets/octavius.png",
            "assets/greenGoblin.png"
        ];


        window.setInterval(function() {
            // console.log(this.enemySpriteNameList.pop());
            // console.log(enemy);

            this.enemy = new PIXI.Sprite(PIXI.Texture.fromImage(this.enemySpriteNameList.pop()));
            this.enemy.anchor.set(0, 0);
            this.enemy.position.set(renderer.width * 1.3, renderer.height * Math.random());
            this.enemy.speed = 5;

            stage.addChildAt(this.enemy, 0);
            this.enemyList.push(this.enemy);

        }.bind(this), 4000);

    }

    /**
     * update method loops through enemy list, updating position and
     * deleting any defeated enemies
     */
    update() {
        this.enemyList.forEach(function (element, index, array) {
            //move enemy to the left
            element.position.x -= element.speed;

            // if enemy gets past left side of screen, delete
            if (element.position.x < -renderer.width * 0.3) {
                element.destroy();
                array.splice(0, 1);
            }

        });
    }
}