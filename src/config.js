
let appPort =  process.env.URL_SHORTNER_PORT || 3903;

let appRoute = process.env.URL_SHORTNER_ROUTE || '';

let baseAppUrl = process.env.URL_SHORTNER_BASE_URL || "http://localhost";

let validUrl = baseAppUrl.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g);

if(!validUrl || validUrl.length == 0){
    if(baseAppUrl.indexOf(".com") == -1)    baseAppUrl += `:${appPort}`;
}

baseAppUrl += appPort;

const config = {
    appPort,
    appRoute,
    baseAppUrl,
    dbEndpoint: process.env.URL_SHORTNER_DB_ENDPOINT,
    dbUser: process.env.URL_SHORTNER_DB_USER,
    dbPasswd: process.env.URL_SHORTNER_DB_PASSWD
}
module.exports = config;