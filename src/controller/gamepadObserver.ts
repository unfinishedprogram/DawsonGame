import { Action } from "../utils/action";
import { Observer } from "../utils/observer";
import { GamepadButtonInput } from "./inputSubject";

export class GamepadObserver extends Observer<GamepadButtonInput> {
    onNotify(action: Action, info: GamepadButtonInput): void {
        console.log('Method not implemented.');
    }
}
