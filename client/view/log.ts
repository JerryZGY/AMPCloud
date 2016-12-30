import './log.html';
import './log.scss';
import { Logs } from '../../lib/collections';

let subscribeHandle: Meteor.SubscriptionHandle = null;
Template['log'].onCreated(function () {
    $('body').attr('class', 'log');
    subscribeHandle = this.subscribe('logs');
});

Template['log'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['log'].helpers({
    logs: () => Logs.find({}, { sort: { receivedAt: -1 } }),
});
