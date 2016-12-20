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
                $(`#${_id} .design`).data('progress').set(0);
            },
        });
    });
    $('body').attr('class', 'home');
    $('#icon').attr('class', 'mif-home');
});

Template['home'].helpers({
    projects: () => Projects.find(),
});

Template['home'].events({
    'click #create'() {
        console.log(Meteor.call('createProject', { projectNo: 'PJ20161206001' }));
    },
    'click #design'() {
        Meteor.call('updateDesign', { projectNo: 456 });
    },
});
