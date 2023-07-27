import User from "./model/user.model";
import { Router } from "./framework/Router";
import { EventBus } from "./framework/EventBus";
import FarmController from "./controler/farm.controller";
import Error404ScreenController from "./controler/404.controller";
import FarmModel from "./model/farm.model";
import "./assets/scss/main.scss";
import { LoginController } from "./controler/login.controller";
import { RegistrationController } from "./controler/registration.controller";
import DevRoomController from "./controler/devRoom.controller";
import {AssetsLoader} from "./framework/graphics/AssetsLoader";
import {manifest} from "./assets/manifests/farm.manifest";

export const eventBus: EventBus = new EventBus();
export const farmAssetsLoader = new AssetsLoader(manifest);
const userModel: User = new User();
const farmModel: FarmModel = new FarmModel();
const loginController = new LoginController(userModel);
const registrationController = new RegistrationController(userModel);
const farmController = new FarmController(farmModel, userModel);
const devRoomController = new DevRoomController();
const error404Controller = new Error404ScreenController();

const params: Array<RouterParams> = [
  {
    url: "/",
    controller: farmController,
  },
  {
    url: "/login",
    controller: loginController,
  },
  {
    url: "/registration",
    controller: registrationController,
  },
  {
    url: "/dev-room",
    controller: devRoomController,
  },
  {
    url: "/404",
    controller: error404Controller,
  },
];

const router: Router = new Router(params);
router.init();
