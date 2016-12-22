import './home.html';
import './home.scss';
import './project';
import { Mongo } from 'meteor/mongo';
import { Projects } from '../../lib/collections';

let changedHandle: Meteor.LiveQueryHandle = null;
let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['home'].onCreated(function () {
    $('body').attr('class', 'home');
    subscribeHandle = this.subscribe('projects', () => {
        changedHandle = Projects.find().observe({
            changed(doc: any) {
                $(`#${doc._id} .design  .progress`).data('progress').set(doc.design.progress);
            },
        });
    });
});

Template['home'].onDestroyed(function () {
    if (changedHandle) { changedHandle.stop(); }
    if (subscribeHandle) { subscribeHandle.stop(); }
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
