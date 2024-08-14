var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { FontKey, SceneKey } from "../shared/keys";
import { Scene } from "../shared/factories";
import { Player } from "../entities/player";
import { Background } from "../entities/background";
import { Building } from "../entities/building";
import { Collectable } from "../entities/collectable";
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameScene.prototype.init = function (params) {
        _super.prototype.init.call(this, params);
        this.points = 0;
    };
    GameScene.prototype.create = function () {
        _super.prototype.create.call(this);
        var tints = [16777215, 11184810, 6710886, 16777215, 11184810, 6710886, 2236962, 16777215];
        this.backgrounds = this.add.group();
        this.backgrounds.add(new Background(this, .8, 0, .25).setTint(tints[0]));
        this.backgrounds.add(new Background(this, .5, 0, .5).setTint(tints[1]));
        this.backgrounds.add(new Background(this, 0, 0, 1).setTint(tints[2]));
        this.backgrounds.add(new Background(this, 2, 4, .25).setTint(tints[3]));
        this.backgrounds.add(new Background(this, 2.4, 3, .5).setTint(tints[4]));
        this.backgrounds.add(new Background(this, 2.5, 2, 1).setTint(tints[5]));
        this.backgrounds.add(new Background(this, 3, 5, 2).setTint(tints[6]));
        this.cameras.main.setBackgroundColor(tints[7]);
        this.collectables = this.add.group();
        for (var i = 0; i < 12; i++) {
            this.collectables.add(new Collectable(this, 16 * i, 400, 16777215));
        }
        this.buildings = this.add.group();
        for (var i = 0; i < 12; i++) {
            this.buildings.add(new Building(this, 48 * i, 1, 0));
        }
        this.player = new Player(this).setPosition(0, 64);
        this.physics.add.collider(this.buildings, this.player);
        this.physics.add.overlap(this.player, this.collectables, this.handleCollect, null, this);
        this.button = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.buttonPressed = false;
        this.score = this.add
            .bitmapText(0, 0, FontKey.Round, "")
            .setOrigin(0)
            .setScrollFactor(0);
        this.cameras.main.startFollow(this.player, !0, 1, 0, -72, 0);
    };
    GameScene.prototype.update = function () {
        this.updatePlayer();
        this.updateCollectables();
        this.updateBackgrounds();
        this.updateBuildings();
        var text = "[".concat(this.points, " / ").concat(this.params.maxPoints, "] distance ").concat(this.cameras.main.scrollX.toFixed(0));
        this.score.text = text;
        if (this.player.y > 128) {
            this.lose();
        }
    };
    GameScene.prototype.updatePlayer = function () {
        var _a = this.params, gameSpeed = _a.gameSpeed, jumpHeight = _a.jumpHeight;
        var isDown = this.button.isDown || this.input.activePointer.isDown;
        this.player.walk(gameSpeed);
        if (isDown) {
            if (!this.buttonPressed)
                this.player.jump(jumpHeight);
            this.buttonPressed = true;
        }
        else if (!this.player.touchingDown && this.player.body.velocity.y < 0) {
            this.player.body.velocity.y /= 2;
        }
        else {
            this.buttonPressed = false;
        }
    };
    GameScene.prototype.updateBackgrounds = function () {
        this.backgrounds.children.entries.forEach(function (background) { return background.update(); });
    };
    GameScene.prototype.updateBuildings = function () {
        this.buildings.children.entries.forEach(function (building) { return building.update(); });
    };
    GameScene.prototype.updateCollectables = function () {
        var _this = this;
        this.collectables.children.entries.forEach(function (collectable) {
            collectable.update();
            var c = collectable;
            if (Math.abs(_this.player.x - c.x) < 8
                && Math.abs(_this.player.y - c.y) < 8) {
                _this.handleZaeblo(c);
            }
        });
    };
    GameScene.prototype.handleZaeblo = function (collectable) {
        collectable.reset();
        this.points++;
        if (this.points >= this.params.maxPoints) {
            this.win();
        }
    };
    // TODO:
    GameScene.prototype.handleCollect = function (t, s) {
        s.reset();
    };
    GameScene.prototype.lose = function () {
        var distance = this.cameras.main.scrollX.toFixed(0);
        var text = "Don't be upset\nYou will succeed next time\n\n\ndistance: " + distance;
        this.scene.start(SceneKey.Over, {
            message: text,
            finnised: !1
        });
    };
    GameScene.prototype.win = function () {
        var distance = this.cameras.main.scrollX.toFixed(0);
        var text = "CONGRATULATIONS\nyou collects all colors\nI WiSh yOu a cOlLoRfUl liFe\n\n\ndistance: " + distance;
        this.scene.start(SceneKey.Over, {
            message: text,
            finnised: !0
        });
    };
    return GameScene;
}(Scene(SceneKey.Game, {
    gameSpeed: 100,
    jumpHeight: 220,
    maxPoints: 50,
})));
export { GameScene };
//# sourceMappingURL=game.js.map