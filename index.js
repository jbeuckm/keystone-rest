var express = require('express');

module.exports.addRoutes = function (app, keystone, basePath) {

    basePath = basePath || '/api/v1';

    console.log('keystone-rest.addRoutes(app, keystone)');

    var swaggerJSDoc = require('swagger-jsdoc');

    var swaggerDefinition = {
        info: {
            title: keystone._options.name + ' REST API',
            version: '0.0.1',
            description: '',
        },
        host: 'localhost:3000',
        basePath: basePath + '/',
    };

    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./server.js', './models/*.js', './resources/*.js'],
    };


    var swagger_helper = require('./lib/swagger_helper');
    var route_helper = require('./lib/route_helper');

    var apiRouter = require('express').Router();
    apiRouter.use(function (req, res, next) {
        req.keystone = keystone;
        next();
    });    
    route_helper.buildRoutes(apiRouter);
    app.use(basePath, apiRouter);


    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);

    for (var key in keystone.lists) {

        var list = keystone.lists[key];

        var paths = swagger_helper.buildPaths(list);
        for (var path in paths) {
            swaggerSpec.paths[path] = paths[path];
        }

        swaggerSpec.definitions[key] = swagger_helper.buildDefinition(list);

    }

    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use('/api-docs', express.static(__dirname + '/html'));

};