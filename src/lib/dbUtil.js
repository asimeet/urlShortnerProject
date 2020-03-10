let dbInst;
class DbUtil{
    constructor(){
        //connect imaaginary DB
    }
    pushToDb(){
        // dummy func to push data to db
    }
    getAllFromDb(){
        // dummy function to get data from db
    }
}
if(!dbInst){
    dbInst = new DbUtil()
}
module.exports = dbInst;