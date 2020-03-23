let conf = require('./config');
let RiTweet = require('./index');

let rt = new RiTweet(conf);

rt.tweet('1 mushroom is really coming');
0 && rt.tweetImage('img/mushroom.jpg', 'mushrooms');
0 && rt.tweetTextOverImage('img/mushroom.jpg', 'Humanity', {
 font: '80px Futura', opacity: 0.8, yOffset: 60
});
0 && rt.onTweetMatching('Climate');
0 && rt.userByName('utensilbot');
0 && rt.userById('1241263348529807361');