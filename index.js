const config = require("./src/config");
const routers = require("./src/routers")
const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'src/assets')))
app.set('view engine', 'ejs');



let routingKeys = Object.keys(routers);
routingKeys.forEach(rkey => {
    app.use(`${config.appRoute}/${rkey}`, routers[rkey]());
});

app.get("/*", (req, res) => {
    console.log(req.path);
    if (req.path == '/' || req.path == config.appRoute) {
        res.redirect(`${config.appRoute}/home`);
    } else {
        rkey = req.path.split(`${config.appRoute}/`)[1];
        if (routers[rkey] == undefined) {
            res.redirect(`${config.appRoute}/rdr/${rkey}`);
        } else {
            res.redirect(req.path);
        }
    }
});

app.use(function(err, req, res, next) {
    res.statusMessage = err.message
    res.status(500);
    res.send(err.message)
 });

app.listen(config.appPort, () => {
    console.log(`Server is running at localhost:${config.appPort}`);
});