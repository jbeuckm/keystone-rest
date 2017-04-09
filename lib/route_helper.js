// from keystone/admin/server/middleware
function initList(req, res, next) {

    var keystone = req.keystone;
    req.list = keystone.list(req.params.list);
    if (!req.list) {
        if (req.headers.accept === 'application/json') {
            return res.status(404).json({
                error: 'invalid list path'
            });
        }
        req.flash('error', 'List ' + req.params.list + ' could not be found.');
        return res.redirect('/' + keystone.get('admin path'));
    }
    next();
}


module.exports.buildRoutes = function (router) {

    var keystonePath = require.resolve('keystone')
        .split('/').slice(0, -1).join('/');

    var middlewarePath = keystonePath + '/admin/server/middleware/';
    router.use(require(middlewarePath + 'apiError'));
    
    
    var apiPath = keystonePath + '/admin/server/api/';

	router.all('/counts', require(apiPath+'counts'));

    var csrf = require(keystonePath + "/lib/security/csrf");
    router.get('/session/token', function(req, res){
        res.send(csrf.createToken(req));
    });
    
    router.get('/session', require(apiPath + 'session/get'));
    router.post('/session/signin', require(apiPath + 'session/signin'));
	router.post('/session/signout', require(apiPath + 'session/signout'));

    router.get('/:list', initList, require(apiPath + 'list/get'));
    router.get('/:list/:id', initList, require(apiPath + 'item/get'));
    router.post('/:list', initList, require(apiPath + 'list/create'));
    router.put('/:list/:id', initList, require(apiPath + 'item/update'));
//    router.patch('/:list/:id', initList, require(apiPath + 'item/update'));
    router.delete('/:list/:id', initList, require(apiPath + 'list/delete'));
    
    /*    
    	router.get('/:list/:format(export.csv|export.json)', initList, require('../list/download'));
    	// items
    	router.get('/:list/:id', initList, require('../item/get'));
    	router.post('/:list/:id', initList, require('../item/update'));
    	router.post('/:list/:id/delete', initList, require('../list/delete'));
    	router.post('/:list/:id/sortOrder/:sortOrder/:newOrder', initList, require('../item/sortOrder'));

    	// #6: List Routes
    	router.all('/:list/:page([0-9]{1,5})?', IndexRoute);
    	router.all('/:list/:item', IndexRoute); 
    */

    return router;
};