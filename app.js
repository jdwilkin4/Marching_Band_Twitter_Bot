require('dotenv').config
const Twit = require('twit')

const twitterSetup = new Twit({
    consumer_key: process.env.API_Key,
    consumer_secret: process.env.API_Secret_Key,
    access_token: process.env.Access_Token,
    access_token_secret: process.env.Access_Token_Secret
});

//starting stream and tracking keywords
const stream = twitterSetup.stream('statuses/filter', { track: '#DCI2021, #marchingband' });

// use this to log errors from requests

function responseCallback(err, data, response) {
    console.log(err);
}

//event handler
stream.on('tweet', tweet => {
    //retweet
    twitterSetup.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);

    //like tweet
    twitterSetup.post('favorites/create', { id: tweet.id_str }, responseCallback);
});

