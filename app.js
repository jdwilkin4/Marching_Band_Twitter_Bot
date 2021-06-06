const Twit = require('twit');
const config = require('./config');

let twitterSetup = new Twit(config)


// testing  tweet 'hello world!'

twitterSetup.post('statuses/update', { status: 'Looking forward to DCI performances' }, function (err, data, response) {
    console.log(data)
})

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

