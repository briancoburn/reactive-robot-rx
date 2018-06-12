"use strict";
var mobx_1 = require("mobx");
/**
 * Like normal `when`, except that this `when` will automatically dispose if the condition isn't met within a certain amount of time.
 *
 * @example
 * test("expect store to load", t => {
 *   const store = {
 *     items: [],
 *     loaded: false
 *   }
 *   fetchDataForStore((data) => {
 *     store.items = data;
 *     store.loaded = true;
 *   })
 *   whenWithTimeout(
 *     () => store.loaded
 *     () => t.end()
 *     2000,
 *     () => t.fail("store didn't load with 2 secs")
 *   )
 * })
 *
 *
 * @export
 * @param {() => boolean} expr see when, the expression to await
 * @param {() => void} action see when, the action to execut when expr returns truthy
 * @param {number} [timeout=10000] maximum amount when spends waiting before giving up
 * @param {any} [onTimeout=() => {}] the ontimeout handler will be called if the condition wasn't met within the given time
 * @returns {IDisposer} disposer function that can be used to cancel the when prematurely. Neither action or onTimeout will be fired if disposed
 */
function whenWithTimeout(expr, action, timeout, onTimeout) {
    if (timeout === void 0) { timeout = 10000; }
    if (onTimeout === void 0) { onTimeout = function () { }; }
    var done = false;
    var handle = setTimeout(function () {
        if (!done) {
            disposer();
            onTimeout();
        }
    }, timeout);
    var disposer = mobx_1.when(expr, function () {
        done = true;
        clearTimeout(handle);
        action();
    });
    return function () {
        clearTimeout(handle);
        disposer();
    };
}
exports.whenWithTimeout = whenWithTimeout;
