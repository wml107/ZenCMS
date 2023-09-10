//这个工具类用于map类型的序列化与反序列化：
//对于map嵌套的情形，是需要像深拷贝那样，递归执行序列化/反序列化的。
//但递归的粒度，到底对什么样的value中的成员，需要递归执行，这是视具体情形而定的，这里的MapSerialize是为了结构树的序列化而专门定制的，所以如果用于其他用途，请先阅读原代码，确保这样的序列化是你想要的。
export class MapSerialize {
    static mapToObj(map) {
        let obj = Object.create(null);
        for (let [k, v] of map) {
            if (v.child instanceof Map) {
                obj[k] = v;
                obj[k].child = this.mapToObj(obj[k].child);
            } else {
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
            } else {
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