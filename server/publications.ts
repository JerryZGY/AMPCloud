import { Logs, Projects, Schedulings, Designs, Machinings, Moldings } from '../lib/collections';

Meteor.publish('logs', () => Logs.find());
Meteor.publish('projects', () => Projects.find());
Meteor.publish('schedulings', () => Schedulings.find());
Meteor.publish('designs', () => Designs.find());
Meteor.publish('machinings', () => Machinings.find());
Meteor.publish('moldings', () => Moldings.find());
