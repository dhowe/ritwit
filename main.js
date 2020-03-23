let fs = require('fs');
let twit = require('twit');
let sizeOf = require('image-size');
let text2png = require('text2png');
let mergeImages = require('merge-images');
let { Canvas, Image } = require('canvas');

class RiTweet {

  constructor(config = {}) {
    if (!config.access_token || !config.consumer_key) {
      throw Error('Invalid config options:',config);
    }
    this.T = new twit(config);
    this.tmp = config.tempdir || '/tmp';
    this.verbose = config.verbose || false;
  }

  tweet(text, cb) {
    if (!text || !text.length) throw Error('text required');
    this.T.post('statuses/update', { status: text }, cb || (e => {
      if (e) throw e;
      this.verbose && console.log('Tweeted: ' + text);
    }));
  }

  retweet(id, cb) {
    if (!id) throw Error('id required');
    this.T.post('statuses/retweet/:id', { id: id }, cb || (e => {
      if (e) throw e;
      this.verbose && console.log('Retweeted: ' + id);
    }));
  }

  userByName(screenName, cb) {
    if (!screenName) throw Error('screenname required');
    this.T.get('users/show/', { screen_name: screenName }, cb || ((e, user) => {
      if (e) throw e;
      this.verbose && console.log('Found:', user);
    }));
  }

  userById(userId, cb) {
    if (!userId) throw Error('id required');
    this.T.get('users/show/', { user_id: userId }, cb || ((e, user) => {
      if (e) throw e;
      this.verbose && console.log('Found:', user);
    }));
  }

  /*
    Filter params:
      track 	optional 	Keywords to track. Phrases of keywords are specified by a comma-separated list. See track for more information.
      follow 	optional 	A comma separated list of user IDs, indicating the users to return statuses for in the stream. See follow for more information.
      locations 	optional 	Specifies a set of bounding boxes to track. See locations for more information.
      delimited 	optional 	Specifies whether messages should be length-delimited. See delimited for more information.
  */
  onTweetMatching(filter, todo) {
    if (!filter) throw Error('filter required');
    if (typeof filter === 'string' || Array.isArray(filter)) {
      filter = { track: filter };
    }
    let stream = this.T.stream('statuses/filter', filter);
    stream.on('tweet', todo || (t => console.log(t.user.name + ': ' + t.text)));
    this.verbose && console.log('Listening for tweet with', filter);
  }

  /*
    Filter params:
      track 	optional 	Keywords to track. Phrases of keywords are specified by a comma-separated list. See track for more information.
      follow 	optional 	A comma separated list of user IDs, indicating the users to return statuses for in the stream. See follow for more information.
      locations 	optional 	Specifies a set of bounding boxes to track. See locations for more information.
      delimited 	optional 	Specifies whether messages should be length-delimited. See delimited for more information.
  */
  onDeleteMatching(filter, todo) {
    if (!filter) throw Error('filter required');
    if (typeof filter === 'string') filter = { track: filter };
    let stream = this.T.stream('statuses/filter', filter);
    stream.on('delete', todo || (t => console.log(t.user.name + ': ' + t.text)));
    this.verbose && console.log('Listening for delete with', filter);
  }

  destroy(id, cb) {
    if (!id) throw Error('id required');
    this.T.post('statuses/destroy/:id', { id: id }, cb || (e => {
      if (e) throw e;
      this.verbose && console.log('Destroyed: ' + id);
    }));
  }

  tweetImage(imgPath, text, cb) {
    text = text || '';
    fs.readFile(imgPath, { encoding: 'base64' }, (e, imgData) => {
      if (e) throw e;
      this._tweetImageData(imgData, text, cb);
    });
  }

  tweetTextOverImage(imgPath, text, opts = {}, cb) {
    opts.textAlign = opts.textAlign || 'center';
    opts.writeFile = opts.writeFile || false;
    let outputImage = this.tmp + '/output.png';
    let textImage = this.tmp + '/' + text + '.png';
    fs.writeFile(textImage, text2png(text, opts), e => {
      if (e) throw e;
      this.verbose && console.log('Wrote ' + textImage);
      let textDims = sizeOf(textImage);
      let imageDims = sizeOf(imgPath);
      let opacity = opts.opacity || 1;
      let xoff = opts.xOffset || 0, yoff = opts.yOffset || 0;
      let x = (opts.x || (imageDims.width - textDims.width) / 2) + xoff;
      let y = (opts.y || (imageDims.height - textDims.height) / 2) + yoff;
      mergeImages([imgPath, { src: textImage, x, y, opacity }], { Canvas, Image })
        .then(b64 => {
          this.verbose && console.log('Merged images');
          let b64Img = b64.split(';base64,').pop();
          if (opts.writeFile) {
            fs.writeFile(outputImage, b64Img, { encoding: 'base64' }, e => {
              if (e) throw e;
              this.tweetImage(outputImage, '', cb);
            });
          }
          else {
            this._tweetImageData(b64Img, '', cb);
          }
        });
    });
  }

  _tweetImageData(imgData, text, cb) {
    text = text || '';
    this.T.post('media/upload', { media_data: imgData }, (e, data) => {
      if (e) throw e;
      this.verbose && console.log('Uploaded image');
      this.T.post('statuses/update', {
        status: text, media_ids: [data.media_id_string]
      }, cb || (e => {
        if (e) throw e;
        this.verbose && console.log('Tweeted image');
      }));
    });
  }
}

module.exports = RiTweet;
