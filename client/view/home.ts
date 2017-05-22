import './home.html';
import './home.scss';
import './project';
import { Projects } from '../../lib/collections';

let subscribeHandle: Meteor.SubscriptionHandle = null;
Template['home'].onCreated(function () {
    $('body').attr('class', 'home');
    subscribeHandle = this.subscribe('projects');
    Projects.find().observeChanges({
        changed(id, prop) {
            if (id === '2Y004-16120004' && prop.hasOwnProperty('templateNo')) {
                const no = parseInt(prop['templateNo']);
                if (no) {
                    (window as any).showMetroDialog('#dialog');
                    $('#content').attr('src', `http://cnt.cycu.edu.tw/machine_0${no}.html`);
                } else {
                    (window as any).hideMetroDialog('#dialog');
                }
            }
        }
    });
});

Template['home'].onDestroyed(function () {
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['home'].helpers({
    projects: () => Projects.find(),
});
