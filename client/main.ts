import '../node_modules/metro-dist/css/metro.min.css';
import '../node_modules/metro-dist/css/metro-colors.min.css';
import '../node_modules/metro-dist/css/metro-icons.min.css';
import '../node_modules/metro-dist/css/metro-responsive.min.css';
import '../node_modules/metro-dist/css/metro-rtl.min.css';
import '../node_modules/metro-dist/css/metro-schemes.min.css';
import '../node_modules/metro-dist/js/metro.min.js';

import './header';
import '../imports/ui/home';
import '../imports/ui/ctrl';
import '../imports/ui/design';
import '../imports/ui/scheduling';
import '../imports/ui/machining';
import '../imports/ui/molding';
import ClientRouter from '../lib/clientRouter';

export const Router = new ClientRouter();
Router.initRoutes([
    { name: 'home', path: '/' },
    { name: 'ctrl', path: '/ctrl/:id' },
    { name: 'design', path: '/design/:id' },
    { name: 'scheduling', path: '/scheduling/:id' },
    { name: 'machining', path: '/machining/:id' },
    { name: 'molding', path: '/molding/:id' },
]);
