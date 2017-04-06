module.exports.buildPaths = function (list) {

    var resource = list.path;

    var paths = {};

    var tag = list.key;

    var body_param = {
        "name": resource,
        "in": "body",
        "description": tag + " to add to the system",
        "required": true,
        "schema": {
            "$ref": "#/definitions/" + tag
        }
    };

    paths[resource] = {
        "post": {
            tags: [tag],
            parameters: [
                body_param
            ]
        },
        "get": {
            tags: [tag]
        }
    };

    var id_path_param = {
        "name": "id",
        "description": tag + " id",
        "in": "path",
        "required": true,
        "type": "string"
    };

    paths[resource + "/{id}"] = {
        "get": {
            tags: [tag],
            parameters: [
                id_path_param
            ]
        },
        "put": {
            tags: [tag],
            parameters: [
                id_path_param,
                body_param
            ]
        },
        "patch": {
            tags: [tag],
            parameters: [
                id_path_param,
                body_param
            ]
        },
        "delete": {
            tags: [tag],
            parameters: [
                id_path_param
            ]
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