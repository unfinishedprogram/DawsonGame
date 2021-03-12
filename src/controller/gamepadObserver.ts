import { Action } from "../utils/action";
import { Observer } from "../utils/observer";
import { ButtonState, GamepadButtonInput } from "./inputSubject";

enum Button {
    A,
    B,
    X,
    Y,
    LB,
    RB,
    LT,
    RT,
    BACK, // not sure about that one
    START,
    LSTICK,
    RSTICK,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    GUIDE 
}

export class GamepadObserver extends Observer<GamepadButtonInput> {
    onNotify(action: Action, info: GamepadButtonInput): void {
        if (action !== Action.GAMEPAD_INPUT) return;

        if ( info.state === ButtonState.DOWN ) {
            console.log(`${Button[action]} was pressed.`);
        } else {
            console.log(`${Button[action]} was released.`);
        }


    }
}
