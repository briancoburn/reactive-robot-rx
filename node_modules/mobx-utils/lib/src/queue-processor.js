"use strict";
var mobx_1 = require("mobx");
/**
 * `queueProcessor` takes an observable array, observes it and calls `processor`
 * once for each item added to the observable array, optionally deboucing the action
 *
 * @example
 * const pendingNotifications = observable([])
 * const stop = queueProcessor(pendingNotifications, msg => {
 *   // show Desktop notification
 *   new Notification(msg);
 * })
 *
 * // usage:
 * pendingNotifications.push("test!")
 *
 * @param {T[]} observableArray observable array instance to track
 * @param {(item: T) => void} processor action to call per item
 * @param {number} [debounce=0] optional debounce time in ms. With debounce 0 the processor will run synchronously
 * @returns {IDisposer} stops the processor
 */
function queueProcessor(observableArray, processor, debounce) {
    if (debounce === void 0) { debounce = 0; }
    if (!mobx_1.isObservableArray(observableArray))
        throw new Error("Expected observable array as first argument");
    if (!mobx_1.isAction(processor))
        processor = mobx_1.action("queueProcessor", processor);
    var runner = function () {
        // construct a final set
        var items = observableArray.slice(0);
        // clear the queue for next iteration
        mobx_1.runInAction(function () { return observableArray.splice(0); });
        // fire processor
        items.forEach(processor);
    };
    if (debounce > 0)
        return mobx_1.autorunAsync(runner, debounce);
    else
        return mobx_1.autorun(runner);
}
exports.queueProcessor = queueProcessor;
