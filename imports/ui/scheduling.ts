import './scheduling.html';
import './scheduling.scss';
import { Schedulings } from '../../lib/collections';
import { Router } from '../../client/main';

let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['scheduling'].onCreated(function () {
    $('body').attr('class', 'scheduling');
    subscribeHandle = this.subscribe('schedulings');
});

Template['scheduling'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['scheduling'].helpers({
    schedulings: () => Schedulings.find({ projectNo: Router.get('id') }, { sort: { receivedAt: -1 }, limit: 100 }),
});
