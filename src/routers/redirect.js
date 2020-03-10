const RouterBase = require('../lib/router-base');
const urlShortner = require('../services/urlShortner');
const config = require('../config');
class RedirectRouter extends RouterBase {
    constructor() {
        super();
    }
    prepareResponse() {
        this.router.use('/', (req, res,next) => {
                let serviceInst = new urlShortner(req.path);
                let realUrl = serviceInst.getRealUrl();
                if (realUrl.indexOf("http") < 0 && realUrl.indexOf("https") < 0) {
                    realUrl = "http://" + realUrl;
                }
                res.redirect(realUrl);

        });
    }
}


module.exports = RedirectRouter;