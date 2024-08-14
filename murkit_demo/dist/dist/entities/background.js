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
import { TileEntity } from "../shared/factories";
import { GAME_WIDTH } from "../shared/constants";
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background(scene, position, frame, speed) {
        var _this = _super.call(this, scene) || this;
        _this.setPosition(0, Background.tilesize * position)
            .setFrame(frame)
            .setScrollFactor(0);
        _this.speed = speed;
        return _this;
    }
    Background.prototype.update = function () {
        this.tilePositionX += this.speed;
    };
    return Background;
}(TileEntity({
    key: EntityKey.Background,
    size: [GAME_WIDTH, 32],
    origin: [0, 0],
    tilesize: 32,
})));
export { Background };
//# sourceMappingURL=background.js.map