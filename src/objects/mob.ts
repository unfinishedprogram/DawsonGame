import { GameObject } from './gameObject';
import { Component } from '../components/component';
import { Object3D, TextureLoader } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

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
    FBXName: String;
    
    constructor(transform: Component, stats: Stats, FBXName: string) {
        super(transform);
        this.stats = stats;
        this.FBXName = FBXName;

        console.log("Object loaded");
    }

    async loadModel() {
        let loader = new OBJLoader();
        let textureLoader = new TextureLoader();
        this.object3D = await loader.loadAsync(`../models/chr_${this.FBXName}.obj`);
        console.log("object 3d generated.");
    }

    update(deltaTime: number) {
    }

}
