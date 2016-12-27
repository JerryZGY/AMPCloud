import './machining.html';
import './machining.scss';
import { Schedulings } from '../../lib/collections';
import { Router } from '../../client/main';

let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['machining'].onCreated(function () {
    $('body').attr('class', 'machining');
    subscribeHandle = this.subscribe('schedulings');
});

Template['machining'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['machining'].helpers({
    schedulings: () => Schedulings.find({ projectNo: Router.get('id') }, { sort: { receivedAt: -1 }, limit: 100 }),
});

Template['machining'].events({
    'click .error'(e, tmpl) {
        // console.log('e', this);
        // console.log('target', e.currentTarget);
        showDialog();
    },
});

function showDialog() {
    $('#dialog').data('dialog').open();
}
