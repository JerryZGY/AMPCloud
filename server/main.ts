import './methods';
import './publications';
import * as winston from 'winston';
import ServerRouter from '../lib/serverRouter';
import { WebApp } from 'meteor/webapp';

const logger = new winston.Logger({ transports: [new winston.transports.Console()] });
const router = new ServerRouter();

// Listen to incoming HTTP requests, can only be used on the server
WebApp.rawConnectHandlers.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});

router.initRoutes([
    {
        method: 'POST',
        path: '/receive',
        handler: (req, res) => {
            const data = req.body;
            console.log('receive:', data);
            const projectEvent = data.length ? data[0].projectEvent : data.projectEvent;
            const isERP = /^ERP/.test(projectEvent);
            const isDesign = /^Design/.test(projectEvent);
            const isScheduling = /^Scheduling/.test(projectEvent);
            const isMachining = /^Machining/.test(projectEvent);
            const isMolding = /^Molding/.test(projectEvent);
            if (isERP) {
                logger.info('ERP data:', req.body);
                Meteor.call('createProject', data);
            } else if (isDesign) {
                logger.info('Design data:', req.body);
                Meteor.call('updateDesign', data);
            } else if (isScheduling) {
                logger.info('Scheduling data:', req.body);
                Meteor.call('updateScheduling', data);
            } else if (isMachining) {
                logger.info('Machining data:', req.body);
                Meteor.call('updateMachining', data);
            } else if (isMolding) {
                logger.info('Molding data:', req.body);
                Meteor.call('updateMolding', data);
            }
            res.end('Success');
        },
    },
]);
