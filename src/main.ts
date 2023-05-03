import User from "./model/user.model";
import AuthController from "./controler/auth.controller";
import {Router} from "./framework/Router";
import { EventBus } from "./framework/EventBus";

export const eventBus: EventBus = new EventBus();
const userModel: User = new User();
const authController = new AuthController(userModel);

const params: Array<RouterParams> = [
    {
        url: '/',
        controller: authController,
    },
    {
        url: '/login',
        controller: authController,
    }
];

const router: Router = new Router(params);
router.init();
