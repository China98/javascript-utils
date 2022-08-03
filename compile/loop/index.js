export const useLoop = (done, timeout, immediate, count, ...args) => {
    let time = undefined;
    const start = () => {
        immediate &&
            done.call(null, ...args) &&
            (() => {
                count > 0 && count--;
            })();
        loop(!immediate);
    };
    const loop = (ex) => {
        if (count-- > 0) {
            try {
                ex && done.call(null, ...args);
                time = setTimeout(() => {
                    loop(true);
                }, timeout);
            }
            catch (e) {
                count = 0;
                throw e;
            }
        }
    };
    const stop = () => {
        clearTimeout(time);
        time = undefined;
    };
    return [start, stop];
};
