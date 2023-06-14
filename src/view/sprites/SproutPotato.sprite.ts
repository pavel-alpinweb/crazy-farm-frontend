import { AbstractAnimatedSprite } from "../../framework/graphics/AbstractAnimatedSprite";
import { ANIMATED_SPRITE_URL } from "../../utils/constants";

export class SproutPotatoSprite extends AbstractAnimatedSprite {
  protected spriteFrames = [
    `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato-1.frame.png`,
    `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato-2.frame.png`,
    `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato-3.frame.png`,
  ];
  protected animationSpeed = 0.07;
}
