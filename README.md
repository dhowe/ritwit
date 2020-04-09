# RiTwit

A simple twitter client for node.js

# Installing

```shell
npm install ritwit
```

To use this package you will need to create a developer account on Twitter and obtain (4) keys for your config object, as shown below.


## Usage:

```javascript
let RiTwit = require('ritwit');

let rt = new RiTwit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  verbose: true
})


//
//  Tweet 'hello world'
//
rt.tweet('hello world');

//
//  Tweet 'hello world' with callback
//  Note: all functions take optional callbacks as below
//
rt.tweet('hello world', function (err, data) {
  console.log('done')
});

//
//  Tweet an image
//
rt.tweetImage('img/mushroom.jpg');

//
//  Tweet an image plus text
//
rt.tweetImage('img/mushroom.jpg', 'mushrooms');

//
// Get a stream of tweets matching one or more keywords (comma-delimited)
//
rt.onTweetMatching('Climate', function(tweet) {
    console.log(tweet);
});

//
// Get a stream of tweets matching one or more user-ids (comma-delimited)
//
rt.onTweetMatching({ follow: '1241263348529807361,2855526444' }, function(t) {
    console.log(t);
})

//
// Get a stream of tweets for one or more locations (comma-delimited)
//
rt.onTweetMatching({ locations: '-74,40,-73,41' }, function (tweet) {
    console.log(tweet);          // new york
})

//
//  Find a user by Twitter id
//
rt.userById('1241263348529807361', function (err, user) {
    console.log(user);
});

//
//  Find a user by screen-name
//
rt.userByName('utensilbot', function (err, user) {
    console.log(user);
});

//
// Tweet text overlayed on an image
//
rt.tweetTextOverImage('img/mushroom.jpg', 'Humanity', {
    font: '80px Futura', opacity: 0.8, yOffset: 60
});

