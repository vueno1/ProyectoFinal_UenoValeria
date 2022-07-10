require("dotenv").config() 

const accountSid = process.env.TWILIO_ASID
const authToken = process.env.TWILIO_TOKEN
const client = require("twilio")(accountSid, authToken)

module.exports = client