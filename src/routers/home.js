const RouterBase =  require('../lib/router-base');
class HomeRouter extends RouterBase{
    constructor(req,res){
        super();
    }
    prepareResponse(){
        this.router.use('/', (req, res) => {
            try {
                res.render('home');
            } catch (err) {
                res.send(`Error : ${err}`);
            }
        
        });
    }
}


module.exports = HomeRouter;