import { Component } from './component';

// All the controls for all the actions
export interface Controls {
    forward: string[],
    backward: string[], 
    left: string[],
    right: string[],
}
// Final output
export interface Actions {
    forward: number,
    right: number
}

export class Controller extends Component {
    // Input array ([actions][keycodes])
    private actions: boolean[][];
    // Default player controls
    controls: Controls = { forward: ['KeyW', 'ArrowUp'], backward: ['KeyS', 'Arrow'], left: ['KeyA', 'ArrowLeft'], right: ['KeyD', 'ArrowRight'] };

    constructor(controls?: Controls) {
        super();
        // Get the controls from the constructor or leave them as default
        if (controls)
            this.controls = controls;

        // Initialize the boolean array for each action and keycode
        Object.keys(this.controls).forEach(key => {
            this.actions[key] = [];
        });
    }

    public getControls(keyStates: boolean[]) {
        // Update input array
        Object.keys(this.controls).forEach(key => {
            this.controls[key].forEach(control => {
                this.actions[key][control] = keyStates[control];
            });
        });
        
        let finalActions: Actions = {
            // -1 for backward input, 0 for no input, 1 for forward input
            forward: this.actions['forward'].includes(true) - this.actions['backward'].includes(true),
            // -1 for left input, 0 for no input, 1 for right input
            right:  this.actions['right'].includes(true) - this.actions['left'].includes(true)
        };

        // Return it
        return finalActions;
    }
}