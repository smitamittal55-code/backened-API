const UserModel = require('../models/user')

class UserController {

    static register = async (req, res) => {  
        try {
            // console.log(req.body)
        const {name,email,password} = req.body

        const result = new UserModel({
            name: name,
            email: email,
            password: password
        })
        await result.save()
        res.json({
            message:"register success"
        })
        
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
