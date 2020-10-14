
const RouterBase =  require('../lib/router-base');
const fs = require("fs");
class HomeJsRouter extends RouterBase{
    constructor(req,res){
        super();
    }
    setUpRoutes(){
        this.router.use('/',(req,res)=>{
            let data = fs.readFileSync("../assets/home.css");
            res.type('.css');
            res.send(`${data}`);
        });
    }
}


module.exports = HomeJsRouter;