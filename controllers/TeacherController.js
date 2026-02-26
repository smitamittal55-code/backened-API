const TeacherModel = require('../models/teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class TeacherController {
    static register = async (req, res) => {
        try {
            const { name, email, password, college, experience, phone } = req.body;

            // TeacherModel use karein
            const existingUser = await TeacherModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already registered" });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            // TeacherModel.create use karein
            const teacher = await TeacherModel.create({
                name, email, college, experience, phone,
                password: hashPassword
            });

            return res.status(201).json({
                message: "User Registered Successfully",
                teacher // Yahan variable ka naam 'teacher' rakhein
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


    static login = async (req, res) => {
        try {
            //console.log(req.body)
            const {email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required"
                })
            }
            //check user email 
            const user = await TeacherModel.findOne({ email })
            //console.log(user)
            if (!user) {
                return res.status(400).json({
                    message: "Teacher not found"
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
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    college: user.college,
                    experience: user.experience,
                    phone: user.phone,
                    role: user.role,
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Server Error"
            })
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
                //res.send("Teacher Profile")
                const user = await UserModel.findById(req.userId).select("-password")
                //console.log(teacher)
                if (!user) {
                    return res.status(404).json({
                        message: "Teacher Not found"
                    })
                }
                res.status(200).json({
                    message: "Teacher Profile",
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
            const {name, email, password, college, experience, phone, role } = req.body
            const user = await TeacherModel.findByIdAndUpdate(userID, { name, email, password, college, experience, phone, role })
            if (!user) {
                return res.status(404).json({
                    message: "Teacher Not Found"
                })
            }
            res.status(200).json({
                message: "Teacher updated Successfully",
                user

            })

        } catch (error) {
            console.log(error)
        }

    }

     static updateProfile = async (req, res) => {
            try {
                const userId = req.userId
                const { name, email, password, phone} = req.body
    
                const user = await UserModel.findByIdAndUpdate(
                    userId,
                    { name, email, password, phone },
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
    
}
module.exports = TeacherController;