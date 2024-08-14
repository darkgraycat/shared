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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Player.prototype.walk = function (force) {
        this.flipX = force < 0;
        this.body.velocity.x = force;
        if (this.touchingDown) {
            this.play(EntityAnimation.PlayerWalk, true);
        }
    };
    Player.prototype.idle = function () {
        this.body.velocity.x = 0;
        if (this.touchingDown) {
            this.play(EntityAnimation.PlayerIdle, true);
        }
    };
    Player.prototype.jump = function (force) {
        if (this.touchingDown) {
            this.body.velocity.y = -force;
            this.play(EntityAnimation.PlayerJump, true);
        }
    };
    Object.defineProperty(Player.prototype, "touchingDown", {
        get: function () {
            return this.body.touching.down || this.body.blocked.down;
        },
        enumerable: false,
        configurable: true
    });
    return Player;
}(PhysEntity({
    key: EntityKey.Player,
    size: [20, 16],
    offset: [-4, 0],
})));
export { Player };
//# sourceMappingURL=player.js.map