import './machining.html';
import './machining.scss';
import { Machinings } from '../../lib/collections';
import { Router } from '../../client/main';

let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['machining'].onCreated(function () {
    $('body').attr('class', 'machining');
    subscribeHandle = this.subscribe('machinings');
});

Template['machining'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['machining'].helpers({
    machinings: () => Machinings.find({ projectNo: Router.get('id') }, { sort: { receivedAt: -1 }, limit: 100 }),
});
