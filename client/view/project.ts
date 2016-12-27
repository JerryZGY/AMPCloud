import './project.html';
import './project.scss';
import { Mongo } from 'meteor/mongo';
import { Router } from '../main';
import * as Models from '../../lib/models';
import { Designs, Parts, Moldings } from '../../lib/collections';

let subscribeHandles: Meteor.SubscriptionHandle[] = [];
Template['project'].onCreated(function () {
    subscribeHandles = [
        this.subscribe('designs'),
        this.subscribe('parts'),
        this.subscribe('moldings'),
    ];
});

Template['project'].onDestroyed(function () {
    subscribeHandles.forEach(handle => handle.stop());
});

Template['project'].helpers({
    design: () => getDataAndRenderProgressBar('design', Designs),
    scheduling: () => renderScheduling(),
    machining: () => renderMachining(),
    molding: () => getDataAndRenderProgressBar('molding', Moldings),
    parseStatus: status => status === 'running' || status === 'done' || status === 'error' ? status : 'space',
});

function getDataAndRenderProgressBar(name: string, collection: Mongo.Collection<Models.IStage>) {
    const options = { sort: { receivedAt: -1 } };
    const defaultData = { status: 'standby', progress: 0 };
    const data = collection.findOne({ projectNo: Template.currentData()._id }, options) || defaultData;
    const templateInstance: any = Template.instance();
    if (templateInstance.view.isRendered) { templateInstance.$(`.${name} .progress`).data('progress').set(data.progress); }
    return data;
}

function renderScheduling() {
    const isDone = !!Parts.find({ projectNo: Template.currentData()._id }).count();
    return { status: isDone ? 'done' : 'standby', progress: renderProgress('scheduling', isDone) };
}

function renderMachining() {
    const data = Parts.find({ projectNo: Template.currentData()._id }).fetch();
    const isRunning = !!data.filter(machining => machining.startTime).length;
    const isDone = data.filter(machining => machining.endTime).length === data.length && data.length !== 0;
    return { status: isDone ? 'done' : isRunning ? 'running' : 'standby', progress: renderProgress('machining', isDone) };
}

function renderProgress(name: string, isDone: boolean) {
    const progress = isDone ? 100 : 0;
    const templateInstance: any = Template.instance();
    if (templateInstance.view.isRendered) { templateInstance.$(`.${name} .progress`).data('progress').set(progress); }
    return progress;
}

Template['project'].events({
    'click .identify'(e, tmpl) {
        Router.go(`/ctrl/${tmpl.data._id}`);
    },
    'click .design'(e, tmpl) {
        Router.go(`/design/${tmpl.data._id}`);
    },
    'click .scheduling'(e, tmpl) {
        Router.go(`/scheduling/${tmpl.data._id}`);
    },
    'click .machining'(e, tmpl) {
        Router.go(`/machining/${tmpl.data._id}`);
    },
    'click .molding'(e, tmpl) {
        Router.go(`/molding/${tmpl.data._id}`);
    },
});
