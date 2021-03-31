import { GameObject } from '../gameObject';
import { MeshBasicMaterial, Object3D , Mesh} from 'three';
import { Transform } from '../../components/transform';
import { createTiledGeometry } from '../../utils/tileGeometry';
import { ChangeObject } from '../../subjects/objectSubject';
import { Action } from '../../utils/action';

export class LevelGeo extends GameObject {
    constructor(transform: Transform) {
        super(transform);
        this.VOXName = "tile_test";
    }
    
    meshLoaded = ():void  => {
        console.log("LOPAD MESH ");
        if(this.geometry){
            let tiledGeo = createTiledGeometry(this.geometry, 8, 54, 30);
            let tiledMesh = new Mesh(tiledGeo);
            tiledMesh.material = this.material;
            this.geometry = tiledMesh.geometry;
            this.object3D = tiledMesh;
        }
    };


    update(deltaTime: number) {}

}