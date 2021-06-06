const Twit = require('twit');
const config = require('./config');

const twitterSetup = new Twit(config)

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

