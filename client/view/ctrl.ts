import './ctrl.html';
import './ctrl.scss';
import { Logs } from '../../lib/collections';

let subscribeHandle: Meteor.SubscriptionHandle = null;
Template['ctrl'].onCreated(function () {
    $('body').attr('class', 'ctrl');
    subscribeHandle = this.subscribe('logs');
});

Template['ctrl'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['ctrl'].helpers({
    logs: () => Logs.find({}, { sort: { receivedAt: -1 } }),
});
