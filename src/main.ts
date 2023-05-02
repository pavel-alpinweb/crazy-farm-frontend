import User from "./model/user.model";
import AuthController from "./controler/auth.controller";
import { EventBus } from "./framework/EventBus";

export const eventBus: EventBus = new EventBus();
const userModel = new User();
const authController = new AuthController(userModel);
authController.methods.init();
