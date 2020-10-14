
let appPort =  process.env.URL_SHORTNER_PORT || 3903;

let appRoute = process.env.URL_SHORTNER_ROUTE || '';

let baseAppUrl = process.env.URL_SHORTNER_BASE_URL || "http://localhost";

let validUrl = baseAppUrl.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g);

if(!validUrl || validUrl.length == 0){
    baseAppUrl += `:${appPort}`;
}

baseAppUrl += appRoute;

const config = {
    appPort,
    appRoute,
    baseAppUrl,
    dbEndpoint: process.env.URL_SHORTNER_DB_ENDPOINT,
    dbUser: process.env.URL_SHORTNER_DB_USER,
    dbPasswd: process.env.URL_SHORTNER_DB_PASSWD
}
module.exports = config;