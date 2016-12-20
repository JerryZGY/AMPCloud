import './home.html';
import './home.scss';
import './project';
import { Mongo } from 'meteor/mongo';
import { Projects } from '../../lib/collections';

Template['home'].onCreated(() => {
    Meteor.subscribe('projects', () => {
        const projects = Projects.find();
        projects.observe({
            changed(newDoc: any) {
                const _id = newDoc._id;
                $(`#${_id} .design .progress`).data('progress').set(newDoc.design.percent);
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
        Meteor.call('createProject', { projectNo: 'JP20161206001' });
    },
    'click #design'() {
        Meteor.call('updateDesign', { projectNo: 456 });
    },
});
