import './info.html';
import './info.scss';

Template['info'].onCreated(function () {
    $('body').attr('class', 'info');
});

Template['info'].helpers({
    // logs: () => Logs.find({}, { sort: { receivedAt: -1 } }),
});

