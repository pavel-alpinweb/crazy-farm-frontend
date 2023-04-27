import User from "./model/user.model";
import AuthController from "./controler/auth.controller";

const userModel = new User();
const authController = new AuthController(userModel);
authController.methods.init();
