import * as winston from 'winston';
import ServerRouter from '../lib/serverRouter';
import { Projects, IProject } from '../lib/collections';

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

if (Projects.find().count() === 0) {
    const projects = [{
        projectNo: 123,
        projectName: 'AQtest124RCMD',
        buildDate: new Date(),
    }, {
        projectNo: 456,
        projectName: 'BQtest124RCMD',
        buildDate: new Date(),
    }];
    projects.forEach(x => Projects.insert(x));
}

Meteor.publish('projects', () => Projects.find({}));

Meteor.methods({
    'projects.insert'(no, name) {
        Projects.insert({
            projectNo: no,
            projectName: name,
            buildDate: new Date(),
        }, () => console.log('success'));
    }
});