import { Networking } from './networking';
import { GameEvent } from './gameEvent/gameEvent';
import { JoinEvent } from './gameEvent/joinEvent';

export class EventHandler {
    parent: Networking;
    events: GameEvent[] = [
        new JoinEvent(),
    ];

    constructor(parent: Networking) {
        this.parent = parent;

    }

    handle(event:  MessageEvent) {
        let data = JSON.parse(event.data);
        let match = this.events.find(element => element.name == data.type);
        if (match) {
            match.execute(data);
        } else {
            console.log(`${data.type} event failed. Not registered.`);
        }
    }

}
