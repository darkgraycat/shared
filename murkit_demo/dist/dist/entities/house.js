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
import { EntityKey } from "../shared/keys";
import { Entity } from "../shared/factories";
import { random } from "../shared/utils";
var H = /** @class */ (function (_super) {
    __extends(H, _super);
    function H() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return H;
}(Entity({
    key: EntityKey.Building,
    size: [48, 32],
    origin: [.5, 0],
})));
var House = /** @class */ (function (_super) {
    __extends(House, _super);
    function House(scene, x, y, size) {
        var _this = _super.call(this, scene) || this;
        y = 96 + y;
        for (var t = 0; t < size; t++) {
            _this.add(new H(scene).setPosition(x, y - 32 * t));
        }
        scene.add.existing(_this);
        return _this;
    }
    House.prototype.setFrames = function (frame) {
        this.children.entries.forEach(function (e) {
            e.setFrame(frame);
        });
        return this;
    };
    House.prototype.randomize = function () {
        var flag = function () { return random(0, 10) > 2; };
        this.children.entries.forEach(function (e) {
            e
                .setVisible(flag())
                .setFrame(random(0, 3));
        });
        return this;
    };
    return House;
}(Phaser.GameObjects.Group));
export { House };
//# sourceMappingURL=house.js.map