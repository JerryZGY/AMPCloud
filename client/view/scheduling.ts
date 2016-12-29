import './scheduling.html';
import './scheduling.scss';
import { Router } from '../main';
import { Parts } from '../../lib/collections';

let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['scheduling'].onCreated(function () {
    $('body').attr('class', 'scheduling');
    subscribeHandle = this.subscribe('parts');
});

let preloaded = false;
let autorunHandle: Tracker.Computation = null;
Template['scheduling'].onRendered(function () {
    autorunHandle = this.autorun(() => {
        if (subscribeHandle.ready() && !preloaded) {
            setTimeout(() => {
                $('#preloader').fadeOut(1000);
                $('.content').fadeIn(1200);
                preloaded = true;
            }, 0);
        }
    });
});

Template['scheduling'].onDestroyed(function () {
    preloaded = false;
    if (autorunHandle) { autorunHandle.stop(); }
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['scheduling'].helpers({
    parts: () => Parts.find({ projectNo: Router.get('id') }, { sort: { receivedAt: -1 }, limit: 100 }),
});
