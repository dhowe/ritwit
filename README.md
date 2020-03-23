# RiTweet

A simple twitter client for js

# Installing

First create a developer account on twitter and get the four keys will you need below.

```shell
npm install ritweet
```

## Usage:

```javascript
let RiTweet = require('ritweet');

let rt = new RiTweet({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  verbose: true
})


//
//  tweet 'hello world'
//
rt.tweet('hello world');

//
//  tweet 'hello world' with callback
//  note: all functions take optional callbacks as below
//
rt.tweet('hello world', function (err, data, response) {
  console.log('done')
});

//
//  tweet an image
//
rt.tweetImage('img/mushroom.jpg');

//
//  tweet an image plus text
//
rt.tweetImage('img/mushroom.jpg', 'mushrooms');

//
// tweet text overlayed on an image
//
rt.tweetTextOverImage('img/mushroom.jpg', 'Humanity', {
    font: '80px Futura', opacity: 0.8, yOffset: 60
});

//
// get a stream of tweets matching a query
//
rt.onTweetMatching('Climate', function(tweet) {
    console.log(tweet);
});

//
//  find a user by id
//
rt.userById('1241263348529807361', function (err, user) {
    console.log(user);
});

//
//  find a user by screen-name
//
rt.userByName('utensilbot', function (err, user) {
    console.log(user);
});




