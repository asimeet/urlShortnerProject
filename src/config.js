
let appPort =  process.env.URL_SHORTNER_PORT || 3903;

let baseAppUrl = process.env.URL_SHORTNER_BASE_URL || "http://localhost";

let validUrl = baseAppUrl.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g);

if(!validUrl || validUrl.length == 0){
    baseAppUrl += `:${appPort}`;
}

const config = {
    appPort,
    baseAppUrl,
    dbEndpoint: process.env.URL_SHORTNER_DB_ENDPOINT,
    dbUser: process.env.URL_SHORTNER_DB_USER,
    dbPasswd: process.env.URL_SHORTNER_DB_PASSWD
}
module.exports = config;