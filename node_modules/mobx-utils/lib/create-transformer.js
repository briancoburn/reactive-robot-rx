import { computed, onBecomeUnobserved } from "mobx";
import { invariant, addHiddenProp } from "./utils";
var memoizationId = 0;
/**
 * Creates a function that maps an object to a view.
 * The mapping is memoized.
 *
 * See: https://mobx.js.org/refguide/create-transformer.html
 */
export function createTransformer(transformer, onCleanup) {
    invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument");
    // Memoizes: object id -> reactive view that applies transformer to the object
    var views = {};
    function createView(sourceIdentifier, sourceObject) {
        var latestValue;
        var expr = computed(function () {
            return (latestValue = transformer(sourceObject));
        }, {
            name: "Transformer-" + transformer.name + "-" + sourceIdentifier
        });
        var disposer = onBecomeUnobserved(expr, function () {
            delete views[sourceIdentifier];
            disposer();
            if (onCleanup)
                onCleanup(latestValue, sourceObject);
        });
        return expr;
    }
    return function (object) {
        var identifier = getMemoizationId(object);
        var reactiveView = views[identifier];
        if (reactiveView)
            return reactiveView.get();
        // Not in cache; create a reactive view
        reactiveView = views[identifier] = createView(identifier, object);
        return reactiveView.get();
    };
}
function getMemoizationId(object) {
    if (typeof object === "string" || typeof object === "number")
        return object;
    if (object === null || typeof object !== "object")
        throw new Error("[mobx-utils] transform expected an object, string or number, got: " + object);
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = ++memoizationId;
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}
