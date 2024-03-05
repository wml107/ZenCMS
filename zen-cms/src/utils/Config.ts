import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config());
const fs = require('fs');
import path from "path";
// 用于管理网站的配置、设置，例如数据库配置、数据文件路径、启动端口、token加密密钥等
// 其实nest是有nest/config来管理插件的，但那个东西太难用了，只能通过引入Service并获取示例使用，但很多情况下都是model等位置需要加载用户配置，根本没地方实例化
// 所以这里就专门写了一个单例模式的配置管理类
// 读配置是用dotenv读的，不过有一些写的需求，这部分是自己解析实现的
export default class Config {
    private static SingletonInstance = null;

    private static kv = {};

    constructor() {
        if (Config.SingletonInstance) return Config.SingletonInstance;

        Config.check();
        Config.kv = Config.readConfig();
        Config.SingletonInstance = this;
    }

    getConfig(key: String) {
        return process.env[`${key}`];
    }

    setConfig(key: String, value: String) {
        Config.kv[`${key}`] = value; 
        Config.writeConfig();
        //nestjs不支持通编码来实现重启，他所利用的webpack的热更新也监听不到.env文件，所以要想应用更改，就只能让用户手动重启
        console.log(`Config field ${key} has been updated, please restart the application for the config to take effect. App should be closed.`)
        process.exit(0);
    }

    //检查校验配置文件
    private static check() {

    }

    //读取配置，这里读入只是用来方便写配置，不是读过来用。
    private static readConfig() {
        try {
            let config = fs.readFileSync(path.normalize(__dirname + '/../../.env'), 'utf8');

            config = config.split('\n');
            for (let i = 0; i < config.length; i++) config[i] = config[i].trim();
            config = config.filter(element => element != '');

            let configObj = {};
            config.forEach(element => configObj[element.slice(0, element.indexOf('='))] = element.slice(element.indexOf('=') + 1));

            return configObj;
        } catch (e) {
            console.log('The rules for parsing .env configurations are only partially implemented in a relatively simple way, and it is possible that complex or incorrect syntax is causing the following error when reading the configurations:');
            throw e;
        }
    }

    //将配置写入
    private static writeConfig() {
        let configArr = [];
        Object.keys(this.kv).forEach(key => configArr.push(`${key}=${this.kv[key]}`));

        let configStr = configArr.join('\n');

        fs.writeFileSync(__dirname + '/../../.env', configStr);
    }
}