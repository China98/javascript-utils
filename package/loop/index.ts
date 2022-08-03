export const useLoop = (
    done: Function,
    timeout: number,
    immediate: boolean,
    count: number,
    ...args: any[]
  ) => {
    let time: any = undefined;
  
    const start = () => {
      immediate &&
        done.call(null, ...args) &&
        (() => {
          count > 0 && count--;
        })();
      loop(!immediate);
    };
  
    const loop = (ex: boolean) => {
      if (count-- > 0) {
        try {
          ex && done.call(null, ...args);
          time = setTimeout(() => {
            loop(true);
          }, timeout);
        } catch (e: any) {
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