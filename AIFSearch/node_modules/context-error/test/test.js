var should = require("should");
var ContextError = require("../");

describe("Refernce the right line", function() {

    var one = function(callback) {
        callback();
    }

    var two = function(callback) {
        one(callback);
    }

    var three = function(callback) {
        two(callback);
    }

    it("Should mention function three", function() {
        three(function() {
            try {
                throw ContextError("Line 15", 5);
            } catch (err) {
                err.message.split(":")[1].should.equal("15");
            }
        });
    });

    it("Should mention function two", function() {
        two(function() {
            try {
                throw ContextError("Line 11", 4);
            } catch (err) {
                err.message.split(":")[1].should.equal("11");
            }
        });
    });

    it("Should mention function one", function() {
        one(function() {
            try {
                throw ContextError("Line 7", 3);
            } catch (err) {
                err.message.split(":")[1].should.equal("7");
            }
        });
    });
});