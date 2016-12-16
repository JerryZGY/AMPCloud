import { Mongo } from 'meteor/mongo';
import * as Models from './models';

export const Projects = new Mongo.Collection<Models.Project>('projects');
