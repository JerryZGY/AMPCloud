import * as got from 'got';
import { Projects } from '../lib/collections';
import * as Models from '../lib/models';

Meteor.methods({
    'createProject'(data: Models.Project) {
        const _id = data.projectNo;
        data.logs = [data.projectEvent];
        delete data.projectEvent;
        data.designHistory = [data.design];
        data.createdAt = new Date();
        Projects.upsert({ _id }, data);
        Meteor.call('notifyDesign', _id);
    },
    async 'notifyDesign'(_id: string) {
        const project = Projects.findOne({ _id });
        Projects.update({ _id }, { $push: { logs: 'Notify design' } });
        // const opt = {
        //     body: JSON.stringify({ data: project.design }),
        //     json: true,
        //     headers: { 'Content-Type': 'application/json' },
        // };
        // const designAPI = 'http://140.135.96.39/icmold/AMPWebService2.asmx/InsertProjInfo';
        // const response = await got.post(designAPI, opt);
        // if (response) {
        //     Projects.update({ _id }, { $push: { logs: 'Notify design' } });
        // }
    },
    'updateDesign'(data: Models.Design) {
        const _id = data.projectNo;
        const project = Projects.findOne({ _id });
        project.logs.push(data.projectEvent);
        project.designHistory.push(data);
        data.updatedAt = new Date();
        project.design = data;
        Projects.update({ _id }, project);
    },
    'updateMachining'(machining: Models.Machining) {
        const _id = machining.projectNo;
        delete machining.projectNo;
        Projects.update({ _id }, { $push: { machinings: machining } });
    },
    'updateMolding'(molding: Models.Molding) {
        const _id = molding.projectNo;
        delete molding.projectNo;
        Projects.update({ _id }, { $push: { moldings: molding } });
    },
});
