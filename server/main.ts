import './methods';
import './publications';
import * as winston from 'winston';
import ServerRouter from '../lib/serverRouter';

const logger = new winston.Logger({ transports: [new winston.transports.Console()] });
const router = new ServerRouter();
router.initRoutes([
    { // ERP 送出專案初始資料
        method: 'POST',
        path: '/erpstart',
        handler: (req, res) => {
            logger.info('ERP:', req.body);
            res.end('Success');
        },
    },
    { // Design 送出設計中繼資料
        method: 'POST',
        path: '/designmiddle',
        handler: (req, res) => {
            logger.info('Design:', req.body);
            res.end('Success');
        },
    },
    { // Design 送出設計結束資料
        method: 'POST',
        path: '/designend',
        handler: (req, res) => {
            logger.info('Design:', req.body);
            res.end('Success');
        },
    },
    { // Scheduling 送出規劃中繼資料
        method: 'POST',
        path: '/schedulingmiddle',
        handler: (req, res) => {
            logger.info('Scheduling:', req.body);
            res.end('Success');
        },
    },
    { // Scheduling 送出規劃結束資料
        method: 'POST',
        path: '/schedulingend',
        handler: (req, res) => {
            logger.info('Scheduling:', req.body);
            res.end('Success');
        },
    },
    { // Machining 送出加工中繼資料
        method: 'POST',
        path: '/machiningmiddle',
        handler: (req, res) => {
            logger.info('Machining:', req.body);
            res.end('Success');
        },
    },
    { // Machining 送出加工結束資料
        method: 'POST',
        path: '/machiningend',
        handler: (req, res) => {
            logger.info('Machining:', req.body);
            res.end('Success');
        },
    },
    { // Molding 送出成型中繼資料
        method: 'POST',
        path: '/moldingmiddle',
        handler: (req, res) => {
            logger.info('Molding:', req.body);
            res.end('Success');
        },
    },
    { // Molding 送出成型結束資料
        method: 'POST',
        path: '/moldingend',
        handler: (req, res) => {
            logger.info('Molding:', req.body);
            res.end('Success');
        },
    },
]);
