import { Component } from '../components/component';
import { Loader, Mesh, Object3D } from 'three';
import { VOXLoader, VOXMesh } from 'three/examples/jsm/loaders/VOXLoader';
import { Renderer } from '../renderer/renderer';
import { s1 } from '../scene/s1';
//THIS IS SKETCH AS HELL I added the objloader from examples to the export list. of Three.d.ts

export abstract class GameObject {
    components: Component[] = [];
    object3D: Object3D = new Object3D();

    abstract update(deltaTime: number): void;


    loadVOX(url: string, callbackRenderer: Renderer) {
        var callbackMesh = this.object3D;
        let loadedMesh: Mesh;
        // Load STL file
        const loader = new VOXLoader()
        loader.load(
            url,
            function(chunks) { 
                console.log("MADE IT")
                loadedMesh = new VOXMesh(chunks[0]);
                callbackMesh = loadedMesh;
                callbackRenderer.addObject3D(callbackMesh);
                
                console.log("loaded mesh", callbackMesh);
                return;
            },
            undefined, 
            function (e) {
                console.log(e);
            }
        )
    }


    VOXChunkToMesh(chunk: any): Mesh {
        var mesh = new VOXMesh(chunk);
        return mesh;
    }
    /**
      async loadVOXModel(url: string){
        var loadedModel: Mesh;
        var loader = new VOXLoader();
        await loader.load(url, this.onVoxLoad);
        console.log(loadedModel);
        return loadedModel;
    };


    onVoxLoad(chunks: Array<object>){
        //this.object3D = await loader.loadAsync(`../models/chr_${this.FBXName}.obj`);
        console.log("chunks", chunks[0]);
        var mesh = new VOXMesh(chunks[0]);
        console.log(mesh);
        return mesh;
    }

     **/
    

    // Every game object has a transform. This obliges us to specify
    // its initial state. We can also define another constructor to
    // have a default spawn cords. Like (0, 0, 0).
    // Typescript has a "?" operator and that may be good too.

    constructor(transform: Component) {
        this.components.push(transform);
    }

    // We should be adding and removing components with a function so we can upadte anything 
    // nececary and check compatibility with other components

    // Returns true if component can be added, false otherwise 
    public addComponent(component: Component): boolean{
        return false;
    }

    // Returns true if component can be removed, false otherwise 
    // Mostly this would happen if the component being 
    // removed is a requirement for another
    public removeComponent(component: Component): boolean{
        return false;
    }
}
