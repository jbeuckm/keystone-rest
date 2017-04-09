module.exports.buildSessionPaths = function () {
    var paths = {
        '/counts': {
            get: {
                tags: ["Status"],
                produces: ["application/json"]
            }
        },
        '/session': {
            get: {
                tags: ["Session"],
                produces: ["application/json"]
            }
        },
        '/session/token': {
            get: {
                tags: ["Session"],
                produces: ["application/text"]
            }
        },
        '/session/signin': {
            post: {
                tags: ["Session"],
                parameters: [
                    {
                        name: 'login',
                        in : 'body',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                email: {"type":"string"},
                                password: {"type":"string"}
                            },
                            example: {
                                email: 'joebeuckman@gmail.com',
                                password: 'admin'
                            }
                        },
                    }
                ]
            }
        },
        '/session/signout': {
            post: {
                tags: ["Session"],
                parameters: [
                ]
            }
        }
    };

    return paths;
};


module.exports.buildListPaths = function (list) {

    var resource = list.path;

    var paths = {};

    var tag = list.key;

    var body_param = {
        name: resource,
        in : "body",
        description: tag + " to add to the system",
        required: true,
        schema: {
            "$ref": "#/definitions/" + tag
        }
    };

    paths['/' + resource] = {
        "post": {
            tags: [tag],
            parameters: [
                body_param
            ],
            produces: [
                "application/json"
            ]
        },
        "get": {
            tags: [tag],
            produces: ["application/json"],
            responses: {
                "200": {
                    "description": "A list of " + resource,
                    "schema": {
                        "type": "array",
                        "results": {
                            "$ref": "#/definitions/" + tag
                        }
                    }
                }
            }
        }
    };

    var id_path_param = {
        "name": "id",
        "description": tag + " id",
        "in": "path",
        "required": true,
        "type": "string"
    };

    paths['/' + resource + '/{id}'] = {
        "get": {
            tags: [tag],
            parameters: [
                id_path_param
            ],
            produces: [
                "application/json"
            ]
        },
        "put": {
            tags: [tag],
            parameters: [
                id_path_param,
                body_param
            ],
            produces: [
                "application/json"
            ]
        },
        "delete": {
            tags: [tag],
            parameters: [
                id_path_param
            ],
            produces: [
                "application/json"
            ]
        }
    };

    return paths;
};


var typeMap = {
    name: 'string',
    email: 'string',
    text: 'string',
    markdown: 'string',
    date: 'date',
    datetime: 'dateTime',
    html: 'string',
    password: 'password',
    boolean: 'boolean',

    cloudinaryimage: 'string',
    file: 'string',
    relationship: 'string',
    select: 'string'
};


module.exports.buildListDefinition = function (list) {

    console.log("### " + list.key + " ###");

    var definition = {
        type: 'object',
        properties: {}
    };

    for (var field in list.fields) {

        console.log("\t" + list.fields[field].type);

        definition.properties[field] = {
            type: typeMap[list.fields[field].type]
        }
    }

    return definition;
};