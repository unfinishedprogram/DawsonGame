import { Component } from '../Components/Component';
import { GameObject } from './GameObject';
import { OrthographicCamera } from 'three';
import { Transform } from '../Components/Transform';

export class Camera extends GameObject {
    components: Component[] = [];
    camera: OrthographicCamera;
    width: number;
    height: number;
    zoom: number;
    
    constructor(transform: Transform, width: number, height: number, zoom: number) {
        super(transform);
        this.width = width;
        this.height = height;
        this.zoom = zoom;
        this.camera = new OrthographicCamera(
            -width / zoom,
            width / zoom,
            height / zoom,
            - height / zoom,
            1,
            1000
        );
        this.camera.position.set(...transform.position.toArray())


    }

    // update methods are not being called yet. This is just a 
    // placeholder.
    update(deltaTime: number): void {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update(deltaTime);
        }
    }
}
