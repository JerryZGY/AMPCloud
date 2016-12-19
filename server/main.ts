import './methods';
import './publications';
import * as winston from 'winston';
import ServerRouter from '../lib/serverRouter';

const logger = new winston.Logger({ transports: [new winston.transports.Console()] });
const router = new ServerRouter();
router.initRoutes([
    {
        method: 'POST',
        path: '/receive',
        handler: (req, res) => {
            logger.info('Data:', req.body);
            res.end('Success');
        },
    },
]);
