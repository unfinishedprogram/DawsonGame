export abstract class Component {
    required_components: Component[] | undefined;
    
    update(deltaTime: number) {

    }

    constructor(required_components?: Component[]){
        this.required_components = required_components;
    }


    // Takes the list of components that the object has 
    // and verifies that it includes all requirements.

    // THIS IS UNTESTED DO NOT RELY ON IT
    hasRequirements(gameObjectComponents:Component[]): boolean {
        if ( this.required_components ){
            for ( let reqComp of this.required_components ){
                if ( !this.hasComponent(reqComp, gameObjectComponents) ){
                    return false;
                }
            }
        }
        return true;
    }

    hasComponent (component:Component, component_list:Component[]): boolean{
        for ( let comp of component_list ){
            if (typeof comp == typeof component) return true;
        }
        return false;
    }
}
