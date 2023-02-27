const Role = require("../models/Role");
const permissionController = require("../controllers/permission.controller");
const userController = require("../controllers/user.controller");
//const roleData = require("../static/data/role.data.json");
const Permission = require("../models/Permission");

/**
 * init admin role in database from a json file
 */
async function initAdminRoleFromJsonFile() {
  try {
    let roles = await Role.findAll({});
    if (roles.length === 0) {
      let permissions = await permissionController.findAllPermissions();
      let role = await Role.create(roleData);
      await role.addPermissions(permissions);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * create new Role
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 * @returns
 */
async function createRole(req, res, next) {
  try {
    let { name, description, permissions } = req.body;
    if (permissions.length === 0) {
      return res.status(400).json({ message: "permissions required" });
    }

    let key = "ROLE_" + name.toUpperCase().split(" ").join("_");
    const isExistRole = await findRoleByKey(key);
    if (isExistRole) {
      return res.status(409).json({ message: "role name already exist" });
    }
    let permissionsFromDb = await permissionController.findPermissionsByIds(
      permissions
    );
    let role = await Role.create({
      name,
      description,
      key,
    });
    await role.addPermissions(permissionsFromDb);
    return res.status(201).json({ message: "role created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 * get Array of roles from database
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 * @returns Array of roles
 */
async function findAllRole(req, res, next) {
  try {
    let roles = await Role.findAll({
      include: [{ model: Permission }],
    });
    return res.status(200).json(roles);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 * get Role by Id
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 * @returns Role
 */
async function findRoleById(req, res, next) {
  try {
    const roleId = req.params.roleId;
    let role = await Role.findByPk(roleId, {
      include: [
        {
          model: Permission,
        },
      ],
    });
    return res.status(200).json(role);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 * get Role from Database by unique key
 * @param {*} key string
 * @returns Role
 */
async function findRoleByKey(key) {
  try {
    return await Role.findOne({ where: { key: key } });
  } catch (error) {
    throw error;
  }
}

/**
 * edit role
 * @returns
 */
async function editRole(req, res, next) {
  try {
    const roleId = req.params.roleId;
    let { name, description, permissions } = req.body;
    if (permissions.length === 0) {
      return res.status(400).json({ message: "permissions required" });
    }
    let key = "ROLE_" + name.toUpperCase().split(" ").join("_");

    let [isExistRole, role, permissionsFromDb] = await Promise.all([
      findRoleByKey(key),
      Role.findByPk(roleId),
      permissionController.findPermissionsByIds(permissions),
    ]);

    if (isExistRole && JSON.stringify(isExistRole) !== JSON.stringify(role)) {
      return res.status(409).json({ message: "role name already exist" });
    }
    role.name = name;
    role.description = description;
    role.key = key;
    await role.save();
    await role.setPermissions(permissionsFromDb);
    return res.status(200).json({ message: "role updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 * delete role by id
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 * @returns
 */
async function deleteRole(req, res, next) {
  try {
    const roleId = req.params.roleId;
    const isUserHasThisRole = await userController.findOneUserByRoleId(roleId);
    if (isUserHasThisRole) {
      return res.status(400).json({ message: "user_has_this_role" });
    }
    let role = await Role.findByPk(roleId);
    await role.removePermissions();
    await role.destroy();
    return res.status(200).json({ message: "role deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

module.exports = {
  initAdminRoleFromJsonFile,
  createRole,
  findAllRole,
  findRoleById,
  findRoleByKey,
  editRole,
  deleteRole,
};
