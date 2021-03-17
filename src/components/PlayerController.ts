import { Vector2, Vector3 } from "three";
import { GamepadAxis, GamepadAxisDirection } from "../controller/gamepad/gamepadAnalogObserver";
import { GamepadButtons } from "../controller/gamepad/gamepadButtonObserver";
import { MouseButtons } from "../controller/mouse/mouseButtonObserver";
import { Component } from "./component";

/** Represents a bind for a gamepad axis */
export interface GamepadAxisBind {
    axis: GamepadAxis;
    direction: GamepadAxisDirection;
    positive: boolean;
}
/** Represents all the key binds that are assigned to an action */
export interface KeyBind {
    keyboardKeycodes?: string[];
    gamepadAnalog?: GamepadAxisBind;
    gamepadButtons?: GamepadButtons[];
    mouseButtons?: MouseButtons[];
}
/** Represents all the actions and controls assigned to them */
export interface KeyBinds {
    forward?: KeyBind;
    backward?: KeyBind;
    leftward?: KeyBind;
    rightward?: KeyBind;
    shoot?: KeyBind;
    // Gamepad specific
    gp_lookUp?: KeyBind;
    gp_lookDown?: KeyBind;
    gp_lookLeft?: KeyBind;
    gp_lookRight?: KeyBind;
}
/** Represents the output of the player controller */
export interface PlayerActions {
    movementDirection: Vector2;
    shoot: boolean;
    // Gamepad specific
    gamepadLookDirection?: Vector2;
    // Keyboard specific
    mouseLookPoint?: Vector3;
    
}
/** Represents the output of a keybind */
interface BindOutput {
    keyboardMouseOutput: boolean;
    gamepadOutput: number;
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
            gamepadAnalog: {axis: GamepadAxis.LEFT, direction: GamepadAxisDirection.HORIZONTAL, positive: false},
            gamepadButtons: [GamepadButtons.LEFT]
        },
        rightward: {
            keyboardKeycodes: ['KeyD', 'RightArrow'],
            gamepadAnalog: {axis: GamepadAxis.LEFT, direction: GamepadAxisDirection.HORIZONTAL, positive: true},
            gamepadButtons: [GamepadButtons.RIGHT]
        },
        shoot: {
            keyboardKeycodes: ['KeySpace'],
            gamepadButtons: [GamepadButtons.RB, GamepadButtons.RT],
            mouseButtons: [MouseButtons.LEFT_MOUSE_BUTTON]
        },
        gp_lookUp: { gamepadAnalog: {axis: GamepadAxis.RIGHT, direction: GamepadAxisDirection.VERTICAL, positive: true} },
        gp_lookDown: { gamepadAnalog: {axis: GamepadAxis.RIGHT, direction: GamepadAxisDirection.VERTICAL, positive: false} },
        gp_lookLeft: { gamepadAnalog: {axis: GamepadAxis.RIGHT, direction: GamepadAxisDirection.HORIZONTAL, positive: false} },
        gp_lookRight: { gamepadAnalog: {axis: GamepadAxis.RIGHT, direction: GamepadAxisDirection.HORIZONTAL, positive: true} }
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
            const keys: string[] = Object.keys(customControls);
            for (let i = 0; i < keys.length; i++) {
                const key: keyof KeyBinds = keys[i] as keyof KeyBinds;
                if (customControls[key])
                    this.controls[key] = customControls[key];
            }
        }
    }

    public getInput() : PlayerActions {
        const useGamepad: boolean = globalThis.Input.getUseGamepad();
        let playerActions: PlayerActions = {movementDirection: new Vector2(0, 0), shoot: false};

        if (useGamepad) {
            playerActions.movementDirection = new Vector2(
                this.isKeybindActive('rightward').gamepadOutput - this.isKeybindActive('leftward').gamepadOutput,
                this.isKeybindActive('forward').gamepadOutput - this.isKeybindActive('backward').gamepadOutput);
            playerActions.gamepadLookDirection = new Vector2(
                this.isKeybindActive('gp_lookUp').gamepadOutput - this.isKeybindActive('gp_lookDown').gamepadOutput,
                this.isKeybindActive('gp_lookRight').gamepadOutput - this.isKeybindActive('gp_LookRight').gamepadOutput);
            playerActions.shoot = !!this.isKeybindActive('shoot').gamepadOutput;
        }
        else {
            playerActions.movementDirection = new Vector2(
                +this.isKeybindActive('rightward').keyboardMouseOutput - +this.isKeybindActive('leftward').keyboardMouseOutput,
                +this.isKeybindActive('forward').keyboardMouseOutput - +this.isKeybindActive('backward').keyboardMouseOutput);
            playerActions.mouseLookPoint = globalThis.Input.getProjectedMousePosition();
            playerActions.shoot = this.isKeybindActive('shoot').keyboardMouseOutput;
        }

        return playerActions;
    }

    /**
     * Checks if the keybind is pressed
     * @param key The key of the keybind
     * @returns If the keybind is pressed (separate for the keyboard and mouse)
     */
    private isKeybindActive(key: string) : BindOutput {
        // Return no input if the key is not valid
        if (!Object.keys(this.controls).includes(key))
            return {keyboardMouseOutput: false, gamepadOutput: 0};
        
        // Continue if key is valid
        const keyOfKeyBinds: keyof KeyBinds = key as keyof KeyBinds;
        const keyBinds =  this.controls[keyOfKeyBinds];

        // Keyboard and mouse output stuff
        let keyboardMouseOutput: boolean = false;
        // Check for keyboard
        if (keyBinds?.keyboardKeycodes) {
            keyBinds.keyboardKeycodes.forEach(keyboardKey => {
                keyboardMouseOutput = keyboardMouseOutput || globalThis.Input.isKeyboardKeyDown(keyboardKey);
            });
        }
        // Check for mouse buttons
        if (keyBinds?.mouseButtons) {
            keyBinds.mouseButtons.forEach(mouseKey => {
                keyboardMouseOutput = keyboardMouseOutput || globalThis.Input.isMouseButtonDown(mouseKey);
            });
        }

        // Gamepad output
        let gamepadButtonOutput: boolean = false;
        // Check for gamepad buttons
        if (keyBinds?.gamepadButtons) {
            keyBinds.gamepadButtons.forEach(gamepadButton => {
                gamepadButtonOutput = gamepadButtonOutput || globalThis.Input.isGamepadButtonPressed(gamepadButton);
            });
        }
        // Check for analog input
        let gamepadAxisOutput: number = 0;
        if (keyBinds?.gamepadAnalog) {
            const gamepadAnalogBind: GamepadAxisBind = keyBinds.gamepadAnalog;
            const gamepadAnalogInputVector: Vector2 = globalThis.Input.getGamepadAxis(gamepadAnalogBind.axis);
            gamepadAxisOutput = gamepadAnalogInputVector.toArray()[+(gamepadAnalogBind.direction === GamepadAxisDirection.VERTICAL)];

            if (gamepadAnalogBind.positive)
                gamepadAxisOutput = Math.max(0, gamepadAxisOutput);
            else
                gamepadAxisOutput = -Math.min(0, gamepadAxisOutput);
        }
        // Finalize gamepad output
        // Write analog input
        let gamepadOutput: number = gamepadAxisOutput;
        // Override with button input (buttons are more important)
        gamepadOutput = (+gamepadButtonOutput || gamepadOutput);

        // Return all
        return {keyboardMouseOutput: keyboardMouseOutput || false, gamepadOutput: gamepadOutput || 0};
    }
}