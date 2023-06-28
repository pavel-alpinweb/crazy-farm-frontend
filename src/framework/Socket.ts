export default class Socket {
    private socket!: WebSocket;
    private readonly BASE_SOCKET_URL = "ws://crazyfarm.herokuapp.com";
    constructor(jwt: string) {
        this.socket = new WebSocket(`${this.BASE_SOCKET_URL}/game?token=${jwt}`);
    }
    onOpen(): any {
     this.socket.onopen = (event: any) => {
         console.info('Соединение устанволенно:', event)
         return event;
     };
    }
}