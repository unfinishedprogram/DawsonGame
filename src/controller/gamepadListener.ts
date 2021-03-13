import { Vector2 } from 'three';
import { CustomGamepadInputEvent, CustomGamepadMoveEvent } from './inputSubject';

type GamepadInputListenerF = (e: CustomGamepadInputEvent) => void;
type GamepadAnalogListenerF = (e: CustomGamepadMoveEvent) => void;

export class GamepadListener {
    gamepads: Gamepad[];
    buttonUp: GamepadInputListenerF;
    buttonDown: GamepadInputListenerF;
    stickMove: GamepadAnalogListenerF;

    constructor(buttonUp: GamepadInputListenerF, buttonDown: GamepadInputListenerF, stickMove: GamepadAnalogListenerF) {
        this.gamepads = [];
            
        this.buttonUp = buttonUp;
        this.buttonDown = buttonDown;
        this.stickMove = stickMove;
    }

    update() {
        let newGamepads = Object.values(navigator.getGamepads());

        newGamepads
            .filter((newGamepad) : newGamepad is Gamepad => !!newGamepad)
            .forEach(newGamepad => {
                let oldGamepadsFiltered = this.gamepads.filter(oldGamepad => !!oldGamepad);
                if (!oldGamepadsFiltered.length) {
                    this.gamepads.push(newGamepad);
                    return;
                }

                for (let i = 0; i < oldGamepadsFiltered.length; i++) {
                    if (newGamepad.id == oldGamepadsFiltered[i].id) {
                        this.detectChanges(newGamepad, oldGamepadsFiltered[i]);
                        this.gamepads[i] = newGamepad;
                    }
                }
            });
    }

    private detectChanges(newGamepad: Gamepad, oldGamepad: Gamepad) {
        // Check sticks
        let oldSticks: Vector2[] = [
            new Vector2(oldGamepad.axes[0], -oldGamepad.axes[1]), // Old left stick
            new Vector2(oldGamepad.axes[2], -oldGamepad.axes[3])  // Old right stick
        ];
        let newSticks: Vector2[] = [
            new Vector2(newGamepad.axes[0], -newGamepad.axes[1]), // New left stick
            new Vector2(newGamepad.axes[2], -newGamepad.axes[3])  // New right stick
        ];
        
        for (let i = 0; i < 2; i++) {
            this.clampInputVector(oldSticks[i]);
            this.clampInputVector(newSticks[i]);

            if (oldSticks[i].x != newSticks[i].x || oldSticks[i].y != newSticks[i].y)
                this.stickMove({stick: i, value: newSticks[i]});
        }

        // Check buttons
        for (let i = 0; i < 17; i++) {
            if (newGamepad.buttons[i].value != oldGamepad.buttons[i].value) {
                if (newGamepad.buttons[i].value)
                   this.buttonDown({button: i});
                else
                    this.buttonUp({button: i});
            }
        }
    }

    /**
     * Takes an axis input remaps it to have a deadzone with clamping
     * @param input 2D Vector of an axis input
     * @param deadzone The cut out value. The inputs lower than this value will be ignored (default = 0.25)
     */
    private clampInputVector(input: Vector2, deadzone: number = 0.25) {
        if (input.x && input.y) {
            // Apply deadzone
            // Find the length of the current input
            let length: number = input.length();
            // Calculate percentage of the maximum input length
            length = Math.min(Math.max((length - deadzone) / (1 - deadzone), 0), 1)
            // Set it
            input.setLength(length);
        }
    }
}
