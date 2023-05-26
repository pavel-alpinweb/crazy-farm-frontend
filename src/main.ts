import User from "./model/user.model";
import AuthController from "./controler/auth.controller";
import { Router } from "./framework/Router";
import { EventBus } from "./framework/EventBus";
// import FarmController from "./controler/farm.controller";
import Error404ScreenController from "./controler/404.controller";
import FarmModel from "./model/farm.model";
import "./assets/scss/main.scss";
import {LoginController} from "./controler/login.controller";
import {RegistrationController} from "./controler/registration.controller";

export const eventBus: EventBus = new EventBus();
const userModel: User = new User();
const farmModel: FarmModel = new FarmModel();
const authController = new AuthController(userModel);
const loginController = new LoginController(userModel);
const registrationController = new RegistrationController(userModel);
// const farmController = new FarmController(farmModel);
const error404Controller = new Error404ScreenController();

const params: Array<RouterParams> = [
  {
    url: "/",
    controller: registrationController,
  },
  {
    url: "/login",
    controller: authController,
  },
  {
    url: "/404",
    controller: error404Controller,
  },
];

const router: Router = new Router(params);
router.init();
