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

    constructor(controls?: Controls) {
        super();
        let that = this;
        this.updateControls(controls);
        
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
                +Object.values(this.actions['right']).includes(true) - +Object.values(this.actions['left']).includes(true),
                +Object.values(this.actions['forward']).includes(true) - +Object.values(this.actions['backward']).includes(true)
                ),
            // Raw mouse position
            mouseScreenPosition: this.mousePosition
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

    // TODO finish or rewrite
    public static projectPoint(coords: Vector2, camera: Camera) : Vector3 {
        let vec = new Vector3();
        let pos = new Vector3;

        vec.set(
            coords.x / 1280 * 200 - 100,
            - coords.y / 720 * 200 + 100,
            0.5
        );

        vec.unproject(camera);
        vec.sub(camera.position).normalize();
        let distance = - camera.position.z / vec.z;
        
        pos.copy(camera.position).add(vec.multiplyScalar(distance));

        return pos;
    }
}