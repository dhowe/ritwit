# RiTwit

A simple twitter client for js

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



