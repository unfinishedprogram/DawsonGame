/*

import { BufferGeometry, Matrix4, Quaternion, Vector3 } from "three";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";


export function createTiledGeometry(geo:levelGeometryLookup, levelMap:levelMapData): BufferGeometry{
    let matrix = new Matrix4();
    let quaternion = new Quaternion();
    let scale = new Vector3(1,1,1);
    let geometries = [];

    let finalTransform = new Vector3(-0.5*(tileSize*(width-1)),0,-0.5*(tileSize*(height-1)));
    
    for(let i = 0; i < width; i++){
        for(let j = 0; j < height; j++){
            let instance = geo.clone();
            
            let position = new Vector3(i*tileSize, 0, j*tileSize); 
            matrix.compose( position, quaternion, scale );
		    instance.applyMatrix4( matrix );

            geometries.push(instance);
        }
    }
    let finalGeo = BufferGeometryUtils.mergeBufferGeometries(geometries);
    finalGeo.translate(...finalTransform.toArray());
    return finalGeo;
}
*/