const express = require("express");
const path = require('path');
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/images/', express.static(path.join(__dirname, 'static/images')))

const {
  sequelize,
  connectToDatabase,
} = require("./helpers/connect-to-database");
connectToDatabase();
// sequelize.sync({});

const permissionGroupControllers = require("./controllers/permission-group.controller");
const permissionControllers = require("./controllers/permission.controller");
// const roleControllers = require("./controllers/role.controller");
// const userControllers = require("./controllers/user.controller");

// userControllers.initUserFromJsonFile().then(() => console.log);
permissionGroupControllers.insertPermissionGroupFromJsonFileIntoDatabase();
permissionControllers.insertPermissionsFromJsonFileIntoDatabase();
// roleControllers.initAdminRoleFromJsonFile();

const permissionGroupRoutes = require("./routes/permission-group.routes");
const roleRoutes = require("./routes/role.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");



app.use("/api/permissions", permissionGroupRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);




app.listen(process.env.PORT, () => {
  console.log(`application running on port ${process.env.PORT}`);
});
