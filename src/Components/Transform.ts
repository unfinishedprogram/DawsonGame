import { Vector3 } from 'three';
import { Component } from './Component';


export class Transform extends Component {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;

    // I dont like how ugly this is, but it works for creating optional peramiters with default values
    constructor(
            position: Vector3 = new Vector3( 0, 0, 0 ),
            rotation: Vector3 = new Vector3( 0, 0, 0 ),
            scale: Vector3 = new Vector3( 1, 1, 1 )
            )
        {
        super(); // Why? Component doesn't have a constructor...
        this.position = position;
        this.rotation = rotation; // In radians
        this.scale = scale;
    }

    public setPosition(new_position: Vector3){
        this.position = new_position;
    }
}
