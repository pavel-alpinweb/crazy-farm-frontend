import User from "./model/user.model";
import AuthController from "./controler/auth.controller";
import {Router} from "./framework/Router";
import { EventBus } from "./framework/EventBus";
import FarmController from "./controler/farm.controller";
import Error404ScreenController from "./controler/404.controller";

export const eventBus: EventBus = new EventBus();
const userModel: User = new User();
const authController = new AuthController(userModel);
const farmController = new FarmController();
const error404Controller = new Error404ScreenController();

const params: Array<RouterParams> = [
    {
        url: '/',
        controller: farmController,
    },
    {
        url: '/login',
        controller: authController,
    },
    {
        url: '/404',
        controller: error404Controller,
    },
];

const router: Router = new Router(params);
router.init();
