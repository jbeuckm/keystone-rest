var express = require('express');

module.exports.addRoutes = function (app, keystone) {
    console.log('keystone-rest.addRoutes(app, keystone)');

    console.log(keystone.lists);


    var swaggerJSDoc = require('swagger-jsdoc');

    var swaggerDefinition = {
        info: {
            title: 'KeystoneJS REST API',
            version: '0.0.1',
            description: '',
        },
        host: 'localhost:3000',
        basePath: '/',
    };

    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./server.js', './models/*.js', './resources/*.js'],
    };

    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);

    swaggerSpec.paths["api/v1/cool"] = {
        "get": {}
    }

    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });


};