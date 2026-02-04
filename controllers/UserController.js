const UserModel = require('../models/user')

class UserController {

    static register = async (req, res) => {  
        try {
            console.log(req.body)  
        } catch (error) {
            console.log(error)
        }

    }
    static login = async (req, res) => {
        try {
            res.send("login")
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = UserController
