import * as got from 'got';
import { Projects, Logs, Designs, Schedulings, Machinings, Moldings } from '../lib/collections';
import * as Models from '../lib/models';

Meteor.methods({
    'createProject'(data: Models.IProject) {
        const _id = data.projectNo;
        insertLog(data);
        Projects.upsert({ _id }, data);
        Meteor.call('notifyDesign', _id);
    },
    async 'notifyDesign'(_id: string) {
        const data = Projects.findOne({ _id });
        const url = 'http://140.135.96.39/icmold/AMPWebService2.asmx/InsertProjInfo';
        // await postToWebService(url, data);
        Logs.insert({ projectNo: _id, message: 'Notify design', receivedAt: new Date() });
    },
    'updateDesign'(data: Models.IDesign) {
        insertLog(data);
        Designs.insert(data);
    },
    'updateScheduling'(data: Models.IScheduling) {
        insertLog(data);
        // Scheduling.insert(data);
    },
    'updateMachining'(data: Models.IMachining) {
        insertLog(data);
        // Machining.insert(data);
    },
    'updateMolding'(data: Models.IMolding) {
        insertLog(data);
        Moldings.insert(data);
    },
});

function insertLog(data) {
    data.receivedAt = new Date();
    Logs.insert({ projectNo: data.projectNo, message: data.projectEvent, receivedAt: data.receivedAt });
    delete data.projectEvent;
}

async function postToWebService(url: string, data) {
    return await got.post(url, {
        body: JSON.stringify({ data }),
        json: true,
        headers: { 'Content-Type': 'application/json' },
    });
}
