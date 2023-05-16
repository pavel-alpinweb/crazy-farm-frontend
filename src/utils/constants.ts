import { GroundSprite } from "../view/sprites/Ground.sprite";
import { SproutPotatoSprite } from "../view/sprites/SproutPotato.sprite";

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
        stage: 0,
      },
    },
  ],
};
export const CHARACTERS_SPRITES: CharactersSprites = {
  potato: [GroundSprite, SproutPotatoSprite],
};
