const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class AuthController {
    static register = async (req, res) => {
        try {

            const { name, email, password } = req.body
            //1
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "all field are required"
                })
            }
            //2user already exists
            const existinUser = await UserModel.findOne({ email })
            if (existinUser) {
                return res.status(400).json({
                    message: "user Already registerd"
                })
            }

            //hash password
            const hashPassword = await bcrypt.hash(password, 10)
            //console.log(hashPassword)

            //create user
            const result = await UserModel.create({
                name,
                email,
                password: hashPassword
            })
            res.status(201).json({
                message: "User Register Successfully",
                user: {
                    id: result._id,
                    name: result.name,
                    email: result.email
                }
            })


        } catch (error) {
            console.log(error)
        }
    }


    static login = async (req, res) => {
        try {
            //console.log(req.body)
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are require"
                })
            }
            //check user email 
            const user = await UserModel.findOne({ email })
            //console.log(user)
            if (!user) {
                return res.status(400).json({
                    message: "user not found"
                })
            }

            //3 compare password
            const isMatch = await bcrypt.compare(password, user.password)
            //console.log(isMatch)
            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid credentials"
                })
            }

            //token
            const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: process.env.jwt_expiration })
            //console.log(token)

            //cookie store token
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600000
            })

            res.status(200).json({
                message: "Login Successful",
                user: {
                    token,
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
    static logout = (req, res) => {
        try {
            res.clearCookie("token")
            res.status(200).json({
                message: "Logout successful"
            })
        } catch (error) {
            console.log(error)
        }
    }

    static getProfile = async (req, res) => {
        try {
            //res.send("User Profile")
            const user = await UserModel.findById(req.userId).select("-password")
            //console.log(user)
            if (!user) {
                return res.status(404).json({
                    message: "User Not found"
                })
            }
            res.status(200).json({
                message: "User Profile",
                user
            })



        } catch (error) {
            console.log(error)
        }
    }
    static getAllUsers = async (req, res) => {
        try {
            const users = await UserModel.find().select("-password")
            res.status(200).json({
                message: "All Users",
                users
            })
        } catch (error) {
            console.log(error)
        }
    }
    static deleteUser = async (req, res) => {
        try {
            const userID = req.params.id
            //console.log(userID)
            const user = await UserModel.findByIdAndDelete(userID)
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }
            res.status(200).json({
                message: "User Delelte successfully"
            })
        } catch (error) {
            console.log(error)
        }
    }
    static AdminupdateUser = async (req, res) => {
        try {
            const userID = req.params.id
            const { name, email, password } = req.body
            const user = await UserModel.findByIdAndUpdate(userID, { name, email, password })
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }
            res.status(200).json({
                message: "User updated Successfully",
                user

            })

        } catch (error) {
            console.log(error)
        }

    }
    static updateProfile = async (req, res) => {
        try {
            const userId = req.userId
            const { name, email, password } = req.body

            const user = await UserModel.findByIdAndUpdate(
                userId,
                { name, email, password },
                { new: true }
            )

            if (!user) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }

            res.status(200).json({
                message: "Profile Updated Successfully",
                user
            })

        } catch (error) {
            console.log(error)

        }
    }

    static changePassword = async (req, res) => {
    try {
        const userId = req.userId
        const { currentPassword, newPassword } = req.body

        const user = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

    
        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is Incorrect"
            })
        }

        
        const hashPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashPassword
        await user.save()

        res.status(200).json({
            message: "Password change Successfully"
        })

    } catch (error) {
        console.log(error)
       
    }
}
   



}


module.exports = AuthController