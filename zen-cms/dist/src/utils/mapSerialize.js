"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSerialize = void 0;
class MapSerialize {
    static mapToObj(map) {
        let obj = Object.create(null);
        for (let [k, v] of map) {
            if (v.child instanceof Map) {
                obj[k] = v;
                obj[k].child = this.mapToObj(obj[k].child);
            }
            else {
                obj[k] = v;
            }
        }
        return obj;
    }
    static objToMap(obj) {
        let map = new Map();
        for (let k of Object.keys(obj)) {
            if (obj[k] instanceof Object && !(obj[k] instanceof Array)) {
                map.set(k, this.objToMap(obj[k]));
            }
            else {
                map.set(k, obj[k]);
            }
        }
        return map;
    }
    static mapToString(map) {
        return JSON.stringify(this.mapToObj(map));
    }
    static stringToMap(string) {
        return this.objToMap(JSON.parse(string));
    }
}
exports.MapSerialize = MapSerialize;
//# sourceMappingURL=mapSerialize.js.map