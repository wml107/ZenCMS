import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config());
// 用于管理网站的配置、设置，例如数据库配置、数据文件路径、启动端口、token加密密钥等
// 其实nest是有nest/config来管理插件的，但那个东西太难用了，只能通过引入Service并获取示例使用，但很多情况下都是model等位置需要加载用户配置，根本没地方实例化
// 所以这里就专门写了一个单例模式的配置管理类
// 这里其实直接用了dotenv库来实践，不过既然这样，用单例额外封装一层似乎显得多余。这样做的目的在于后面实现网站配置的方式可能会变，或者以后可能支持更复杂的配置操作等。如果直接用dotenv，到时候如果有变动，散落在各个文件的process.env就都得变，所以这里做抽象。
export default class Config {
    private static SingletonInstance = null;

    constructor(){
        if(Config.SingletonInstance) return Config.SingletonInstance;

        Config.check();
        Config.SingletonInstance = this;
    }

    getConfig(key: String){
        return process.env[`${key}`];
    }

    //检查校验配置文件
    private static check(){

    }
}