
const RouterBase =  require('../lib/router-base');
const fs = require("fs");

class HomeJsRouter extends RouterBase{
    constructor(req,res){
        super();
    }
    setUpRoutes(){
        this.router.use('/',(req,res)=>{
            let dirname = __dirname;
            dirname = dirname.split("src/routers")[0];
            let filepath = dirname + "src/assets/home.css";
            let data = fs.readFileSync(filepath,"utf8");
            res.type('.css');
            res.send(`${data}`);
        });
    }
}


module.exports = HomeJsRouter;