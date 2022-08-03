"use strict";
function useHtmlEvent(el, eventName, handler, ...args) {
    let isLock = false;
    const triggerHandler = () => {
        if (isLock)
            return;
        handler.call(null, ...args);
    };
    const register = () => {
        isLock = false;
        el.addEventListener(eventName, triggerHandler, { passive: false });
    };
    const unRegister = () => {
        el.removeEventListener(eventName, triggerHandler);
    };
    const lock = () => {
        isLock = true;
    };
    const unLock = () => {
        isLock = false;
    };
    register();
    return { register, unRegister, lock, unLock };
}
