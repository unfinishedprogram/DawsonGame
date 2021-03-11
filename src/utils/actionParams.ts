import { Group } from '../objects/group';
import { Node } from '../objects/node';

export interface ActionParams {
    number?:number;
    string?:String;
    node?:Node;
    nodes?:Node[];

    group?:Group;
    groups?:Group[];
}