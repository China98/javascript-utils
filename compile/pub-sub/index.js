"use strict";
const isType = (value, type) => {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
};
class User {
    listeners = {};
    getListener = () => this.listeners;
    $listen = (name, handler) => {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(handler);
    };
}
class PubCenter extends User {
    // 触发订阅
    $trigger = async (handlers, ...args) => {
        let result = [];
        for (let current of handlers) {
            let is__delete = false;
            if (isType(current, 'Function')) {
                await current(...args);
            }
            else {
                await current.handler(...args);
                is__delete = current.once === true;
            }
            result.push({ is__delete, origin: current });
        }
        return result;
    };
    // 分发订阅   
    $emit = async (name, ...args) => {
        const listeners = this.getListener();
        if (!listeners[name] || !listeners[name].length)
            return;
        const handleResult = await this.$trigger(listeners[name], ...args);
        listeners[name] = handleResult.filter(item => !item.is__delete).map(item => item.origin);
    };
    // 精准分发    
    $scope = async (name, query, ...args) => {
        const listeners = this.getListener();
        if (!listeners[name] || !listeners[name].length)
            return;
        const filterResult = listeners[name].reduce((store, current) => {
            if (!isType(current, 'Function')) {
                const { id } = current || {};
                if (isType(query, 'String')) {
                    query === id && store.trigger.push(current);
                }
                else if (isType(query, 'Array')) {
                    query.includes(id) && store.trigger.push(current);
                }
                else {
                    store.origin.push(current);
                }
            }
            else
                store.origin.push(current);
            return store;
        }, { origin: [], trigger: [] });
        const handleResult = await this.$trigger(filterResult.trigger, ...args);
        listeners[name] = filterResult.origin.concat(handleResult.filter(item => !item.is__delete).map(item => item.origin));
    };
    // 取消订阅   
    $unListen = (name, handler) => {
        const listeners = this.getListener();
        if (!listeners[name])
            return;
        if (!handler) {
            delete listeners[name];
            return;
        }
        listeners[name] = listeners[name]?.filter?.(fnItem => {
            if (isType(handler, 'Funtion')) {
                return isType(fnItem, 'Funtion') ? fnItem !== handler : fnItem.handler !== handler;
            }
            else {
                if (isType(handler, 'Array')) {
                    return handler.includes(fnItem.id);
                }
                else {
                    return fnItem.id === handler;
                }
            }
        });
    };
}
// export { PubCenter }
// const pub = new PubCenter()
