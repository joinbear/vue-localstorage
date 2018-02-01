export default class VueLocalStorage {
    constructor () {
        this.storage = window.localStorage;
        this.prefix = "vue__";
    }
    install (Vue) {
        let _that = this;
        Vue.localStorage = _that;
        Object.defineProperty(Vue.prototype, "$localStorage", {
            get() {
                return _that;
            }
        });
    }
    /**
     * [getExpire 获取过期时间，毫秒]
     * @param  {Number} expire [时间毫秒，默认为0]
     * @return {Number}        [以当前时间为基准的毫秒时间]
     */
    getExpire(expire = 0){
        return expire > 0 ? new Date().getTime() + expire : expire;
    }
    isExpired(expire){
        return ( expire > 0 && expire < new Date().getTime() ) ? true : false;
    }
    /**
     * [setStorage 存储内容到本地]
     * @param {String} name   [键名]
     * @param {[type]} value  [键值]
     * @param {Number} expire [过期时间]
     */
    setStorage (name, value, expire = 0) {
        this.storage.setItem(
            this.prefix + name,
            JSON.stringify({
                value: value, 
                expire: this.getExpire(expire)
            })
        );
    }
    /**
     * [getStorage 获取存储内容，如果过期返回空值]
     * @param  {[type]} name [键名]
     * @return {[type]}      [description]
     */
    getStorage (name) {
        let item = this.storage.getItem(this.prefix + name);
        if(!item) return "";
        item = JSON.parse(item);
        if(this.isExpired(item.expire)){
        	this.removeStorage(name);
        	return "";
        }
        return item.value;
    }
    /**
     * [removeStorage 移除缓存内容]
     * @param  {String} name [键名]
     * @return {[type]}      [description]
     */
    removeStorage (name) {
        return this.storage.removeItem(this.prefix + name);
    }
    /**
     * [keyStorage 获取指定索引的storage]
     * @param  {[type]} index [索引值]
     * @return {[type]}       [description]
     */
    keyStorage(index) {
        return this.storage.key(index);
    }
    /**
     * [clearAll 清除所有的缓存数据]
     * @return {[type]} [description]
     */
    clearAll(){
        let len = this.storage.length;
        if (len == 0) return;
        for (let i = 0; i < len; i++) {
            let key = this.storage.key(i);
            if (false == `/${this.prefix}/i`.test(key)) continue;
            this.storage.removeItem(key);
        }
    }
    /**
     * [setCookie 设置cookie]
     * @param {String} name   [cookie键名]
     * @param {String} value  [cookie键值]
     * @param {Number} expire [过期时间|毫秒|默认一天]
     * @param {String} domain [域名]
     * @param {String} path   [路径]
     */
    setCookie(name, value, expire = 24 * 60 * 60 * 1000,domain = "",path = '/') {
        let expires = "expires=" + new Date(this.getExpire(expire)).toGMTString();
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};domain=${domain};path=${path}`;
    }
    /**
     * [getCookie 获取cookie]
     * @param  {String} name [cookie键名]
     * @return {String}      [对应cookie值]
     */
    getCookie(name) {
        let cookies = document.cookie.split(";");
        for(let i = 0; i < cookies.length; i++){
            let cookie = cookies[i].trim();
            if(cookie.substring(0,name.length + 1) == name+"="){
               return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
    }
    /**
     * [clearCookie 清除指定cookie]
     * @param  {String} name [cookie键名]
     * @return {[type]}      [description]
     */
    clearCookie(name) {
        this.setCookie(name, "", -1);
    }
}

if (window.Vue) {
    window.Vue.use(new VueLocalStorage);
}
