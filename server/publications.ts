import { Logs, Projects, Schedulings, Designs, Moldings } from '../lib/collections';

Meteor.publish('logs', () => Logs.find());
Meteor.publish('projects', () => Projects.find());
Meteor.publish('schedulings', () => Schedulings.find());
Meteor.publish('designs', () => Designs.find());
Meteor.publish('moldings', () => Moldings.find());
