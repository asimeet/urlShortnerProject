let cacheInstance;
const DbUitl =  require('./dbUtil');
class Cacher {
    constructor() {
        this.cache = [];
        this.dbInst = DbUitl;;
        this.loadCache();
        this.cacheUpdator();
    }
    addToCache(objectIn) {
        this.cache.push(objectIn);
        this.dbInst.pushToDb(objectIn).catch(err => {
            console.log(err);
        });
    }   
    getFromCache(key,value) {
        let objectOut = this.cache.find(item => item[key] === value);
        return objectOut;
    }
    loadCache(getAll = false){
        this.dbInst.getAllFromDb().then( data => {
            if(getAll){
                this.cache = data;
                return;
            }
            let now = new Date();
            this.cache = data.filter( item => {
                if((new Date(item.createdAt) - now) < (5*24*60*60*1000) ){
                    return true;
                }
                return false;
            });
        }).catch(err => {
            console.log(err);
        });
    }
    cacheUpdator(){
        let callBack = () => {
            this.loadCache();
            this.cacheUpdator();
        }
        setTimeout(callBack,24*60*60*1000);
    }



}

if (!cacheInstance) {
    cacheInstance = new Cacher();
}

module.exports = cacheInstance;