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
import { GAME_HEIGHT, GAME_WIDTH } from "../shared/constants";
import { TilePhysEntity, TileEntity } from "../shared/factories";
import { EntityKey } from "../shared/keys";
import { random } from "../shared/utils";
var Building = /** @class */ (function (_super) {
    __extends(Building, _super);
    function Building(scene, x, height, frame) {
        var _this = _super.call(this, scene) || this;
        _this.setPosition(x, GAME_HEIGHT - Building.tilesize * height)
            .setSize(48, Building.tilesize * height)
            .setFrame(frame)
            .setOrigin(0);
        _this.body.checkCollision.down = false;
        _this.body.checkCollision.left = false;
        _this.body.checkCollision.right = false;
        _this.body.updateFromGameObject();
        _this.buildingTop = new BuildingTop(scene);
        _this.buildingTop.updateByParent(_this);
        return _this;
    }
    Building.prototype.update = function () {
        var scrollX = this.scene.cameras.main.scrollX;
        if (this.x + GAME_WIDTH < scrollX) {
            var randHeight = random(0.5, 5);
            var randFrame = random(0, 4);
            this.reset(randHeight, randFrame);
        }
    };
    Building.prototype.reset = function (th, frame) {
        if (th === void 0) { th = 1; }
        if (frame === void 0) { frame = 0; }
        var ts = Building.tilesize;
        var height = ts * th;
        var x = ts * Math.floor((this.x + GAME_WIDTH * 3) / ts);
        var y = GAME_HEIGHT - height;
        this.setPosition(x, y)
            .setSize(48, height)
            .setFrame(frame);
        this.body.updateFromGameObject();
        this.buildingTop.updateByParent(this);
        this.buildingTop.setFrame(random(0, 6));
    };
    return Building;
}(TilePhysEntity({
    key: EntityKey.Building,
    size: [48, 32],
    offset: [0, 0],
    tilesize: 16,
    static: true,
})));
export { Building };
var BuildingTop = /** @class */ (function (_super) {
    __extends(BuildingTop, _super);
    function BuildingTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuildingTop.prototype.updateByParent = function (building) {
        var _a = building.body, x = _a.x, y = _a.y;
        this.setPosition(x, y - 16);
        this.setTint(0xffdddd);
        return this;
    };
    return BuildingTop;
}(TileEntity({
    key: EntityKey.BuildingTop,
    size: [48, 16],
    origin: [0, 0],
    tilesize: 16,
})));
//# sourceMappingURL=building.js.map