import {AbstractScene} from "../../framework/graphics/AbstractScene";
import {STATIC_SPRITE_URL} from "../../utils/constants";
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
        if (this.sprites.ground?.sprite) {
            this.container?.addChild(this.sprites.ground.sprite);
        }
    }

}