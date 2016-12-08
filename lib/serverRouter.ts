import { ClientRequest as Request, ServerResponse as Response } from 'http';
import { JsonRoutes } from 'meteor/simple:json-routes';

export default class ServerRouter {
    constructor() {
        // TODO Extension
    }

    public initRoutes(routes: Route[]) {
        routes.forEach(route => JsonRoutes.add(route));
    }
}

type Route = {
    method: string;
    path: string;
    handler: (request: Request, response: Response, next: Function) => void;
};
