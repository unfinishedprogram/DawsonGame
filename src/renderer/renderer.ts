import * as THREE from 'three';
import { Scene } from '../scene/scene';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { WebGLRenderTarget } from 'three';

/** Displays a given scene, and manages window dimensions */
export class Renderer {
    width: number;
    height: number;
    scene: Scene;
    tscene: THREE.Scene; // Better name?
    renderer: THREE.WebGLRenderer;
    composer: EffectComposer;

    /**
     * Initializes the renderer
     * @param width Render window width
     * @param height Render window height
     * @param scene Scene to render
     */
    constructor(width: number, height: number, scene: Scene) {
        /** Current scene */
        this.scene = scene;
        /** Window width */
        this.width = width;
        /** Window height */
        this.height = height;
        /** Current THREEJS scene */
        this.tscene = new THREE.Scene();
        /** Current renderer */
        this.renderer = new THREE.WebGLRenderer();

        //Setting up post processing passes and compositor
        this.composer = new EffectComposer(this.renderer, new WebGLRenderTarget(this.width*2, this.height*2));
        this.composer.addPass (new RenderPass(this.tscene, this.scene.camera.camera) );
        var SSAO = new SSAOPass(this.tscene, this.scene.camera.camera, this.width, this.height);
       
        SSAO.kernelRadius = 1;
        SSAO.minDistance = 0.0001;
        
        this.composer.addPass (SSAO);
        
        this.renderer.setSize(width, height);
        
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
    /**
     * Adds a 3D object to the threejs scene
     * @param object 3D object to add to the scene
     */
    addObject3D(object: any){
        this.tscene.add(object);
    }

    draw() {
        this.composer.render();
    }

    /**
     * Loads and adds the mesh of each game object from the scene, to the threejs scene
     */
    load() {
        for (let gameObject of this.scene.gameObjects) {
            this.tscene.add(gameObject.object3D);
        }
    }
    /**
     * Updates the renderer to the new dimensions of the window
     * @param {number} windowWidth 
     * @param {number} windowHeight
     */
    resize(windowWidth: number, windowHeight: number) {
        let targetWidth: number = windowHeight / 9 * 16;
        let targetHeight: number = windowWidth / 16 * 9;

        let newWidth: number;
        let newHeight: number;

        if (targetHeight > windowHeight) {
            newWidth = targetWidth;
            newHeight = windowHeight;
        }
        else {
            newWidth = windowWidth;
            newHeight = targetHeight;
        }

        this.width = newWidth;
        this.height = newHeight;
        
        this.composer.setSize(newWidth, newHeight);
        for (let pass of this.composer.passes) pass.setSize(newWidth, newHeight);
        this.renderer.setSize(newWidth, newHeight);

        this.renderer.setRenderTarget(new WebGLRenderTarget(newWidth, newHeight));
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
