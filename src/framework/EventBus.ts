interface Listeners {
  [key: string]: [] | ((...args: any) => void)[];
}

export class EventBus {
  private listeners: Listeners = {};

  on(event: string, callback: (...args: any) => void) {
    this.listeners[event] = this.listeners[event] || [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => {
        return listener !== callback;
      });
    };
  }
  emit(event: string, ...args: any[]) {
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
