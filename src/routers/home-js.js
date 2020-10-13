const RouterBase =  require('../lib/router-base');
const HomeJSController = require("../controller/home");
class HomeJsRouter extends RouterBase{
    constructor(req,res){
        super();
    }
    setUpRoutes(){
        this.router.use('/',(req,res)=>{
            let viewInjector= String(HomeJSController);
            let content = `
            var viewInjector = ${viewInjector};
            var viewAttributes = new viewInjector(${JSON.stringify(this.config)});
            `;
            res.type('.js');
            res.send(`${content}`);
        });
    }
}


module.exports = HomeJsRouter;