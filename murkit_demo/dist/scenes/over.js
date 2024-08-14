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
import { Background } from "../entities/background";
import { House } from "../entities/house";
import { random } from "../shared/utils";
var OverScene = /** @class */ (function (_super) {
    __extends(OverScene, _super);
    function OverScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OverScene.prototype.init = function (params) {
        _super.prototype.init.call(this, params);
        this.message = params.message;
        this.finnised = params.finished;
    };
    OverScene.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.tint = 15486564;
        this.tints = [16777215, 11184810, 6710886, 16777215, 11184810, 6710886, 2236962];
        this.scrollA = -128;
        this.scrollB = -128;
        this.backgrounds = this.add.group();
        this.backgrounds.add(new Background(this, .8, 0, .25).setTint(this.tints[0]));
        this.backgrounds.add(new Background(this, .5, 0, .5).setTint(this.tints[1]));
        this.backgrounds.add(new Background(this, 0, 0, 1).setTint(this.tints[2]));
        this.backgrounds.add(new Background(this, 2, 4, .25).setTint(this.tints[3]));
        this.backgrounds.add(new Background(this, 2.4, 3, .5).setTint(this.tints[4]));
        this.backgrounds.add(new Background(this, 2.5, 2, 1).setTint(this.tints[5]));
        this.backgrounds.add(new Background(this, 3, 5, 2).setTint(this.tints[6]));
        this.houses = [
            new House(this, 32, 0, 8).setFrames(4),
            new House(this, 160, 0, 8).setFrames(4),
            new House(this, 96, 0, 8).setFrames(4),
            new House(this, 64, 0, 8).setFrames(4),
            new House(this, 128, 0, 8).setFrames(4),
        ];
        this.add.bitmapText(96, 64, FontKey.Round, this.message).setOrigin(0.5);
        setTimeout(function () {
            _this.input.keyboard.on('keydown', function () { return _this.restartGame(); });
            _this.input.on('pointerdown', function () { return _this.restartGame(); });
        }, 5000);
    };
    OverScene.prototype.update = function () {
        if ((this.houses[0].setY(this.scrollA, 32),
            this.houses[1].setY(this.scrollA, 32),
            this.houses[2].setY(this.scrollA, 32),
            this.houses[3].setY(this.scrollB, 32),
            this.houses[4].setY(this.scrollB, 32),
            (this.scrollA += 1),
            (this.scrollB += 2),
            this.scrollA > 0 && (this.scrollA = -128),
            this.scrollB > 0 && (this.scrollB = -128),
            this.finnised)) {
            this.tint = this.randomTint(this.tint, 34);
            this.cameras.main.setBackgroundColor(this.tint);
            var entries = this.backgrounds.children.entries;
            for (var i = 0; i < this.tints.length; i++) {
                this.tints[i] = this.randomTint(this.tints[i], 34);
                entries[i].setTint(this.tints[i]);
            }
        }
    };
    OverScene.prototype.randomTint = function (tint, range) {
        var e = (tint >> 16) & 255, i = (tint >> 8) & 255, a = (tint >> 0) & 255;
        return ((e += random(-range, range)),
            (i += random(-range, range)),
            (a += random(-range, range)),
            e > 255 ? (e = 255) : e < 0 && (e = 0),
            i > 255 ? (i = 255) : i < 0 && (i = 0),
            a > 255 ? (a = 255) : a < 0 && (a = 0),
            (e <<= 16),
            (i <<= 8),
            (a <<= 0),
            e + i + a);
    };
    OverScene.prototype.restartGame = function () {
        this.scene.start(SceneKey.Game);
    };
    return OverScene;
}(Scene(SceneKey.Over, {
    message: "",
    finished: false,
})));
export { OverScene };
//# sourceMappingURL=over.js.map