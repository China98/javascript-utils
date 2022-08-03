
type EventHandlerFn = (...args: any) => void;

function useHtmlEvent(
  el: HTMLElement | Window | Document, 
  eventName: keyof HTMLElementEventMap, 
  handler: EventHandlerFn, 
  ...args: any[]
): Record<'register' | 'unRegister' | 'lock' | 'unLock', () => void> {
   let isLock = false

   const triggerHandler = () => {
     if(isLock) return
     handler.call(null, ...args)
   }
   const register = () => {
     isLock = false
     el.addEventListener(eventName, triggerHandler, { passive: false })  
   }

   const unRegister = () => {
     el.removeEventListener(eventName, triggerHandler);  
   }

   const lock = () => {
      isLock = true;
   }

   const unLock = () => {
      isLock = false;
   }
  
   register();
   return { register, unRegister, lock, unLock }
}