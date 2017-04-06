var express = require('express');

module.exports.addRoutes = function (app, keystone) {
    console.log('keystone-rest.addRoutes(app, keystone)');

    var swaggerJSDoc = require('swagger-jsdoc');

    var swaggerDefinition = {
        info: {
            title: keystone._options.name+' REST API',
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

    for (var key in keystone.lists) {
        var resource = keystone.lists[key].path;
                
        swaggerSpec.paths[resource] = {
            "post": {
                tags: [key]
            },
            "get": {
                tags: [key]
            },
            "put": {
                tags: [key]
            },
            "delete": {
                tags: [key]
            }
        };

        console.log(Object.keys(keystone.lists[key].fields));
        
        var definition = {
            type: 'object',
            properties: {
                
            }
        };
        
        for (var property in keystone.lists[key].fields) {
            definition.properties[property] = {
                type: 'string'
            }
        }
        
        swaggerSpec.definitions[key] = definition;
        
    }

    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    
    app.use('/api-docs', express.static(__dirname+'/html'));

};