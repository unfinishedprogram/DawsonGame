import { create_connection } from '../Utils/websocket_connect';

export class Networking {
    websocket: WebSocket;

    constructor(ip: string, port: number) {
        this.websocket = create_connection(ip, port);

    }

}
