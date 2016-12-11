import './home.html';
import './project';
import { Projects, IProject } from '../../lib/collections';

Template['home'].onCreated(() => {
    Meteor.subscribe('projects');
});

Template['home'].helpers({
    projects: () => Projects.find(),
});
