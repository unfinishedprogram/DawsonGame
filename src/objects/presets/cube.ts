import { GameObject } from '../gameObject';
import { Component } from '../../components/component';
import { PlaneGeometry, MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
import { Transform } from '../../components/transform';

export class Cube extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();

    constructor(transform: Transform) {
        super(transform);
        this.object3D = new Mesh(this.geometry, this.material);
    }
    update(deltaTime: number) {
        //console.log('This is coming from cube');
    }
}
