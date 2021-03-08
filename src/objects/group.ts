import { Node } from './node';

export class Group extends Node {
    nodes: Node[] = [];

    /**
     * Initializes the group object
     * @param parent The parent object
     */
    constructor(parent:Group){
        super(parent);
    }

    //Adds a node to the group
    addNode(node:Node){
        this.nodes.push(node);
    }


    // removes the given node from a group
    removeNode(node:Node){
        this.nodes.splice( this.nodes.indexOf(node) , 1 );
        
    }
}