let dbInst;
const fs = require("fs");
class DbUtil {
    constructor() {
        //connect imaaginary DB
    }
    async pushToDb(objectIn) {
        // dummy func to push data to db
        try {
            let targetLocation = __dirname;
            targetLocation = targetLocation.split("lib")[0];
            targetLocation += "data/dummy-db.json";
            let data = fs.readFileSync(targetLocation);
            if (data) data = JSON.parse(data);
            if (!data) data = [];
            data.push(objectIn);
            data = JSON.stringify(data);
            fs.writeFileSync(targetLocation, data);
            return Promise.resolve("DB Updated")
        } catch (err) {
            return Promise.reject(err);
        }
    }
    async getAllFromDb() {
        // dummy function to get data from db
        try {
            let targetLocation = __dirname;
            targetLocation = targetLocation.split("lib")[0];
            targetLocation += "data/dummy-db.json";
            let data = fs.readFileSync(targetLocation);
            if (data) data = JSON.parse(data);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    }
    async storeCounter(count){
        try {
            let targetLocation = __dirname;
            targetLocation = targetLocation.split("lib")[0];
            targetLocation += "data/counter.json";
            let data = fs.readFileSync(targetLocation);
            data = JSON.parse(data);
            data.lastCount = count;
            data = JSON.stringify(data);
            fs.writeFileSync(targetLocation, data);
            return Promise.resolve("DB Updated")
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
if (!dbInst) {
    dbInst = new DbUtil()
}
module.exports = dbInst;