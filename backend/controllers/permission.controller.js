const Permission = require("../models/Permission");
const permissionData = require("../static/data/permission.data.json");
const permissionGroupController = require("../controllers/permission-group.controller");
const { Op } = require("sequelize");

async function findAllPermissions() {
  try {
    return await Permission.findAll({});
  } catch (error) {
    throw error;
  }
}


async function findPermissionsByIds(ids) {
  try {
    return await Permission.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  } catch (error) {
    throw error;
  }
}

async function insertPermissionsFromJsonFileIntoDatabase() {
  try {
    let permissionGroupByKey = {};
    let permissionsByKey = {};
    const permissionsToInsert = [];
    const permissionGroupsInDatabase =
      await permissionGroupController.findAllPermissionGroups();
    if (permissionGroupsInDatabase.length > 0) {
      for (const permissionGroup of permissionGroupsInDatabase) {
        permissionGroupByKey[permissionGroup.key] = permissionGroup;
      }
    }

    const permissions = await findAllPermissions();
    if (permissions.length > 0) {
      for (const permission of permissions) {
        permissionsByKey[permission.key] = permission;
      }
    }

    permissionDataFiltered = permissionData.filter(
      (permission) => !permissionsByKey[permission.key]
    );

    for (const permission of permissionDataFiltered) {
      permissionsToInsert.push({
        name: permission.name,
        key: permission.key,
        PermissionGroupId: permissionGroupByKey[permission.group].id,
      });
    }

    await Permission.bulkCreate(permissionsToInsert);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { findAllPermissions, findPermissionsByIds, insertPermissionsFromJsonFileIntoDatabase };
