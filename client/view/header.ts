import './header.html';
import './header.scss';
import { Router } from '../main';

let id;
Template['header'].onCreated(() => {
    Router.getContext((current) => {
        id = current.params.id || 'all';
    });
});

Template['header'].helpers({
    id: () => Router.get('id'),
});

Template['header'].events({
    'click .app-bar>.home'() {
        Router.go(`/`);
    },
    'click .app-bar>.design'() {
        Router.go(`/design/${id}`);
    },
    'click .app-bar>.scheduling'() {
        Router.go(`/scheduling/${id}`);
    },
    'click .app-bar>.machining'() {
        Router.go(`/machining/${id}`);
    },
    'click .app-bar>.molding'() {
        Router.go(`/molding/${id}`);
    },
});
