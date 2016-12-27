import { Logs, Projects, Parts, Designs, Moldings } from '../lib/collections';

Meteor.publish('logs', () => Logs.find());
Meteor.publish('projects', () => Projects.find());
Meteor.publish('parts', () => Parts.find());
Meteor.publish('designs', () => Designs.find());
Meteor.publish('moldings', () => Moldings.find());
