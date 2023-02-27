const permissionGroupData = require("../static/data/permissionGroup.data.json");
const PermissionGroup = require("../models/PermissionGroup");
const Permission = require("../models/Permission");

/**
 * get Array of permissionGroup from database
 * @returns Array of PermissionGroup
 */
async function findAllPermissionGroups() {
  return await PermissionGroup.findAll({ include: Permission });
}

/**
 * insert permissionGroup data from json file into database
 */
async function insertPermissionGroupFromJsonFileIntoDatabase() {
  try {
    let permissionGroupByKey = {};
    let permissionGroupsInDatabase = await findAllPermissionGroups();
    if (permissionGroupsInDatabase.length > 0) {
      for (const permissionGroup of permissionGroupsInDatabase) {
        permissionGroupByKey[permissionGroup.key] = permissionGroup;
      }
    }

    let permissionGroupDataFiltered = permissionGroupData.filter(
      (permissionGroup) => !permissionGroupByKey[permissionGroup.key]
    );
    await PermissionGroup.bulkCreate(permissionGroupDataFiltered);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findAllPermissionGroups,
  insertPermissionGroupFromJsonFileIntoDatabase,
};
