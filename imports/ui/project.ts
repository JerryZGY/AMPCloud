import './project.html';
import './project.scss';
import { Router } from '../../client/main';

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
