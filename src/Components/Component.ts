export abstract class Component {
    required_components: Component[];

    update(deltaTime: number) {

    }


    // Takes the list of components that the object has 
    // and verifies that it includes all requirements.
    hasRequirements(components:Component[]): boolean {
        // TODO Find efficient way of comparing required list to current component list
        // Perhaps making two arrays of strings from (typeof component)
        // But I'm not sure how that works with class abtraction 
        return true;
    }
}
