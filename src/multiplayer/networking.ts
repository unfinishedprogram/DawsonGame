import { create_connection } from '../utils/websocket_connect';
import { EventHandler } from './handler';

export class Networking {
    websocket: WebSocket;
    eventHandler: EventHandler;

    constructor(ip: string, port: number) {
        this.websocket = create_connection(ip, port);
        this.eventHandler = new EventHandler(this);
        
        this.websocket.onmessage = (event) => {
            this.eventHandler.handle(event) 
        }
    }
}
