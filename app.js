const Twit = require('twit');
const config = require('./config');

const twitterSetup = new Twit(config);

const retweet = (searchText) => {
    //setting parameters for the search/tweet api endpoints
    //search params per documentation https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
    let params = {
        q: searchText + '',
        result_type: 'mixed',
        count: 25,
    };

    twitterSetup.get('search/tweets', params, (err, data) => {

        if (!err) {

            for (let i = 0; i < data.statuses.length; i++) {

                let id = { id: data.statuses[i].id_str }

                //Favorite the selected Tweet
                twitterSetup.post('favorites/create', id, (err) => {
                    err ? console.log('There was an error') : console.log('bot just liked a tweet')
                });

                //retweet the post
                twitterSetup.post('statuses/retweet/:id', id, (errorRetweet) => {
                    !errorRetweet ? console.log("\n\nRetweeted! ID - " + id) : console.log("\nError..." + id)
                })

            }

        } else {
            console.log('Error while searching' + err)
            process.exit(1)
        }
    });

};

//check for retweets every minute
setInterval(() => { retweet('#DCI2021 OR #marchingband'); }, 6000)

