import ClientRouter from '../../lib/clientRouter';

const router = new ClientRouter();
router.initRoutes([
  { name: 'home', path: '/' },
  { name: 'ctrl', path: '/ctrl' },
]);
