import { Group } from "./group";

export class Node {
    parent: Group;

    constructor(parent: Group) {
        this.parent = parent;
    }
}