import {AbstractAnimatedSprite} from "../../framework/graphics/AbstractAnimatedSprite";
import {ANIMATED_SPRITE_URL} from "../../utils/constants";

export class ChildPotatoSprite extends AbstractAnimatedSprite{
    protected spriteFrames = [
        `${ANIMATED_SPRITE_URL}/child-potato/child-potato-1.frame.png`,
        `${ANIMATED_SPRITE_URL}/child-potato/child-potato-2.frame.png`,
        `${ANIMATED_SPRITE_URL}/child-potato/child-potato-3.frame.png`,
        `${ANIMATED_SPRITE_URL}/child-potato/child-potato-4.frame.png`,
    ];
    protected animationSpeed = 0.05;
}