const ClassModel = require('../models/classModel');

class ClassController {
    // create
    static createClass = async (req, res) => {
        try {
            const { course, semester } = req.body

            if (!course || !semester) {
                return res.status(400).json({
                    message: "All fields are required"
                })
            }

            const newClass = await ClassModel.create({ course, semester })

            res.status(201).json({
                message: "Class created successfully",
                class: newClass
            })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // read
    static getClasses = async (req, res) => {
        try {
            const classes = await ClassModel.find()
            res.json(classes)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }


    // update
    static updateClass = async (req, res) => {
        try {
            const updatedClass = await ClassModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )

            if (!updatedClass) {
                return res.status(404).json({ message: "Class Not Found" })
            }

            res.json(updatedClass)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }


    // delete
    static deleteClass = async (req, res) => {
        try {
            const deletedClass = await ClassModel.findByIdAndDelete(req.params.id)

            if (!deletedClass) {
                return res.status(404).json({ message: "Class Not Found" })
            }

            res.json({ message: "Class Deleted Successfully" })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = ClassController