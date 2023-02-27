const router = require('express').Router();
const permissionGroupController = require('../controllers/permission-group.controller');


router.get('/', async (req, res, next) => {
    try {
        const permissionGroups = await permissionGroupController.findAllPermissionGroups();
        return res.status(200).json(permissionGroups);
    } catch (error) {
        return res.status(500).json({message: 'an error occurred please try later'})
    }
})


module.exports = router;