export abstract class Component {
	requiredComponents: Component[] | undefined;

	update(deltaTime: number) {}

	constructor(requiredComponents?: Component[]) {
		this.requiredComponents = requiredComponents;
	}

	// Takes the list of components that the object has
	// and verifies that it includes all requirements.

	// THIS IS UNTESTED DO NOT RELY ON IT
	hasRequirements(gameObjectComponents: Component[]): boolean {
		if (this.requiredComponents)
			for (let reqComp of this.requiredComponents)
				if (!this.hasComponent(reqComp, gameObjectComponents))
					return false;
		return true;
	}

	hasComponent(component: Component, componentList: Component[]): boolean {
		for (let comp of componentList)
			if (typeof comp == typeof component) return true;
		return false;
	}
}
