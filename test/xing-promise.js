import XingPromiseFactory from "../src/xing-promise.js";

describe("Xing Promise", function() {
  var xingPromise, XingPromise, promiseImplementation, finalResults;
  beforeEach(function() {
    promiseImplementation = function(...params) {
      return new Promise(...params);
    };

    XingPromise = XingPromiseFactory.factory(promiseImplementation);
  });

  describe("constructor style", function() {
    describe("resolve", function() {
      beforeEach(function(done) {
        xingPromise = new XingPromise((res, rej) => res("Hello"));
        xingPromise.then((results) => {
          finalResults = results;
          done();
        });
      });

      it("should resolve", function() {
        expect(finalResults).toEqual("Hello");
      });
    });

    describe("reject", function() {
      beforeEach(function(done) {
        xingPromise = new XingPromise((res, rej) => rej("Fail"));
        xingPromise.catch((results) => {
          finalResults = results;
          done();
        });
      });

      it("should resolve", function() {
        expect(finalResults).toEqual("Fail");
      });
    });

  });

  describe("resolve", function() {
    beforeEach(function(done) {
      xingPromise = XingPromise.resolve("Hello");
      xingPromise.then((results) => {
        finalResults = results;
        done();
      });
    });

    it("should resolve", function() {
      expect(finalResults).toEqual("Hello");
    });
  });

  describe("reject", function() {
    beforeEach(function(done) {
      xingPromise = XingPromise.reject("Fail");
      xingPromise.catch((results) => {
        finalResults = results;
        done();
      });
    });

    it("should resolve", function() {
      expect(finalResults).toEqual("Fail");
    });
  });

  describe("all", function() {

    describe("on success", function() {
      beforeEach(function(done) {
        var promise1 = XingPromise.resolve("awesome");
        var promise2 = new XingPromise((res, rej) => res("cheese"));
        var nonPromise3 = "basketball";
        xingPromise = XingPromise.all([promise1, promise2, nonPromise3]).then((results) => {
          finalResults = results;
          done();
        });
      });

      it("should resolve", function() {
        expect(finalResults).toEqual(["awesome", "cheese", "basketball"])
      });

    });

    describe("on reject", function() {
      beforeEach(function(done) {
        var promise1 = XingPromise.resolve("awesome");
        var promise2 = XingPromise.reject("Fail One Promise");
        var nonPromise3 = "basketball";
        xingPromise = XingPromise.all([promise1, promise2, nonPromise3]).catch((results) => {
          finalResults = results;
          done();
        });
      });

      it("should reject immediately when one promise fails", function() {
        expect(finalResults).toEqual("Fail One Promise")
      });

    });
  });
});
