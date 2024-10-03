const express = require('express')
const app = express()
const pool = require('../db')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/ratings', async (req, res) => {
    try {
        const { course_id, user_id, rating, review } = req.body
        const result = await pool.query("INSERT INTO ratings (course_id, user_id, rating, review) VALUES ($1, $2, $3, $4) RETURNING *", [course_id, user_id, rating, review])
        return res.status(201).json({ message: "Created successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Could not create the ratings" })
    }
})

app.get('/getRating/:course_id', async (req, res) => {
    try {
        const { course_id } = req.params
        const result = await pool.query(`SELECT r.*, c.course_name, c.instructor 
        FROM ratings r 
        JOIN courses c ON r.course_id = c.id 
        WHERE r.course_id = $1`, [course_id])
        return res.status(201).json(result.rows)
    } catch (error) {
        return res.status(404).json({ message: "not found" })
    }
})

module.exports = app