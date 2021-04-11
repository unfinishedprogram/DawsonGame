import { Component } from '../components/component';
import { GameObject } from './gameObject';
import { OrthographicCamera, PerspectiveCamera, Vector2, Vector3 } from 'three';
import { Transform } from '../components/transform';

/** Orthographic camera */
export class OCamera {
    components: Component[] = [];
    camera: OrthographicCamera;
    width: number;
    height: number;
    zoom: number;

    /**
     * Initializes orthographic camera
     * @param transform Transform (Location, rotation and scale) of the camera
     * @param width Width of the camera frustum
     * @param height Height of the camera frustum
     * @param zoom Zoom of the camera
     */
    constructor(transform: Transform, width: number, height: number, zoom: number) {
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
        this.camera.position.set(...transform.position.toArray());
        this.camera.rotation.set(...transform.rotation.toArray());
    }

    meshLoaded(){};
    // update methods are not being called yet. This is just a 
    // placeholder.
    update(deltaTime: number): void {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update(deltaTime);
        }
    }
}

/** Perspective camera */
export class PCamera {
    components: Component[] = [];
    camera: PerspectiveCamera;
    width: number;
    height: number;

    /**
     * Initializes perspective camera
     * @param transform Transform (Location, rotation and scale) of the camera
     * @param FOV Field of View of the camera (in degrees)
     * @param width Width of the viewport (used for aspect ratio)
     * @param height Height of the viewport (used for aspect ratio)
     */
    constructor(transform: Transform, FOV:number, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.camera = new PerspectiveCamera(
            FOV,
            width/height,
            1,
            1000
        );

        this.camera.rotation.set(...transform.rotation.toArray());
        this.camera.position.set(...transform.position.toArray());

    }

    // update methods are not being called yet. This is just a 
    // placeholder.
    update(deltaTime: number): void {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update(deltaTime);
        }
    }
    meshLoaded(){};
    public projectScreenPoint(relativeSreenCoords: Vector2): Vector3 {
        let vec = new Vector3();
        let pos = new Vector3();

        vec.set(relativeSreenCoords.x * 2 - 1, relativeSreenCoords.y * 2 - 1, 0.5);

        vec.unproject(this.camera);
        vec.sub(this.camera.position).normalize();
        let distance = - this.camera.position.z / vec.z;

        pos.copy(this.camera.position).add(vec.multiplyScalar(distance));

        return pos;
    }
}
