import './molding.html';
import './molding.scss';
import * as c3 from 'c3';
import { Moldings } from '../../lib/collections';
import { Router } from '../../client/main';

let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['molding'].onCreated(function () {
    $('body').attr('class', 'molding');
    subscribeHandle = this.subscribe('moldings');
});

Template['molding'].onRendered(function () {
    c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25],
            ]
        },
    });
});

Template['molding'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['molding'].helpers({
    moldings: () => Moldings.find({ projectNo: Router.get('id') }, { sort: { receivedAt: -1 }, limit: 100 }),
});
