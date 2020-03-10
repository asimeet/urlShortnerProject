const config = {
    appPort: process.env.appPort,
    baseAppUrl: `${process.env.baseAppUrl}${process.env.appPort}`,
    dbEndpoint: process.env.dbEndpoint,
    dbUser: process.env.dbUser,
    dbPasswd: process.env.dbPasswd
}
module.exports = config;