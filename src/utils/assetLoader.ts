// Class to load image, 3D, map, or any other async data

import { Mesh} from 'three';
import { VOXLoader, VOXMesh } from 'three/examples/jsm/loaders/VOXLoader';

export class AssetLoader {
    //Only loads the first chunk of the given VOX file
    static async getVOXMesh(dir:string): Promise<Mesh> {
        const loader = new VOXLoader();
        let chunks = await loader.loadAsync(dir, undefined);
        return new VOXMesh(chunks[0]);
    }
}