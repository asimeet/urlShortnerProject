const RouterBase =  require('../lib/router-base');
const urlShortner =  require('../services/urlShortner');
class ShortenUrlRouter extends RouterBase{
    constructor(req,res){
        super();
    }
    prepareResponse(){
        this.router.use('/', (req, res) => {
            if(!req.body || !req.body.longUrl){
                throw new Error(`Missing Request Data - body.longUrl`);
            }
            let validUrl = req.body.longUrl.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g);
            if(!validUrl || validUrl.length == 0){
                throw new Error('Invalid URL');
            }
            let serviceInst = new urlShortner(req.body.longUrl);
            let result = serviceInst.shortenUrl();
            res.send(JSON.stringify(result));
        });
    }
}



module.exports = ShortenUrlRouter;