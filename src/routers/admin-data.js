const RouterBase =  require('../lib/router-base');
const urlShortner =  require('../services/urlShortner');
class ShortenUrlRouter extends RouterBase{
    constructor(req,res){
        super();
    }
    prepareResponse(){
        this.router.use('/', (req, res) => {
            let serviceInst = new urlShortner();
            let result = serviceInst.getAdminData(req.body.pass);
            res.type('json');
            res.send(JSON.stringify(result));
        });
    }
}



module.exports = ShortenUrlRouter;