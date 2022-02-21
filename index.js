/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
var Twit = require('twit');

exports.helloPubSub = (event, context) => {
    const message = event.data
    ? Buffer.from(event.data, 'base64').toString() : null;
    if (message) {

        var T = new Twit({
            consumer_key: process.env.TWIT_CONSUMER_KEY,
            consumer_secret: process.env.TWIT_CONSUMER_SECRET,
            access_token: process.env.TWIT_ACCESS_TOKEN,
            access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET,
        });

        console.log('Looking for recent tweets in hashtag: ', message);
        
        T.get('statuses/user_timeline', { screen_name: 'ZabskiBot', count: 1 }, function(err, result, response) {
            if (result) {
                console.log('Since id: ', result[0].id_str);
                T.get('search/tweets', { q: message, result_type: 'recent', since_id: result[0].id_str }, function(err, data, response) {
                    if(err) {
                        console.error(err)
                    } else {
                        if (data.statuses) {
                            data.statuses.forEach((x, index) => {
                                T.post('statuses/retweet/:id', { id: x.id_str }, function (err, data, response) {
                                    if(!err) {
                                        console.log('retweeted: ', `https://twitter.com/ZabskiBot/status/${x.id_str}`)
                                    } else {
                                        console.error('Not retweeted: ', `https://twitter.com/ZabskiBot/status/${x.id_str}`)
                                    }
                                });
                                
                            });
                            
                        }
                    }
                });
            } else {
                console.error('My tweets not received')
            }
        });
    }
};
