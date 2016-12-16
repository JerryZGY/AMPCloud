import { Projects } from '../lib/collections';

Meteor.publish('projects', () => Projects.find({}));
