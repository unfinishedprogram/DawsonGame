import { Component } from './component';
import { Vector2 } from 'three';

// All the controls for all the actions
export interface Controls {
    forward: string[],
    backward: string[], 
    left: string[],
    right: string[]
}
// Final output
export interface Actions {
    // X, Y axis vector. +1 - input in the direction, 0 - no input, -1 - input in the opposite direction
    movementDirection: Vector2
    // The position of the mouse pointer on the screen (relative to window)
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

        // Get gamepad input
        let gamepadInput: Gamepad | null = navigator.getGamepads()[this.gamepadIndex];
        let leftStickInput: Vector2 = new Vector2 (gamepadInput?.axes[0] || 0, -1 * (gamepadInput?.axes[1] || 0));
        let rightStickInput: Vector2 = new Vector2 (gamepadInput?.axes[2] || 0, -1 * (gamepadInput?.axes[3] || 0));

        // Calculate final movement direction
        let movementDirection: Vector2 = new Vector2(
            +Object.values(this.actions['right']).includes(true) - +Object.values(this.actions['left']).includes(true),
            +Object.values(this.actions['forward']).includes(true) - +Object.values(this.actions['backward']).includes(true)
        );
        movementDirection.add(leftStickInput);
        Controller.axisDeadzone(movementDirection);

        // Group all the data
        let finalActions: Actions = {
            movementDirection: new Vector2(movementDirection.x, movementDirection.y),
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
    private static axisDeadzone(input: Vector2, deadzone: number = 0.25) {
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