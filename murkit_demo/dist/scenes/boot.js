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
import { GAME_HEIGHT, GAME_WIDTH } from '../shared/constants';
import { Scene } from "../shared/factories";
import { EntityKey, EntityAnimation, SceneKey, UiKey, AudioKey, FontKey } from "../shared/keys";
var maxPoints = 50;
var BootScene = /** @class */ (function (_super) {
    __extends(BootScene, _super);
    function BootScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BootScene.prototype.preload = function () {
        this.load.audio(AudioKey.MainTheme, "assets/audio/main_theme.mp3");
        this.load.image(UiKey.Logo, "assets/images/murkit_logo.png");
        this.load.image(UiKey.Title, "assets/images/title.png");
        this.load.image(UiKey.UiMenu, "assets/images/ui_menu.png");
        this.load.spritesheet(EntityKey.Building, "assets/images/buildings.png", { frameWidth: 48, frameHeight: 32 });
        this.load.spritesheet(EntityKey.BuildingTop, "assets/images/building_tops.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet(EntityKey.Player, "assets/images/player.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet(EntityKey.Block, "assets/images/blocks.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet(EntityKey.Decoration, "assets/images/decorations.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet(EntityKey.Background, "assets/images/backgrounds.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(EntityKey.Collectable, "assets/images/collectables.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet(EntityKey.Object, "assets/images/objects.png", { frameWidth: 16, frameHeight: 16 });
        this.loadFont(FontKey.Minogram, 'minogram_6x10');
        this.loadFont(FontKey.Round, 'round_6x6');
        this.loadFont(FontKey.Square, 'square_6x6');
        this.loadFont(FontKey.Thick, 'thick_8x8');
    };
    BootScene.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.image(0, 0, UiKey.Logo)
            .setOrigin(0.5, 0.5)
            .setPosition(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 16)
            .setTint(0xddcccc);
        this.add.bitmapText(0, 0, FontKey.Square, "demo").setOrigin(0, 0).setTint(0x404040);
        this.add.bitmapText(96, 100, FontKey.Round, "collect ".concat(maxPoints, " panacats")).setOrigin(0.5);
        this.add.bitmapText(96, 112, FontKey.Round, "press any key").setOrigin(0.5);
        this.sound.add(AudioKey.MainTheme, {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: -600,
            seek: 10,
            loop: true,
            delay: 0
        }).play();
        this.loadAnimation(EntityAnimation.PlayerWalk, EntityKey.Player, [1, 2, 3, 0], 16);
        this.loadAnimation(EntityAnimation.PlayerIdle, EntityKey.Player, [0, 0, 3, 3], 8);
        this.loadAnimation(EntityAnimation.PlayerJump, EntityKey.Player, [1, 1, 2, 2], 16, 0);
        this.loadAnimation(EntityAnimation.CollectablePillIdle, EntityKey.Collectable, [0, 1], 8);
        this.loadAnimation(EntityAnimation.CollectablePillDie, EntityKey.Collectable, [2, 3], 8);
        this.loadAnimation(EntityAnimation.CollectableDonutIdle, EntityKey.Collectable, [4], 8);
        this.loadAnimation(EntityAnimation.CollectableBeanIdle, EntityKey.Collectable, [5], 8);
        this.loadAnimation(EntityAnimation.CollectablePanacatIdle, EntityKey.Collectable, [6, 7], 8);
        setTimeout(function () {
            _this.input.keyboard.on('keydown', function () { return _this.startGame(); });
            _this.input.on('pointerdown', function () { return _this.startGame(); });
        }, 5000);
    };
    BootScene.prototype.startGame = function () {
        this.scene.start(SceneKey.Game, { maxPoints: maxPoints });
    };
    BootScene.prototype.loadAnimation = function (key, assetKey, frames, rate, repeat) {
        if (rate === void 0) { rate = 10; }
        if (repeat === void 0) { repeat = -1; }
        this.anims.create({
            key: key,
            repeat: repeat,
            frameRate: rate,
            frames: this.anims.generateFrameNames(assetKey, { frames: frames }),
        });
        return this;
    };
    BootScene.prototype.loadFont = function (assetKey, filename) {
        this.load.bitmapFont(assetKey, "assets/fonts/".concat(filename, ".png"), "assets/fonts/".concat(filename, ".xml"));
        return this;
    };
    return BootScene;
}(Scene(SceneKey.Boot, {})));
export { BootScene };
//# sourceMappingURL=boot.js.map