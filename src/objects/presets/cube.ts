import { GameObject } from '../gameObject';
import { Component } from '../../components/component';
import { PlaneGeometry, MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
import { Controller } from '../../components/controller';

export class Cube extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();
    controller = new Controller();

    constructor(transform: Component) {
        super(transform);
        this.object3D = new Mesh(this.geometry, this.material);
    }
    update(deltaTime: number) {
        let inputDirection = this.controller.getInput().movementDirection;
        this.geometry.translate(inputDirection.x * deltaTime * 3, inputDirection.y * deltaTime * 3, 0);
    }
}
