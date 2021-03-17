import { Vector2 } from 'three';
import { MoreMath } from '../../utils/moreMath';
import { CustomGamepadInputEvent, CustomGamepadAnalogEvent } from '../inputSubject';

type GamepadInputListenerF = (e: CustomGamepadInputEvent) => void;
type GamepadAnalogListenerF = (e: CustomGamepadAnalogEvent) => void;

/** Represents the listener that listens for all gamepad inptu */
export class GamepadListener {
    gamepads: Gamepad[];
    buttonUp: GamepadInputListenerF;
    buttonDown: GamepadInputListenerF;
    stickMove: GamepadAnalogListenerF;

    /**
     * Initialize new GamepadListener
     * @param buttonUp The callout that will be called if the button is unpressed
     * @param buttonDown The callout that will be called if the button is pressed
     * @param stickMove The callout that will be called if the stick is moved
     */
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

    /**
     * Compare 2 gamepad instances and call needed events
     * @param newGamepad Instance of a new gamepad
     * @param oldGamepad Instance of a old Gamepad
     */
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
            MoreMath.clampInputVector(oldSticks[i]);
            MoreMath.clampInputVector(newSticks[i]);

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
}
