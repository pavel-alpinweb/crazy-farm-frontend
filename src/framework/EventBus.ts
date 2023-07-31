declare global {
  interface Listeners {
    [key: string]: [] | (callback[]);
  }
}


export class EventBus {
  private listeners: Listeners = {};

  on(event: string, callback: callback) {
    this.listeners[event] = this.listeners[event] || [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.listeners[event].push(callback);
  }
  off(event: string, callback: callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((listener) => {
        return listener.toString() !== callback.toString();
      });
    }
  }
  emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener(...args);
      });
    }
  }
}
