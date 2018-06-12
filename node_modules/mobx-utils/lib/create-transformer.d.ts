export declare type ITransformer<A, B> = (object: A) => B;
/**
 * Creates a function that maps an object to a view.
 * The mapping is memoized.
 *
 * See: https://mobx.js.org/refguide/create-transformer.html
 */
export declare function createTransformer<A, B>(transformer: ITransformer<A, B>, onCleanup?: (resultObject: B | undefined, sourceObject?: A) => void): ITransformer<A, B>;
