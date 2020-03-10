let cacheInstance;
const DbUitl =  require('./dbUtil');
class Cacher {
    constructor() {
        this.cache = [];
        this.dbInst = DbUitl;
        // this.cache = this.dbInst.getAllFromDb(); to remian commented till db is actully present
    }
    addToCache(objectIn) {
        this.cache.push(objectIn);
        //this.dbInst.pushToDb(); to remain commented till db is present in real
    }   
    getFromCache(key,value) {
        let objectOut = this.cache.find(item => item[key] === value);
        return objectOut;
    }


}

if (!cacheInstance) {
    cacheInstance = new Cacher();
}

module.exports = cacheInstance;