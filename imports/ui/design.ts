import './design.html';
import './design.scss';
import * as d3 from 'd3';
import { Projects } from '../../lib/collections';
import { Router } from '../../client/main';

const radius = 45;
let progressRing = null;
let autorunHandle: Tracker.Computation = null;
let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['design'].onCreated(function () {
    $('body').attr('class', 'design');
    subscribeHandle = this.subscribe('projects', () => initProgressRing());
});

Template['design'].onRendered(function () {
    autorunHandle = this.autorun(() => {
        if (subscribeHandle.ready()) {
            const design = Projects.findOne({ _id: Router.get('id') }).design;
            renderProgressRing(design.progress, design.status);
        }
    });
});

Template['design'].onDestroyed(function () {
    if (autorunHandle) { autorunHandle.stop(); }
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['design'].helpers({
    design: () => Projects.findOne({ _id: Router.get('id') }).design,
});

function initProgressRing() {
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(radius - 20).startAngle(0).endAngle(2 * Math.PI);
    const chart = d3.select('#chart');
    chart.append('path').attr('d', arc).attr('class', 'pg-space');
    progressRing = chart.append('path').attr('d', arc).attr('class', 'pg-space').attr('id', '#data');
}

function renderProgressRing(progress: number, status: string) {
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(radius - 20).startAngle(0).endAngle(progress / 100 * 2 * Math.PI);
    progressRing.attr('d', arc).attr('class', `pg-${status}`);
}
