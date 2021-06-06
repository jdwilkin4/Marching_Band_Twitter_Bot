const Twit = require('twit');
const config = require('./config');

const twitterSetup = new Twit(config)


// testing  tweet 'hello world!'

twitterSetup.post('statuses/update', { status: 'hello world!' }, function (err, data, response) {
    console.log(data)
})

