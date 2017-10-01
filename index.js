var Twitter = require('twitter');
var fs = require('fs');
var config = require('./config');

var client = new Twitter({
  consumer_key:        config.TWITTER_consumer_key,
  consumer_secret:     config.TWITTER_consumer_secret,
  access_token_key:    config.TWITTER_access_token_key,
  access_token_secret: config.TWITTER_access_token_secret
});

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
/*client.get('search/tweets', {q: 'eurusd' , lang: 'en'}, function(error, tweets, response) { 
   var numOfTweets = Object.keys(tweets.statuses).length;
   console.log(`${numOfTweets} tweets found in English`);
   for( i=0; i < numOfTweets ; i++) {
      var tweetText = tweets.statuses[i].text;
      console.log(tweetText);
   }
   fs.writeFile("response.json", JSON.stringify(tweets,null,4) , function(err){
      if(err) throw err;
      console.log('The file has been saved');
   });
});*/
var body = "";
client.stream('statuses/filter', {track: 'explosion', lang:'en'},  function(stream) {
  stream.on('data', function(tweet) {

    fs.appendFile("response.json", tweet.text+'\n' ,{'flags':'ax'}, function(err){
      if(err) throw err;
      console.log('The file has been updated');
   });
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
