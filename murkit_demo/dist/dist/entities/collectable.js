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
import { EntityKey, EntityAnimation } from "../shared/keys";
import { PhysEntity } from "../shared/factories";
import { random } from "../shared/utils";
var tints = [0xffffee, 0xffeeee, 0xffddbb, 0xffeebb, 0xddbbcc, 0xbbaa99];
var Collectable = /** @class */ (function (_super) {
    __extends(Collectable, _super);
    function Collectable(scene, x, y, color) {
        var _this = _super.call(this, scene) || this;
        _this.setPosition(x, y)
            .setTint(color)
            .play(EntityAnimation.CollectablePanacatIdle);
        return _this;
    }
    Collectable.prototype.update = function () {
        var positionX = this.scene.cameras.main.scrollX;
        if (this.x + 192 < positionX) {
            this.reset();
        }
    };
    Collectable.prototype.reset = function () {
        var x = random(this.x + 384, this.x + 768);
        var y = 16 * random(1, 7) - 8;
        var normX = Math.round((x / 16)) * 16;
        var normY = Math.round((y / 16)) * 16;
        var tint = tints[random(0, tints.length)];
        this.setPosition(normX, normY)
            .setTint(tint);
    };
    return Collectable;
}(PhysEntity({
    key: EntityKey.Collectable,
    size: [16, 16],
    offset: [0, 0],
    static: true,
})));
export { Collectable };
//# sourceMappingURL=collectable.js.map