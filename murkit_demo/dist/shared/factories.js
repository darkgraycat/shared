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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Phaser from "phaser";
/* Scenes */
export function Scene(key, initialParams) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(Scene, _super);
            function Scene() {
                var _this = _super.call(this, key) || this;
                _this.params = initialParams;
                return _this;
            }
            Scene.prototype.init = function (params) {
                var _this = this;
                Object
                    .entries(params)
                    .forEach(function (_b) {
                    var _c = __read(_b, 2), param = _c[0], value = _c[1];
                    return _this.params[param] = value;
                });
                this.log('init', 'invoked', this.params);
            };
            Scene.prototype.create = function () {
                this.log('create', 'invoked');
            };
            Scene.prototype.log = function (context, message) {
                var rest = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    rest[_i - 2] = arguments[_i];
                }
                console.log.apply(console, __spreadArray(["".concat((performance.now() / 1000).toFixed(2).padStart(8, ' '), " [").concat(this.constructor.name, ": ").concat(context, "] ").concat(message)], __read(rest), false));
                return this;
            };
            return Scene;
        }(Phaser.Scene)),
        _a.key = key,
        _a;
}
export function Entity(config) {
    return /** @class */ (function (_super) {
        __extends(Entity, _super);
        function Entity(scene) {
            var _this = _super.call(this, scene, 0, 0, config.key) || this;
            var _a = __read(config.size, 2), w = _a[0], h = _a[1];
            var _b = __read(config.origin, 2), x = _b[0], y = _b[1];
            scene.add
                .existing(_this)
                .setSize(w, h)
                .setOrigin(x, y);
            return _this;
        }
        return Entity;
    }(Phaser.GameObjects.Sprite));
}
export function TileEntity(config) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(TileEntity, _super);
            function TileEntity(scene) {
                var _this = _super.call(this, scene, 0, 0, 0, 0, config.key) || this;
                var _b = __read(config.size, 2), w = _b[0], h = _b[1];
                var _c = __read(config.origin, 2), x = _c[0], y = _c[1];
                scene.add
                    .existing(_this)
                    .setSize(w, h)
                    .setOrigin(x, y);
                return _this;
            }
            TileEntity.prototype.resize = function (cols, rows) {
                this.setSize(_a.tilesize * cols, _a.tilesize * rows);
                return this;
            };
            TileEntity.prototype.place = function (col, row) {
                this.setPosition(_a.tilesize * col, _a.tilesize * row);
                return this;
            };
            return TileEntity;
        }(Phaser.GameObjects.TileSprite)),
        _a.tilesize = config.tilesize,
        _a;
}
export function PhysEntity(config) {
    return /** @class */ (function (_super) {
        __extends(PhysEntity, _super);
        function PhysEntity(scene) {
            var _this = _super.call(this, scene, 0, 0, config.key) || this;
            var _a = __read(config.size, 2), w = _a[0], h = _a[1];
            var _b = __read(config.offset, 2), x = _b[0], y = _b[1];
            scene.physics.add
                .existing(scene.add.existing(_this), config.static)
                .setSize(w, h)
                .setOffset(x, y);
            return _this;
        }
        return PhysEntity;
    }(Phaser.Physics.Arcade.Sprite));
}
export function TilePhysEntity(config) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(TilePhysEntity, _super);
            function TilePhysEntity(scene) {
                var _this = _super.call(this, scene, 0, 0, 0, 0, config.key) || this;
                var _b = __read(config.size, 2), w = _b[0], h = _b[1];
                var _c = __read(config.offset, 2), x = _c[0], y = _c[1];
                scene.physics.add
                    .existing(scene.add.existing(_this), config.static)
                    .setSize(w, h);
                _this.body.setOffset(x, y);
                return _this;
            }
            TilePhysEntity.prototype.resize = function (cols, rows) {
                this.setSize(_a.tilesize * cols, _a.tilesize * rows);
                this.body.updateFromGameObject();
                return this;
            };
            TilePhysEntity.prototype.place = function (col, row) {
                this.setPosition(_a.tilesize * col, _a.tilesize * row);
                this.body.updateFromGameObject();
                return this;
            };
            return TilePhysEntity;
        }(Phaser.GameObjects.TileSprite)),
        _a.tilesize = config.tilesize,
        _a;
}
//# sourceMappingURL=factories.js.map