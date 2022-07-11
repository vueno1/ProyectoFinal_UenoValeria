const {createTransport} = require("nodemailer")
require("dotenv").config()

const transporter = createTransport({
    service:"gmail",
    // host: 'smtp.gmail.com',
    port: 587,
    // secure: false,
    auth: {
        user: process.env.MAIL_ADMIN,
        pass: process.env.PASS_ADMIN
    }
})

module.exports = transporter