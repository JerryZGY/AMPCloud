import { JsonRoutes } from 'meteor/simple:json-routes';

export default class ServerRouter {
    public initRoutes(routes: Route[]) {
        routes.forEach(route => JsonRoutes.add(route.method, route.path, route.handler));
    }
}

type Route = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    handler: (request: Request, response: Response, next?: Function) => void;
};

type Request = {
    readable: Boolean;
    domain: any;
    httpVersionMajor: number;
    httpVersionMinor: number;
    httpVersion: string;
    complete: Boolean;
    headers: any;
    url: string;
    method: string;
    statusCode: any;
    statusMessage: any;
    query: any;
    body: any;
    read: Function;
    route: string;
    params: any;
};

type Response = {
    writable: boolean;
    domain: any;
    output: any;
    outputEncodings: any;
    outputCallbacks: any;
    outputSize: number;
    chunkedEncoding: boolean;
    shouldKeepAlive: boolean;
    useChunkedEncodingByDefault: boolean;
    sendDate: boolean;
    finished: boolean;
    connection: any;
    flush: Function;
    write: Function;
    end: Function;
    on: Function;
    writeHead: Function;
};
