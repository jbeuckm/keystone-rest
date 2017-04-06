module.exports.buildPaths = function (list) {

    var resource = list.path;

    var paths = {};

    var tag = list.key;

    paths[resource] = {
        "post": {
            tags: [tag],
            parameters: [
                {
                    "name": resource,
                    "in": "body",
                    "description": tag + " to add to the system",
                    "required": true,
                    "schema": {
                        "$ref": "#/definitions/" + tag
                    }
                }
            ]
        },
        "get": {
            tags: [tag]
        },
        "put": {
            tags: [tag]
        },
        "delete": {
            tags: [tag]
        }
    };

    return paths;
};


module.exports.buildDefinition = function (list) {
    console.log(list);

    var definition = {
        type: 'object',
        properties: {}
    };

    for (var field in list.fields) {
        definition.properties[field] = {
            type: 'string'
        }
    }

    return definition;
};