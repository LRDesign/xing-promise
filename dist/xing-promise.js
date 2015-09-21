import {AsModule, Factory} from "a1atscript";

class XingPromise {
  static all(promises) {
    return new XingPromise((res, rej) => {
      var remaining = promises.length;
      var arrayResults = []
      promises.forEach((promise, index) => {

        this.resolve(promise).then((results) => {
          remaining -= 1;
          arrayResults[index] = results;
          if (remaining == 0) {
            res(arrayResults);
          }
        }).catch((error) => {
          rej(error);
        });
      });
    });
  }
  static resolve(value) {
    return new XingPromise((res, rej) => res(value));
  }

  static reject(value) {
    return new XingPromise((res, rej) => rej(value));
  };

  constructor(resolver) {
    this.internalPromise = XingPromiseFactory.$q(resolver);
  }

  then(onFulfilled, onRejected, progressBack) {
    return this.internalPromise.then(onFulfilled, onRejected, progressBack);
  }

  catch(callback) {
    return this.internalPromise.catch(callback);
  }

  finally(callback, progressBack) {
    return this.internalPromise.finally(callback, progressBack);
  }
}

export default class XingPromiseFactory {

  @AsModule('XingPromise')
  @Factory('XingPromise', ['$q'])
  static factory($q) {
    XingPromiseFactory.$q = $q;
    return XingPromise;
  }

}
