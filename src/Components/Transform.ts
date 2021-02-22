import { Vector3 } from 'three';
import { Component } from './Component';

export class Transform extends Component {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;

    constructor(position: Vector3, rotation: Vector3, scale: Vector3) {
        super(); // Why? Component doesn't have a constructor...
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

}
