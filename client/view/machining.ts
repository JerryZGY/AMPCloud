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
    sample: () => [
        {
            type: 'Chatter',
            spindleSpeed: '5000',
            feed: '1500',
            cutters: '4',
            depth: '0.2',
            threshold: '-',
            ncCode: 'N65 X77.789 Y50.156 Z-.2',
            startTime: '2016-12-28 16:13:33Z',
        },
        {
            type: 'Chatter',
            spindleSpeed: '5000',
            feed: '1900',
            cutters: '2',
            depth: '0.1',
            threshold: '-',
            ncCode: 'N35 X77.789 Y20.136 Z-.1',
            endTime: '2016-12-28 16:15:33Z',
        },
    ],
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
