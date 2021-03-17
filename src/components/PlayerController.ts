import { GamepadAxis, GamepadAxisDirection } from "../controller/gamepad/gamepadAnalogObserver";
import { GamepadButtons } from "../controller/gamepad/gamepadButtonObserver";
import { MouseButtons } from "../controller/mouse/mouseButtonObserver";
import { Component } from "./component";

/** The interface that represents a bind for a gamepad axis */
export interface GamepadAxisBind {
    axis: GamepadAxis;
    direction: GamepadAxisDirection;
    positive: boolean;
}

/** The interface that represents all the key binds that are assigned to an action */
export interface KeyBind {
    keyboardKeycodes?: string[];
    gamepadAnalog?: GamepadAxisBind;
    gamepadButtons?: GamepadButtons[];
    mouseButtons?: MouseButtons[];
}

/** The interface that represents all the actions and controls assigned to them */
export interface KeyBinds {
    forward?: KeyBind;
    backward?: KeyBind;
    leftward?: KeyBind;
    rightward?: KeyBind;
    shoot?: KeyBind;
}

export class PlayerController extends Component {
    // Default controls
    private controls: KeyBinds = {
        forward: {
            keyboardKeycodes: ['KeyW', 'UpArrow'],
            gamepadAnalog: {axis: GamepadAxis.LEFT, direction: GamepadAxisDirection.VERTICAL, positive: true},
            gamepadButtons: [GamepadButtons.UP]
        },
        backward: {
            keyboardKeycodes: ['KeyS', 'DownArrow'],
            gamepadAnalog: {axis: GamepadAxis.LEFT, direction: GamepadAxisDirection.VERTICAL, positive: false},
            gamepadButtons: [GamepadButtons.DOWN]
        },
        leftward: {
            keyboardKeycodes: ['KeyA', 'LeftArrow'],
            gamepadAnalog: {axis: GamepadAxis.LEFT, direction: GamepadAxisDirection.HORIZONTAL, positive: true},
            gamepadButtons: [GamepadButtons.LEFT]
        },
        rightward: {
            keyboardKeycodes: ['KeyD', 'RightArrow'],
            gamepadAnalog: {axis: GamepadAxis.LEFT, direction: GamepadAxisDirection.HORIZONTAL, positive: false},
            gamepadButtons: [GamepadButtons.RIGHT]
        },
        shoot: {
            keyboardKeycodes: ['KeySpace'],
            gamepadButtons: [GamepadButtons.RB, GamepadButtons.RT],
            mouseButtons: [MouseButtons.LEFT_MOUSE_BUTTON]
        }
    };

    /**
     * Initialize player controller
     * @param customControls Custom key binds (if nothing is specified the controls will be default)
     */
    constructor(customControls?: KeyBinds) {
        super();

        // Set custom controls if they are specified
        if (customControls) {
            // Iterate through each key inside custom controls and set controls if custom bind is specified
            const keys = Object.keys(customControls);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i] as keyof KeyBinds;
                if (customControls[key])
                    this.controls[key] = customControls[key];
            }
        }
    }
}