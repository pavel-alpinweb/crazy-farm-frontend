import { GroundSprite } from "../view/sprites/Ground.sprite";
import { SproutPotatoSprite } from "../view/sprites/SproutPotato.sprite";
import { ChildPotatoSprite } from "../view/sprites/ChildPotato.sprite";
import { KidPotatoSprite } from "../view/sprites/KidPotato.sprite";
import { AdultPotatoSprite } from "../view/sprites/AdultPotato.sprite";
import { GhostPotatoSprite } from "../view/sprites/GhostPotato.sprite";
import { EmptyFieldSprite } from "../view/sprites/EmptyField.sprite";

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
  empty: [EmptyFieldSprite],
};

export const DIALOG_SPRITE_SIZE = 200;
export const NEEDS_SPRITE_SIZE = 180;
