import {AbstractAnimatedSprite} from "../../framework/graphics/AbstractAnimatedSprite";
import {ANIMATED_SPRITE_URL} from "../../utils/constants";

export class KidPotatoSprite extends AbstractAnimatedSprite{
    protected spriteFrames = [
        `${ANIMATED_SPRITE_URL}/kid-potato/kid-potato-1.frame.png`,
        `${ANIMATED_SPRITE_URL}/kid-potato/kid-potato-2.frame.png`,
        `${ANIMATED_SPRITE_URL}/kid-potato/kid-potato-3.frame.png`,
        `${ANIMATED_SPRITE_URL}/kid-potato/kid-potato-4.frame.png`,
    ];
    protected animationSpeed = 0.04;
}