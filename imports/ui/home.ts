import './home.html';
import './home.scss';
import './project';
import { Mongo } from 'meteor/mongo';
import { Projects, IProject } from '../../lib/collections';


Template['home'].onCreated(() => {
    Meteor.subscribe('projects', () => {
        const projects = Projects.find();
        projects.observe({
            changed(newDoc: any) {
                const _id = newDoc._id;
                $(`#${_id} .design`).data('progress').set(newDoc.design.Percent);
            },
        });
    });
    $('body').attr('class', 'home');
});

Template['home'].helpers({
    projects: () => Projects.find(),
});

Template['home'].events({
    'click #create'() {
        console.log(Meteor.call('projects.insert'));
    },
    'click #design'() {
        Meteor.call('design.update');
    },
});
