import { GroundSprite } from "../view/sprites/Ground.sprite";
import { SproutPotatoSprite } from "../view/sprites/SproutPotato.sprite";
import {ChildPotatoSprite} from "../view/sprites/ChildPotato.sprite";
import {KidPotatoSprite} from "../view/sprites/KidPotato.sprite";

export const appContainer: Element | null = document.getElementById("app");
export const STATIC_SPRITE_URL = "./assets/img/sprites/static";
export const ANIMATED_SPRITE_URL = "./assets/img/sprites/animated";
export const DEFAULT_FARM_STATE: FarmState = {
  containers: [
    {
      isEmpty: true,
      isBlocked: false,
      name: "central",
      character: {
        type: "potato",
        stage: 3,
      },
    },
  ],
};
export const CHARACTERS_SPRITES: CharactersSprites = {
  potato: [GroundSprite, SproutPotatoSprite, ChildPotatoSprite, KidPotatoSprite],
};

export const DEFAULT_USER_DATA: UserData = {
  userId: "crazyfarmid",
  loggin: "crazyfarmlogin",
  email: "crazyfarm@crazyfarm.crazyfarm",
  password: "crazyfarmpassword",
};
