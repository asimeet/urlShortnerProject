const routers = {
    "rdr" : () => {
        let handler = require("./redirect.js");
        let router = new handler().router;
        return router;
    },
    "home.js" : () => {
        let handler = require("./home-js.js");
        let router = new handler().router;
        return router;
    },
    "home" : () => {
        let handler = require("./home.js");
        let router = new handler().router;
        return router;
    },
    "shorten-url" : () => {
        let handler = require("./shorten-url.js");
        let router = new handler().router;
        return router;
    },
    "admin-data" : () => {
        let handler = require("./admin-data.js");
        let router = new handler().router;
        return router;
    },
    "home.css" : () => {
        let handler = require("./home-css.js");
        let router = new handler().router;
        return router;
    }
}
module.exports = routers;