import { GameObject } from '../gameObject';
import { Transform } from '../../components/transform';
import { Collidable } from '../../collision/colidable';
import { HitboxPrimitive } from '../../collision/primitives/hitboxPrimitive';
import { RectangleHitbox } from '../../collision/primitives/rectangleHitbox';
import { Vector2 } from 'three';
//import { createTiledGeometry } from '../../utils/tileGeometry';

export class LevelGeo extends GameObject {
    constructor(transform: Transform) {
        super(transform, "tile_test");
    }
    // collisionPrimitives: HitboxPrimitive[] = [ new RectangleHitbox(new Vector2(), 50) ];
    // collisionLayer: number = 1;
    
    meshLoaded = (): void  => {
        /*
        if(this.geometry){
            let tiledGeo = createTiledGeometry(this.geometry, 8, 54, 30);
            let tiledMesh = new Mesh(tiledGeo);
            tiledMesh.material = this.material;
            this.geometry = tiledMesh.geometry;
            this.object3D = tiledMesh;
        }
        */
    };
    
    update(deltaTime: number) {}
}