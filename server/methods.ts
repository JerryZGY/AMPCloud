import * as got from 'got';
import { Projects, Logs, Designs, Schedulings, Moldings } from '../lib/collections';
import * as Models from '../lib/models';

Meteor.methods({
    'createProject'(data: Models.IProject) {
        const _id = data.projectNo;
        insertLog(data);
        Projects.upsert({ _id }, data);
        Meteor.call('notifyDesign', _id);
    },
    async 'notifyDesign'(_id: string) {
        console.log('notify');
        const data = Projects.findOne({ _id });
        const url = 'http://140.135.96.39/icmold/AMPWebService2.asmx/InsertProjInfo';
        // const url = 'http://localhost:8888';
        delete data._id;
        delete data.spec;
        let response;
        try {
            response = await postToWebService(url, data);
            console.log('response', response);
        } catch (error) {
            response = error;
            console.log('error', response);
        }
        Logs.insert({ projectNo: _id, message: `Notify design: ${response}`, receivedAt: new Date() });
    },
    'updateDesign'(data: Models.IDesign) {
        insertLog(data);
        Designs.insert(data);
    },
    'updateScheduling'(data: Models.IScheduling[]) {
        data.forEach(datum => {
            const selector = { projectNo: datum.projectNo, partNo: datum.partNo };
            const scheduling = Schedulings.findOne(selector) || datum;
            insertLog(scheduling);
            Schedulings.upsert(selector, scheduling);
        });
    },
    'updateMachining'(data: Models.IScheduling) {
        const selector = { projectNo: data.projectNo, partNo: data.partNo };
        const datum = Schedulings.findOne(selector);
        const startTime = data.startTime;
        if (startTime) { datum.startTime = startTime; }
        const endTime = data.endTime;
        if (endTime) { datum.endTime = endTime; }
        const status = data.status;
        if (status) { datum.status = status; }
        const error = data.error;
        if (error) {
            if (datum.error) {
                datum.error.push(error);
            } else {
                datum.error = [error];
            }
        }
        insertLog(data);
        Schedulings.update(selector, datum);
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
