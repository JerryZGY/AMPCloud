import './machining.html';
import './machining.scss';
import { Router } from '../main';
import { Parts } from '../../lib/collections';

let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['machining'].onCreated(function () {
    $('body').attr('class', 'machining');
    subscribeHandle = this.subscribe('parts');
});

let preloaded = false;
let autorunHandle: Tracker.Computation = null;
Template['machining'].onRendered(function () {
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

Template['machining'].onDestroyed(function () {
    preloaded = false;
    if (autorunHandle) { autorunHandle.stop(); }
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['machining'].helpers({
    parts: () => Parts.find({ projectNo: Router.get('id') }, { sort: { receivedAt: -1 }, limit: 100 }),
    hasError: (err) => err && err.length ? 'active' : '',
    splice: (arr = []) => arr.reverse().splice(0, 5),
});

Template['machining'].events({
    'click .info'() { showDialog(this._id); },
});

function showDialog(id) {
    const target = $(`#${id}>div`);
    if (target.length) { target.data('dialog').open(); }
}
