import { Component } from './Component';
import { GameObject } from '../Objects/GameObject';
import { PlaneGeometry, MeshBasicMaterial } from 'three';
import { Mesh as TMesh } from 'three';

// This class doesn't do anything right now. We are not
// considering Mesh a component, and hence, we never 
// need to call it. i'll keep it here in case we ever need to use it
// again.


export class Mesh extends Component {
    // rename variable!!!!!!11
    mesh: TMesh;
    constructor(geometry: PlaneGeometry, material: MeshBasicMaterial) {
        super()
        this.mesh = new TMesh(geometry, material);
    }
}
