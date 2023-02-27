const router = require('express').Router();
const roleController = require('../controllers/role.controller')
const checkPermission = require('../middlewares/check-permission.middleware');
// checkPermission('PERMISSION_LIST_ROLES'),
router.post('/', roleController.createRole);
router.get('/:roleId', roleController.findRoleById);
router.get('/', roleController.findAllRole);
router.put('/:roleId', roleController.editRole);
router.delete('/:roleId', roleController.deleteRole);


module.exports = router;