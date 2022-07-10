const {createTransport} = require("nodemailer")

const mailAdministrador = process.env.MAIL_ADMIN
const contraseñaAdminMail = process.env.PASS_ADMIN

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: mailAdministrador,
        pass: contraseñaAdminMail
    }
})

module.exports = transporter