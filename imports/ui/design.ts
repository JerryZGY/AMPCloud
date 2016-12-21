import './design.html';
import './design.scss';
import * as d3 from 'd3';
import { Projects } from '../../lib/collections';
import { Router } from '../../client/main';

Template['design'].onCreated(function () {
    $('body').attr('class', 'design');
    this.subscribe('projects', () => {
        this.autorun(() => {
            const design = Projects.findOne({ _id: Router.get('id') }).design;
            if (design) { renderProgressRing(design.progress, design.status); }
        });
    });
});

Template['design'].helpers({
    design: () => Projects.findOne({ _id: Router.get('id') }).design,
});

function renderProgressRing(progress: number, status: string) {
    const radius = 45;
    const css = [`pg-${status}`, 'pg-space'];
    const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 20)
        .startAngle(0)
        .endAngle(progress / 100 * 2 * Math.PI);
    const arc1 = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 20)
        .startAngle(0)
        .endAngle(2 * Math.PI);
    d3.select('#chart').selectAll('*').remove();
    d3.select('#chart')
        .append('path')
        .attr('d', arc1)
        .style('fill', 'gray');
    d3.select('#chart')
        .append('path')
        .attr('d', arc)
        .attr('class', `pg-${status}`);
}
