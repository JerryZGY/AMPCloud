import './ctrl.html';
import { Projects, IProject } from '../../lib/collections';

Template['ctrl'].onCreated(() => {
    Meteor.subscribe('projects');
});

Template['ctrl'].helpers({
    projects: () => Projects.find(),
});