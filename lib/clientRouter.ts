import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

class ClientRouter {
    constructor() {
        BlazeLayout.setRoot('body');
    }

    public initRoutes(routes: Route[]) {
        routes.forEach(route => FlowRouter.route(route.path, {
            name: `${route.name.charAt(0).toUpperCase()}${route.name.slice(1)}`,
            action: () => BlazeLayout.render(route.name),
        }));
    }
}

type Route = {
    name: string;
    path: string;
};

export default ClientRouter;
