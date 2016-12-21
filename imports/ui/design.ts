import './design.html';
import './design.scss';
import { Projects } from '../../lib/collections';
import { Router } from '../../client/main';

Template['design'].onCreated(() => {
    Meteor.subscribe('projects');
    $('body').attr('class', 'design');
});

Template['design'].helpers({
    design: () => Projects.findOne({ _id: Router.get('id') }).design,
});
