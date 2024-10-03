const express = require('express')
const app = express()
const cors = require('cors')
const getClients = require('./routes/getClients')
const getCourses = require('./routes/coursesRoute')
const googleApi = require('./routes/googleApi')
const ratingsRoute = require('./routes/ratingsRoute')

app.use(cors())
app.use(express.json())

app.use('/', getClients)
app.use('/', getCourses)
app.use('/', googleApi)
app.use('/', ratingsRoute)


app.listen(5001, () => {
    console.log("Server has started on port 5001")
})