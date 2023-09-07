import { GroundSprite } from "../view/sprites/Ground.sprite";
import { SproutPotatoSprite } from "../view/sprites/SproutPotato.sprite";
import { ChildPotatoSprite } from "../view/sprites/ChildPotato.sprite";
import { KidPotatoSprite } from "../view/sprites/KidPotato.sprite";
import { AdultPotatoSprite } from "../view/sprites/AdultPotato.sprite";
import { GhostPotatoSprite } from "../view/sprites/GhostPotato.sprite";
import { SproutTomatoSprite } from "../view/sprites/SproutTomato.sprite";
import { ChildTomatoSprite } from "../view/sprites/ChildTomato.sprite";
import { KidTomatoSprite } from "../view/sprites/KidTomato.sprite";
import { AdultTomatoSprite } from "../view/sprites/AdultTomato.sprite";
import { ExplosionTomatoSprite } from "../view/sprites/ExplosionTomato.sprite";
import {DarkFieldSprite} from "../view/sprites/DarkField.sprite";
import {LightFieldSprite} from "../view/sprites/LightField.sprite";

export const appContainer: Element | null = document.getElementById("app");
export const STATIC_SPRITE_URL = "./assets/img/sprites/static";
export const ANIMATED_SPRITE_URL = "./assets/img/sprites/animated";
export const CHARACTERS_SPRITES: CharactersSprites = {
  potato: [
    GroundSprite,
    SproutPotatoSprite,
    ChildPotatoSprite,
    KidPotatoSprite,
    AdultPotatoSprite,
    GhostPotatoSprite,
  ],
  tomato: [
    GroundSprite,
    SproutTomatoSprite,
    ChildTomatoSprite,
    KidTomatoSprite,
    AdultTomatoSprite,
    ExplosionTomatoSprite,
  ],
  empty: [DarkFieldSprite, LightFieldSprite],
};

export const DIALOG_SPRITE_SIZE = 70;
export const NEEDS_SPRITE_SIZE = 400;
