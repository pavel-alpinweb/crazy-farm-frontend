import {AbstractAnimatedSprite} from "../../framework/graphics/AbstractAnimatedSprite";
import {ANIMATED_SPRITE_URL} from "../../utils/constants";

export class GhostPotatoSprite extends AbstractAnimatedSprite{
    protected spriteFrames = [
        `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato-1.frame.png`,
        `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato-2.frame.png`,
        `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato-3.frame.png`,
        `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato-4.frame.png`,
        `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato-5.frame.png`,
        `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato-6.frame.png`,
        `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato-7.frame.png`,
    ];
    protected animationSpeed = 0.05;
}