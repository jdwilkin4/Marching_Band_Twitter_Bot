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

    twitterSetup.get('search/tweets', params, (errSearch, bandSearch, responseSearch) => {
        let tweets = bandSearch.statuses

        if (!errSearch) {
            let tweetIDList = [];
            for (const tweet of tweets) {
                tweetIDList.push(tweet.id_str);
            }


            for (let tweetID of tweetIDList) {
                //code for retweets
                twitterSetup.post('statuses/retweet/:id', { id: tweetID }, (errorRetweet, bandRetweet, responseRetweet) => {
                    !errorRetweet ? console.log("\n\nRetweeted! ID - " + tweetID) : console.log("\nError..." + tweetID)
                })

                //code for likes
                let id = { id: tweetID.id_str }
                twitterSetup.post('favorites/create', id, (err, response) => {
                    err ? console.log('Error! Unable to like tweet.') : console.log('Bot just like a post')
                })
            }


        } else {
            console.log('Error while searching' + errSearch)
            process.exit(1)
        }
    });

};

//check for retweets every minute
setInterval(() => { retweet('#DCI2021 OR #marchingband'); }, 6000)

