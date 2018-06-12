"use strict";
exports.NOOP = function () { };
exports.IDENTITY = function (_) { return _; };
function invariant(cond, message) {
    if (message === void 0) { message = "Illegal state"; }
    if (!cond)
        throw new Error("[mobx-utils] " + message);
}
exports.invariant = invariant;
var deprecatedMessages = [];
function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1)
        return;
    deprecatedMessages.push(msg);
    console.error("[mobx-utils] Deprecated: " + msg);
}
exports.deprecated = deprecated;
