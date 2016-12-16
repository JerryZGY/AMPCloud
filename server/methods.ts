import * as got from 'got';
import { Projects } from '../lib/collections';
import * as Models from '../lib/models';

Meteor.methods({
    'createProject'(data: Models.Project) {
        Projects.upsert({ _id: data.projectNo }, data);
    },
    'updateDesign'(design: Models.Design) {
        const _id = design.projectNo;
        delete design.projectNo;
        Projects.update({ _id }, { $push: { designs: design } });
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
