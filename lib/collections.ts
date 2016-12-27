import { Mongo } from 'meteor/mongo';
import * as Models from './models';

export const Logs = new Mongo.Collection<Models.ILog>('logs');
export const Projects = new Mongo.Collection<Models.IProject>('projects');
export const Designs = new Mongo.Collection<Models.IDesign>('designs');
export const Parts = new Mongo.Collection<Models.IPart>('parts');
export const Moldings = new Mongo.Collection<Models.IMolding>('moldings');
