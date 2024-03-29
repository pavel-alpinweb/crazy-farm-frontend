import { AbstractAnimatedSprite } from "../../framework/graphics/AbstractAnimatedSprite";

export class ExplosionSprite extends AbstractAnimatedSprite {
  protected spriteName = "explosion";
  protected framesNumber = 9;
  protected animationSpeed = 0.1;
  protected isLoop = false;
}
