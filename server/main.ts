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
            const data = req.body;
            const isERP = /^ERP/.test(data.projectEvent);
            const isDesign = /^Design/.test(data.projectEvent);
            const isMolding = /^Molding/.test(data.projectEvent);
            if (isERP) {
                logger.info('ERP data:', req.body);
                Meteor.call('createProject', data);
            } else if (isDesign) {
                logger.info('Design data:', req.body);
                Meteor.call('updateDesign', data);
            } else if (isMolding) {
                logger.info('Molding data:', req.body);
                Meteor.call('updateMolding', data);
            }
            res.end('Success');
        },
    },
]);
