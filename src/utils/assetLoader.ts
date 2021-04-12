// Class to load image, 3D, map, or any other async data

import { Mesh } from 'three';
import { VOXLoader, VOXMesh } from 'three/examples/jsm/loaders/VOXLoader';


export class AssetLoader {
    static loadedMeshes: { [key: string]: Mesh | Promise<Mesh> } = {};
    //Only loads the first chunk of the given VOX file
    static async getVOXMesh(dir:string): Promise<Mesh> {
        if(AssetLoader.loadedMeshes[dir]){
            let loadedMesh = await AssetLoader.loadedMeshes[dir];
            return new Mesh(loadedMesh.geometry, loadedMesh.material);
        } else{
            console.log("SlowLoad")
            AssetLoader.loadedMeshes[dir] = new Promise((resolve, reject)=>{
                resolve:{
                    console.log("resolved");
                }
                reject:{
                    console.log("rejected");
                }
            })
            const loader = new VOXLoader();
            let chunks = await loader.loadAsync(dir, undefined);
            
            var myChunk = chunks[0] as Chunk;
            var paletteChunk = chunks[chunks.length-1] as Chunk;
            myChunk.palette = paletteChunk.palette as Chunk;
    
            let mesh = new VOXMesh(myChunk)
            AssetLoader.loadedMeshes[dir] = mesh;
            Promise.resolve(AssetLoader.loadedMeshes[dir]);
            return mesh;
        }
    }

    //Loads all chunks from a VOX file and returns an array of meshes.
    static async getVOXMeshes(dir:string): Promise<Array<Mesh>> {
        const loader = new VOXLoader();
        let chunks = await loader.loadAsync(dir, undefined);
        let meshes: Array<Mesh> = [];
        for (let chunk of chunks) {
            meshes.push(new VOXMesh(chunk)); 
        };
        return meshes;
    }
}

interface Chunk {
    size: any;
    data: any;
    palette: any;
}