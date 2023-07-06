export default class Socket {
    private socket!: WebSocket;
    private readonly BASE_SOCKET_URL = "ws://crazyfarm.herokuapp.com";
    constructor(jwt: string) {
        this.socket = new WebSocket(`${this.BASE_SOCKET_URL}/game?token=${jwt}`);
    }
    onOpen(callback: (event: Event) => void): void {
     this.socket.onopen = (event: Event) => {
         callback(event);
     };
    }
    onMessage(callback: (event: MessageEvent) => void): void {
     this.socket.onmessage = (event: MessageEvent): void => {
         callback(JSON.parse(event.data));
     };
    }
    onClose(callback: (event: CloseEvent) => void): void {
        this.socket.onclose = (event: CloseEvent): void => {
            callback(event);
        };
    }
    close() {
        this.socket.close(1000, "Game Over");
    }
}