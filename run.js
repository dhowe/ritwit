let conf = require('./config');
let RiTwit = require('./main');

let rt = new RiTwit(conf);

0 && rt.tweet('1 mushroom is really coming');
0 && rt.tweetImage('img/mushroom.jpg', 'mushrooms');
0 && rt.tweetTextOverImage('img/mushroom.jpg', 'Humanity', {
 font: '80px Futura', opacity: 0.8, yOffset: 60
});
0 && rt.onTweetMatching('Climate');
0 && rt.userByName('utensilbot');
0 && rt.userById('1241263348529807361');

0 && rt.onTweetMatching({ follow: '1241263348529807361' }, function (tweet) {
})

0 && rt.onTweetMatching({ track: 'COVID', language: 'en', locations: '-74,40,-73,41' }, function (tweet) {
   if (tweet.retweeted_status) return; // no retweets
   if (!/#COVID/.test(tweet.text)) return; // must contain #COVID hashtag
   let text = cleanTweet(tweet.text);
   console.log(text, '\n---------------------------------------');
})

function cleanTweet(tweet) {
  let result = [], words = RiTa.tokenize(tweet);
  for (let i = 0; i < words.length; i++) {
    if (words[i] === '@') { i++; continue; }
    if (words[i].match(/^[';.?!;,"]$/)) continue;
    if (!words[i].match(/^[A-z]+$/)) return false;
    result.push(words[i]);
  }
  return RiTa.untokenize(result);
}

