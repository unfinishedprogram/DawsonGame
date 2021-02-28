import { GameObject } from './gameObject';
import { Component } from '../components/component';
import { Mesh } from 'three';
import { PlaneGeometry, MeshBasicMaterial } from 'three';
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
    VOXName: string;
    transform: Transform; //temp
    mesh: Mesh;

    constructor(transform: Transform, stats: Stats, VOXName: string) {
        super(transform);
        this.mesh = new Mesh(new PlaneGeometry(), new MeshBasicMaterial({ color: 0x00ff00 }));
        this.stats = stats;
        this.VOXName = VOXName;
        this.transform = transform; //temp
    }
    update(deltaTime: number) {
        //console.log(deltaTime);
    }
}
