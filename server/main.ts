import * as winston from 'winston';
import ServerRouter from '../lib/serverRouter';

const logger = new winston.Logger({ transports: [new winston.transports.Console()] });
const router = new ServerRouter();
router.initRoutes([
    {
        method: 'POST',
        path: '/machiningstart',
        handler: (req, res) => {
            logger.info('Machining:', req.body);
            res.end('Success');
        },
    },
    {
        method: 'POST',
        path: '/machiningend',
        handler: (req, res) => {
            logger.info('Machining:', req.body);
            res.end('Success');
        },
    },
    {
        method: 'POST',
        path: '/moldingstart',
        handler: (req, res) => {
            logger.info('Molding:', req.body);
            res.end('Success');
        },
    },
    {
        method: 'POST',
        path: '/moldingend',
        handler: (req, res) => {
            logger.info('Molding:', req.body);
            res.end('Success');
        },
    },
]);
