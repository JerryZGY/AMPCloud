import './scheduling.html';
import './scheduling.scss';
import { Router } from '../main';
import { Parts } from '../../lib/collections';

let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['scheduling'].onCreated(function () {
    $('body').attr('class', 'scheduling');
    subscribeHandle = this.subscribe('parts');
});

Template['scheduling'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['scheduling'].helpers({
    parts: () => Parts.find({ projectNo: Router.get('id') }, { sort: { receivedAt: -1 }, limit: 100 }),
});
