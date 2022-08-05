
declare global {
    declare type Recordable<T = any> = Record<string, T>;

    declare type ReadonlyRecordable<T = any> = {
        readonly [key: string]: T;
      };

    declare type Writable<T = Record<string, any>> = {
       -readonly[K in keyof T]: T[K];  
    }

    declare type TimeoutHandle = ReturnType<typeof setTimeout>;
    declare type IntervalHandle = ReturnType<typeof setInterval>;
}