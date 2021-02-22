import { create_connection } from '../Utils/websocket_connect';
import { EventHandler } from './Handler';

export class Networking {
    websocket: WebSocket;
    eventHandler: EventHandler;

    constructor(ip: string, port: number) {
        this.websocket = create_connection(ip, port);
        this.eventHandler = new EventHandler(this);
        
        let that = this; // This is not optimal but it works well.
        this.websocket.onmessage = function (event) {
           that.eventHandler.handle(event) 
        }
    }
}
