import * as got from 'got';
import * as Models from '../lib/models';
import { Projects, Logs, Designs, Parts, Moldings } from '../lib/collections';
Meteor.methods({
    createProject(data: Models.IProject) {
        const _id = data.projectNo;
        insertLog(data);
        Projects.upsert({ _id }, data);
        if (_id !== '2Y004-16120004') {
            Meteor.call('notifyDesign', _id);
        }
    },
    async notifyDesign(_id: string) {
        const src = Projects.findOne({ _id });
        const data: Models.IDesignPost = {
            projectNo: src.projectNo,
            moldNo: src.moldNo,
            templateNo: src.templateNo,
            customerNo: src.customerNo,
            productName: src.productName,
            orderDate: src.orderDate,
            deadlineDate: src.deadlineDate,
            receivedAt: src.receivedAt,
        };
        const url = Meteor.settings['designUrl'];
        await postToWebService(url, data);
        Logs.insert({ projectNo: _id, message: `Notify design`, receivedAt: new Date() });
    },
    updateDesign(data: Models.IDesign) {
        insertLog(data);
        Designs.insert(data);
    },
    updateScheduling(data: Models.IPart[]) {
        data.forEach(part => {
            const selector = { projectNo: part.projectNo, partNo: part.partNo };
            const parts = Parts.findOne(selector) || part;
            insertLog(parts);
            Parts.upsert(selector, parts);
        });
    },
    updateMachining(data: Models.IPart) {
        const selector = { projectNo: data.projectNo, partNo: data.partNo };
        const part = Parts.findOne(selector) || data;
        const startTime = data.startTime;
        if (startTime) { part.startTime = startTime; }
        const endTime = data.endTime;
        if (endTime) { part.endTime = endTime; }
        const status = data.status;
        if (status) { part.status = status; }
        const error: any = data.error;
        if (error) {
            if (part.error && part.error.length) {
                part.error.push(error);
            } else {
                part.error = [error];
            }
        }
        insertLog(data);
        Parts.upsert(selector, part);
    },
    updateMolding(data: Models.IMolding) {
        let isEndedCalcData = /^Molding defect end$/.test(data.projectEvent);
        if (data.defect) {
            const selector: any = { projectNo: data.projectNo, moldNo: data.moldNo, type: 'calc' };
            const modifier = { $set: { defect: data.defect } };
            const options = { sort: { timeIndex: -1 } };
            const latestMolding = Moldings.find(selector, options).fetch()[0];
            if (latestMolding) {
                selector.timeIndex = latestMolding.timeIndex;
                Moldings.update(selector, modifier);
            }
            delete data.defect;
        }
        insertLog(data);
        if (!isEndedCalcData) {
            Moldings.insert(data);
        }
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
