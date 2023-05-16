import { AbstractStaticSprite } from "../../framework/graphics/AbstractStaticSprite";
import { STATIC_SPRITE_URL } from "../../utils/constants";

export class GroundSprite extends AbstractStaticSprite {
  protected spriteURL = `${STATIC_SPRITE_URL}/land.sprite.png`;
}
