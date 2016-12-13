import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection<IProject>('projects');

interface ICollection {
    _id?: string;
}

export interface IProject extends ICollection {
    projectNo?: number;
    projectName?: string;
    buildDate?: Date;
    design?: Design; // array
    machining?: Machining;
    molding?: Molding;
}

type Design = {
    orderNum?: string;
    moldNum?: string;
    Template?: string;
    cumstomerId?: string;
    productName?: string;
    orderDate?: string;
    deadlineTime?: string;
    Event?: string;
    Data?: string;
    Date?: string;
    Percent?: number;
};

type Machining = {
    machiningNo: number;
    machiningProgress: number;
};

type Molding = {
    moldingNo: number;
    moldingProgress: number;
};
