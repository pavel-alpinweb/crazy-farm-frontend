import { GroundSprite } from "../view/sprites/Ground.sprite";
import { SproutPotatoSprite } from "../view/sprites/SproutPotato.sprite";
import {WitheredTomatoSproutSprite} from "../view/sprites/WitheredTomatoSprout.sprite";
import {WitheredPotatoSproutSprite} from "../view/sprites/WitheredPotatoSprite.sprite";
import { ChildPotatoSprite } from "../view/sprites/ChildPotato.sprite";
import { KidPotatoSprite } from "../view/sprites/KidPotato.sprite";
import { AdultPotatoSprite } from "../view/sprites/AdultPotato.sprite";
import { GhostPotatoSprite } from "../view/sprites/GhostPotato.sprite";
import { SproutTomatoSprite } from "../view/sprites/SproutTomato.sprite";
import { ChildTomatoSprite } from "../view/sprites/ChildTomato.sprite";
import { KidTomatoSprite } from "../view/sprites/KidTomato.sprite";
import { AdultTomatoSprite } from "../view/sprites/AdultTomato.sprite";
import { ExplosionSprite } from "../view/sprites/Explosion.sprite";
import {ExplosionChildTomatoSprite} from "../view/sprites/ExplosionChildTomato.sprite";
import {ExplosionKidTomatoSprite} from "../view/sprites/ExplosionKidTomato.sprite";
import {ExplosionAdultTomatoSprite} from "../view/sprites/ExplosionAdultTomato.sprite";
import {MiniExplosionSprite} from "../view/sprites/MiniExplosion.sprite";
import { DarkFieldSprite } from "../view/sprites/DarkField.sprite";
import { LightFieldSprite } from "../view/sprites/LightField.sprite";

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
    WitheredPotatoSproutSprite,
    GhostPotatoSprite,
    MiniExplosionSprite,
  ],
  tomato: [
    GroundSprite,
    SproutTomatoSprite,
    ChildTomatoSprite,
    KidTomatoSprite,
    AdultTomatoSprite,
    WitheredTomatoSproutSprite,
    ExplosionChildTomatoSprite,
    ExplosionKidTomatoSprite,
    ExplosionAdultTomatoSprite,
    ExplosionSprite,
  ],
  empty: [DarkFieldSprite, LightFieldSprite],
};

export const NEEDS_SPRITES_NAMES: NeedsSpritesNames = {
  HUNGER: "hunger",
  SICKNESS: "bug",
  THIRST: "drop",
};
