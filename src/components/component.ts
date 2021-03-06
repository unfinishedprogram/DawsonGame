/** Represents a functional part of a game object */
export abstract class Component {
	requiredComponents: Component[] | undefined;

	/**
	 * Updates component
	 * @param deltaTime Delta time in seconds between frames to untie certain game events from framerate 
	 */
	update(deltaTime: number) {}

	/**
	 * Initializes 
	 * @param requiredComponents The list of required components
	 */
	constructor(requiredComponents?: Component[]) {
		this.requiredComponents = requiredComponents;
	}

	// THIS IS UNTESTED DO NOT RELY ON IT
	/**
	 * Takes the list of components that the object has and verifies that it includes all requirements.
	 * @param gameObjectComponents The list of components to go through
	 */
	hasRequirements(gameObjectComponents: Component[]): boolean {
		if (this.requiredComponents)
			for (let reqComp of this.requiredComponents)
				if (!this.hasComponent(reqComp, gameObjectComponents))
					return false;
		return true;
	}

	/**
	 * Verifies if the component is in the list
	 * @param component The component to search for
	 * @param componentList The list to search it inside
	 */
	hasComponent(component: Component, componentList: Component[]): boolean {
		for (let comp of componentList)
			if (typeof comp == typeof component) return true;
		return false;
	}
}
