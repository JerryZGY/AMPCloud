import './home.html';
import './home.scss';
import './project';
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
