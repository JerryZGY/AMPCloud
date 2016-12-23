import './molding.html';
import './molding.scss';
import * as c3 from 'c3';
import { Moldings, Designs } from '../../lib/collections';
import * as Models from '../../lib/models';
import { Router } from '../../client/main';

let chart = null;
const options = { sort: { receivedAt: -1 }, limit: 100 };
let autorunHandle: Tracker.Computation = null;
let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['molding'].onCreated(function () {
    $('body').attr('class', 'molding');
    subscribeHandle = this.subscribe('moldings');
});

Template['molding'].onRendered(function () {
    autorunHandle = this.autorun(() => {
        if (subscribeHandle.ready()) {
            const moldings = Moldings.find({ projectNo: Router.get('id') }, options).fetch();
            setTimeout(() => renderChart(moldings), 0);
        }
    });
});

Template['molding'].onDestroyed(function () {
    chart = null;
    if (autorunHandle) { autorunHandle.stop(); }
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['molding'].helpers({
    moldings: () => Moldings.find({ projectNo: Router.get('id') }, options),
});

function renderChart(moldings: Models.IMolding[]) {
    let meltTemp1 = [];
    let meltTemp2 = [];
    moldings.forEach((molding: Models.IMolding) => {
        meltTemp1.push(molding.meltTemp[0]);
        meltTemp2.push(molding.meltTemp[1]);
    });
    if (!chart) {
        console.log('init');
        chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    ['一段熔溫', ...meltTemp1],
                    ['二段熔溫', ...meltTemp2],
                ]
            },
        });
    } else {
        console.log('load');
        chart.load({
            columns: [
                ['一段熔溫', ...meltTemp1],
                ['二段熔溫', ...meltTemp2],
            ]
        });
    }
}
