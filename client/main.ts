import '../node_modules/metro-dist/css/metro.min.css';
import '../node_modules/metro-dist/css/metro-colors.min.css';
import '../node_modules/metro-dist/css/metro-icons.min.css';
import '../node_modules/metro-dist/css/metro-responsive.min.css';
import '../node_modules/metro-dist/css/metro-rtl.min.css';
import '../node_modules/metro-dist/css/metro-schemes.min.css';
import '../node_modules/metro-dist/js/metro.min.js';

import '../imports/ui/home';
import '../imports/ui/ctrl';

import ClientRouter from '../lib/clientRouter';

const router = new ClientRouter();
router.initRoutes([
  { name: 'home', path: '/' },
  { name: 'ctrl', path: '/ctrl' },
]);
