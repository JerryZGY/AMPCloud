import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

export default class ClientRouter {
    constructor() {
        BlazeLayout.setRoot('body');
    }

    public initRoutes(routes: Route[]) {
        routes.forEach(route => FlowRouter.route(route.path, {
            name: `${route.name.charAt(0).toUpperCase()}${route.name.slice(1)}`,
            action: () => BlazeLayout.render(route.name),
        }));
    }

    public go(path: string) {
        FlowRouter.go(path);
    }

    public get(param: string): string {
        return FlowRouter.getParam(param);
    }

    public getContext(func: (current: Context) => void) {
        Tracker.autorun(() => {
            FlowRouter.watchPathChange();
            func(FlowRouter.current());
        });
    }
}

type Route = {
    name: string;
    path: string;
};

type Context = {
    path: string;
    params: any;
    queryParams: string;
    route: any;
};
