export var NOOP = function () { };
export var IDENTITY = function (_) { return _; };
export function invariant(cond, message) {
    if (message === void 0) { message = "Illegal state"; }
    if (!cond)
        throw new Error("[mobx-utils] " + message);
}
var deprecatedMessages = [];
export function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1)
        return;
    deprecatedMessages.push(msg);
    console.error("[mobx-utils] Deprecated: " + msg);
}
export function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
