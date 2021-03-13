import { Vector3 } from 'three';
import { Component } from './component';

/** Tranform that holds the location, rotaion and the scale of an object */
export class Transform extends Component {
    /** Position in 3d space */
    position: Vector3;
    /** Rotation in 3d space */
    rotation: Vector3;
    /** Scale in 3d space */
    scale: Vector3;

    // I dont like how ugly this is, but it works for creating optional peramiters with default values
    /**
     * Initialize the transform
     * @param position The position in 3d space (optional, default is 0, 0, 0)
     * @param rotation  The rotation in 3d space (optional, default is 0, 0, 0)
     * @param scale  The scale in 3d space (optional, default is 1, 1, 1)
     */
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

    /**
     * Set new position
     * @param position New position
     */
    public setPosition(position: Vector3){
        this.position = position;
    }
    copy():Transform {
        let pos = this.position.clone();
        let rot = this.rotation.clone();
        let scale = this.scale.clone();
       
        return new Transform(pos, rot, scale);
    }
}
