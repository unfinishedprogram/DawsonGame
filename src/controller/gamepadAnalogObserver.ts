import { Action } from "../utils/action";
import { Observer } from "../utils/observer";
import { GamepadMoveInput } from "./inputSubject";

enum Sticks {
    LEFT,
    RIGHT
}

export class GamepadAnalogObserver extends Observer<GamepadMoveInput> {
    onNotify(action: Action, info: GamepadMoveInput): void {
        if (action !== Action.GAMEPAD_MOVE) return;
        console.log(Sticks[info.stick] + ' stick moved to ' + info.value.x + ', ' + info.value.y);
    }
}
