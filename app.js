require('dotenv').config
const Twit = require('twit')

const twitterSetup = new Twit({
    consumer_key: process.env.API_Key,
    consumer_secret: process.env.API_Secret_Key,
    access_token: process.env.Access_Token,
    access_token_secret: process.env.Access_Token_Secret
})