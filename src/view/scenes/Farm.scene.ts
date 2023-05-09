import * as PIXI from "pixi.js";
import {AbstractScene} from "../../framework/graphics/AbstractScene";
import {STATIC_SPRITE_URL, ANIMATED_SPRITE_URL} from "../../utils/constants";
import {GroundSprite} from "../sprites/Ground.sprite";

export class FarmScene extends AbstractScene{

    protected sprites: Sprites = {
        ground: null,
    }
    constructor() {
        super();
    }

    protected initSprites(): void {
        this.sprites.ground = new GroundSprite(`${STATIC_SPRITE_URL}/land.sprite.png`);
    }

    protected renderSprites(): void {
        // if (this.sprites.ground?.sprite) {
        //     this.container?.addChild(this.sprites.ground.sprite);
        // }
        const spriteFrames = [
            `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato-1.frame.png`,
            `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato-2.frame.png`,
            `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato-3.frame.png`,
        ];
        const textureArray = [];
        for (const frame of spriteFrames) {
            const texture = PIXI.Texture.from(frame);
            textureArray.push(texture);
        }
        const animatedSprite = new PIXI.AnimatedSprite(textureArray);
        animatedSprite.anchor.set(0.5);
        animatedSprite.animationSpeed = 0.07;
        animatedSprite.play();
        this.container?.addChild(animatedSprite);
    }

}