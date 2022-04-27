require('dotenv').config()

const express = require('express')
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require("./models");
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
db.sequelize.sync();

app.get('/', async (req, res) => {
    res.json({ msg: "This is working" })
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('listening at port 8000')
})