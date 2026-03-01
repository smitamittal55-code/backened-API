const employeeModel = require('../models/employee')

class employeeController {
    // create
    static createemployee = async (req, res) => {
        try {
            const { name, email } = req.body

            if (!name || !email) {
                return res.status(400).json({
                    message: "All fields are required"
                })
            }

            const newemployee = await employeeModel.create({ name, email })

            res.status(201).json({
                message: "employee created successfully",
                class: newemployee
            })

        } catch (error) {
            console.log(error)
        }
    }

    // read
    static getemployee = async (req, res) => {
        try {
            const employee = await employeeModel.find()
            res.json(employee)
        } catch (error) {
            console.log(error)
        }
    }

    // update
    static updateemployee = async (req, res) => {
        try {
            const updatedemployee = await employeeModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )

            if (!updatedemployee) {
                return res.status(404).json({ message: "employee Not Found" })
            }

            res.json(updatedemployee)

        } catch (error) {
            console.log(error)
        }
    }

    // delete
    static deleteemployee = async (req, res) => {
        try {
            const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id)

            if (!deletedemployee) {
                return res.status(404).json({ message: "employee Not Found" })
            }

            res.json({ message: "employee Deleted Successfully" })

        } catch (error) {
            console.log(error)
        }
    }



}

module.exports = employeeController