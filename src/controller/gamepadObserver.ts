import { Action } from "../utils/action";
import { Observer } from "../utils/observer";

export class GamepadObserver extends Observer<Gamepad> {
    onNotify(action: Action, info: Gamepad): void {
        console.log('Method not implemented.');
    }
}