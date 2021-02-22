import { Mesh } from "three";
import { Transform } from "./Transform";
export abstract class Component {
    required_components: Component[];
    
    update(deltaTime: number) {

    }


    // Takes the list of components that the object has 
    // and verifies that it includes all requirements.

    // THIS IS UNTESTED DO NOT RELY ON IT
    hasRequirements(components:Component[]):boolean {
        if ( this.required_components.length > 0 ){
            for ( let reqComp of this.required_components ){
                if ( !this.hasComponent (reqComp, components) ){
                    throw new Error('Object missing required component {missing_component}, Unable to add {coponent} to object');
                    return false;
                }
            }
        }
        return true;
    }
    hasComponent ( component:Component , component_list:Component[]){
        for ( let comp of component_list ){
            if (typeof comp == typeof component) return true;
        }
    }
}
