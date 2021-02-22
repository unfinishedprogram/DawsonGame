import { GameEvent } from './GameEvent';

export class JoinEvent extends GameEvent {
    name: String = "join";

    constructor() {
        super();
    }

    // There shouldn't be an any
    execute(data: any): void {
        console.log(`${data.count} received from the server`);

    }
    
}
