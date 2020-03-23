const RiTwit = require('../main');
const expect = require('chai').expect;

describe('RiTwit', () => {
        it('Should throw without a valid config ', () => {
        expect(() => new RiTwit()).to.throw();
        expect(() => new RiTwit({})).to.throw();
    });
    it('Should correctly construct a RiTwit object', () => {
        expect(new RiTwit({
            consumer_key: 'xxx',
            consumer_secret: 'xxx',
            access_token: 'xxx',
            access_token_secret: 'xxx',
        })).to.be.an('object');
    });
});