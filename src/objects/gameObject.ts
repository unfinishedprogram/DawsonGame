import { Component } from '../components/component';
import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from 'three';
import { AssetLoader } from '../utils/assetLoader';

export abstract class GameObject {
    components: Component[] = [];
    object3D: Object3D = new Object3D();
    VOXName: string = "";
    mesh: Mesh;
    abstract update(deltaTime: number): void;


    async loadMesh(){
        if(this.VOXName){
            var mesh = await AssetLoader.getVOXMesh('models/chr_' + this.VOXName + '.vox');
        } else{
            console.error("Object must have a VOXName assigned before the mesh can be loaded");
            return;
        }
        this.object3D = mesh;
        return;
    }

    // Every game object has a transform. This obliges us to specify
    // its initial state. We can also define another constructor to
    // have a default spawn cords. Like (0, 0, 0).
    // Typescript has a "?" operator and that may be good too.

    constructor(transform: Component) {
        this.mesh = new Mesh(new PlaneGeometry(), new MeshBasicMaterial({ color: 0x00ff00 }));
        this.components.push(transform);
    }

    // We should be adding and removing components with a function so we can upadte anything 
    // nececary and check compatibility with other components

    // Returns true if component can be added, false otherwise 
    public addComponent(component: Component): boolean{
        this.components.push(component);
        return true;
    }

    // Returns true if component can be removed, false otherwise 
    // Mostly this would happen if the component being 
    // removed is a requirement for another
    public removeComponent(component: Component): boolean{
        return false;
    }
}
