import { GameObject } from './gameObject';
import { Component } from '../components/component';
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

    meshLoaded(){};
    constructor(transform: Transform, stats: Stats, VOXName: string) {
        super(transform, "garbo");
        this.stats = stats;
        this.VOXName = VOXName;
        this.transform = transform; //temp
    }
    update(deltaTime: number) {
        //console.log(deltaTime);
    }
}
