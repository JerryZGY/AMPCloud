import './home.html';
import './home.scss';
import './project';
import { Mongo } from 'meteor/mongo';
import { Projects } from '../../lib/collections';

let subscribeHandle: Meteor.SubscriptionHandle = null;
Template['home'].onCreated(function () {
    $('body').attr('class', 'home');
    subscribeHandle = this.subscribe('projects');
});

Template['home'].onDestroyed(function () {
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
