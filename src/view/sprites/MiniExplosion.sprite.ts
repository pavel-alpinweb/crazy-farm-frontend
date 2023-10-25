import { AbstractAnimatedSprite } from "../../framework/graphics/AbstractAnimatedSprite";

export class MiniExplosionSprite extends AbstractAnimatedSprite {
    protected spriteName = "mini-explosion";
    protected framesNumber = 9;
    protected animationSpeed = 0.1;
    protected isLoop = false;
}
