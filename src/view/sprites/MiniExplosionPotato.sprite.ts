import { AbstractAnimatedSprite } from "../../framework/graphics/AbstractAnimatedSprite";

export class MiniExplosionPotatoSprite extends AbstractAnimatedSprite {
  protected spriteName = "mini-explosion";
  protected framesNumber = 9;
  protected animationSpeed = 0.1;
  protected isLoop = false;
  protected spriteNameAfterLoop = "ghost-potato";
  protected animationSpeedAfterLoop = 0.05;
}
