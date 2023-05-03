import User from "./model/user.model";
import AuthController from "./controler/auth.controller";
import {Router} from "./framework/Router";
import { EventBus } from "./framework/EventBus";

export const eventBus: EventBus = new EventBus();
const userModel: User = new User();
const router: Router = new Router();
const authController = new AuthController(userModel);
router.init();
authController.methods.init();
