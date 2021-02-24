import { GameObject } from './gameObject';
import { Component } from '../components/component';
import { Euler, Object3D, TextureLoader } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Transform } from '../components/transform';

// Move to a specific file
export interface Stats {
    hp: number;
    speed: number;
    attackMultiplier: number;
    size: number;
}

export class Mob extends GameObject {
    components: Component[] = [];
    stats: Stats;
    VOXName: String;
    transform: Transform; //temp
    
    constructor(transform: Transform, stats: Stats, VOXName: string) {
        super(transform);
        this.stats = stats;
        this.VOXName = VOXName;
        this.transform = transform; //temp
        //this.loadModel();
        console.log("Object loaded");
    }

    async loadModel() {
        //let loader = new OBJLoader();
        //this.object3D = await loader.loadAsync(`../models/chr_${this.FBXName}.obj`);
        //this.loadVOX(`../models/chr_${this.VOXName}.vox`, this.object3D);
        //console.log(this.object3D);

        //this.object3D = await this.loadVOX(`../models/chr_${this.FBXName}.vox`);
        console.log("object 3d generated.");
    }

    update(deltaTime: number) {
        
    }

}
