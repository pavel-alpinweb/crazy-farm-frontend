import { AbstractStaticSprite } from "../../framework/graphics/AbstractStaticSprite";
import { STATIC_SPRITE_URL } from "../../utils/constants";

export class BugSprite extends AbstractStaticSprite {
  protected spriteURL = `${STATIC_SPRITE_URL}/bug.sprite.png`;
}
