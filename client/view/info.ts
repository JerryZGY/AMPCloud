import './info.html';
import './info.scss';
import * as ampcloud from '../../package.json';

Template['info'].onCreated(function () {
    $('body').attr('class', 'info');
});

Template['info'].helpers({
    info: () => {
        return {
            version: ampcloud.version,
            designUrl: Meteor.settings.public['designUrl'],
        };
    },
    // logs: () => Logs.find({}, { sort: { receivedAt: -1 } }),
});
