import './project.html';
import './project.scss';
import { Router } from '../../client/main';
import { Projects } from '../../lib/collections';

Template['project'].helpers({
    pgDesignStatus: () => parseStatus('designStatus'),
    pgSchedulingStatus: () => parseStatus('schedulingStatus'),
    pgMachiningStatus: () => parseStatus('machiningStatus'),
    pgMoldingStatus: () => parseStatus('moldingStatus'),
});

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

function parseStatus(section: string) {
    const status = Template.currentData()[section];
    if (status) {
        return status === 'running' || status === 'error' ? status : 'space';
    } else {
        return 'space';
    }
}
