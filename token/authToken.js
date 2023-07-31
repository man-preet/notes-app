const jwt = require("jsonwebtoken")

const generateToken =(id)=>{
    return jwt.sign({id},"SECRETKEYTOMAKETOKEN",{
        expiresIn:"1d"
    })
}
module.exports = generateToken