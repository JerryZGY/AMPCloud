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
});

Template['machining'].events({
    'click .info'(e, tmpl) {
        // console.log('e', this);
        // console.log('target', e.currentTarget);
        showDialog();
    },
});

function showDialog() {
    $('#dialog').data('dialog').open();
}
