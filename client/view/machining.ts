import './machining.html';
import './machining.scss';
import { Router } from '../main';
import { Parts } from '../../lib/collections';

let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['machining'].onCreated(function () {
    $('body').attr('class', 'machining');
    subscribeHandle = this.subscribe('parts');
});

Template['machining'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['machining'].helpers({
    parts: () => Parts.find({ projectNo: Router.get('id') }, { sort: { receivedAt: -1 }, limit: 100 }),
    hasError: (err) => err && err.length ? 'error' : '',
    splice: (arr = []) => arr.reverse().splice(0, 5),
});

Template['machining'].events({
    'click .info'() { showDialog(this._id); },
});

function showDialog(id) {
    const target = $(`#${id}>div`);
    if (target.length) { target.data('dialog').open(); }
}
