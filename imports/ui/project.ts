import './project.html';
import './project.scss';
import { Mongo } from 'meteor/mongo';
import { Router } from '../../client/main';
import * as Models from '../../lib/models';
import { Designs, Schedulings, Machinings, Moldings } from '../../lib/collections';

let subscribeHandles: Meteor.SubscriptionHandle[] = [];
Template['project'].onCreated(function () {
    subscribeHandles = [
        this.subscribe('designs'),
        this.subscribe('schedulings'),
        this.subscribe('machinings'),
        this.subscribe('moldings'),
    ];
});

Template['project'].onDestroyed(function () {
    subscribeHandles.forEach(handle => handle.stop());
});

Template['project'].helpers({
    design: () => getDataAndRenderProgressBar('design', Designs),
    scheduling: () => getDataAndRenderProgressBar('scheduling', Schedulings),
    machining: () => getDataAndRenderProgressBar('machining', Machinings),
    molding: () => getDataAndRenderProgressBar('molding', Moldings),
    parseStatus: status => status === 'running' || status === 'error' ? status : 'space',
});

function getDataAndRenderProgressBar(name: string, collection: Mongo.Collection<Models.IStage>) {
    const options = { sort: { receivedAt: -1 } };
    const defaultData = { status: 'standby', progress: 0 };
    const data = collection.findOne({ projectNo: Template.currentData()._id }, options) || defaultData;
    const templateInstance: any = Template.instance();
    if (templateInstance.view.isRendered) { templateInstance.$(`.${name} .progress`).data('progress').set(data.progress); }
    return data;
}

Template['project'].events({
    'click .ctrl'(e, tmpl) {
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
