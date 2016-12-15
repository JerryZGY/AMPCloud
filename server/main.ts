import * as got from 'got';
import * as winston from 'winston';
import ServerRouter from '../lib/serverRouter';
import { Projects, IProject } from '../lib/collections';

Meteor.startup(() => {
    Meteor.absoluteUrl('');
});

const logger = new winston.Logger({ transports: [new winston.transports.Console()] });
const router = new ServerRouter();
router.initRoutes([
    {
        method: 'POST',
        path: '/erpsend',
        handler: (req, res) => {
            logger.info('ERP:', req.body);
            res.end('Success');
        },
    },
    {
        method: 'POST',
        path: '/machiningstart',
        handler: (req, res) => {
            logger.info('Machining:', JSON.stringify(req.body));
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

Meteor.publish('projects', () => Projects.find({}));
Meteor.methods({
    'projects.insert'() {
        console.log(Projects.insert({
            design: { Percent: 0 },
            buildDate: new Date(),
        }));
        // Projects.insert({
        //     design: { Percent: 0 },
        //     buildDate: new Date(),
        // }, () => {
        //     console.log('insert success');
        //     const url = 'http://140.135.96.39/icmold/AMPWebService2.asmx/InsertProjInfo';

        //     const obj = {
        //         orderNum: 'CYCU20161206001',
        //         moldNum: 'MD20161206001',
        //         projectNo: 'PJ20161206001',
        //         template: '1',
        //         productName: 'Mobile',
        //         cumstomerId: '0002',
        //         orderDate: '2016-12-30 00:00:00',
        //         deadlineTime: '2016-12-30 00:00:00',
        //     };
        //     const opt = {
        //         body: JSON.stringify({ data: obj }),
        //         json: true,
        //         headers: { 'Content-Type': 'application/json' }
        //     };
        //     got.post(url, opt).then(res => {
        //         console.log('post success');
        //         console.log('body:', res.body);
        //     }).catch(err => console.log('err:', err));
        // });
    },
    'design.update'() {
        const project = Projects.findOne({}, { sort: { buildDate: -1 } });
        const _id = project._id;
        const percent = project.design.Percent;
        Projects.update({ _id }, { $set: { design: { Percent: percent + 30 } } }, null, () => {
            const updatedProject = Projects.findOne({ _id });
            if (updatedProject.design.Percent >= 100) {
                // const url = 'http://140.135.96.39/icmold/AMPWebService2.asmx/InsertProjInfo';
                // const obj: IProject = {
                //     design: {
                //         orderNum: '123',
                //         moldNum: '456',
                //         ProjectNo: '789',
                //         Template: '131415',
                //         cumstomerId: '161718',
                //         productName: '192021',
                //         orderDate: new Date(),
                //         deadlineTime: new Date(),
                //     }
                // };
                // const opt = {
                //     body: JSON.stringify(obj.design),
                //     json: true,
                //     headers: { 'Content-Type': 'application/json' }
                // };
                // got.post(url, opt).then(res => console.log(res.body));
            }
        });
    },
});
