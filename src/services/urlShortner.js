let cacher = require('../lib/cacher');
let config = require('../config');
let dbUtil = require("../lib/dbUtil");
const fs = require("fs");

try {
    targetLocation = __dirname;
    targetLocation = targetLocation.split("/urlShortnerProject/src/services/")[0];
    targetLocation += "/urlShortnerProject/src/data/counter.json";
    let counterData = fs.readFileSync(targetLocation);
    counterData = JSON.parse(counterData);
    lastCount = counterData.lastCount;
} catch (error) {
    console.log(error);
}

class urlShortner {
    constructor(inUrl) {
        this.inUrl = inUrl;
        this.cacher = cacher;
        this.dbUtil = dbUtil;
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
        let existingEntry = this.cacher.getFromCache('longUrl', this.inUrl);
        if (existingEntry) {
            return existingEntry;
        }
        urlShortner.counter++;
        this.dbUtil.storeCounter(urlShortner.counter).catch(err => {
            console.log("error-in-storing-counter");
        });
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
        let existingEntry = this.cacher.getFromCache('key', hashKey);
        if (!existingEntry) {
            throw new Error(`URL: ${this.inUrl} is not registered with us`);
        }
        return existingEntry.longUrl;
    }
    getAdminData(pass) {
        if (pass !== "admin") {
            return {
                authencationError: `Invalid Password`
            };
        }
        let objectOut = {
            totalUrlCreated: this.cacher.cache.length,
            data: this.cacher.cache
        }
        return objectOut;
    }
}

urlShortner.counter = lastCount;

module.exports = urlShortner;