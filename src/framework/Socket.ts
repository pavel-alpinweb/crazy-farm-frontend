import Service from "./Service";

export default class Socket {
    private socket!: WebSocket;
    constructor(jwt: string) {
        this.socket = new WebSocket(`ws://${Service.BASE_API_URL}/game?token=${jwt}`);
    }
    onOpen(): any {
     this.socket.onopen = (e: any) => {
         console.info('Соединение устанволенно:', e)
         return e;
     };
    }
}