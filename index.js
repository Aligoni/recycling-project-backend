require('dotenv').config()

const express = require('express')
const cors = require("cors")
const expressValidator = require('express-validator')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { multerUpload } = require('./config/cloudinary')
const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
// db.sequelize.sync();

app.get('/', async (req, res) => {
    res.json({ msg: "This is working" })
})

app.use('/admins', require('./routes/admins.routes'))
app.use('/articles', require('./routes/articles.routes'))
app.use('/subscribers', require('./routes/subscribers.routes'))

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('listening at port 8000')
})