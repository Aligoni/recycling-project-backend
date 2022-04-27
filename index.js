require('dotenv').config()

const express = require('express')
const cors = require("cors")
const { resolve } = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(resolve(__dirname, 'public')));

const { multerUpload } = require('./config/cloudinary')
const db = require("./models");

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
db.sequelize.sync();

app.get('/', async (req, res) => {
    res.json({ msg: "This is working" })
})

app.post("/image-upload", multerUpload, (req, res) => {
    if (req.file) {
        return res.status(200).json({
            msg: "Upload successful",
            image: req.file.path
        })
    } else {
        return res.status(404).json({
            msg: "Please provide image"
        })
    }
});

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('listening at port 8000')
})