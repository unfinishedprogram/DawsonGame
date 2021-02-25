import { GameObject } from '../gameObject';
import { Component } from '../../components/component';
import { PlaneGeometry, MeshBasicMaterial} from 'three';
import { Mesh } from 'three';
import { Controller } from '../../components/controller';
import { Scene } from '../../scene/scene';

export class Cube extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();
    controller = new Controller();

    constructor(transform: Component) {
        super(transform);
        this.object3D = new Mesh(this.geometry, this.material);
    }
    update(deltaTime: number) {
        let input = this.controller.getInput()
      this.object3D.position.x += input.movementDirection.x * deltaTime * 3;
        this.object3D.position.y += input.movementDirection.y * deltaTime * 3;
        this.object3D.rotation.z += input.mouseScreenPosition.x * 0.005 * deltaTime;
    }
}
