const RiTweet = require('../main');
const expect = require('chai').expect;

describe('RiTweet', () => {
        it('Should throw without a valid config ', () => {
        expect(() => new RiTweet()).to.throw();
        expect(() => new RiTweet({})).to.throw();
    });
    it('Should correctly construct a RiTweet object', () => {
        expect(new RiTweet({
            consumer_key: 'xxx',
            consumer_secret: 'xxx',
            access_token: 'xxx',
            access_token_secret: 'xxx',
        })).to.be.an('object');
    });
});