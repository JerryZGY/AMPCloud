import { Mongo } from 'meteor/mongo';
import * as Models from './models';

export const Logs = new Mongo.Collection<Models.ILog>('logs');
export const Projects = new Mongo.Collection<Models.IProject>('projects', {
    transform: (project: Models.IProjectView) => {
        const selector = { projectNo: project.projectNo };
        const options = { sort: { receivedAt: -1 } };
        const defaultStage: any = {
            status: 'standby',
            progress: 0,
        };

        const design = Designs.findOne(selector, options) || defaultStage;
        project.designStatus = design.status;
        project.designProgress = design.progress;

        const scheduling = Schedulings.findOne(selector, options) || defaultStage;
        project.schedulingStatus = scheduling.status;
        project.schedulingProgress = scheduling.progress;

        const machining = Machinings.findOne(selector, options) || defaultStage;
        project.machiningStatus = machining.status;
        project.machiningProgress = machining.progress;

        const molding = Moldings.findOne(selector, options) || defaultStage;
        project.moldingStatus = molding.status;
        project.moldingProgress = molding.progress;
        console.log('transform');
        return project;
    }
});
export const Designs = new Mongo.Collection<Models.IDesign>('designs');
export const Schedulings = new Mongo.Collection<Models.IScheduling>('schedulings');
export const Machinings = new Mongo.Collection<Models.IMachining>('machinings');
export const Moldings = new Mongo.Collection<Models.IMolding>('moldings');
