const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('../db')

app.use(cors())
app.use(express.json())

app.get('/courses', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM courses")
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({ message: "Error fetching the courses data" })
    }
})

app.post('/course', async (req, res) => {
    try {
        const { course_code } = req.body
        if (!course_code) {
            return res.status(400).json({ message: "Course code is required" })
        }
        const result = await pool.query("SELECT * FROM courses WHERE course_code = $1", [course_code])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "This course does not exist" })
        }
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return res.status(500).json({ message: "Error getting the course data" })
    }
})

module.exports = app