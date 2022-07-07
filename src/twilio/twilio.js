require("dotenv").config() 

const accountSid = "AC82fda9f226f9177908fa39dc96bbf108"
const authToken = process.env.TWILIO_TOKEN
const client = require("twilio")(accountSid, authToken)

module.exports = client