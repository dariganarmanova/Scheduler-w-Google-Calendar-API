const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('../db')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())

app.get('/user', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({ message: "Error getting the users" })
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        res.json(result.rows[0])
    } catch (error) {
        return res.status(500).json({ message: "Error getting the users" })
    }
})

//singup
app.post('/user/sign', async (req, res) => {
    const { user_name, user_surname, email, password_hash } = req.body
    if (!user_name || !user_surname || !email || !password_hash) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newPassword = await bcrypt.hash(password_hash, 10)
        const result = await pool.query("INSERT INTO users(user_name, user_surname, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *", [user_name, user_surname, email, newPassword])
        const userId = result.rows[0].id
        return res.status(201).json({ message: "Successfully created the account", id: userId })
    } catch (error) {
        console.log("error creating the user", error)
        return res.status(500).json({ message: "Error creating the requested data" })
    }
})

//login route
app.post('/user/log', async (req, res) => {
    try {
        const { email, password_hash } = req.body
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if (!result) {
            res.status(404).json({ message: "User not found" })
        }
        const user = result.rows[0]
        const doesPasswordMatch = await bcrypt.compare(password_hash, user.password_hash)
        if (!doesPasswordMatch) {
            res.status(401).json({ message: "Sorry passwords do not match" })
        }
        res.status(200).json({ message: "Login successful" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = app