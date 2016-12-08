import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection<IProject>('projects');

interface ICollection {
  _id?: string;
}

interface IProject extends ICollection {
    projectNo: number;
    projectName: string;
    design: Design;
    machining: Machining;
    molding: Molding;
    buildDate: Date;
}

type Design = {
    designNo: number;
    designProgress: number;
};

type Machining = {
    machiningNo: number;
    machiningProgress: number;
};

type Molding = {
    moldingNo: number;
    moldingProgress: number;
};
