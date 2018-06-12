export declare type IDisposer = () => void;
export declare const NOOP: () => void;
export declare const IDENTITY: (_: any) => any;
export declare function invariant(cond: boolean, message?: string): void;
export declare function deprecated(msg: string): void;
