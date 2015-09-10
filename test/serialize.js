var assert = require('assert');

var serialize = require('..');

var data = require('./data.json');


describe('Serialize', function() {
    it('should be a function', function() {
        assert.equal(typeof serialize, 'function');
    });

    it('should return a string', function() {
        var str = 'Mo-Fr 10:00-14:00 15:00-21:00; Sa 10:00-14:00';
        assert.equal(serialize(data), str);
    });
});
