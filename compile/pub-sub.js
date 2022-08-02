"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const isType = (value, type) => {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
};
class User {
    constructor() {
        this.listeners = {};
        this.getListener = () => this.listeners;
        this.$listen = (name, handler) => {
            if (!this.listeners[name]) {
                this.listeners[name] = [];
            }
            this.listeners[name].push(handler);
        };
    }
}
class PubCenter extends User {
    constructor() {
        super(...arguments);
        this.$trigger = (handlers, ...args) => __awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (let current of handlers) {
                let is__delete = false;
                if (isType(current, 'Function')) {
                    yield current(...args);
                }
                else {
                    yield current.handler(...args);
                    is__delete = current.once === true;
                }
                result.push({ is__delete, origin: current });
            }
            return result;
        });
        // 分发订阅   
        this.$emit = (name, ...args) => __awaiter(this, void 0, void 0, function* () {
            const listeners = this.getListener();
            if (!listeners[name] || !listeners[name].length)
                return;
            const handleResult = yield this.$trigger(listeners[name], ...args);
            listeners[name] = handleResult.filter(item => !item.is__delete).map(item => item.origin);
        });
        // 精准分发    
        this.$scope = (name, query, ...args) => __awaiter(this, void 0, void 0, function* () {
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
            const handleResult = yield this.$trigger(filterResult.trigger, ...args);
            listeners[name] = filterResult.origin.concat(handleResult.filter(item => !item.is__delete).map(item => item.origin));
        });
        // 取消订阅   
        this.$unListen = (name, handler) => {
            var _a, _b;
            const listeners = this.getListener();
            if (!listeners[name])
                return;
            if (!handler) {
                delete listeners[name];
                return;
            }
            listeners[name] = (_b = (_a = listeners[name]) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.call(_a, fnItem => {
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
}
// export { PubCenter }
// const pub = new PubCenter()
