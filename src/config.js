let baseAppUrl = (()=>{
})()

const config = {
    appPort: process.env.appPort || 3903,
    baseAppUrl: "http://localhost:3903",
    dbEndpoint: process.env.dbEndpoint,
    dbUser: process.env.dbUser,
    dbPasswd: process.env.dbPasswd
}
module.exports = config;