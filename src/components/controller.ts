import { Component } from './component';

// All the controls for all the actions
export interface Controls {
    forward: string[],
    backward: string[], 
    left: string[],
    right: string[]
}
// Final output
export interface Actions {
    forward: number,
    right: number
}

export class Controller extends Component {
    // Input array ([actions][keycodes])
    private actions : {[action: string] : {[key: string] : boolean}} = {};
    // Default player controls
    controls: Controls = { forward: ['KeyW', 'ArrowUp'], backward: ['KeyS', 'ArrowDown'], left: ['KeyA', 'ArrowLeft'], right: ['KeyD', 'ArrowRight'] };

    constructor(controls?: Controls) {
        super();
        // Get the controls from the constructor or leave them as default
        if (controls)
            this.controls = controls;

        // Initialize the boolean array for each action and keycode
        Object.keys(this.controls).forEach((key: string) => {
            this.actions[key] = {};
        });
    }

    public getInput(keyStates: {[id: string]: boolean}) {
        // Update input array
        Object.keys(this.controls).forEach((action: string) => {
            // This actually works
            let keyAction = action as keyof Controls;
            this.controls[keyAction].forEach((key: string) => {
                this.actions[action][key] = keyStates[key];
            });
        });

        let finalActions: Actions = {
            // -1 for backward input, 0 for no input, 1 for forward input
            forward: +Object.values(this.actions['forward']).includes(true) - +Object.values(this.actions['backward']).includes(true),
            // -1 for left input, 0 for no input, 1 for right input
            right: +Object.values(this.actions['right']).includes(true) - +Object.values(this.actions['left']).includes(true)
        };

        console.log(finalActions);
        // Return it
        return finalActions;
    }
}