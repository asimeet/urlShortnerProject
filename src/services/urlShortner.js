let cacher = require('../lib/cacher');
let config = require('../config');
class urlShortner {
    constructor(inUrl) {
        this.inUrl = inUrl;
        this.cacher = cacher;
        urlShortner.counter++;
    }
    base64HashKey() {
        let hash = '';
        let n = urlShortner.counter;
        let strArr = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`;
        while (n > 0 || hash.length < 6) {
            hash += strArr[n % 62];
            n = Math.trunc(n / 62);
        }
        return hash;
    }
    shortenUrl() {
        let existingEntry = this.cacher.getFromCache('longUrl',this.inUrl);
        if(existingEntry){
            return existingEntry;
        }
        let hash = this.base64HashKey();
        let objectIn = {
            key: hash,
            shortUrl: `${config.baseAppUrl}/${hash}`,
            longUrl: this.inUrl,
            createdAt: new Date().toISOString()
        };
        this.cacher.addToCache(objectIn);
        return objectIn;
    }
    getRealUrl() {
        let hashKey = this.inUrl.split('/')[1];
        let existingEntry = this.cacher.getFromCache('key',hashKey);
        if(!existingEntry){
            throw new Error(`URL: ${this.inUrl} is not registered with us`);
        }
        return existingEntry.longUrl;
    }
    getAdminData(pass){
        if(pass !== "admin"){
            return {authencationError:`Invalid Password`};
        }
        let objectOut = {
            totalUrlCreated : this.cacher.cache.length,
            data: this.cacher.cache
        }
        return objectOut;
    }
}
urlShortner.counter = 0;

module.exports = urlShortner;