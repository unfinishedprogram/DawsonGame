import { Component } from './component';
import { Camera, Vector2, Vector3 } from 'three';

// All the controls for all the actions
export interface Controls {
    forward: string[],
    backward: string[], 
    left: string[],
    right: string[]
}
// Final output
export interface Actions {
    movementDirection: Vector2
    mouseScreenPosition: Vector2
}

export class Controller extends Component {
    // Input array ([actions][keycodes])
    private actions : {[action: string] : {[key: string] : boolean}} = {};
    // Default player controls
    controls: Controls = { forward: ['KeyW', 'ArrowUp'], backward: ['KeyS', 'ArrowDown'], left: ['KeyA', 'ArrowLeft'], right: ['KeyD', 'ArrowRight'] };

    keyStates: { [id: string]: boolean } = {};
    mousePosition: Vector2 = new Vector2();
    gamepadIndex: number = 0;

    constructor(controls?: Controls, gamepadIndex?: number) {
        super();
        let that = this;
        this.updateControls(controls, gamepadIndex);
        
        // Add event handlers
        window.addEventListener('keyup', function (e: KeyboardEvent) {
            that.keyStates[e.code] = false;
            // Clear the array if all the keys are unpressed
            if (!Object.values(that.keyStates).includes(true))
                that.keyStates = {};
        });
        window.addEventListener('keydown', function (e: KeyboardEvent) {
            that.keyStates[e.code] = true;
        });

        window.addEventListener('mousemove', function (e: MouseEvent) {
            that.mousePosition.x = e.clientX;
            that.mousePosition.y = e.clientY;
        });
    }

    public getInput() : Actions {
        // Update input array
        Object.keys(this.controls).forEach((action: string) => {
            // This actually works
            let keyAction = action as keyof Controls;
            this.controls[keyAction].forEach((key: string) => {
                this.actions[action][key] = this.keyStates[key];
            });
        });

        let finalActions: Actions = {
            // x, y axis vector. +1 - input in the direction, 0 - no input, -1 - input in the opposite direction
            movementDirection: new Vector2(
                (+Object.values(this.actions['right']).includes(true) - +Object.values(this.actions['left']).includes(true)) // Keyboard forward and backward
                    || Controller.axisDeadzone(navigator.getGamepads()[this.gamepadIndex]?.axes[0]), // Or gamepad Y axis from left stick (if the value is not 0)
                (+Object.values(this.actions['forward']).includes(true) - +Object.values(this.actions['backward']).includes(true)) // Keyboard left and right
                    || -1 * Controller.axisDeadzone(navigator.getGamepads()[this.gamepadIndex]?.axes[1]) // Or gamepad X axis from left stick (if the value is not 0)
                ),
            // Raw mouse position
            mouseScreenPosition: this.mousePosition
        };
        // Return it
        return finalActions;
    }

    public updateControls(controls?: Controls, gamepadIndex?: number) {
        // Set new controls or leave them default
        if (controls)
            this.controls = controls;

        if (gamepadIndex)
            this.gamepadIndex = gamepadIndex;
        
        // Initialize the boolean array for each action and keycode
        Object.keys(this.controls).forEach((key: string) => {
            this.actions[key] = {};
        });
    }

    // Takes x and y input from the gamepad and remaps it to have a deadzone
    private static axisDeadzone(x : number | undefined, deadzone: number = 0.25): number {
        if (x) {
            // Apply deadzone
            let value: number = Math.max((Math.abs(x) - deadzone) / (1 - deadzone), 0);
            
            value *= Math.sign(x);

            return value;
        }
        else
            return 0;
    }
}