import User from "./model/user.model";
import { Router } from "./framework/Router";
import FarmController from "./controler/farm.controller";
import Error404ScreenController from "./controler/404.controller";
import WelcomeController from "./controler/welcome.controller";
import FarmModel from "./model/farm.model";
import "./assets/scss/main.scss";
import { LoginController } from "./controler/login.controller";
import { RegistrationController } from "./controler/registration.controller";
import RegistrationWaysController from "./controler/registrationWays.controller";
import DevRoomController from "./controler/devRoom.controller";
import { AssetsLoader } from "./framework/graphics/AssetsLoader";
import { manifest } from "./assets/manifests/farm.manifest";
import { Toaster } from "./framework/interface/Toaster";
import { Loader } from "./framework/interface/Loader";
import i18next from "i18next";
import en from "./localization/en.json";
import ru from "./localization/ru.json";
import Cookies from "js-cookie";

export const $toaster = new Toaster(3000);
export const $loader = new Loader(1000);
export const farmAssetsLoader = new AssetsLoader(manifest);

const userModel: User = new User();
const farmModel: FarmModel = new FarmModel();
const loginController = new LoginController(userModel);
const registrationController = new RegistrationController(userModel);
const farmController = new FarmController(farmModel, userModel);
const devRoomController = new DevRoomController();
const error404Controller = new Error404ScreenController();
const welcomeController = new WelcomeController(userModel);
const registrationWaysController = new RegistrationWaysController(userModel);

const params: Array<RouterParams> = [
  {
    url: "/",
    controller: farmController,
  },
  {
    url: "/welcome",
    controller: welcomeController,
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
    url: "/registration-ways",
    controller: registrationWaysController,
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
const lang = Cookies.get("crazy-farm-lang") ?? "en";

i18next
  .init({
    lng: lang,
    debug: false,
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  })
  .then(() => {
    router.init();
  });
