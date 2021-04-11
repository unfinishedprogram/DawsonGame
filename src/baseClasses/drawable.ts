import { BufferGeometry, Material, Mesh } from "three";
import { AssetLoader } from "../utils/assetLoader";


export abstract class Drawable {
    static initalObject3D:Mesh = new Mesh();
    static initalGeometry:BufferGeometry = new BufferGeometry();
    static initalMaterial:Material = new Material();

    object3D: Mesh;
    geometry: BufferGeometry;
    material: Material | Material[];
    VOXName: string;

    abstract meshLoaded(): void;

    async loadMesh() {
        //console.log('Loading new object FROM LOADING');
        if(this.VOXName){
            var mesh = await AssetLoader.getVOXMesh('models/' + this.VOXName + '.vox');
        } else{
            throw new Error("Object must have a VOXName assigned before the mesh can be loaded");
        }
        this.material = mesh.material;
        this.geometry = mesh.geometry;
        this.object3D = mesh;
        return mesh
    }

    constructor(VOXName:string) {
        this.object3D = Drawable.initalObject3D;
        this.geometry = Drawable.initalGeometry;
        this.material = Drawable.initalMaterial;

        this.VOXName = VOXName;
    }

    async init():Promise<Mesh> {
        return this.loadMesh();
    }
}   