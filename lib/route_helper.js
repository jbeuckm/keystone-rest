// from keystone/admin/server/middleware
function initList(req, res, next) {
    
    console.log(req.params);
    
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
    
    var listPath = keystonePath+'/admin/api/list/';

    /*
	// lists
	router.all('/counts', require('../api/counts'));
*/

    router.get('/:list', initList, require(listPath+'get'));
    /*    
    	router.get('/:list/:format(export.csv|export.json)', initList, require('../list/download'));
    	router.post('/:list/create', initList, require('../list/create'));
    	router.post('/:list/update', initList, require('../list/update'));
    	router.post('/:list/delete', initList, require('../list/delete'));
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