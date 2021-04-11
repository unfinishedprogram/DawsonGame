import { GameObject } from '../gameObject';
import { Mesh} from 'three';
import { Transform } from '../../components/transform';
//import { createTiledGeometry } from '../../utils/tileGeometry';

export class LevelGeo extends GameObject {
    constructor(transform: Transform) {
        super(transform, "tile_test");
    }
    
    meshLoaded = ():void  => {
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