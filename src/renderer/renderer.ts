import * as THREE from 'three'
import { Scene } from '../scene/scene';

export class Renderer {
    width: number;
    height: number;
    scene: Scene;
    tscene: THREE.Scene; // Better name?
    renderer: THREE.WebGLRenderer;

    constructor(width: number, height: number, scene: Scene) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.tscene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height)

        const color = 0XFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        this.tscene.add(light);
        this.renderer.setClearColor(new THREE.Color(0XFFFFFF), 1);
        // Add each element of a the scene to the renderer.

        // TODO 
        // 1. We need to remove stuff eventually if we remove it
        // from the scene
        // 2. We also need to add stuff that is being added to 
        // the scene after its creation.
        // 3. How should the scene tell the renderer that it has a new
        // object? scene SHOULDN'T have a reference the renderer.

    }

    addObject3D(object: any){
        this.tscene.add(object);
    }

    draw() {
        this.renderer.render(this.tscene, this.scene.camera.camera);
    }

    async load() {
        console.log("Load is executed");
        for (let gameObject of this.scene.gameObjects) {
            //gameObject.loadVOX("./models/chr_knight.vox");
            gameObject.loadVOX('../public/models/chr_knight.vox', this);
            this.tscene.add(gameObject.object3D);
        }
    }

    update() {
        // Check if elements are being added or removed from 
        // the scene. Noah says that we maybe should look on the UUID
        // of 3d objects.
        // We could also have a boolean that says when the scene has
        // >removed< a gameobject AND THEN finally check for what element
        // was removed. That probably will help w/ performance.

        // EVEN BETTER: have a list on the scene w/ all the elements that
        // were removed in the last frame and loop through it here,
        // Removing it using the 3d object itself w/ this.tscene.remove
    }

}
