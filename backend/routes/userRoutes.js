const { Router } = require("express")
const LocalUserController = require("../controllers/user.controller.js")

const Users = Router();

Users.get("/", LocalUserController.handleGetAllUsers);
Users.get("/:id", LocalUserController.handleGetUserById);
Users.post("/", LocalUserController.handleCreateUser);  
Users.delete("/:id", LocalUserController.handleDeleteUser);

module.exports = Users;