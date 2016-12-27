import '../node_modules/metro-dist/css/metro.min.css';
import '../node_modules/metro-dist/css/metro-colors.min.css';
import '../node_modules/metro-dist/css/metro-icons.min.css';
import '../node_modules/metro-dist/css/metro-responsive.min.css';
import '../node_modules/metro-dist/css/metro-rtl.min.css';
import '../node_modules/metro-dist/css/metro-schemes.min.css';
import '../node_modules/metro-dist/js/metro.min.js';
import '../node_modules/c3/c3.min.css';

import './lib/moment';
import './view/header';
import './view/home';
import './view/ctrl';
import './view/design';
import './view/scheduling';
import './view/machining';
import './view/molding';
import ClientRouter from '../lib/clientRouter';

export const Router = new ClientRouter();
Router.initRoutes([
    { name: 'home', path: '/' },
    { name: 'ctrl', path: '/ctrl/:id' },
    { name: 'ctrl', path: '/design/all' },
    { name: 'design', path: '/design/:id' },
    { name: 'ctrl', path: '/scheduling/all' },
    { name: 'scheduling', path: '/scheduling/:id' },
    { name: 'ctrl', path: '/machining/all' },
    { name: 'machining', path: '/machining/:id' },
    { name: 'ctrl', path: '/molding/all' },
    { name: 'molding', path: '/molding/:id' },
]);
