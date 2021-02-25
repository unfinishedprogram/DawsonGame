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
    movementDirection: Vector2
}

export class Controller extends Component {
    // Input array ([actions][keycodes])
    private actions : {[action: string] : {[key: string] : boolean}} = {};
    // Default player controls
    controls: Controls = { forward: ['KeyW', 'ArrowUp'], backward: ['KeyS', 'ArrowDown'], left: ['KeyA', 'ArrowLeft'], right: ['KeyD', 'ArrowRight'] };

    keyStates: { [id: string]: boolean } = {};

    constructor(controls?: Controls) {
        super();
        let that = this;
        this.updateControls(controls);
            // Add event handlers
            window.addEventListener('keyup', function (e: KeyboardEvent) {
                that.keyStates[e.code] = false;
            });
            window.addEventListener('keydown', function (e: KeyboardEvent) {
                that.keyStates[e.code] = true;
            });
    }

    public getInput() {
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
                +Object.values(this.actions['right']).includes(true) - +Object.values(this.actions['left']).includes(true),
                +Object.values(this.actions['forward']).includes(true) - +Object.values(this.actions['backward']).includes(true))
        };
        // Return it
        return finalActions;
    }

    public updateControls(controls?: Controls) {
        // Set new controls or leave them default
        if (controls)
            this.controls = controls;
        
        // Initialize the boolean array for each action and keycode
        Object.keys(this.controls).forEach((key: string) => {
            this.actions[key] = {};
        });
    }
}