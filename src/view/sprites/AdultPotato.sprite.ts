import {AbstractAnimatedSprite} from "../../framework/graphics/AbstractAnimatedSprite";
import {ANIMATED_SPRITE_URL} from "../../utils/constants";

export class AdultPotatoSprite extends AbstractAnimatedSprite{
    protected spriteFrames = [
        `${ANIMATED_SPRITE_URL}/adult-potato/adult-potato-1.frame.png`,
        `${ANIMATED_SPRITE_URL}/adult-potato/adult-potato-2.frame.png`,
        `${ANIMATED_SPRITE_URL}/adult-potato/adult-potato-3.frame.png`,
        `${ANIMATED_SPRITE_URL}/adult-potato/adult-potato-4.frame.png`,
        `${ANIMATED_SPRITE_URL}/adult-potato/adult-potato-5.frame.png`,
    ];
    protected animationSpeed = 0.05;
}