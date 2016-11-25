import { HTTP } from 'meteor/http';
import { JsonRoutes } from 'meteor/simple:json-routes';

Meteor.methods({
    test: () => {
        HTTP.call(
            'POST',
            'http://localhost:3000/api/',
            {
                headers: { 'content-type': 'application/json' },
                data: { id: 123 },
            },
            (err, res) => console.log(res)
        );
    },
});

if (Meteor.isServer) {
    JsonRoutes.add('POST', '/machiningstart/', (req, res, next) => {
        console.log('Machining:', req.body);
        res.end('Success');
    });
    JsonRoutes.add('POST', '/machiningend/', (req, res, next) => {
        console.log('Machining:', req.body);
        res.end('Success');
    });
    JsonRoutes.add('POST', '/moldingstart/', (req, res, next) => {
        console.log('Molding:', req.body);
        res.end('Success');
    });
    JsonRoutes.add('POST', '/moldingend/', (req, res, next) => {
        console.log('Molding:', req.body);
        res.end('Success');
    });
}
